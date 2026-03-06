"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useField } from "@payloadcms/ui";
import type { GroupFieldClientProps } from "payload";

const SVG_WIDTH = 5795;
const SVG_HEIGHT = 3821;
const MIN_ZOOM = 1;
const MAX_ZOOM = 10;
const ZOOM_FACTOR = 1.3;

export const MapPickerComponent: React.FC<GroupFieldClientProps> = ({
  path,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const xField = useField<number>({ path: `${path}.x` });
  const yField = useField<number>({ path: `${path}.y` });

  const x = xField.value ?? 0;
  const y = yField.value ?? 0;
  const hasCoordinates = xField.value != null && yField.value != null;

  const [zoom, setZoom] = useState(MIN_ZOOM);
  // pan = top-left of viewport in SVG-coordinate space
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const didDrag = useRef(false);

  const clamp = useCallback((px: number, py: number, z: number) => {
    const vw = SVG_WIDTH / z;
    const vh = SVG_HEIGHT / z;
    return {
      x: Math.max(0, Math.min(px, SVG_WIDTH - vw)),
      y: Math.max(0, Math.min(py, SVG_HEIGHT - vh)),
    };
  }, []);

  // Convert client coords to SVG coords
  const toSvg = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return { sx: 0, sy: 0 };
      const r = el.getBoundingClientRect();
      const fx = (clientX - r.left) / r.width;
      const fy = (clientY - r.top) / r.height;
      return {
        sx: pan.x + fx * (SVG_WIDTH / zoom),
        sy: pan.y + fy * (SVG_HEIGHT / zoom),
      };
    },
    [zoom, pan],
  );

  // Zoom towards a point in SVG space
  const zoomTo = useCallback(
    (newZoom: number, focusSx: number, focusSy: number, focusFx: number, focusFy: number) => {
      const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
      const vw = SVG_WIDTH / z;
      const vh = SVG_HEIGHT / z;
      const c = clamp(focusSx - focusFx * vw, focusSy - focusFy * vh, z);
      setZoom(z);
      setPan(c);
    },
    [clamp],
  );

  // Zoom centered on viewport middle
  const zoomCenter = useCallback(
    (direction: 1 | -1) => {
      const vw = SVG_WIDTH / zoom;
      const vh = SVG_HEIGHT / zoom;
      const cx = pan.x + vw / 2;
      const cy = pan.y + vh / 2;
      const nz = direction === 1 ? zoom * ZOOM_FACTOR : zoom / ZOOM_FACTOR;
      zoomTo(nz, cx, cy, 0.5, 0.5);
    },
    [zoom, pan, zoomTo],
  );

  // Native wheel listener (non-passive so we can preventDefault)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const fx = (e.clientX - r.left) / r.width;
      const fy = (e.clientY - r.top) / r.height;
      const vw = SVG_WIDTH / zoom;
      const vh = SVG_HEIGHT / zoom;
      const sx = pan.x + fx * vw;
      const sy = pan.y + fy * vh;
      const dir = e.deltaY < 0 ? 1 : -1;
      const nz = dir === 1 ? zoom * ZOOM_FACTOR : zoom / ZOOM_FACTOR;
      zoomTo(nz, sx, sy, fx, fy);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoom, pan, zoomTo]);

  // Click to place dot
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (didDrag.current) return;
      const { sx, sy } = toSvg(e.clientX, e.clientY);
      xField.setValue(Math.round(sx));
      yField.setValue(Math.round(sy));
    },
    [toSvg, xField, yField],
  );

  // Drag to pan
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      dragging.current = true;
      didDrag.current = false;
      dragStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
    },
    [pan],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging.current) return;
      const el = containerRef.current;
      if (!el) return;
      const dx = e.clientX - dragStart.current.mx;
      const dy = e.clientY - dragStart.current.my;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDrag.current = true;
      const r = el.getBoundingClientRect();
      const vw = SVG_WIDTH / zoom;
      const vh = SVG_HEIGHT / zoom;
      setPan(
        clamp(
          dragStart.current.px - (dx / r.width) * vw,
          dragStart.current.py - (dy / r.height) * vh,
          zoom,
        ),
      );
    },
    [zoom, clamp],
  );

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // Image transform: scale from origin then translate to show the right region
  const vw = SVG_WIDTH / zoom;
  const vh = SVG_HEIGHT / zoom;
  const tx = -(pan.x / SVG_WIDTH) * zoom * 100;
  const ty = -(pan.y / SVG_HEIGHT) * zoom * 100;

  // Dot position as % within visible viewport
  const dotPct = hasCoordinates
    ? { left: ((x - pan.x) / vw) * 100, top: ((y - pan.y) / vh) * 100 }
    : null;
  const dotVisible =
    dotPct &&
    dotPct.left >= -3 &&
    dotPct.left <= 103 &&
    dotPct.top >= -3 &&
    dotPct.top <= 103;

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 13 }}>
          Coordinates — scroll to zoom, drag to pan, click to place
        </span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#888", marginRight: 6 }}>
            {Math.round(zoom * 100)}%
          </span>
          <ZoomBtn label="−" title="Zoom out" onClick={() => zoomCenter(-1)} />
          <ZoomBtn label="+" title="Zoom in" onClick={() => zoomCenter(1)} />
          <ZoomBtn
            label="Reset"
            title="Reset zoom"
            wide
            onClick={() => {
              setZoom(MIN_ZOOM);
              setPan({ x: 0, y: 0 });
            }}
          />
        </div>
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
          border: "1px solid #ccc",
          borderRadius: 6,
          overflow: "hidden",
          cursor: zoom > 1 ? "grab" : "crosshair",
          background: "#f5f5f5",
          userSelect: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/global_map.svg"
          alt="World map"
          draggable={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transformOrigin: "0 0",
            transform: `scale(${zoom}) translate(${tx / zoom}%, ${ty / zoom}%)`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Red dot */}
        {hasCoordinates && dotVisible && dotPct && (
          <div
            style={{
              position: "absolute",
              left: `${dotPct.left}%`,
              top: `${dotPct.top}%`,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}
      </div>

      {/* Coordinate readout */}
      <div
        style={{
          marginTop: 8,
          fontSize: 12,
          color: "#888",
          display: "flex",
          gap: 16,
        }}
      >
        <span>
          X: <strong style={{ color: "#333" }}>{hasCoordinates ? x : "—"}</strong>
        </span>
        <span>
          Y: <strong style={{ color: "#333" }}>{hasCoordinates ? y : "—"}</strong>
        </span>
        <span style={{ opacity: 0.6 }}>
          viewBox {SVG_WIDTH} × {SVG_HEIGHT}
        </span>
      </div>

      {/* Hidden inputs for Payload form state */}
      <div style={{ display: "none" }}>
        <input type="number" name={`${path}.x`} value={x} readOnly />
        <input type="number" name={`${path}.y`} value={y} readOnly />
      </div>
    </div>
  );
};

/** Plain div "button" to avoid Payload's form/button CSS interference */
function ZoomBtn({
  label,
  title,
  wide,
  onClick,
}: {
  label: string;
  title: string;
  wide?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: wide ? "auto" : 28,
        height: 28,
        padding: wide ? "0 10px" : 0,
        border: "1px solid #ccc",
        borderRadius: 4,
        background: "#fff",
        cursor: "pointer",
        fontSize: wide ? 11 : 16,
        fontWeight: wide ? 500 : 400,
        lineHeight: 1,
        color: "#333",
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
}
