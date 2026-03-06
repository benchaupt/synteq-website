"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import * as Select from "@radix-ui/react-select";

const interestOptions = [
  "Hardware",
  "HPC",
  "Digital Mining",
  "Repair",
  "Services",
  "Support",
  "Careers",
  "Investment",
  "Press",
  "Other",
] as const;

const companySizeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

const miningServiceOptions = ["Consulting", "Site", "Hardware", "Repair"];
const repairTypeOptions = ["Consolidation", "Repair"];
const supportTypeOptions = ["Technical Issue", "Account & Billing", "RMA / Warranty", "SLA Inquiry", "General Support"];
const careersDeptOptions = ["Engineering", "Sales", "Operations", "Marketing", "Finance", "General"];

const inputClass =
  "h-12 border border-lava-25 bg-white px-4 text-body text-lava placeholder:text-slate-60 focus:outline-none focus:border-lava transition-colors";

const selectTriggerClass =
  "group flex h-12 w-full cursor-pointer items-center justify-between border border-lava-25 bg-white px-4 text-body outline-none transition-colors focus:border-lava";

const selectContentClass =
  "z-50 w-[var(--radix-select-trigger-width)] overflow-hidden border border-cream bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:slide-out-to-top-1 duration-150";

const selectItemClass =
  "cursor-pointer px-4 py-3 text-sm font-medium text-lava outline-none transition-colors hover:bg-offwhite data-highlighted:bg-offwhite";

function SelectChevron() {
  return (
    <Select.Icon className="transition-transform duration-200 group-data-[state=open]:rotate-180">
      <svg className="size-4 text-lava" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Select.Icon>
  );
}

function FormSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <Select.Root value={value || undefined} onValueChange={onChange}>
      <Select.Trigger className={selectTriggerClass}>
        <span className={value ? "text-lava" : "text-slate-60"}>
          {value || placeholder}
        </span>
        <SelectChevron />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={selectContentClass} position="popper" sideOffset={4}>
          <Select.Viewport>
            {options.map((opt, i) => (
              <Select.Item
                key={opt}
                value={opt}
                className={cn(selectItemClass, i > 0 && "border-t border-cream")}
              >
                <Select.ItemText>{opt}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

const animProps = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto" as const, opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  className: "overflow-hidden",
};

const interestLookup: Record<string, string> = Object.fromEntries(
  interestOptions.map((opt) => [opt.toLowerCase().replace(/\s+/g, "-"), opt]),
);

export function ContactForm({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const initialInterest = searchParams.get("interest");
  const initialMatch = initialInterest
    ? interestLookup[initialInterest.toLowerCase()] ?? null
    : null;

  const [selected, setSelected] = useState<string | null>(initialMatch);
  const [companySize, setCompanySize] = useState("");
  const [miningService, setMiningService] = useState("");
  const [repairType, setRepairType] = useState("");
  const [supportType, setSupportType] = useState("");
  const [careersDept, setCareersDept] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function selectInterest(option: string) {
    setSelected(selected === option ? null : option);
    setMiningService("");
    setRepairType("");
    setSupportType("");
    setCareersDept("");
  }

  function handleMiningServiceChange(value: string) {
    if (value === "Hardware" || value === "Repair") {
      setSelected(value);
      setMiningService("");
    } else {
      setMiningService(value);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      companySize,
      interest: selected,
      miningService: selected === "Digital Mining" ? miningService : undefined,
      repairType: selected === "Repair" ? repairType : undefined,
      unitQuantity: formData.get("unitQuantity") || undefined,
      unitType: formData.get("unitType") || undefined,
      productType: formData.get("productType") || undefined,
      quantity: formData.get("quantity") || undefined,
      serverType: formData.get("serverType") || undefined,
      computeNeeds: formData.get("computeNeeds") || undefined,
      investmentFocus: formData.get("investmentFocus") || undefined,
      publication: formData.get("publication") || undefined,
      serviceType: formData.get("serviceType") || undefined,
      message: formData.get("message"),
    };

    console.log("Form submitted:", data);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4", className)}>
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name *"
          required
          className={inputClass}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name *"
          required
          className={inputClass}
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Work Email *"
        required
        className={inputClass}
      />

      {/* Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className={inputClass}
        />
        <FormSelect
          value={companySize}
          onChange={setCompanySize}
          placeholder="Company Size"
          options={companySizeOptions}
        />
      </div>

      {/* Interests — single selection */}
      <fieldset className="flex flex-col gap-3 pt-2">
        <legend className="text-body font-medium text-lava">
          What are you interested in?
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {interestOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => selectInterest(option)}
              className={cn(
                "h-10 px-5 border text-sm font-medium transition-colors",
                selected === option
                  ? "border-lava bg-lava text-white"
                  : "border-lava-25 bg-white text-lava hover:border-lava",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Conditional fields */}
      <AnimatePresence initial={false} mode="wait">
        {selected === "Digital Mining" && (
          <motion.div key="mining" {...animProps}>
            <FormSelect
              value={miningService}
              onChange={handleMiningServiceChange}
              placeholder="What service are you looking for?"
              options={miningServiceOptions}
            />
          </motion.div>
        )}

        {selected === "Repair" && (
          <motion.div key="repair" {...animProps}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="unitQuantity"
                  placeholder="Unit Quantity"
                  className={inputClass}
                />
                <FormSelect
                  value={repairType}
                  onChange={setRepairType}
                  placeholder="Consolidation or Repair"
                  options={repairTypeOptions}
                />
              </div>
              <input
                type="text"
                name="unitType"
                placeholder="Unit Type"
                className={cn(inputClass, "w-full")}
              />
            </div>
          </motion.div>
        )}

        {selected === "Hardware" && (
          <motion.div key="hardware" {...animProps}>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="productType"
                placeholder="Product Type (e.g. ASICs, GPUs, Parts)"
                className={cn(inputClass, "w-full")}
              />
              <input
                type="text"
                name="quantity"
                placeholder="Estimated Quantity"
                className={cn(inputClass, "w-full")}
              />
            </div>
          </motion.div>
        )}

        {selected === "HPC" && (
          <motion.div key="hpc" {...animProps}>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="serverType"
                placeholder="Server Type (e.g. VPS, Dedicated, GPU)"
                className={cn(inputClass, "w-full")}
              />
              <input
                type="text"
                name="computeNeeds"
                placeholder="Compute Requirements"
                className={cn(inputClass, "w-full")}
              />
            </div>
          </motion.div>
        )}

        {selected === "Services" && (
          <motion.div key="services" {...animProps}>
            <input
              type="text"
              name="serviceType"
              placeholder="Service Needed (e.g. Hosting, Consulting)"
              className={cn(inputClass, "w-full")}
            />
          </motion.div>
        )}

        {selected === "Investment" && (
          <motion.div key="investment" {...animProps}>
            <input
              type="text"
              name="investmentFocus"
              placeholder="Investment Focus / Area of Interest"
              className={cn(inputClass, "w-full")}
            />
          </motion.div>
        )}

        {selected === "Support" && (
          <motion.div key="support" {...animProps}>
            <div className="flex flex-col gap-4">
              <FormSelect
                value={supportType}
                onChange={setSupportType}
                placeholder="What do you need help with?"
                options={supportTypeOptions}
              />
              <input
                type="text"
                name="orderId"
                placeholder="Order / Ticket ID (if applicable)"
                className={cn(inputClass, "w-full")}
              />
            </div>
          </motion.div>
        )}

        {selected === "Careers" && (
          <motion.div key="careers" {...animProps}>
            <div className="flex flex-col gap-4">
              <FormSelect
                value={careersDept}
                onChange={setCareersDept}
                placeholder="Department of Interest"
                options={careersDeptOptions}
              />
              <input
                type="text"
                name="linkedIn"
                placeholder="LinkedIn Profile URL"
                className={cn(inputClass, "w-full")}
              />
            </div>
          </motion.div>
        )}

        {selected === "Press" && (
          <motion.div key="press" {...animProps}>
            <input
              type="text"
              name="publication"
              placeholder="Publication / Outlet"
              className={cn(inputClass, "w-full")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message */}
      <textarea
        name="message"
        placeholder="Your Message Here"
        rows={5}
        className="flex-1 min-h-32 border border-lava-25 bg-white px-4 py-3 text-body text-lava placeholder:text-slate-60 focus:outline-none focus:border-lava transition-colors resize-none"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-12 w-fit px-8 bg-lava text-white text-sm font-semibold hover:bg-lava-90 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Contact"}
      </button>
    </form>
  );
}
