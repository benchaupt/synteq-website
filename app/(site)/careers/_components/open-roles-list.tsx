"use client";

import { useState } from "react";
import Link from "next/link";
import * as Select from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

interface Job {
  id: string | number;
  name: string;
  slug: string;
  department?: string | null;
  workLocation?: string | null;
  employmentType?: string | null;
}

export function OpenRolesList({ jobs }: { jobs: Job[] }) {
  const departments = Array.from(
    new Set(jobs.map((j) => j.department).filter(Boolean)),
  ) as string[];

  const [selectedDept, setSelectedDept] = useState("All");

  const filtered =
    selectedDept === "All"
      ? jobs
      : jobs.filter((j) => j.department === selectedDept);

  // Group by department
  const grouped = filtered.reduce<Record<string, Job[]>>((acc, job) => {
    const dept = job.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(job);
    return acc;
  }, {});

  return (
    <div>
      {/* Department filter */}
      <Select.Root value={selectedDept} onValueChange={setSelectedDept}>
        <Select.Trigger className="group mb-16 flex w-58 cursor-pointer items-center justify-between border border-cream px-4 py-3 outline-none">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-body-sm text-lava">Department</span>
            <span className="text-body font-medium text-lava">
              <Select.Value />
            </span>
          </div>
          <Select.Icon className="transition-transform duration-200 group-data-[state=open]:rotate-180">
            <svg className="size-4 text-lava" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden border border-cream bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:slide-out-to-top-1 duration-150"
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport>
              {["All", ...departments].map((dept, i) => (
                <Select.Item
                  key={dept}
                  value={dept}
                  className={cn(
                    "cursor-pointer px-4 py-3 text-sm font-medium text-lava outline-none transition-colors hover:bg-offwhite data-highlighted:bg-offwhite",
                    i > 0 && "border-t border-cream",
                  )}
                >
                  <Select.ItemText>{dept}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {/* Grouped listings */}
      <div className="flex flex-col gap-12">
        {Object.entries(grouped).map(([dept, deptJobs]) => (
          <div key={dept}>
            <h3 className="heading2 mb-4">{dept}</h3>
            <div className="flex flex-col border-b border-cream">
              {deptJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.slug}`}
                  className="group relative flex flex-col gap-3 overflow-hidden border-t border-cream py-5 md:flex-row md:items-center md:justify-between md:gap-4 [&>:not(:first-child)]:transition-[padding] [&>:not(:first-child)]:duration-300 [&>:not(:first-child)]:ease-out hover:[&>:not(:first-child)]:md:px-4"
                >
                  {/* Black wipe left to right on hover */}
                  <span className="absolute inset-0 -translate-x-full bg-lava transition-transform duration-300 ease-out group-hover:translate-x-0" />

                  <div className="relative z-10 flex flex-col gap-0.5">
                    <span className="text-lg font-medium text-lava transition-colors duration-300 group-hover:text-white">
                      {job.name}
                    </span>
                    <span className="text-body-sm text-lava transition-colors duration-300 group-hover:text-white/70">
                      {[job.workLocation, job.employmentType]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>

                  {/* View Position button */}
                  <div className="relative z-10 flex shrink-0 items-center gap-2">
                    <span className="text-sm font-bold text-lava transition-colors duration-300 group-hover:text-white">
                      View Position
                    </span>
                    <span className="flex size-6 items-center justify-center bg-lava">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/icons/button-arrow-right.svg"
                        alt=""
                        className="size-3.5"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
