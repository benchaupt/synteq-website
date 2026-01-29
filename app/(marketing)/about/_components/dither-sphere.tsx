"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";

interface DitherSphereProps {
    className?: string;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
}

// ASCII characters from heaviest to lightest
const ASCII_CHARS = "@%#*+=~-:,.";
const CHAR_COUNT = ASCII_CHARS.length;
const ACCENT_COLOR = { r: 75, g: 222, b: 183 }; // #4BDEB7

// Base orientation (tuned via debug)
const BASE_ROT_X = 4.577;
const BASE_ROT_Y = 3.767;
const BASE_ROT_Z = 2.227;
const BASE_SPIN_Y = 0.637;
const BASE_SCALE = 0.88;
const FONT_SIZE = 8;
const DEPTH_OPACITY = 0.75;

// Lighting settings (tuned)
const BASE_LIGHT_DIR_X = 2.0;
const BASE_LIGHT_DIR_Y = 2.0;
const BASE_LIGHT_DIR_Z = 0.95;
const BASE_AMBIENT_LIGHT = 0.7;
const BASE_LIGHT_BLEND = 1.0;
const BASE_BOWL_DARKNESS = 0.1;
const BASE_BOWL_CONTRAST = 3.0;
const BASE_BOWL_DEPTH = 1.25;
const BASE_SHADOW_NOISE = 0.42;

export function DitherSphere({
    className = "",
    externalMousePos,
    isHovering = false,
}: DitherSphereProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const pointsRef = useRef<Float32Array | null>(null);
    const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
    const [isLoaded, setIsLoaded] = useState(false);

    // DEBUG MODE - set to true to re-tune
    const DEBUG = false;
    const [debugRotX, setDebugRotX] = useState(BASE_ROT_X);
    const [debugRotY, setDebugRotY] = useState(BASE_ROT_Y);
    const [debugRotZ, setDebugRotZ] = useState(BASE_ROT_Z);
    const [debugSpinY, setDebugSpinY] = useState(BASE_SPIN_Y);
    const [debugScale, setDebugScale] = useState(BASE_SCALE);
    const [debugFontSize, setDebugFontSize] = useState(FONT_SIZE);
    const [autoRotate, setAutoRotate] = useState(false);
    const [debugHover, setDebugHover] = useState(false);

    // Lighting tuning params
    const [bowlDarkness, setBowlDarkness] = useState(BASE_BOWL_DARKNESS);
    const [lightBlend, setLightBlend] = useState(BASE_LIGHT_BLEND);
    const [lightDirX, setLightDirX] = useState(BASE_LIGHT_DIR_X);
    const [lightDirY, setLightDirY] = useState(BASE_LIGHT_DIR_Y);
    const [lightDirZ, setLightDirZ] = useState(BASE_LIGHT_DIR_Z);
    const [ambientLight, setAmbientLight] = useState(BASE_AMBIENT_LIGHT);
    const [bowlContrast, setBowlContrast] = useState(BASE_BOWL_CONTRAST);
    const [bowlDepth, setBowlDepth] = useState(BASE_BOWL_DEPTH);
    const [shadowNoise, setShadowNoise] = useState(BASE_SHADOW_NOISE);

    // Animated rotation state
    const spinYRef = useRef(0); // Main Y-axis spin (globe rotation)
    const spinXRef = useRef(0); // Light X wobble
    const hoverBaseRef = useRef({ x: 0, y: 0 }); // Captured when hover starts
    const wasHoveringRef = useRef(false);

    // Grid settings
    const gridCols = Math.round(300 / (DEBUG ? debugFontSize : FONT_SIZE));
    const gridRows = Math.round(300 / (DEBUG ? debugFontSize : FONT_SIZE));

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

        // Calculate total rotations (use debug values if DEBUG mode)
        const totalRotX = (DEBUG ? debugRotX : BASE_ROT_X) + spinXRef.current;
        const totalRotY = DEBUG ? debugRotY : BASE_ROT_Y;
        const totalRotZ = DEBUG ? debugRotZ : BASE_ROT_Z;
        const totalSpinY = (DEBUG ? debugSpinY : BASE_SPIN_Y) + spinYRef.current;
        const scale = DEBUG ? debugScale : BASE_SCALE;

        const cosX = Math.cos(totalRotX);
        const sinX = Math.sin(totalRotX);
        const cosY = Math.cos(totalRotY);
        const sinY = Math.sin(totalRotY);
        const cosZ = Math.cos(totalRotZ);
        const sinZ = Math.sin(totalRotZ);
        const cosSpinY = Math.cos(totalSpinY);
        const sinSpinY = Math.sin(totalSpinY);

        // Light direction (top-right, slightly toward camera) - tunable
        const lightX = DEBUG ? lightDirX : BASE_LIGHT_DIR_X;
        const lightY = DEBUG ? lightDirY : BASE_LIGHT_DIR_Y;
        const lightZ = DEBUG ? lightDirZ : BASE_LIGHT_DIR_Z;
        // Normalize
        const lightLen = Math.sqrt(lightX * lightX + lightY * lightY + lightZ * lightZ);
        const lx = lightX / lightLen;
        const ly = lightY / lightLen;
        const lz = lightZ / lightLen;

        // Grid stores: max depth, lighting, and flags
        const depthGrid = new Float32Array(gridCols * gridRows);
        const lightGrid = new Float32Array(gridCols * gridRows); // Lighting value
        const countGrid = new Uint16Array(gridCols * gridRows);
        const concaveGrid = new Uint8Array(gridCols * gridRows);

        const margin = size * 0.05;
        const drawSize = size - margin * 2;

        // Project points and track max depth per cell
        for (let i = 0; i < points.length; i += 5) {
            const nx = points[i];
            const ny = points[i + 1];
            const nz = points[i + 2];
            const isConcave = points[i + 4] === 1;

            // Rotate around Y (horizontal spin)
            const rx1 = nx * cosY - nz * sinY;
            const rz1 = nx * sinY + nz * cosY;

            // Rotate around X (vertical tilt)
            const ry1 = ny * cosX - rz1 * sinX;
            const rz = ny * sinX + rz1 * cosX;

            // Rotate around Z in screen space (roll)
            const rx2 = rx1 * cosZ - ry1 * sinZ;
            const ry2 = rx1 * sinZ + ry1 * cosZ;

            // Apply vertical spin (rotate around Y axis - like spinning a globe)
            const rx3 = rx2 * cosSpinY - rz * sinSpinY;
            const rz3 = rx2 * sinSpinY + rz * cosSpinY;

            // Final coordinates
            const rx = rx3;
            const ry = ry2;

            // Project to screen coordinates
            const screenX = (rx * scale + 1) / 2;
            const screenY = (-ry * scale + 1) / 2;

            // Map to grid cell
            const col = Math.floor(screenX * gridCols);
            const row = Math.floor(screenY * gridRows);

            if (col >= 0 && col < gridCols && row >= 0 && row < gridRows) {
                const idx = row * gridCols + col;
                const absDepth = Math.abs(rz3);

                // Calculate lighting: dot product of surface normal with light direction
                // For a sphere, the normal is the normalized position (rx, ry, rz3)
                // For concave (dish), the normal points inward, so we invert
                const normalSign = isConcave ? -1 : 1;
                const lightDot = (rx * lx + ry * ly + rz3 * lz) * normalSign;
                // Remap from [-1, 1] to [0, 1] with bias toward lit areas
                const ambient = DEBUG ? ambientLight : BASE_AMBIENT_LIGHT;
                const lighting = Math.max(0, lightDot * (1 - ambient) + ambient);

                if (rz3 > 0) {
                    // Front face - update if this point is closer or brighter
                    if (absDepth >= depthGrid[idx] || !(countGrid[idx] & 2)) {
                        depthGrid[idx] = absDepth;
                        lightGrid[idx] = lighting;
                    }
                    countGrid[idx] |= 2;
                } else if (!(countGrid[idx] & 2)) {
                    // Back face only if no front face
                    depthGrid[idx] = -absDepth;
                    lightGrid[idx] = lighting * 0.5; // Back faces dimmer
                    countGrid[idx] |= 1;
                }
                countGrid[idx] |= 1;
                if (isConcave) concaveGrid[idx] = 1;
            }
        }

        // Calculate cell dimensions
        const cellWidth = drawSize / gridCols;
        const cellHeight = drawSize / gridRows;

        ctx.font = `${DEBUG ? debugFontSize : FONT_SIZE}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Render ASCII grid
        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
                const idx = row * gridCols + col;
                const rawDepth = depthGrid[idx];
                const lighting = lightGrid[idx];
                const flags = countGrid[idx];
                const isConcaveCell = concaveGrid[idx] === 1;

                if (!(flags & 1)) continue;

                const isFrontFace = rawDepth > 0;
                const depth = Math.abs(rawDepth);

                // Combine lighting and depth for character selection
                // Depth: closer to camera = more prominent
                // Lighting: facing light = brighter
                const depthFactor = depth; // 0-1
                const lightFactor = lighting; // 0-1

                // Blend depth and lighting (lightBlend controls the ratio)
                const blend = DEBUG ? lightBlend : BASE_LIGHT_BLEND;
                let combined = depthFactor * (1 - blend) + lightFactor * blend;

                // Concave areas (dish) - front edge (facing away from light) dark, back edge bright
                if (isConcaveCell) {
                    // lightFactor already accounts for inverted normals on concave surfaces
                    // high lightFactor = back of bowl (facing light) = brighter
                    // low lightFactor = front edge (facing away) = darker
                    const bDark = DEBUG ? bowlDarkness : BASE_BOWL_DARKNESS;
                    const bDepth = DEBUG ? bowlDepth : BASE_BOWL_DEPTH;
                    const bContrast = DEBUG ? bowlContrast : BASE_BOWL_CONTRAST;
                    const bowlValue = bDark + lightFactor * bDepth;
                    combined = Math.pow(bowlValue, bContrast); // Contrast curve
                }

                // Add noise to darker areas (shadow side)
                const sNoise = DEBUG ? shadowNoise : BASE_SHADOW_NOISE;
                const darknessFactor = 1 - combined; // How dark this cell is (0-1)
                const noise = (Math.sin(col * 12.9898 + row * 78.233) * 43758.5453) % 1; // Pseudo-random per cell
                const noiseAmount = darknessFactor * sNoise * (noise * 2 - 1); // More noise in darker areas
                const finalCombined = Math.max(0, Math.min(1, combined + noiseAmount));

                const charIdx = Math.min(CHAR_COUNT - 1, Math.floor(finalCombined * CHAR_COUNT));
                const char = ASCII_CHARS[CHAR_COUNT - 1 - charIdx]; // High value → heavy char (@)

                // Position
                const x = margin + col * cellWidth + cellWidth / 2;
                const y = margin + row * cellHeight + cellHeight / 2;

                // Opacity based on both depth and lighting
                const depthOpacity = 0.25 + depth * DEPTH_OPACITY;
                const lightOpacity = 0.3 + lighting * 0.7;
                const baseAlpha = (depthOpacity + lightOpacity) / 2;
                const alpha = isFrontFace ? baseAlpha : baseAlpha * 0.4;

                // Color: lit areas get full accent, shadows get darker tint
                const shadowFactor = 0.5 + lighting * 0.5;
                const r = Math.round(ACCENT_COLOR.r * shadowFactor);
                const g = Math.round(ACCENT_COLOR.g * shadowFactor);
                const b = Math.round(ACCENT_COLOR.b * shadowFactor);

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.fillText(char, x, y);
            }
        }
    }, [gridCols, gridRows, debugRotX, debugRotY, debugRotZ, debugSpinY, debugScale, debugFontSize, lightDirX, lightDirY, lightDirZ, ambientLight, lightBlend, bowlDarkness, bowlContrast, bowlDepth, shadowNoise]);

    // Animation loop
    useEffect(() => {
        if (!isLoaded) return;

        const animate = (time: number) => {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = time;
            }

            const delta = (time - lastTimeRef.current) / 1000;
            lastTimeRef.current = time;

            const effectiveHover = isHovering && !debugHover;
            if (effectiveHover && externalMousePos) {
                // Hover: relative rotation based on mouse position
                const targetY = hoverBaseRef.current.y + (externalMousePos.x - 0.5) * Math.PI * 0.3;
                const targetX = hoverBaseRef.current.x + (externalMousePos.y - 0.5) * Math.PI * 0.15;
                spinYRef.current += (targetY - spinYRef.current) * 0.08;
                spinXRef.current += (targetX - spinXRef.current) * 0.08;
            } else if (autoRotate || !DEBUG) {
                // Auto rotate: spin Y (main) + light X wobble
                spinYRef.current += delta * 0.15; // Main rotation speed
                spinXRef.current += delta * 0.03; // Light wobble
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
    }, [isHovering, externalMousePos, isLoaded, render, autoRotate, debugHover]);

    return (
        <div className={`aspect-square w-full flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                className={`w-full h-full transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-50"}`}
            />

            {/* Debug panel */}
            {DEBUG && typeof window !== "undefined" && createPortal(
                <div
                    className="fixed top-4 right-4 bg-black/95 p-4 rounded-lg text-xs text-white font-mono space-y-2 z-[99999] shadow-xl border border-white/20 max-h-[90vh] overflow-y-auto"
                    onMouseEnter={() => setDebugHover(true)}
                    onMouseLeave={() => setDebugHover(false)}
                >
                    <div className="text-sm font-bold mb-2 text-accent">Death Star Debug</div>
                    {[
                        { label: "RotX", value: debugRotX, set: setDebugRotX },
                        { label: "RotY", value: debugRotY, set: setDebugRotY },
                        { label: "RotZ", value: debugRotZ, set: setDebugRotZ },
                        { label: "SpinY", value: debugSpinY, set: setDebugSpinY, highlight: true },
                    ].map(({ label, value, set, highlight }) => (
                        <div key={label} className={`flex items-center gap-2 ${highlight ? "bg-accent/10 -mx-2 px-2 py-1 rounded" : ""}`}>
                            <label className="w-12">{label}:</label>
                            <input type="range" min={-Math.PI * 2} max={Math.PI * 2} step={0.01} value={value} onChange={(e) => set(parseFloat(e.target.value))} className="w-24" />
                            <input type="number" step={0.1} value={value.toFixed(2)} onChange={(e) => set(parseFloat(e.target.value) || 0)} className="w-16 bg-white/10 rounded px-1 text-center" />
                            <button onClick={() => set(0)} className="text-[10px] px-1 bg-white/10 rounded">0</button>
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <label className="w-12">Scale:</label>
                        <input type="range" min={0.2} max={2} step={0.01} value={debugScale} onChange={(e) => setDebugScale(parseFloat(e.target.value))} className="w-24" />
                        <input type="number" step={0.1} value={debugScale.toFixed(2)} onChange={(e) => setDebugScale(parseFloat(e.target.value) || 1)} className="w-16 bg-white/10 rounded px-1 text-center" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="w-12">Font:</label>
                        <input type="range" min={4} max={16} step={1} value={debugFontSize} onChange={(e) => setDebugFontSize(parseFloat(e.target.value))} className="w-24" />
                        <span className="w-16">{debugFontSize}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="w-12">AutoRot:</label>
                        <input type="checkbox" checked={autoRotate} onChange={(e) => setAutoRotate(e.target.checked)} />
                    </div>

                    {/* Lighting Controls */}
                    <div className="pt-2 border-t border-gray-600 mt-2">
                        <div className="text-sm font-bold mb-2 text-accent">Lighting</div>
                        {[
                            { label: "LightX", value: lightDirX, set: setLightDirX, min: -2, max: 2, desc: "←→" },
                            { label: "LightY", value: lightDirY, set: setLightDirY, min: -2, max: 2, desc: "↑↓" },
                            { label: "LightZ", value: lightDirZ, set: setLightDirZ, min: -2, max: 2, desc: "◉⦿" },
                        ].map(({ label, value, set, min, max, desc }) => (
                            <div key={label} className="flex items-center gap-2">
                                <label className="w-12">{label}:</label>
                                <input type="range" min={min} max={max} step={0.05} value={value} onChange={(e) => set(parseFloat(e.target.value))} className="w-20" />
                                <input type="number" step={0.1} value={value.toFixed(2)} onChange={(e) => set(parseFloat(e.target.value) || 0)} className="w-14 bg-white/10 rounded px-1 text-center" />
                                <span className="text-[10px] opacity-50">{desc}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-2">
                            <label className="w-12">Ambient:</label>
                            <input type="range" min={0} max={1} step={0.05} value={ambientLight} onChange={(e) => setAmbientLight(parseFloat(e.target.value))} className="w-24" />
                            <span className="w-16 text-center">{ambientLight.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="w-12">LitBlnd:</label>
                            <input type="range" min={0} max={1} step={0.05} value={lightBlend} onChange={(e) => setLightBlend(parseFloat(e.target.value))} className="w-24" />
                            <span className="w-16 text-center">{lightBlend.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="w-12">ShdNse:</label>
                            <input type="range" min={0} max={0.5} step={0.01} value={shadowNoise} onChange={(e) => setShadowNoise(parseFloat(e.target.value))} className="w-24" />
                            <span className="w-16 text-center">{shadowNoise.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Bowl Controls */}
                    <div className="pt-2 border-t border-gray-600 mt-2">
                        <div className="text-sm font-bold mb-2 text-accent">Bowl/Dish</div>
                        <div className="flex items-center gap-2">
                            <label className="w-12">Dark:</label>
                            <input type="range" min={0} max={1} step={0.05} value={bowlDarkness} onChange={(e) => setBowlDarkness(parseFloat(e.target.value))} className="w-24" />
                            <span className="w-16 text-center">{bowlDarkness.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="w-12">Contst:</label>
                            <input type="range" min={0.1} max={3} step={0.1} value={bowlContrast} onChange={(e) => setBowlContrast(parseFloat(e.target.value))} className="w-24" />
                            <span className="w-16 text-center">{bowlContrast.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="w-12">Depth:</label>
                            <input type="range" min={0} max={2} step={0.05} value={bowlDepth} onChange={(e) => setBowlDepth(parseFloat(e.target.value))} className="w-24" />
                            <span className="w-16 text-center">{bowlDepth.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-gray-600 space-y-2">
                        <button
                            onClick={() => {
                                const config = {
                                    rotX: debugRotX.toFixed(3), rotY: debugRotY.toFixed(3), rotZ: debugRotZ.toFixed(3),
                                    spinY: debugSpinY.toFixed(3), scale: debugScale.toFixed(3), fontSize: debugFontSize,
                                    lightDirX: lightDirX.toFixed(2), lightDirY: lightDirY.toFixed(2), lightDirZ: lightDirZ.toFixed(2),
                                    ambientLight: ambientLight.toFixed(2), lightBlend: lightBlend.toFixed(2),
                                    bowlDarkness: bowlDarkness.toFixed(2), bowlContrast: bowlContrast.toFixed(1), bowlDepth: bowlDepth.toFixed(2),
                                    shadowNoise: shadowNoise.toFixed(2)
                                };
                                navigator.clipboard.writeText(JSON.stringify(config, null, 2));
                                alert("Copied!");
                            }}
                            className="w-full bg-accent/20 hover:bg-accent/30 text-accent py-1 px-2 rounded"
                        >
                            📋 Copy Config
                        </button>
                        <button onClick={() => { setDebugRotX(0); setDebugRotY(0); setDebugRotZ(0); setDebugSpinY(0); setDebugScale(1); }} className="w-full bg-white/10 hover:bg-white/20 py-1 px-2 rounded">
                            🔄 Reset
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
