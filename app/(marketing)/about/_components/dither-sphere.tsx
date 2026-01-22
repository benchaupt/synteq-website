"use client";

import { useEffect, useRef, useCallback } from "react";

interface DitherSphereProps {
    className?: string;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
}

export function DitherSphere({
    className = "",
    externalMousePos,
    isHovering = false,
}: DitherSphereProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rotationRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const pointsRef = useRef<{ nx: number; ny: number; nz: number; threshold: number }[]>([]);

    const gridSize = 60;
    const minDensity = 0.1;
    const maxDensity = 0.98;

    // Initialize points once
    useEffect(() => {
        const points: typeof pointsRef.current = [];

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const nx = (col / (gridSize - 1)) * 2 - 1;
                const ny = (row / (gridSize - 1)) * 2 - 1;

                const distSq = nx * nx + ny * ny;
                if (distSq > 1) continue;

                const sz = Math.sqrt(1 - distSq);

                // Front hemisphere
                const hashFront = Math.sin(row * 9999 + col * 127 + 311) * 10000;
                points.push({
                    nx, ny, nz: sz,
                    threshold: hashFront - Math.floor(hashFront),
                });

                // Back hemisphere
                const hashBack = Math.sin(row * 7777 + col * 233 + 557) * 10000;
                points.push({
                    nx, ny, nz: -sz,
                    threshold: hashBack - Math.floor(hashBack),
                });
            }
        }

        pointsRef.current = points;
    }, []);

    // Update target rotation when hovering
    useEffect(() => {
        if (!isHovering || !externalMousePos) return;

        targetRotationRef.current = {
            x: -(externalMousePos.y - 0.5) * Math.PI * 0.25,
            y: (externalMousePos.x - 0.5) * Math.PI * 0.25,
        };
    }, [isHovering, externalMousePos]);

    const render = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const size = rect.width;

        // Set canvas size if needed
        if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            ctx.scale(dpr, dpr);
        }

        // Clear
        ctx.clearRect(0, 0, size, size);

        const rotation = rotationRef.current;
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        const dotSize = (size / gridSize) * 0.4;
        const centerOffset = size * 0.125; // 75% centered means 12.5% offset each side
        const drawSize = size * 0.75;

        for (const point of pointsRef.current) {
            // Rotate around Y
            const rx = point.nx * cosY - point.nz * sinY;
            const rz1 = point.nx * sinY + point.nz * cosY;

            // Rotate around X
            const ry = point.ny * cosX - rz1 * sinX;
            const rz = point.ny * sinX + rz1 * cosX;

            // Skip back face
            if (rz < 0) continue;

            // Density based on depth
            const density = minDensity + rz * (maxDensity - minDensity);

            // Skip if not visible
            if (point.threshold >= density) continue;

            // Opacity: 0.5 when idle, scales to 1.0 when hovering based on depth
            const baseOpacity = 0.5;
            const hoverOpacity = baseOpacity + rz * 0.5; // rz ranges 0-1, so max is 1.0
            const opacity = isHovering ? hoverOpacity : baseOpacity;
            ctx.fillStyle = `rgba(75, 222, 183, ${opacity})`;

            // Project to screen
            const screenX = centerOffset + ((rx + 1) / 2) * drawSize;
            const screenY = centerOffset + ((ry + 1) / 2) * drawSize;

            ctx.fillRect(
                screenX - dotSize / 2,
                screenY - dotSize / 2,
                dotSize,
                dotSize
            );
        }
    }, [isHovering]);

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
                className="w-full h-full"
            />
        </div>
    );
}
