import { cn } from "@/lib/utils";
import { StyledHeading } from "@/app/_components/styled-heading";

const slateOpacities = [
  { label: "90%", className: "bg-slate-90" },
  { label: "80%", className: "bg-slate-80" },
  { label: "70%", className: "bg-slate-70" },
  { label: "60%", className: "bg-slate-60" },
  { label: "50%", className: "bg-slate-50" },
];

const bottomColors = [
  {
    name: "Lava",
    hex: "#0F1315",
    pantone: "7547",
    className: "bg-lava",
    light: true,
  },
  {
    name: "Cream",
    hex: "#E6E5E2",
    pantone: "7534",
    className: "bg-cream",
    light: false,
  },
  {
    name: "Off-White",
    hex: "#F8F7F6",
    pantone: "7354 50%",
    className: "bg-offwhite",
    light: false,
  },
];

function SwatchLabel({
  children,
  light,
}: {
  children: React.ReactNode;
  light: boolean;
}) {
  return (
    <span className={cn("text-label font-medium", light ? "text-white" : "text-lava")}>
      {children}
    </span>
  );
}

export function BrandColorsSection() {
  return (
    <div className="flex flex-col gap-10">
      <StyledHeading as="h2" className="heading">
        {"Our Colors."}
      </StyledHeading>

      {/* Desktop: 15-col grid. Slate=5, each opacity=2, each bottom=5 */}
      <div className="hidden md:grid grid-cols-15 gap-4 auto-rows-fr">
        {/* Row 1: Slate (5/15 = 1/3) + 5 opacity swatches (2/15 each) */}
        <div className="col-span-5 flex flex-col justify-between bg-slate p-5">
          <span className="text-lg font-semibold text-white">Slate</span>
          <div className="flex flex-col gap-0.5">
            <SwatchLabel light>Hex: #768692</SwatchLabel>
            <SwatchLabel light>Pantone: 7544</SwatchLabel>
          </div>
        </div>

        {slateOpacities.map((o) => (
          <div
            key={o.label}
            className={cn(
              "col-span-2 flex flex-col justify-end p-4",
              o.className,
            )}
          >
            <span className="text-sm font-medium text-white">{o.label}</span>
            <span className="text-label text-white/70">Opacity</span>
          </div>
        ))}

        {/* Row 2: Lava, Cream, Off-White (5/15 = 1/3 each) */}
        {bottomColors.map((color) => (
          <div
            key={color.name}
            className={cn(
              "col-span-5 flex flex-col justify-between p-5 aspect-[4/3]",
              color.className,
            )}
          >
            <span
              className={cn(
                "text-lg font-semibold",
                color.light ? "text-white" : "text-lava",
              )}
            >
              {color.name}
            </span>
            <div className="flex flex-col gap-0.5">
              <SwatchLabel light={color.light}>Hex: {color.hex}</SwatchLabel>
              <SwatchLabel light={color.light}>
                Pantone: {color.pantone}
              </SwatchLabel>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex flex-col justify-between bg-slate p-5 aspect-[4/3]">
          <span className="text-lg font-semibold text-white">Slate</span>
          <div className="flex flex-col gap-0.5">
            <SwatchLabel light>Hex: #768692</SwatchLabel>
            <SwatchLabel light>Pantone: 7544</SwatchLabel>
          </div>
        </div>
        {slateOpacities.map((o) => (
          <div
            key={o.label}
            className={cn(
              "flex items-center justify-between px-5 py-4",
              o.className,
            )}
          >
            <span className="text-sm font-medium text-white">{o.label} Opacity</span>
          </div>
        ))}
        {bottomColors.map((color) => (
          <div
            key={color.name}
            className={cn(
              "flex flex-col justify-between p-5 aspect-[4/3]",
              color.className,
            )}
          >
            <span
              className={cn(
                "text-lg font-semibold",
                color.light ? "text-white" : "text-lava",
              )}
            >
              {color.name}
            </span>
            <div className="flex flex-col gap-0.5">
              <SwatchLabel light={color.light}>Hex: {color.hex}</SwatchLabel>
              <SwatchLabel light={color.light}>
                Pantone: {color.pantone}
              </SwatchLabel>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
