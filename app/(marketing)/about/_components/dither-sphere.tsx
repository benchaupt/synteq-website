"use client";

import { useEffect, useRef, useCallback } from "react";

interface DitherSphereProps {
    className?: string;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
}

// Pre-compute opacity buckets for batching (0.5 to 1.0 in 10 steps)
const OPACITY_BUCKETS = 10;
const OPACITY_COLORS: string[] = [];
for (let i = 0; i <= OPACITY_BUCKETS; i++) {
    const opacity = 0.5 + (i / OPACITY_BUCKETS) * 0.5;
    OPACITY_COLORS.push(`rgba(75, 222, 183, ${opacity})`);
}
const BASE_COLOR = "rgba(75, 222, 183, 1)";

export function DitherSphere({
    className = "",
    externalMousePos,
    isHovering = false,
}: DitherSphereProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const rotationRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const hoverBaseRotationRef = useRef({ x: 0, y: 0 }); // Captured rotation when hover starts
    const wasHoveringRef = useRef(false);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const pointsRef = useRef<Float32Array | null>(null); // [nx, ny, nz, threshold] x N
    const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

    const gridSize = 60;
    const minDensity = 0.4;  // Higher = more points at edges
    const maxDensity = 0.85; // Lower = fewer points at center
    const densityRange = maxDensity - minDensity;

    // Initialize points once using Float32Array for better performance
    useEffect(() => {
        const tempPoints: number[] = [];

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const nx = (col / (gridSize - 1)) * 2 - 1;
                const ny = (row / (gridSize - 1)) * 2 - 1;

                const distSq = nx * nx + ny * ny;
                if (distSq > 1) continue;

                const sz = Math.sqrt(1 - distSq);

                // Front hemisphere
                const hashFront = Math.sin(row * 9999 + col * 127 + 311) * 10000;
                tempPoints.push(nx, ny, sz, hashFront - Math.floor(hashFront));

                // Back hemisphere
                const hashBack = Math.sin(row * 7777 + col * 233 + 557) * 10000;
                tempPoints.push(nx, ny, -sz, hashBack - Math.floor(hashBack));
            }
        }

        pointsRef.current = new Float32Array(tempPoints);
    }, []);

    // Capture base rotation when hover starts, update target relative to base
    useEffect(() => {
        if (isHovering && !wasHoveringRef.current) {
            // Just started hovering - capture current rotation as base
            hoverBaseRotationRef.current = { ...rotationRef.current };
        }
        wasHoveringRef.current = isHovering;

        if (!isHovering || !externalMousePos) return;

        // Target is base rotation + mouse offset
        targetRotationRef.current = {
            x: hoverBaseRotationRef.current.x + (-(externalMousePos.y - 0.5) * Math.PI * 0.25),
            y: hoverBaseRotationRef.current.y + ((externalMousePos.x - 0.5) * Math.PI * 0.25),
        };
    }, [isHovering, externalMousePos]);

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

                // Re-acquire context after resize
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
        if (!ctx || !points) return;

        const { width: size } = sizeRef.current;
        if (size === 0) return;

        // Clear
        ctx.clearRect(0, 0, size, size);

        const rotation = rotationRef.current;
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        const dotSize = (size / gridSize) * 0.4;
        const halfDot = dotSize / 2;
        const centerOffset = size * 0.125;
        const drawSize = size * 0.75;
        const halfDrawSize = drawSize / 2;

        if (isHovering) {
            // When hovering, batch by opacity bucket
            const buckets: { x: number; y: number }[][] = [];
            for (let i = 0; i <= OPACITY_BUCKETS; i++) {
                buckets.push([]);
            }

            for (let i = 0; i < points.length; i += 4) {
                const nx = points[i];
                const ny = points[i + 1];
                const nz = points[i + 2];
                const threshold = points[i + 3];

                // Rotate around Y
                const rx = nx * cosY - nz * sinY;
                const rz1 = nx * sinY + nz * cosY;

                // Rotate around X
                const ry = ny * cosX - rz1 * sinX;
                const rz = ny * sinX + rz1 * cosX;

                // Skip back face
                if (rz < 0) continue;

                // Density based on depth
                const density = minDensity + rz * densityRange;
                if (threshold >= density) continue;

                // Calculate bucket index (rz is 0-1, map to bucket)
                const bucketIdx = Math.min(OPACITY_BUCKETS, Math.floor(rz * OPACITY_BUCKETS));

                // Project to screen
                const screenX = centerOffset + (rx + 1) * halfDrawSize;
                const screenY = centerOffset + (ry + 1) * halfDrawSize;

                buckets[bucketIdx].push({ x: screenX - halfDot, y: screenY - halfDot });
            }

            // Render each bucket with its color
            for (let b = 0; b <= OPACITY_BUCKETS; b++) {
                const bucket = buckets[b];
                if (bucket.length === 0) continue;

                ctx.fillStyle = OPACITY_COLORS[b];
                for (let j = 0; j < bucket.length; j++) {
                    ctx.fillRect(bucket[j].x, bucket[j].y, dotSize, dotSize);
                }
            }
        } else {
            // When not hovering, all dots have same opacity - single fillStyle
            ctx.fillStyle = BASE_COLOR;

            for (let i = 0; i < points.length; i += 4) {
                const nx = points[i];
                const ny = points[i + 1];
                const nz = points[i + 2];
                const threshold = points[i + 3];

                // Rotate around Y
                const rx = nx * cosY - nz * sinY;
                const rz1 = nx * sinY + nz * cosY;

                // Rotate around X
                const ry = ny * cosX - rz1 * sinX;
                const rz = ny * sinX + rz1 * cosX;

                // Skip back face
                if (rz < 0) continue;

                // Density based on depth
                const density = minDensity + rz * densityRange;
                if (threshold >= density) continue;

                // Project to screen
                const screenX = centerOffset + (rx + 1) * halfDrawSize;
                const screenY = centerOffset + (ry + 1) * halfDrawSize;

                ctx.fillRect(screenX - halfDot, screenY - halfDot, dotSize, dotSize);
            }
        }
    }, [isHovering, densityRange]);

    // Animation loop
    useEffect(() => {
        const animate = (time: number) => {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = time;
            }

            const delta = (time - lastTimeRef.current) / 1000;
            lastTimeRef.current = time;

            if (isHovering) {
                // Ease toward target
                rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.05;
                rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.05;
            } else {
                // Auto rotate
                rotationRef.current.x += delta * 0.05;
                rotationRef.current.y += delta * 0.08;
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
    }, [isHovering, render]);

    return (
        <div className={`aspect-square w-full flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                className={`w-full h-full transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-50"}`}
            />
        </div>
    );
}
