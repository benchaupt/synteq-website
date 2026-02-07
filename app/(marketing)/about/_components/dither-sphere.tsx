"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface DitherSphereProps {
    className?: string;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
    animating?: boolean;
    baseBrightness?: number; // multiplier, default 0.75
    hoverBrightness?: number; // multiplier, default 1.3 (can go above 1 for extra bright)
}

// ASCII characters from heaviest to lightest
const ASCII_CHARS = "@%#*+=~-:,.";
const CHAR_COUNT = ASCII_CHARS.length;
const ACCENT_COLOR = { r: 75, g: 222, b: 183 }; // #4BDEB7

// Tuned orientation
const ROT_X = 4.577;
const ROT_Y = 3.767;
const ROT_Z = 2.227;
const SPIN_Y = 0.637;
const SCALE = 0.88;
const FONT_SIZE = 7;
const DEPTH_OPACITY = 0.75;

// Tuned lighting
const LIGHT_DIR_X = 2.0;
const LIGHT_DIR_Y = 2.0;
const LIGHT_DIR_Z = 0.95;
const AMBIENT_LIGHT = 0.7;
const LIGHT_BLEND = 1.0;
const BOWL_DARKNESS = 0.1;
const BOWL_CONTRAST = 3.0;
const BOWL_DEPTH = 1.25;
const SHADOW_NOISE = 0.42;

// Rotation constraints
const SPIN_Y_LIMIT = (30 * Math.PI) / 180; // +/- 30 degrees side to side
const SPIN_X_LIMIT = (10 * Math.PI) / 180; // +/- 10 degrees vertical

// Grid settings
const GRID_SIZE = Math.round(300 / FONT_SIZE);

export function DitherSphere({
    className = "",
    externalMousePos,
    isHovering = false,
    animating = true,
    baseBrightness = 0.75,
    hoverBrightness = 1.3,
}: DitherSphereProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const pointsRef = useRef<Float32Array | null>(null);
    const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
    const [isLoaded, setIsLoaded] = useState(false);

    // Pre-allocated grid buffers (avoids GC pressure every frame)
    const gridBuffersRef = useRef<{
        depth: Float32Array;
        light: Float32Array;
        count: Uint16Array;
        concave: Uint8Array;
    } | null>(null);

    // Animated rotation state (oscillates within limits)
    const spinYRef = useRef(0);
    const spinXRef = useRef(0);
    const spinYDirRef = useRef(1); // 1 or -1 for Y axis
    const spinXDirRef = useRef(1); // 1 or -1 for X axis
    const hoverBaseRef = useRef({ x: 0, y: 0 });
    const wasHoveringRef = useRef(false);
    const brightnessRef = useRef(baseBrightness);

    // Load Death Star point cloud data
    useEffect(() => {
        fetch("/assets/cards/death-star-3.json")
            .then((res) => res.json() as Promise<{ x: number; y: number; z: number; t: number; c?: number }[]>)
            .then((data) => {
                const tempPoints: number[] = [];
                for (const point of data) {
                    tempPoints.push(point.x, point.y, point.z, point.t, point.c ?? 0);
                }
                pointsRef.current = new Float32Array(tempPoints);
                setIsLoaded(true);
            })
            .catch((err) => {
                console.error("Failed to load Death Star data:", err);
            });
    }, []);

    // Capture spin state when hover starts
    useEffect(() => {
        if (isHovering && !wasHoveringRef.current) {
            hoverBaseRef.current = { x: spinXRef.current, y: spinYRef.current };
        }
        wasHoveringRef.current = isHovering;
    }, [isHovering]);

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
        if (!ctx || !points) return;

        const { width: size } = sizeRef.current;
        if (size === 0) return;

        ctx.clearRect(0, 0, size, size);

        // Calculate total rotations
        const totalRotX = ROT_X + spinXRef.current;
        const totalSpinY = SPIN_Y + spinYRef.current;

        const cosX = Math.cos(totalRotX);
        const sinX = Math.sin(totalRotX);
        const cosY = Math.cos(ROT_Y);
        const sinY = Math.sin(ROT_Y);
        const cosZ = Math.cos(ROT_Z);
        const sinZ = Math.sin(ROT_Z);
        const cosSpinY = Math.cos(totalSpinY);
        const sinSpinY = Math.sin(totalSpinY);

        // Light direction (normalized)
        const lightLen = Math.sqrt(LIGHT_DIR_X * LIGHT_DIR_X + LIGHT_DIR_Y * LIGHT_DIR_Y + LIGHT_DIR_Z * LIGHT_DIR_Z);
        const lx = LIGHT_DIR_X / lightLen;
        const ly = LIGHT_DIR_Y / lightLen;
        const lz = LIGHT_DIR_Z / lightLen;

        // Pre-allocated grid stores (reused across frames)
        const bufSize = GRID_SIZE * GRID_SIZE;
        if (!gridBuffersRef.current) {
            gridBuffersRef.current = {
                depth: new Float32Array(bufSize),
                light: new Float32Array(bufSize),
                count: new Uint16Array(bufSize),
                concave: new Uint8Array(bufSize),
            };
        }
        const depthGrid = gridBuffersRef.current.depth;
        const lightGrid = gridBuffersRef.current.light;
        const countGrid = gridBuffersRef.current.count;
        const concaveGrid = gridBuffersRef.current.concave;
        depthGrid.fill(0);
        lightGrid.fill(0);
        countGrid.fill(0);
        concaveGrid.fill(0);

        const margin = size * 0.05;
        const drawSize = size - margin * 2;

        // Project points
        for (let i = 0; i < points.length; i += 5) {
            const nx = points[i];
            const ny = points[i + 1];
            const nz = points[i + 2];
            const isConcave = points[i + 4] === 1;

            // Rotate around Y
            const rx1 = nx * cosY - nz * sinY;
            const rz1 = nx * sinY + nz * cosY;

            // Rotate around X
            const ry1 = ny * cosX - rz1 * sinX;
            const rz = ny * sinX + rz1 * cosX;

            // Rotate around Z
            const rx2 = rx1 * cosZ - ry1 * sinZ;
            const ry2 = rx1 * sinZ + ry1 * cosZ;

            // Apply spin
            const rx3 = rx2 * cosSpinY - rz * sinSpinY;
            const rz3 = rx2 * sinSpinY + rz * cosSpinY;

            const rx = rx3;
            const ry = ry2;

            // Project to screen
            const screenX = (rx * SCALE + 1) / 2;
            const screenY = (-ry * SCALE + 1) / 2;

            const col = Math.floor(screenX * GRID_SIZE);
            const row = Math.floor(screenY * GRID_SIZE);

            if (col >= 0 && col < GRID_SIZE && row >= 0 && row < GRID_SIZE) {
                const idx = row * GRID_SIZE + col;
                const absDepth = Math.abs(rz3);

                // Calculate lighting
                const normalSign = isConcave ? -1 : 1;
                const lightDot = (rx * lx + ry * ly + rz3 * lz) * normalSign;
                const lighting = Math.max(0, lightDot * (1 - AMBIENT_LIGHT) + AMBIENT_LIGHT);

                if (rz3 > 0) {
                    if (absDepth >= depthGrid[idx] || !(countGrid[idx] & 2)) {
                        depthGrid[idx] = absDepth;
                        lightGrid[idx] = lighting;
                    }
                    countGrid[idx] |= 2;
                } else if (!(countGrid[idx] & 2)) {
                    depthGrid[idx] = -absDepth;
                    lightGrid[idx] = lighting * 0.5;
                    countGrid[idx] |= 1;
                }
                countGrid[idx] |= 1;
                if (isConcave) concaveGrid[idx] = 1;
            }
        }

        const cellWidth = drawSize / GRID_SIZE;
        const cellHeight = drawSize / GRID_SIZE;

        ctx.font = `${FONT_SIZE}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Render ASCII grid
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const idx = row * GRID_SIZE + col;
                const rawDepth = depthGrid[idx];
                const lighting = lightGrid[idx];
                const flags = countGrid[idx];
                const isConcaveCell = concaveGrid[idx] === 1;

                if (!(flags & 1)) continue;

                const isFrontFace = rawDepth > 0;
                const depth = Math.abs(rawDepth);

                const depthFactor = depth;
                const lightFactor = lighting;

                // Blend depth and lighting
                let combined = depthFactor * (1 - LIGHT_BLEND) + lightFactor * LIGHT_BLEND;

                // Concave areas (dish)
                if (isConcaveCell) {
                    const bowlValue = BOWL_DARKNESS + lightFactor * BOWL_DEPTH;
                    combined = Math.pow(bowlValue, BOWL_CONTRAST);
                }

                // Add noise to darker areas
                const darknessFactor = 1 - combined;
                const noise = (Math.sin(col * 12.9898 + row * 78.233) * 43758.5453) % 1;
                const noiseAmount = darknessFactor * SHADOW_NOISE * (noise * 2 - 1);
                const finalCombined = Math.max(0, Math.min(1, combined + noiseAmount));

                const charIdx = Math.min(CHAR_COUNT - 1, Math.floor(finalCombined * CHAR_COUNT));
                const char = ASCII_CHARS[CHAR_COUNT - 1 - charIdx];

                const x = margin + col * cellWidth + cellWidth / 2;
                const y = margin + row * cellHeight + cellHeight / 2;

                const depthOpacity = 0.25 + depth * DEPTH_OPACITY;
                const lightOpacity = 0.3 + lighting * 0.7;
                const baseAlpha = (depthOpacity + lightOpacity) / 2;
                const alpha = Math.min(1, (isFrontFace ? baseAlpha : baseAlpha * 0.4) * brightnessRef.current);

                const shadowFactor = 0.5 + lighting * 0.5;
                const brightness = brightnessRef.current;
                const r = Math.min(255, Math.round(ACCENT_COLOR.r * shadowFactor * brightness));
                const g = Math.min(255, Math.round(ACCENT_COLOR.g * shadowFactor * brightness));
                const b = Math.min(255, Math.round(ACCENT_COLOR.b * shadowFactor * brightness));

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.fillText(char, x, y);
            }
        }
    }, []);

    // Render one static frame once data + canvas are ready
    useEffect(() => {
        if (isLoaded) render();
    }, [isLoaded, render]);

    // Animation loop
    useEffect(() => {
        if (!isLoaded || !animating) return;

        const animate = (time: number) => {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = time;
            }

            const delta = (time - lastTimeRef.current) / 1000;
            lastTimeRef.current = time;

            // Smoothly interpolate brightness
            const targetBrightness = isHovering ? hoverBrightness : baseBrightness;
            brightnessRef.current += (targetBrightness - brightnessRef.current) * 0.1;

            if (isHovering && externalMousePos) {
                // Hover: relative rotation based on mouse position, clamped to limits
                const targetY = Math.max(-SPIN_Y_LIMIT, Math.min(SPIN_Y_LIMIT,
                    hoverBaseRef.current.y + (externalMousePos.x - 0.5) * Math.PI * 0.3
                ));
                const targetX = Math.max(-SPIN_X_LIMIT, Math.min(SPIN_X_LIMIT,
                    hoverBaseRef.current.x + (externalMousePos.y - 0.5) * Math.PI * 0.15
                ));
                spinYRef.current += (targetY - spinYRef.current) * 0.08;
                spinXRef.current += (targetX - spinXRef.current) * 0.08;
            } else {
                // Auto rotate: oscillate within limits
                // Y axis (side to side) - +/- 30 degrees
                spinYRef.current += delta * 0.15 * spinYDirRef.current;
                if (spinYRef.current >= SPIN_Y_LIMIT || spinYRef.current <= -SPIN_Y_LIMIT) {
                    spinYDirRef.current *= -1;
                    spinYRef.current = Math.max(-SPIN_Y_LIMIT, Math.min(SPIN_Y_LIMIT, spinYRef.current));
                }

                // X axis (vertical) - +/- 10 degrees, slower & independent
                spinXRef.current += delta * 0.08 * spinXDirRef.current;
                if (spinXRef.current >= SPIN_X_LIMIT || spinXRef.current <= -SPIN_X_LIMIT) {
                    spinXDirRef.current *= -1;
                    spinXRef.current = Math.max(-SPIN_X_LIMIT, Math.min(SPIN_X_LIMIT, spinXRef.current));
                }
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
    }, [isHovering, externalMousePos, isLoaded, animating, render, baseBrightness, hoverBrightness]);

    return (
        <div className={`aspect-square w-full flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
        </div>
    );
}
