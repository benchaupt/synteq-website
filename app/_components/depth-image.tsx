"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Custom Shader Material for depth-based grid effect
// Creates elegant monochrome vertical bars that vary in HEIGHT based on depth
const DepthMaterial = shaderMaterial(
  {
    uDepthMap: null,
    uMouse: new THREE.Vector2(0, 0),
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uGridScale: new THREE.Vector2(80.0, 60.0),
    uScanSpeed: 0.15,
    uBarWidth: 0.3,
    uMinHeight: 0.05,
    uMaxHeight: 0.9,
    uBaseAlpha: 0.4,
    uHover: 0.0,
    uDepthThreshold: 0.15,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader - Monochrome depth visualization with variable height bars
  `
    uniform sampler2D uDepthMap;
    uniform vec2 uMouse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uGridScale;
    uniform float uScanSpeed;
    uniform float uBarWidth;
    uniform float uMinHeight;
    uniform float uMaxHeight;
    uniform float uBaseAlpha;
    uniform float uHover;
    uniform float uDepthThreshold;

    varying vec2 vUv;

    void main() {
      // Grid setup
      vec2 gridUV = vUv * uGridScale;
      vec2 cellID = floor(gridUV);
      vec2 cellUV = fract(gridUV);

      // Sample depth at cell center for stability
      vec2 cellCenterUV = (cellID + 0.5) / uGridScale;
      float cellDepth = texture2D(uDepthMap, cellCenterUV).r;

      // Filter out background - only show cells above depth threshold
      float isObject = smoothstep(uDepthThreshold, uDepthThreshold + 0.1, cellDepth);
      if (isObject < 0.01) {
        gl_FragColor = vec4(0.0);
        return;
      }

      // Scan animation - sweeps from far to near
      float scanPhase = fract(uTime * uScanSpeed);
      float scanWidth = 0.25;
      float scanDist = abs(cellDepth - scanPhase);
      float scanIntensity = smoothstep(scanWidth, 0.0, scanDist);

      // Mouse interaction
      vec2 mouseUV = uMouse * 0.5 + 0.5;
      float mouseDist = distance(cellCenterUV, mouseUV);
      float mouseIntensity = smoothstep(0.35, 0.0, mouseDist);

      // Hover reveals the whole shape with base visibility
      float hoverBoost = uHover * 0.5;

      // Combined intensity drives the reveal
      float intensity = max(scanIntensity, max(mouseIntensity * 0.8, hoverBoost));

      // Bar dimensions - HEIGHT varies with depth, width is constant
      float barHeight = mix(uMinHeight, uMaxHeight, cellDepth * max(intensity, hoverBoost * 0.6));
      float barWidth = uBarWidth;

      // Draw vertical bar centered in cell
      float inBarX = step(abs(cellUV.x - 0.5), barWidth * 0.5);
      float inBarY = step(abs(cellUV.y - 0.5), barHeight * 0.5);
      float barMask = inBarX * inBarY * isObject;

      // Accent color output - teal (#4BDEB7) with depth-based brightness
      vec3 accentColor = vec3(0.294, 0.871, 0.718); // #4BDEB7
      float brightness = mix(0.3, 1.0, intensity) * mix(0.5, 1.0, cellDepth);
      // Boost brightness on hover but keep scan effect visible
      brightness = mix(brightness, mix(0.6, 1.0, cellDepth), uHover * 0.4);
      vec3 barColor = accentColor * brightness;

      // Alpha based on intensity and depth
      float alpha = mix(uBaseAlpha, 1.0, intensity * cellDepth);
      // Hover boosts minimum alpha to show whole shape
      alpha = mix(alpha, max(alpha, 0.5 + cellDepth * 0.3), uHover);

      gl_FragColor = vec4(barColor, alpha * barMask);
    }
  `
);

extend({ DepthMaterial });

// Extend @react-three/fiber's JSX types for the custom material
declare module "@react-three/fiber" {
  interface ThreeElements {
    depthMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial>;
      uDepthMap?: THREE.Texture;
      uResolution?: THREE.Vector2;
      uMouse?: THREE.Vector2;
      uTime?: number;
      uGridScaleX?: number;
      uGridScaleY?: number;
      uScanSpeed?: number;
      uBarWidth?: number;
      uMinHeight?: number;
      uMaxHeight?: number;
      uBaseAlpha?: number;
      uHover?: number;
      uDepthThreshold?: number;
      transparent?: boolean;
      depthTest?: boolean;
      depthWrite?: boolean;
    };
  }
}

interface DepthImageMeshProps {
  depth: string;
  gridScaleX?: number;
  gridScaleY?: number;
  scanSpeed?: number;
  barWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  baseAlpha?: number;
  hover?: boolean;
  depthThreshold?: number;
}

function DepthImageMesh({
  depth,
  gridScaleX = 80,
  gridScaleY = 60,
  scanSpeed = 0.15,
  barWidth = 0.3,
  minHeight = 0.05,
  maxHeight = 0.9,
  baseAlpha = 0.4,
  hover = false,
  depthThreshold = 0.15,
}: DepthImageMeshProps) {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const depthMap = useTexture(depth);
  const hoverRef = useRef(0);

  // Aspect ratio adjustment
  const image = depthMap.image as { width: number; height: number };
  const ratio = image.width / image.height;
  let width = viewport.width;
  let height = viewport.width / ratio;

  if (height < viewport.height) {
    height = viewport.height;
    width = viewport.height * ratio;
  }

  useFrame((state, delta) => {
    // Smooth hover transition
    const targetHover = hover ? 1 : 0;
    hoverRef.current += (targetHover - hoverRef.current) * Math.min(delta * 5, 1);

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value = state.pointer;
      materialRef.current.uniforms.uGridScale.value = new THREE.Vector2(
        gridScaleX,
        gridScaleY
      );
      materialRef.current.uniforms.uScanSpeed.value = scanSpeed;
      materialRef.current.uniforms.uBarWidth.value = barWidth;
      materialRef.current.uniforms.uMinHeight.value = minHeight;
      materialRef.current.uniforms.uMaxHeight.value = maxHeight;
      materialRef.current.uniforms.uBaseAlpha.value = baseAlpha;
      materialRef.current.uniforms.uHover.value = hoverRef.current;
      materialRef.current.uniforms.uDepthThreshold.value = depthThreshold;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <depthMaterial
        ref={materialRef}
        uDepthMap={depthMap}
        uResolution={new THREE.Vector2(image.width, image.height)}
        transparent
      />
    </mesh>
  );
}

interface DepthImageProps {
  depth: string;
  className?: string;
  gridScaleX?: number;
  gridScaleY?: number;
  scanSpeed?: number;
  barWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  baseAlpha?: number;
  hover?: boolean;
  depthThreshold?: number;
}

export default function DepthImage({
  depth,
  className,
  gridScaleX = 80,
  gridScaleY = 60,
  scanSpeed = 0.15,
  barWidth = 0.3,
  minHeight = 0.05,
  maxHeight = 0.9,
  baseAlpha = 0.4,
  hover = false,
  depthThreshold = 0.15,
}: DepthImageProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <DepthImageMesh
            depth={depth}
            gridScaleX={gridScaleX}
            gridScaleY={gridScaleY}
            scanSpeed={scanSpeed}
            barWidth={barWidth}
            minHeight={minHeight}
            maxHeight={maxHeight}
            baseAlpha={baseAlpha}
            hover={hover}
            depthThreshold={depthThreshold}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
