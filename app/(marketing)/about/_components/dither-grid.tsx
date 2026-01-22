"use client";

import { useMemo, useState, useEffect, useRef, useCallback, memo } from "react";

interface DitherGridProps {
    className?: string;
    gridSize?: number;
    cellDotGrid?: number;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
}

interface CellState {
    density: number;
    transitionDelay: number;
}

interface CellProps {
    cellRow: number;
    cellCol: number;
    cellDotGrid: number;
    dots: { threshold: number }[];
    density: number;
    opacity: number;
    transitionDelay: number;
}

// Memoized cell component to prevent unnecessary re-renders
const DitherCell = memo(function DitherCell({
    cellDotGrid,
    dots,
    density,
    opacity,
    transitionDelay,
    animateTransition,
}: CellProps & { animateTransition: boolean }) {
    return (
        <div
            className="aspect-square w-full"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cellDotGrid}, 1fr)`,
                gridTemplateRows: `repeat(${cellDotGrid}, 1fr)`,
            }}
        >
            {dots.map(({ threshold }, idx) => {
                const isVisible = threshold < density;
                return (
                    <div key={idx} className="flex items-center justify-center">
                        <div
                            className="size-1/2 rounded-full bg-accent"
                            style={{
                                opacity: isVisible ? opacity : 0,
                                transition: animateTransition
                                    ? `opacity 0.8s ease-in-out ${transitionDelay}ms`
                                    : undefined,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
});

export function DitherGrid({
    className = "",
    gridSize = 9,
    cellDotGrid = 8,
    externalMousePos,
    isHovering = false,
}: DitherGridProps) {
    const [cellStates, setCellStates] = useState<Map<string, CellState>>(new Map());
    const [throttledMousePos, setThrottledMousePos] = useState<{ x: number; y: number } | null>(null);
    const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
    const animationKeyRef = useRef(0);
    const lastUpdateRef = useRef(0);

    // Throttle mouse position updates
    useEffect(() => {
        if (!externalMousePos) {
            queueMicrotask(() => setThrottledMousePos(null));
            return;
        }

        const now = Date.now();
        if (now - lastUpdateRef.current > 50) { // 50ms throttle (~20fps)
            lastUpdateRef.current = now;
            queueMicrotask(() => setThrottledMousePos(externalMousePos));
        }
    }, [externalMousePos]);

    // Clear all timeouts helper
    const clearAllTimeouts = useCallback(() => {
        timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
        timeoutRefs.current.clear();
    }, []);

    // Reset animation state when hovering changes
    useEffect(() => {
        if (isHovering) {
            animationKeyRef.current += 1;
            clearAllTimeouts();
            queueMicrotask(() => setCellStates(new Map()));
        }
    }, [isHovering, clearAllTimeouts]);

    // Animate random cells when not hovering
    useEffect(() => {
        if (isHovering) return;

        const currentKey = animationKeyRef.current;

        const animateRandomCell = () => {
            if (animationKeyRef.current !== currentKey) return;

            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            const key = `${row}-${col}`;
            const delay = Math.random() * 300;

            setCellStates(prev => {
                const next = new Map(prev);
                next.set(key, { density: 0.85, transitionDelay: delay });
                return next;
            });

            const fadeOutTimeout = setTimeout(() => {
                if (animationKeyRef.current !== currentKey) return;

                setCellStates(prev => {
                    const next = new Map(prev);
                    next.set(key, { density: 0.38, transitionDelay: 0 });
                    return next;
                });

                const removeTimeout = setTimeout(() => {
                    if (animationKeyRef.current !== currentKey) return;
                    setCellStates(prev => {
                        const next = new Map(prev);
                        next.delete(key);
                        return next;
                    });
                    timeoutRefs.current.delete(`${key}-remove`);
                }, 1200);

                timeoutRefs.current.set(`${key}-remove`, removeTimeout);
                timeoutRefs.current.delete(`${key}-fadeout`);
            }, 1800 + delay);

            timeoutRefs.current.set(`${key}-fadeout`, fadeOutTimeout);
        };

        const startAnimations = () => {
            if (animationKeyRef.current !== currentKey) return;

            const numCells = 3 + Math.floor(Math.random() * 3);
            for (let i = 0; i < numCells; i++) {
                const staggerTimeout = setTimeout(() => {
                    if (animationKeyRef.current !== currentKey) return;
                    animateRandomCell();
                }, i * 400);
                timeoutRefs.current.set(`stagger-${i}-${Date.now()}`, staggerTimeout);
            }
        };

        const initialTimeout = setTimeout(startAnimations, 100);
        timeoutRefs.current.set("initial", initialTimeout);

        const interval = setInterval(startAnimations, 2500);

        return () => {
            clearInterval(interval);
            clearAllTimeouts();
        };
    }, [isHovering, gridSize, clearAllTimeouts]);

    // Pre-generate dot positions
    const cellDotPositions = useMemo(() => {
        const positions = new Map<string, { threshold: number }[]>();

        for (let cellRow = 0; cellRow < gridSize; cellRow++) {
            for (let cellCol = 0; cellCol < gridSize; cellCol++) {
                const key = `${cellRow}-${cellCol}`;
                const dots: { threshold: number }[] = [];
                const seed = cellRow * gridSize + cellCol;

                for (let row = 0; row < cellDotGrid; row++) {
                    for (let col = 0; col < cellDotGrid; col++) {
                        const hash = Math.sin(seed * 9999 + row * 127 + col * 311) * 10000;
                        const threshold = hash - Math.floor(hash);
                        dots.push({ threshold });
                    }
                }

                positions.set(key, dots);
            }
        }

        return positions;
    }, [gridSize, cellDotGrid]);

    // Pre-compute cell visuals
    const cellVisuals = useMemo(() => {
        const visuals = new Map<string, { density: number; opacity: number; transitionDelay: number }>();
        const baseDensity = 0.38;
        const baseOpacity = 0.5;

        for (let cellRow = 0; cellRow < gridSize; cellRow++) {
            for (let cellCol = 0; cellCol < gridSize; cellCol++) {
                const key = `${cellRow}-${cellCol}`;
                const idleState = cellStates.get(key);

                if (!isHovering && idleState) {
                    visuals.set(key, {
                        density: idleState.density,
                        opacity: idleState.density > 0.5 ? 1 : baseOpacity,
                        transitionDelay: idleState.transitionDelay,
                    });
                    continue;
                }

                if (!isHovering || !throttledMousePos) {
                    visuals.set(key, { density: baseDensity, opacity: baseOpacity, transitionDelay: 0 });
                    continue;
                }

                const cellX = cellCol / (gridSize - 1);
                const cellY = cellRow / (gridSize - 1);

                const distance = Math.sqrt(
                    Math.pow(cellX - throttledMousePos.x, 2) + Math.pow(cellY - throttledMousePos.y, 2)
                );

                const normalizedDistance = Math.min(distance / 0.6, 1);
                const density = 0.95 - normalizedDistance * (0.95 - baseDensity);
                const opacity = 1 - normalizedDistance * 0.5;

                visuals.set(key, { density, opacity, transitionDelay: 0 });
            }
        }

        return visuals;
    }, [gridSize, isHovering, throttledMousePos, cellStates]);

    return (
        <div className={`aspect-square w-full flex items-center justify-center ${className}`}>
            <div
                className="aspect-square"
                style={{
                    width: "75%",
                    display: "grid",
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                    gap: "3%",
                }}
            >
                {Array.from({ length: gridSize }).map((_, cellRow) =>
                    Array.from({ length: gridSize }).map((_, cellCol) => {
                        const key = `${cellRow}-${cellCol}`;
                        const dots = cellDotPositions.get(key) || [];
                        const visual = cellVisuals.get(key) || { density: 0.38, opacity: 0.5, transitionDelay: 0 };

                        return (
                            <DitherCell
                                key={key}
                                cellRow={cellRow}
                                cellCol={cellCol}
                                cellDotGrid={cellDotGrid}
                                dots={dots}
                                density={visual.density}
                                opacity={visual.opacity}
                                transitionDelay={visual.transitionDelay}
                                animateTransition={!isHovering}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
