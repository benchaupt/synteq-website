"use client";

import React, { useCallback, useState } from "react";
import { FieldLabel, useField, useForm } from "@payloadcms/ui";
import type { TextFieldClientProps } from "payload";

export const ZipLookupComponent: React.FC<TextFieldClientProps> = ({
  field,
  path,
}) => {
  const { value, setValue } = useField<string>({ path: path || field.name });
  const { dispatchFields } = useForm();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const lookup = useCallback(
    async (zip: string) => {
      const trimmed = zip.trim();
      if (!/^\d{5}$/.test(trimmed)) return;

      setStatus("loading");
      try {
        const res = await fetch(`https://api.zippopotam.us/us/${trimmed}`);
        if (!res.ok) {
          setStatus("error");
          return;
        }
        const data: { places?: Array<Record<string, string>> } =
          await res.json();
        const place = data.places?.[0];
        if (!place) {
          setStatus("error");
          return;
        }

        dispatchFields({
          type: "UPDATE",
          path: "city",
          value: place["place name"],
        });
        dispatchFields({
          type: "UPDATE",
          path: "state",
          value: place["state abbreviation"],
        });
        dispatchFields({
          type: "UPDATE",
          path: "country",
          value: "US",
        });

        setStatus("success");
      } catch {
        setStatus("error");
      }
    },
    [dispatchFields],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      if (/^\d{5}$/.test(val.trim())) {
        lookup(val);
      } else {
        setStatus("idle");
      }
    },
    [setValue, lookup],
  );

  return (
    <div style={{ marginBottom: 16 }}>
      <FieldLabel
        htmlFor={`field-${path}`}
        label={field.label || "Zip Code"}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <input
            id={`field-${path}`}
            type="text"
            value={value || ""}
            onChange={handleChange}
            placeholder="e.g. 75201"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--theme-elevation-200)",
              borderRadius: 4,
              fontSize: 14,
              background: "var(--theme-input-bg, transparent)",
              color: "var(--theme-text)",
            }}
          />
        </div>
        {status === "loading" && (
          <span style={{ fontSize: 12, color: "#666" }}>Looking up...</span>
        )}
        {status === "success" && (
          <span style={{ fontSize: 12, color: "#16a34a" }}>Auto-filled</span>
        )}
        {status === "error" && (
          <span style={{ fontSize: 12, color: "#dc2626" }}>
            Zip not found
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: 11,
          color: "var(--theme-elevation-500)",
          marginTop: 4,
        }}
      >
        Enter a 5-digit US zip code to auto-fill city, state, and country
      </p>
    </div>
  );
};
