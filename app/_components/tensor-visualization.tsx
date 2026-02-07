"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";

// Generate all vertex positions for a 3x3x3 tensor
function generateVertices(size: number, spacing: number) {
  const vertices: { position: THREE.Vector3; baseIndices: [number, number, number] }[] = [];
  const offset = ((size - 1) * spacing) / 2;

  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      for (let k = 1; k <= size; k++) {
        vertices.push({
          position: new THREE.Vector3(
            (i - 1) * spacing - offset,
            (j - 1) * spacing - offset,
            (k - 1) * spacing - offset
          ),
          baseIndices: [i, j, k],
        });
      }
    }
  }

  return vertices;
}

// Generate edge pairs for Line component
function generateEdgePairs(size: number, spacing: number, gap: number) {
  const edges: Array<[[number, number, number], [number, number, number]]> = [];
  const offset = ((size - 1) * spacing) / 2;

  const getPos = (i: number, j: number, k: number): THREE.Vector3 =>
    new THREE.Vector3(
      (i - 1) * spacing - offset,
      (j - 1) * spacing - offset,
      (k - 1) * spacing - offset
    );

  const shortenedEdge = (
    start: THREE.Vector3,
    end: THREE.Vector3
  ): [[number, number, number], [number, number, number]] => {
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const newStart = start.clone().add(direction.clone().multiplyScalar(gap));
    const newEnd = end.clone().sub(direction.clone().multiplyScalar(gap));
    return [
      [newStart.x, newStart.y, newStart.z],
      [newEnd.x, newEnd.y, newEnd.z],
    ];
  };

  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      for (let k = 1; k <= size; k++) {
        if (i < size)
          edges.push(shortenedEdge(getPos(i, j, k), getPos(i + 1, j, k)));
        if (j < size)
          edges.push(shortenedEdge(getPos(i, j, k), getPos(i, j + 1, k)));
        if (k < size)
          edges.push(shortenedEdge(getPos(i, j, k), getPos(i, j, k + 1)));
      }
    }
  }

  return edges;
}

// Available tensor notation letters
const TENSOR_LETTERS = ["A", "B", "C", "X", "Y", "Z", "W", "T", "M", "N"];

// Animated letter component
function AnimatedLetter({ delay = 0 }: { delay?: number }) {
  const [letter, setLetter] = useState(() =>
    TENSOR_LETTERS[Math.floor(Math.random() * TENSOR_LETTERS.length)]
  );
  const [, setIsAnimating] = useState(false);

  useEffect(() => {
    // Change letter periodically with animation
    const interval = setInterval(() => {
      setIsAnimating(true);

      const duration = 800;
      const startTime = Date.now();
      const spins = 8 + Math.floor(Math.random() * 5);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const spinPosition = Math.floor(eased * spins);
        setLetter(TENSOR_LETTERS[spinPosition % TENSOR_LETTERS.length]);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setLetter(TENSOR_LETTERS[Math.floor(Math.random() * TENSOR_LETTERS.length)]);
          setIsAnimating(false);
        }
      };

      setTimeout(() => requestAnimationFrame(animate), delay);
    }, 5000 + Math.random() * 2000); // Stagger timing per label

    return () => clearInterval(interval);
  }, [delay]);

  return <span>{letter}</span>;
}

// Slot-machine spin - cycles through many numbers
function SlotDigit({
  targetDigit,
  maxDigit,
  delay = 0,
}: {
  targetDigit: number;
  maxDigit: number;
  delay?: number;
}) {
  const [currentDigit, setCurrentDigit] = useState(targetDigit);
  const prevTargetRef = useRef(targetDigit);

  useEffect(() => {
    if (targetDigit === prevTargetRef.current) return;

    const delayTimeout = setTimeout(() => {
      const duration = 2200;
      const startTime = Date.now();
      const totalSpins = 35 + Math.floor(Math.random() * 15);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out exponential - starts fast, slows dramatically at end
        const eased = 1 - Math.pow(1 - progress, 4);

        // Current position in the spin
        const spinPosition = Math.floor(eased * totalSpins);
        const digit = (spinPosition % maxDigit) + 1;
        setCurrentDigit(digit);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrentDigit(targetDigit);
          prevTargetRef.current = targetDigit;
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [targetDigit, maxDigit, delay]);

  return (
    <span className="inline-block tabular-nums" style={{ width: "0.6em", textAlign: "center" }}>
      {currentDigit}
    </span>
  );
}

// Animated indices display with CSS-based subscript
function AnimatedIndices({
  indices,
  maxDigit,
  size,
}: {
  indices: [number, number, number];
  maxDigit: number;
  size: number;
}) {
  return (
    <span
      className="inline-flex"
      style={{
        fontSize: `${size * 0.65}px`,
        verticalAlign: "sub",
        lineHeight: 1,
      }}
    >
      <SlotDigit targetDigit={indices[0]} maxDigit={maxDigit} delay={0} />
      <SlotDigit targetDigit={indices[1]} maxDigit={maxDigit} delay={50} />
      <SlotDigit targetDigit={indices[2]} maxDigit={maxDigit} delay={100} />
    </span>
  );
}

interface TensorMeshProps {
  size?: number;
  spacing?: number;
  lineColor?: string;
  lineWidth?: number;
  lineGap?: number;
  rotationIntensity?: number;
  mousePosition: { x: number; y: number };
  onRotationUpdate: (rotation: THREE.Euler) => void;
}

function TensorMesh({
  size = 3,
  spacing = 1.5,
  lineColor = "#4BDEB7",
  lineWidth = 1.5,
  lineGap = 0.25,
  rotationIntensity = 0.08,
  mousePosition,
  onRotationUpdate,
}: TensorMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  const edges = useMemo(
    () => generateEdgePairs(size, spacing, lineGap),
    [size, spacing, lineGap]
  );

  useFrame(() => {
    if (!groupRef.current) return;

    // Use window-level mouse position for rotation
    targetRotation.current.y = mousePosition.x * Math.PI * rotationIntensity;
    targetRotation.current.x = -mousePosition.y * Math.PI * rotationIntensity * 0.6;

    // Smooth interpolation
    groupRef.current.rotation.y +=
      (targetRotation.current.y - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x +=
      (targetRotation.current.x - groupRef.current.rotation.x) * 0.03;

    // Update parent with current rotation
    onRotationUpdate(groupRef.current.rotation.clone());
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe edges with thickness */}
      {edges.map((edge, index) => (
        <Line
          key={index}
          points={edge}
          color={lineColor}
          lineWidth={lineWidth}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  );
}

// Labels component - renders outside the rotating group
function TensorLabels({
  size,
  spacing,
  labelSize,
  rotation,
  indexOffset,
}: {
  size: number;
  spacing: number;
  labelSize: number;
  rotation: THREE.Euler;
  indexOffset: number;
}) {
  const vertices = useMemo(() => generateVertices(size, spacing), [size, spacing]);

  // Calculate screen positions based on rotation
  const transformedPositions = useMemo(() => {
    const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(rotation);
    return vertices.map((v) => {
      const pos = v.position.clone().applyMatrix4(rotationMatrix);
      return pos;
    });
  }, [vertices, rotation]);

  return (
    <>
      {transformedPositions.map((pos, index) => {
        const baseIndices = vertices[index].baseIndices;
        // Cycle indices with offset
        const currentIndices: [number, number, number] = [
          ((baseIndices[0] - 1 + indexOffset) % size) + 1,
          ((baseIndices[1] - 1 + indexOffset) % size) + 1,
          ((baseIndices[2] - 1 + indexOffset) % size) + 1,
        ];

        return (
          <Html
            key={index}
            position={[pos.x, pos.y, pos.z]}
            center
            transform={false}
            distanceFactor={8}
            zIndexRange={[0, 50]}
            style={{
              pointerEvents: "none",
            }}
          >
            <div
              className="font-mono text-accent flex items-center justify-center rounded-full"// bg-background"
              style={{
                fontSize: `${labelSize}px`,
                width: `${labelSize * 2.8}px`,
                height: `${labelSize * 2.8}px`,
              }}
            >
              <AnimatedLetter delay={index * 30} />
              <AnimatedIndices
                indices={currentIndices}
                maxDigit={size}
                size={labelSize}
              />
            </div>
          </Html>
        );
      })}
    </>
  );
}

// Semantic label component (currently unused, kept for future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SemanticLabel({
  size,
  spacing,
  semanticLabel,
}: {
  size: number;
  spacing: number;
  semanticLabel: string;
}) {
  const boundingSize = (size - 1) * spacing * 0.5;

  return (
    <Html
      position={[boundingSize + 1.2, -boundingSize - 0.8, 0]}
      style={{
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      <div className="font-mono text-xs text-foreground/50 uppercase tracking-wider">
        {semanticLabel}
      </div>
    </Html>
  );
}

// Inner scene component that has access to Three.js context
function TensorScene({
  size,
  spacing,
  lineColor,
  lineWidth,
  labelSize,
  lineGap,
  rotationIntensity,
  mousePosition,
}: {
  size: number;
  spacing: number;
  lineColor: string;
  lineWidth: number;
  labelSize: number;
  lineGap: number;
  rotationIntensity: number;
  semanticLabel: string;
  mousePosition: { x: number; y: number };
}) {
  const [rotation, setRotation] = useState(new THREE.Euler(0, 0, 0));
  const [indexOffset, setIndexOffset] = useState(0);

  // Cycle indices every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexOffset((prev) => (prev + 1) % size);
    }, 3000);

    return () => clearInterval(interval);
  }, [size]);

  return (
    <>
      <TensorMesh
        size={size}
        spacing={spacing}
        lineColor={lineColor}
        lineWidth={lineWidth}
        lineGap={lineGap}
        rotationIntensity={rotationIntensity}
        mousePosition={mousePosition}
        onRotationUpdate={setRotation}
      />
      <TensorLabels
        size={size}
        spacing={spacing}
        labelSize={labelSize}
        rotation={rotation}
        indexOffset={indexOffset}
      />
    </>
  );
}

interface TensorVisualizationProps {
  className?: string;
  size?: number;
  spacing?: number;
  lineColor?: string;
  lineWidth?: number;
  labelSize?: number;
  lineGapRatio?: number;
  rotationIntensity?: number;
  cameraDistance?: number;
  semanticLabel?: string;
}

export default function TensorVisualization({
  className = "",
  size = 3,
  spacing = 1.5,
  lineColor = "#4BDEB7",
  lineWidth = 1.5,
  labelSize = 14,
  lineGapRatio = 0.08, // Small gap, background handles visual spacing
  rotationIntensity = 0.08,
  cameraDistance = 6,
  semanticLabel = "3rd-order tensor",
}: TensorVisualizationProps) {
  // Calculate line gap proportionally to spacing
  const lineGap = spacing * lineGapRatio;
  // Track mouse position at window level
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 range based on window
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, cameraDistance], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <TensorScene
          size={size}
          spacing={spacing}
          lineColor={lineColor}
          lineWidth={lineWidth}
          labelSize={labelSize}
          lineGap={lineGap}
          rotationIntensity={rotationIntensity}
          semanticLabel={semanticLabel}
          mousePosition={mousePosition}
        />
      </Canvas>
    </div>
  );
}
