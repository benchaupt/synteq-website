"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface DitherStartupStatueProps {
    className?: string;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
    color?: string;
    /** Auto-pan oscillation range in degrees (e.g., 35 means -35° to +35°) */
    autoPanRange?: number;
    /** Speed of auto-pan oscillation */
    autoPanSpeed?: number;
}

interface Point {
    x: number;
    y: number;
    z: number;
    t: number; // threshold for dithering
}

export function DitherStartupStatue({
    className = "",
    externalMousePos,
    isHovering = false,
    color = "rgb(75, 222, 183)",
    autoPanRange = 35,
    autoPanSpeed = 0.5,
}: DitherStartupStatueProps) {
    const pointsUrl = "/assets/cards/startup-statue-points.json";
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rotationRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);
    const pointsRef = useRef<Point[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Convert degrees to radians
    const panRangeRad = (autoPanRange * Math.PI) / 180;

    // Load points from JSON
    useEffect(() => {
        fetch(pointsUrl)
            .then((res) => res.json() as Promise<Point[]>)
            .then((data) => {
                pointsRef.current = data;
                setIsLoaded(true);
            })
            .catch((err) => console.error("Failed to load statue points:", err));
    }, [pointsUrl]);

    const render = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || pointsRef.current.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Set canvas size if needed
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }

        // Clear
        ctx.clearRect(0, 0, width, height);

        const rotation = rotationRef.current;
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        // Grid-based rendering with square dots (no overlap)
        const cellSize = 1; // Grid cell size
        const dotSize = 1.5; // Dot size matches cell (no overlap)
        const gridWidth = Math.ceil(width / cellSize);
        const gridHeight = Math.ceil(height / cellSize);

        // Create depth buffer and threshold for each grid cell
        const depthBuffer: (number | null)[] = new Array(gridWidth * gridHeight).fill(null);

        // Pre-compute random thresholds for each cell (screen-space, consistent)
        const thresholds: number[] = new Array(gridWidth * gridHeight);
        for (let i = 0; i < thresholds.length; i++) {
            const hash = Math.sin(i * 9999 + 127) * 10000;
            thresholds[i] = hash - Math.floor(hash);
        }

        const scale = Math.min(width, height) * 0.555; // Scale up the model
        const centerX = width / 2;
        const centerY = height / 2;

        // Project all points and fill depth buffer
        for (const point of pointsRef.current) {
            // Convert from Blender Z-up to screen Y-up
            const px = point.x;
            const py = point.z;
            const pz = -point.y;

            // Rotate around Y axis (left/right pan)
            const rx = px * cosY - pz * sinY;
            const rz1 = px * sinY + pz * cosY;

            // Rotate around X axis (up/down tilt)
            const ry = py * cosX - rz1 * sinX;
            const rz = py * sinX + rz1 * cosX;

            // Only render front-facing points
            if (rz < -0.05) continue;

            // Project to screen
            const screenX = centerX + rx * scale;
            const screenY = centerY - ry * scale;

            // Convert to grid coordinates
            const gridX = Math.floor(screenX / cellSize);
            const gridY = Math.floor(screenY / cellSize);

            if (gridX < 0 || gridX >= gridWidth || gridY < 0 || gridY >= gridHeight) continue;

            const idx = gridY * gridWidth + gridX;
            const normalizedDepth = (rz + 1) / 2; // 0 to 1

            // Keep the frontmost point (highest depth value = closest to camera)
            if (depthBuffer[idx] === null || normalizedDepth > depthBuffer[idx]!) {
                depthBuffer[idx] = normalizedDepth;
            }
        }

        // Render dots with random threshold dithering (like dither-grid)
        ctx.fillStyle = color;

        for (let gy = 0; gy < gridHeight; gy++) {
            for (let gx = 0; gx < gridWidth; gx++) {
                const idx = gy * gridWidth + gx;
                const depth = depthBuffer[idx];

                if (depth === null) continue;

                // Random threshold for this cell
                const threshold = thresholds[idx];

                // Depth determines density (closer = denser, amplified shading)
                // Range: 0.05 (back) to 0.95 (front) for strong contrast
                const density = 0.05 + depth * 0.9;

                if (threshold < density) {
                    // Opacity: 50% when not hovering, depth-based (30%-100%) when hovering
                    if (isHovering) {
                        ctx.globalAlpha = 0.3 + depth * 0.7; // 30% (back) to 100% (front)
                    } else {
                        ctx.globalAlpha = 0.5;
                    }

                    // Draw square dot
                    ctx.fillRect(
                        gx * cellSize,
                        gy * cellSize,
                        dotSize,
                        dotSize
                    );
                }
            }
        }
    }, [color, isHovering]);

    // Animation loop
    useEffect(() => {
        if (!isLoaded) return;

        const animate = (time: number) => {
            // Track elapsed time for oscillation
            timeRef.current = time / 1000;

            if (isHovering && externalMousePos) {
                // Mouse controls pan when hovering
                targetRotationRef.current = {
                    x: -(externalMousePos.y - 0.5) * panRangeRad * 0.5,
                    y: (externalMousePos.x - 0.5) * panRangeRad * 2,
                };
                // Ease toward target
                rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.08;
                rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.08;
            } else {
                // Auto-pan oscillation: sin wave between -panRange and +panRange
                const targetY = Math.sin(timeRef.current * autoPanSpeed) * panRangeRad;
                // Ease toward oscillation target
                rotationRef.current.y += (targetY - rotationRef.current.y) * 0.05;
                // Ease X back to 0
                rotationRef.current.x += (0 - rotationRef.current.x) * 0.05;
            }

            render();
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isLoaded, isHovering, externalMousePos, panRangeRad, autoPanSpeed, render]);

    return (
        <div className={`w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
        </div>
    );
}
