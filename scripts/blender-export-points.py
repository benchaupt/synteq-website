"""
Blender Point Cloud Exporter for Dither Effect

Instructions:
1. Open your statue model in Blender
2. Select the mesh object
3. Go to Scripting tab
4. Open this file or paste contents
5. Click "Run Script" (or Alt+P)
6. Check the console for output path
"""

import bpy
import bmesh
import json
import random
from mathutils import Vector

obj = bpy.context.active_object

if obj is None or obj.type != 'MESH':
    print("ERROR: Select a mesh object first")
else:
    # Create bmesh from object
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bmesh.ops.triangulate(bm, faces=bm.faces)

    # Calculate bounds for normalization
    verts = [v.co for v in bm.verts]
    min_bound = Vector((
        min(v.x for v in verts),
        min(v.y for v in verts),
        min(v.z for v in verts)
    ))
    max_bound = Vector((
        max(v.x for v in verts),
        max(v.y for v in verts),
        max(v.z for v in verts)
    ))
    center = (min_bound + max_bound) / 2
    scale = max(
        max_bound.x - min_bound.x,
        max_bound.y - min_bound.y,
        max_bound.z - min_bound.z
    ) / 2

    points = []

    # TARGET POINT COUNT - adjust this directly
    # For dense ASCII like reference, need LOTS of points
    TARGET_POINTS = 50000

    # Calculate total surface area first
    total_area = sum(face.calc_area() for face in bm.faces)
    points_per_unit_area = TARGET_POINTS / total_area if total_area > 0 else 1

    for face in bm.faces:
        # Get triangle vertices
        v0, v1, v2 = [v.co for v in face.verts]

        # Number of samples proportional to face area
        num_samples = max(1, int(face.calc_area() * points_per_unit_area))

        for _ in range(num_samples):
            # Random point on triangle using barycentric coordinates
            r1, r2 = random.random(), random.random()
            if r1 + r2 > 1:
                r1, r2 = 1 - r1, 1 - r2
            r3 = 1 - r1 - r2

            p = v0 * r1 + v1 * r2 + v2 * r3

            # Normalize to -1 to 1 range
            normalized = (p - center) / scale

            # Random threshold for dithering
            threshold = random.random()

            # Check if point is concave (dish) by comparing:
            # - distance from center vs expected sphere radius
            # - face normal direction vs outward direction
            dist_from_center = normalized.length
            outward_dir = normalized.normalized() if dist_from_center > 0.001 else Vector((0, 0, 1))
            normal_dot = face.normal.dot(outward_dir)

            # Concave if: normal points inward (dot < 0) OR point is significantly inside sphere
            is_concave = normal_dot < 0.3 or dist_from_center < 0.85

            points.append({
                "x": round(normalized.x, 4),
                "y": round(normalized.y, 4),
                "z": round(normalized.z, 4),
                "t": round(threshold, 4),
                "c": 1 if is_concave else 0  # c = concave flag
            })

    bm.free()

    # Save to file
    output_path = "/Users/ben/Desktop/STQ AI/018-synteq.ai/public/assets/cards/death-star.json"
    with open(output_path, "w") as f:
        json.dump(points, f, separators=(',', ':'))

    print(f"SUCCESS: Exported {len(points)} points to {output_path}")
    print(f"Target was: {TARGET_POINTS} | Actual: {len(points)}")
    print(f"File size: {len(json.dumps(points, separators=(',', ':'))) / 1024:.1f} KB")
