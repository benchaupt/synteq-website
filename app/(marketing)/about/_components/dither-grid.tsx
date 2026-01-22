"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";

interface DitherGridProps {
    className?: string;
    gridSize?: number;
    cellDotGrid?: number;
    externalMousePos?: { x: number; y: number } | null;
    isHovering?: boolean;
}

interface CellState {
    opacity: number;
    density: number;
    transitionDelay: number;
}

export function DitherGrid({
    className = "",
    gridSize = 9,
    cellDotGrid = 8,
    externalMousePos,
    isHovering = false,
}: DitherGridProps) {
    const [cellStates, setCellStates] = useState<Map<string, CellState>>(new Map());
    const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
    const animationKeyRef = useRef(0);

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
            setCellStates(new Map());
        }
    }, [isHovering, clearAllTimeouts]);

    // Animate random cells when not hovering
    useEffect(() => {
        if (isHovering) return;

        const currentKey = animationKeyRef.current;

        const animateRandomCell = () => {
            // Check if animation key changed (hovering started)
            if (animationKeyRef.current !== currentKey) return;

            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            const key = `${row}-${col}`;
            const delay = Math.random() * 300; // Staggered start

            // Fade in with thicker density
            setCellStates(prev => {
                const next = new Map(prev);
                next.set(key, { opacity: 1, density: 0.8, transitionDelay: delay });
                return next;
            });

            // Schedule fade out
            const fadeOutTimeout = setTimeout(() => {
                if (animationKeyRef.current !== currentKey) return;

                setCellStates(prev => {
                    const next = new Map(prev);
                    next.set(key, { opacity: 0.5, density: 0.38, transitionDelay: 0 });
                    return next;
                });

                // Remove from state after fade out completes
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

        // Start multiple cells with staggered timing
        const startAnimations = () => {
            if (animationKeyRef.current !== currentKey) return;

            const numCells = 3 + Math.floor(Math.random() * 3); // 3-5 cells
            for (let i = 0; i < numCells; i++) {
                const staggerTimeout = setTimeout(() => {
                    if (animationKeyRef.current !== currentKey) return;
                    animateRandomCell();
                }, i * 400);
                timeoutRefs.current.set(`stagger-${i}-${Date.now()}`, staggerTimeout);
            }
        };

        // Initial animations after a small delay
        const initialTimeout = setTimeout(startAnimations, 100);
        timeoutRefs.current.set("initial", initialTimeout);

        // Continue animating
        const interval = setInterval(startAnimations, 2500);

        return () => {
            clearInterval(interval);
            clearAllTimeouts();
        };
    }, [isHovering, gridSize, clearAllTimeouts]);

    // Generate 6 anchor cells that light up on hover
    const anchorCells = useMemo(() => {
        const positions = [
            { row: 1, col: 2 },
            { row: 2, col: 6 },
            { row: 4, col: 1 },
            { row: 5, col: 7 },
            { row: 7, col: 3 },
            { row: 6, col: 5 },
        ];
        return positions.filter(pos => pos.row < gridSize && pos.col < gridSize);
    }, [gridSize]);

    // Get cell state for idle animation
    const getCellState = (cellRow: number, cellCol: number): CellState | null => {
        return cellStates.get(`${cellRow}-${cellCol}`) || null;
    };

    // Calculate density based on distance from mouse
    const getDensity = (cellRow: number, cellCol: number): number => {
        const baseDensity = 0.38;

        // Check for idle animation state first
        const idleState = getCellState(cellRow, cellCol);
        if (!isHovering && idleState) {
            return idleState.density;
        }

        if (!isHovering) {
            return baseDensity;
        }

        if (!externalMousePos) {
            const isAnchor = anchorCells.some(a => a.row === cellRow && a.col === cellCol);
            return isAnchor ? 0.75 : baseDensity;
        }

        const cellX = cellCol / (gridSize - 1);
        const cellY = cellRow / (gridSize - 1);

        const distance = Math.sqrt(
            Math.pow(cellX - externalMousePos.x, 2) + Math.pow(cellY - externalMousePos.y, 2)
        );

        const normalizedDistance = Math.min(distance / 0.6, 1);
        return 0.9 - normalizedDistance * (0.9 - baseDensity);
    };

    // Generate deterministic dot pattern for each cell
    const generateCellDots = (cellRow: number, cellCol: number, density: number) => {
        const dots: boolean[][] = Array(cellDotGrid).fill(null).map(() => Array(cellDotGrid).fill(false));
        const seed = cellRow * gridSize + cellCol;

        for (let row = 0; row < cellDotGrid; row++) {
            for (let col = 0; col < cellDotGrid; col++) {
                const hash = Math.sin(seed * 9999 + row * 127 + col * 311) * 10000;
                const random = hash - Math.floor(hash);
                dots[row][col] = random < density;
            }
        }

        return dots;
    };

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
                        const idleState = getCellState(cellRow, cellCol);
                        const density = getDensity(cellRow, cellCol);
                        const dots = generateCellDots(cellRow, cellCol, density);
                        const isHighlighted = !isHovering && idleState && idleState.opacity === 1;

                        return (
                            <div
                                key={`cell-${cellRow}-${cellCol}`}
                                className="aspect-square w-full"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${cellDotGrid}, 1fr)`,
                                    gridTemplateRows: `repeat(${cellDotGrid}, 1fr)`,
                                }}
                            >
                                {dots.flat().map((visible, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {visible && (
                                            <div
                                                className="size-1/2 rounded-full"
                                                style={{
                                                    backgroundColor: isHighlighted
                                                        ? "var(--color-accent)"
                                                        : "rgba(75, 222, 183, 0.5)",
                                                    transition: `background-color 1s ease-in-out ${idleState?.transitionDelay || 0}ms`,
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
