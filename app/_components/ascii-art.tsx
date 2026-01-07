"use client";

import { useEffect, useMemo, useState } from "react";

// ASCII characters from dark to light for dithering effect
const ASCII_CHARS = " .:-=+*#%@";

// Generate matrix-style data stream
function generateDataStream(frame: number): string[] {
    const width = 42;
    const height = 16;
    const chars = "01";
    const lines: string[] = [];
    
    for (let y = 0; y < height; y++) {
        let line = "";
        for (let x = 0; x < width; x++) {
            // Create flowing pattern
            const flow = Math.sin((y + frame * 0.5) * 0.3 + x * 0.1) * 0.5 + 0.5;
            const charIndex = flow > 0.7 ? 1 : 0;
            
            // Add some randomness for "data stream" effect
            if (Math.random() > 0.95) {
                line += chars[Math.floor(Math.random() * chars.length)];
            } else {
                line += chars[charIndex];
            }
        }
        lines.push(line);
    }
    return lines;
}

// Generate GPU cluster visualization
function generateGPUCluster(frame: number): string[] {
    const width = 44;
    const height = 18;
    const lines: string[] = [];
    
    // Header
    lines.push("┌──────────────────────────────────────────┐");
    lines.push("│     S Y N T E Q   G P U   C L U S T E R  │");
    lines.push("├──────────────────────────────────────────┤");
    
    // GPU rows
    for (let row = 0; row < 4; row++) {
        let gpuLine = "│ ";
        for (let gpu = 0; gpu < 8; gpu++) {
            // Animate activity
            const isActive = Math.sin(frame * 0.2 + row * 0.5 + gpu * 0.3) > -0.3;
            const activity = isActive ? "█" : "░";
            gpuLine += `[${activity}${activity}] `;
        }
        gpuLine = gpuLine.padEnd(43) + "│";
        lines.push(gpuLine);
        
        // Connection line
        if (row < 3) {
            lines.push("│  │  │  │  │  │  │  │  │  │  │  │  │  │  │");
        }
    }
    
    lines.push("├──────────────────────────────────────────┤");
    
    // Stats
    const utilization = Math.floor(85 + Math.sin(frame * 0.1) * 10);
    const throughput = Math.floor(450 + Math.sin(frame * 0.15) * 50);
    lines.push(`│  UTIL: ${utilization}%  │  THROUGHPUT: ${throughput} TFLOPS     │`);
    lines.push("│  NODES: 32    │  LATENCY: <50ms           │");
    lines.push("└──────────────────────────────────────────┘");
    
    return lines;
}

// Generate server rack visualization
function generateServerRack(frame: number): string[] {
    const lines: string[] = [];
    
    lines.push("    ╔═══════════════════════════════════════╗");
    lines.push("    ║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ║");
    lines.push("    ╠═══════════════════════════════════════╣");
    
    // Server units
    for (let i = 0; i < 8; i++) {
        const pulse = Math.sin(frame * 0.3 + i * 0.5);
        const led1 = pulse > 0 ? "●" : "○";
        const led2 = pulse > 0.3 ? "●" : "○";
        const led3 = pulse > -0.3 ? "●" : "○";
        
        // Activity bars
        const activity = Math.floor((Math.sin(frame * 0.2 + i * 0.7) + 1) * 10);
        const activityBar = "█".repeat(activity) + "░".repeat(20 - activity);
        
        lines.push(`    ║ ${led1} ${led2} ${led3} │${activityBar}│ ║`);
        
        if (i < 7) {
            lines.push("    ╟───────────────────────────────────────╢");
        }
    }
    
    lines.push("    ╠═══════════════════════════════════════╣");
    lines.push("    ║            H100 × 8 │ NVLINK          ║");
    lines.push("    ╚═══════════════════════════════════════╝");
    
    return lines;
}

// Generate neural flow visualization
function generateNeuralFlow(frame: number): string[] {
    const lines: string[] = [];
    const width = 42;
    const height = 16;
    
    // Create flowing neural pattern
    for (let y = 0; y < height; y++) {
        let line = "";
        for (let x = 0; x < width; x++) {
            // Create wave patterns
            const wave1 = Math.sin((x + frame * 0.8) * 0.2 + y * 0.3);
            const wave2 = Math.cos((x - frame * 0.5) * 0.15 + y * 0.25);
            const combined = (wave1 + wave2) / 2;
            
            // Map to ASCII
            const charIndex = Math.floor((combined + 1) * (ASCII_CHARS.length - 1) / 2);
            line += ASCII_CHARS[Math.max(0, Math.min(charIndex, ASCII_CHARS.length - 1))];
        }
        lines.push(line);
    }
    
    return lines;
}

type VisualizationType = "gpu" | "rack" | "neural" | "data";

interface AsciiArtProps {
    type?: VisualizationType;
    className?: string;
}

export default function AsciiArt({ type = "gpu", className = "" }: AsciiArtProps) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(f => f + 1);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const lines = useMemo(() => {
        switch (type) {
            case "gpu":
                return generateGPUCluster(frame);
            case "rack":
                return generateServerRack(frame);
            case "neural":
                return generateNeuralFlow(frame);
            case "data":
                return generateDataStream(frame);
            default:
                return generateGPUCluster(frame);
        }
    }, [frame, type]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <pre 
                className="font-mono text-[10px] sm:text-xs md:text-sm leading-tight text-accent whitespace-pre select-none"
                style={{ 
                    textShadow: "0 0 10px rgba(75, 222, 183, 0.3)",
                }}
            >
                {lines.join("\n")}
            </pre>
            {/* Scan line effect */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(75, 222, 183, 0.03) 2px,
                        rgba(75, 222, 183, 0.03) 4px
                    )`,
                }}
            />
            {/* Glow effect */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(75, 222, 183, 0.2) 0%, transparent 70%)",
                }}
            />
        </div>
    );
}

