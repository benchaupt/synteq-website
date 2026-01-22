"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface DitherStartupStatueProps {
    className?: string;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
    color?: string;
    autoPanRange?: number;
    autoPanSpeed?: number;
}

interface Point {
    x: number;
    y: number;
    z: number;
    t: number;
}

// Pre-compute opacity values for batching
const OPACITY_BUCKETS = 10;
const OPACITY_VALUES: number[] = [];
for (let i = 0; i <= OPACITY_BUCKETS; i++) {
    OPACITY_VALUES.push(0.3 + (i / OPACITY_BUCKETS) * 0.7);
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
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const rotationRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);
    const pointsRef = useRef<Point[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Cached buffers - reused each frame
    const sizeRef = useRef({ width: 0, height: 0, dpr: 1, gridWidth: 0, gridHeight: 0 });
    const depthBufferRef = useRef<Float32Array | null>(null);
    const thresholdsRef = useRef<Float32Array | null>(null);

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

    // Handle canvas resize and buffer allocation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            if (sizeRef.current.width !== width || sizeRef.current.height !== height || sizeRef.current.dpr !== dpr) {
                const gridWidth = Math.ceil(width);
                const gridHeight = Math.ceil(height);
                const bufferSize = gridWidth * gridHeight;

                sizeRef.current = { width, height, dpr, gridWidth, gridHeight };
                canvas.width = width * dpr;
                canvas.height = height * dpr;

                // Allocate/reallocate buffers
                depthBufferRef.current = new Float32Array(bufferSize);
                thresholdsRef.current = new Float32Array(bufferSize);

                // Pre-compute thresholds (deterministic, only changes on resize)
                const thresholds = thresholdsRef.current;
                for (let i = 0; i < bufferSize; i++) {
                    const hash = Math.sin(i * 9999 + 127) * 10000;
                    thresholds[i] = hash - Math.floor(hash);
                }

                // Re-acquire context
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
        const depthBuffer = depthBufferRef.current;
        const thresholds = thresholdsRef.current;
        if (!ctx || points.length === 0 || !depthBuffer || !thresholds) return;

        const { width, height, gridWidth, gridHeight } = sizeRef.current;
        if (width === 0) return;

        // Clear
        ctx.clearRect(0, 0, width, height);

        const rotation = rotationRef.current;
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        const dotSize = 1.6;
        const scale = Math.min(width, height) * 0.555;
        const centerX = width / 2;
        const centerY = height / 2;

        // Reset depth buffer (use -1 as "empty" marker)
        depthBuffer.fill(-1);

        // Project all points and fill depth buffer
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const px = point.x;
            const py = point.z;
            const pz = -point.y;

            const rx = px * cosY - pz * sinY;
            const rz1 = px * sinY + pz * cosY;
            const ry = py * cosX - rz1 * sinX;
            const rz = py * sinX + rz1 * cosX;

            if (rz < -0.05) continue;

            const screenX = centerX + rx * scale;
            const screenY = centerY - ry * scale;

            const gridX = screenX | 0; // Fast floor
            const gridY = screenY | 0;

            if (gridX < 0 || gridX >= gridWidth || gridY < 0 || gridY >= gridHeight) continue;

            const idx = gridY * gridWidth + gridX;
            const normalizedDepth = (rz + 1) * 0.5;

            if (depthBuffer[idx] < normalizedDepth) {
                depthBuffer[idx] = normalizedDepth;
            }
        }

        // Render with batching by opacity when hovering
        ctx.fillStyle = color;

        if (isHovering) {
            // Batch by opacity bucket
            const buckets: number[][] = [];
            for (let i = 0; i <= OPACITY_BUCKETS; i++) {
                buckets.push([]);
            }

            for (let gy = 0; gy < gridHeight; gy++) {
                const rowOffset = gy * gridWidth;
                for (let gx = 0; gx < gridWidth; gx++) {
                    const idx = rowOffset + gx;
                    const depth = depthBuffer[idx];

                    if (depth < 0) continue;

                    const density = 0.1 + depth * 2;
                    if (thresholds[idx] >= density) continue;

                    const bucketIdx = Math.min(OPACITY_BUCKETS, (depth * OPACITY_BUCKETS) | 0);
                    buckets[bucketIdx].push(gx, gy);
                }
            }

            // Render each bucket
            for (let b = 0; b <= OPACITY_BUCKETS; b++) {
                const bucket = buckets[b];
                if (bucket.length === 0) continue;

                ctx.globalAlpha = OPACITY_VALUES[b];
                for (let j = 0; j < bucket.length; j += 2) {
                    ctx.fillRect(bucket[j], bucket[j + 1], dotSize, dotSize);
                }
            }
            ctx.globalAlpha = 1;
        } else {
            // Single pass - CSS handles opacity
            ctx.globalAlpha = 1;
            for (let gy = 0; gy < gridHeight; gy++) {
                const rowOffset = gy * gridWidth;
                for (let gx = 0; gx < gridWidth; gx++) {
                    const idx = rowOffset + gx;
                    const depth = depthBuffer[idx];

                    if (depth < 0) continue;

                    const density = .1 + depth * 3;
                    if (thresholds[idx] >= density) continue;

                    ctx.fillRect(gx, gy, dotSize, dotSize);
                }
            }
            ctx.globalAlpha = 1;
        }
    }, [color, isHovering]);

    // Animation loop
    useEffect(() => {
        if (!isLoaded) return;

        const animate = (time: number) => {
            timeRef.current = time / 1000;

            if (isHovering && externalMousePos) {
                targetRotationRef.current = {
                    x: -(externalMousePos.y - 0.5) * panRangeRad * 0.5,
                    y: (externalMousePos.x - 0.5) * panRangeRad * 2,
                };
                rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.08;
                rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.08;
            } else {
                const targetY = Math.sin(timeRef.current * autoPanSpeed) * panRangeRad;
                rotationRef.current.y += (targetY - rotationRef.current.y) * 0.05;
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
                className={`w-full h-full transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-50"}`}
            />
        </div>
    );
}
