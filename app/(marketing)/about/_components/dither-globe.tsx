"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface DitherGlobeProps {
    className?: string;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
    color?: string;
    autoPanRange?: number;
    autoPanSpeed?: number;
    dotSize?: number; // Dot radius in pixels
    gridResolution?: number; // Grid resolution in degrees (smaller = denser grid)
}

interface Point {
    x: number;
    y: number;
    z: number;
    t?: number;
}

// Snap points to a lat/lon grid for uniform distribution
function snapToGrid(points: Point[], resolution: number): Point[] {
    const gridSet = new Set<string>();
    const snappedPoints: Point[] = [];

    for (const point of points) {
        // Convert cartesian to spherical (lat/lon)
        const r = Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z);
        const lat = Math.asin(point.y / r) * (180 / Math.PI);
        const lon = Math.atan2(point.z, point.x) * (180 / Math.PI);

        // Snap to grid
        const snappedLat = Math.round(lat / resolution) * resolution;
        const snappedLon = Math.round(lon / resolution) * resolution;

        const key = `${snappedLat},${snappedLon}`;
        if (gridSet.has(key)) continue;
        gridSet.add(key);

        // Convert back to cartesian
        const latRad = snappedLat * (Math.PI / 180);
        const lonRad = snappedLon * (Math.PI / 180);

        snappedPoints.push({
            x: Math.cos(latRad) * Math.cos(lonRad),
            y: Math.sin(latRad),
            z: Math.cos(latRad) * Math.sin(lonRad),
        });
    }

    return snappedPoints;
}

export function DitherGlobe({
    className = "",
    externalMousePos,
    isHovering = false,
    color = "75, 222, 183", // RGB values for opacity manipulation
    autoPanRange = 15,
    autoPanSpeed = 0.12,
    dotSize = 2, // Dot radius in pixels
    gridResolution = 1, // Grid resolution in degrees
}: DitherGlobeProps) {
    const pointsUrl = "/assets/about/globe-points.json";
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const rotationRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);
    const pointsRef = useRef<Point[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
    const projectedRef = useRef<{ x: number; y: number; z: number; opacity: number }[]>([]);

    const panRangeRad = (autoPanRange * Math.PI) / 180;

    // Load points from JSON and snap to grid
    useEffect(() => {
        fetch(pointsUrl)
            .then((res) => res.json() as Promise<Point[]>)
            .then((data) => {
                pointsRef.current = snapToGrid(data, gridResolution);
                setIsLoaded(true);
            })
            .catch((err) => console.error("Failed to load globe points:", err));
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
        const scale = Math.min(width, height) * 0.48;
        const centerX = width / 2;
        const centerY = height / 2;

        // Project and collect visible points
        const projected = projectedRef.current;
        projected.length = 0;

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const px = point.x;
            const py = point.y;
            const pz = point.z;

            // Rotate around Y axis first
            const rx = px * cosY - pz * sinY;
            const rz1 = px * sinY + pz * cosY;

            // Then rotate around X axis
            const ry = py * cosX - rz1 * sinX;
            const rz = py * sinX + rz1 * cosX;

            // Back-face culling - only show front hemisphere
            if (rz < 0) continue;

            const screenX = centerX + rx * scale;
            const screenY = centerY - ry * scale;

            // Opacity based on depth: front (rz=1) = full opacity, edge (rz=0) = low opacity
            const opacity = 0.15 + rz * 0.85;

            projected.push({ x: screenX, y: screenY, z: rz, opacity });
        }

        // Sort by depth (back to front) for proper layering
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
                targetRotationRef.current = {
                    x: -(externalMousePos.y - 0.5) * panRangeRad * 0.3,
                    y: (externalMousePos.x - 0.5) * panRangeRad * 0.6,
                };
                rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.08;
                rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.08;
            } else {
                // Gentle continuous rotation
                const targetY = Math.sin(timeRef.current * autoPanSpeed) * panRangeRad * 0.5;
                rotationRef.current.y += (targetY - rotationRef.current.y) * 0.03;
                rotationRef.current.x += (0 - rotationRef.current.x) * 0.05;
                // Add slow constant rotation for globe effect
                rotationRef.current.y += 0.001;
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
                className={`w-full h-full transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-50"}`}
            />
        </div>
    );
}
