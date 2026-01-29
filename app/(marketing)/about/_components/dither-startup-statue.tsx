"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface DitherStartupStatueProps {
    className?: string;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
    color?: string;
    dotSize?: number;
    gridResolution?: number;
    autoPanRange?: number;
    autoPanSpeed?: number;
}

interface Point {
    x: number;
    y: number;
    z: number;
    t?: number;
}

// Snap points to a 3D Cartesian grid for uniform distribution
function snapToGrid(points: Point[], resolution: number): Point[] {
    const gridSet = new Set<string>();
    const snappedPoints: Point[] = [];

    for (const point of points) {
        // Snap each coordinate to the grid
        const snappedX = Math.round(point.x / resolution) * resolution;
        const snappedY = Math.round(point.y / resolution) * resolution;
        const snappedZ = Math.round(point.z / resolution) * resolution;

        const key = `${snappedX},${snappedY},${snappedZ}`;
        if (gridSet.has(key)) continue;
        gridSet.add(key);

        snappedPoints.push({
            x: snappedX,
            y: snappedY,
            z: snappedZ,
        });
    }

    return snappedPoints;
}

export function DitherStartupStatue({
    className = "",
    externalMousePos,
    isHovering = false,
    color = "75, 222, 183",
    dotSize = 1,
    gridResolution = 0.02,
    autoPanRange = 10,
    autoPanSpeed = 0.15,
}: DitherStartupStatueProps) {
    const pointsUrl = "/assets/cards/startup-statue-points.json";
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationRef = useRef<number | null>(null);
    const pointsRef = useRef<Point[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
    const projectedRef = useRef<{ x: number; y: number; z: number; opacity: number }[]>([]);

    // Dynamic rotation state
    const timeRef = useRef<number>(0);
    const rotationRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });

    const panRangeRad = (autoPanRange * Math.PI) / 180;

    // Load points from JSON and snap to grid
    useEffect(() => {
        fetch(pointsUrl)
            .then((res) => res.json() as Promise<Point[]>)
            .then((data) => {
                pointsRef.current = snapToGrid(data, gridResolution);
                setIsLoaded(true);
            })
            .catch((err) => console.error("Failed to load statue points:", err));
    }, [pointsUrl, gridResolution]);

    // Handle canvas resize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            if (sizeRef.current.width !== width || sizeRef.current.height !== height || sizeRef.current.dpr !== dpr) {
                sizeRef.current = { width, height, dpr };
                canvas.width = width * dpr;
                canvas.height = height * dpr;

                const ctx = canvas.getContext("2d", { alpha: true });
                if (ctx) {
                    ctx.scale(dpr, dpr);
                    ctxRef.current = ctx;
                }
            }
        };

        updateSize();

        const observer = new ResizeObserver(updateSize);
        observer.observe(canvas);

        return () => observer.disconnect();
    }, []);

    const render = useCallback(() => {
        const ctx = ctxRef.current;
        const points = pointsRef.current;
        if (!ctx || points.length === 0) return;

        const { width, height } = sizeRef.current;
        if (width === 0) return;

        ctx.clearRect(0, 0, width, height);

        const rotation = rotationRef.current;
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        const dotRadius = dotSize;
        const scale = Math.min(width, height) * 0.555;
        const centerX = width / 2;
        const centerY = height / 2;

        const projected = projectedRef.current;
        projected.length = 0;

        // Find depth range for normalization
        let minZ = Infinity;
        let maxZ = -Infinity;

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            // Remap coordinates (statue uses different axis orientation)
            const px = point.x;
            const py = point.z;
            const pz = -point.y;

            // Rotate around Y axis
            const rx = px * cosY - pz * sinY;
            const rz1 = px * sinY + pz * cosY;

            // Rotate around X axis
            const ry = py * cosX - rz1 * sinX;
            const rz = py * sinX + rz1 * cosX;

            // Back-face culling (less aggressive for statue)
            if (rz < -0.3) continue;

            if (rz < minZ) minZ = rz;
            if (rz > maxZ) maxZ = rz;

            const screenX = centerX + rx * scale;
            const screenY = centerY - ry * scale;

            projected.push({ x: screenX, y: screenY, z: rz, opacity: 0 });
        }

        // Calculate opacity based on normalized depth
        const depthRange = maxZ - minZ || 1;
        for (let i = 0; i < projected.length; i++) {
            const p = projected[i];
            const normalizedDepth = (p.z - minZ) / depthRange;
            p.opacity = 0.2 + normalizedDepth * 0.8;
        }

        // Sort by depth (back to front)
        projected.sort((a, b) => a.z - b.z);

        // Draw circles
        for (let i = 0; i < projected.length; i++) {
            const p = projected[i];
            const finalOpacity = isHovering ? p.opacity : p.opacity * 0.5;

            ctx.beginPath();
            ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, ${finalOpacity})`;
            ctx.fill();
        }
    }, [color, isHovering, dotSize]);

    // Animation loop
    useEffect(() => {
        if (!isLoaded) return;

        const animate = (time: number) => {
            timeRef.current = time / 1000;

            if (isHovering && externalMousePos) {
                // Mouse controls rotation when hovering
                targetRotationRef.current = {
                    x: -(externalMousePos.y - 0.5) * panRangeRad * 0.25,
                    y: (externalMousePos.x - 0.5) * panRangeRad * 0.5,
                };
            } else {
                // Auto-pan: gentle oscillation with base offset
                const baseOffset = (15 * Math.PI) / 180;
                targetRotationRef.current = {
                    x: 0,
                    y: baseOffset + Math.sin(timeRef.current * autoPanSpeed) * panRangeRad,
                };
            }

            // Smooth interpolation
            rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.05;
            rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.05;

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
                className={`w-full h-full transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-50"}`}
            />
        </div>
    );
}
