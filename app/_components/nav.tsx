"use client";

import { cn } from "@/lib/utils";
import { Logo } from "@/app/_components/logo";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

// ---------- Data ----------

const servicesItems: { label: string; href: string; comingSoon?: boolean }[] = [
  { label: "Repair", href: "/repair" },
  { label: "Storage", href: "#", comingSoon: true },
  { label: "Sites", href: "#", comingSoon: true },
];

const aboutItems = [
  { label: "About Us", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
];

const resourcesLinks = [
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Client Support", href: "/contact?interest=support" },
];

// ---------- Desktop sub-components ----------

function NavLink({
  href,
  children,
  pathname,
}: {
  href: string;
  children: React.ReactNode;
  pathname: string;
}) {
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        <Link
          href={href}
          className="group relative px-3 pt-2 pb-3 text-base font-medium text-lava"
        >
          {children}
          <span
            className={cn(
              "absolute bottom-0 left-3 right-3 h-[2.75px] bg-lava transition-all duration-200",
              active
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
            )}
          />
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

function Trigger({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenu.Trigger className="group relative px-3 pt-2 pb-3 text-base font-medium text-lava flex items-center gap-1 outline-none translate-y-[2px]">
      {children}
      <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      <span className="absolute bottom-0 left-3 right-3 h-[2.75px] bg-lava transition-all duration-200 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-data-[state=open]:opacity-100 group-data-[state=open]:translate-y-0" />
    </NavigationMenu.Trigger>
  );
}

function PanelLabel({
  children,
  slate = false,
}: {
  children: React.ReactNode;
  slate?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-[12px] mb-3 text-black",
      )}
    >
      {children}
    </p>
  );
}

function DropdownPanel({
  title,
  links,
  slate = false,
  rightLabel,
  children,
}: {
  title: string;
  links: { label: string; href: string; comingSoon?: boolean }[];
  slate?: boolean;
  rightLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex w-[560px]">
      <div className="w-[35%] shrink-0 p-6">
        <PanelLabel slate={slate}>{title}</PanelLabel>
        <div className="space-y-0.5">
          {links.map((item) =>
            item.comingSoon ? (
              <span
                key={item.href + item.label}
                className="block py-1.5 text-base font-medium text-lava/50 cursor-default"
              >
                {item.label}
                <span className="bg-lava text-white text-body-xxs px-1.5 py-0.5 ml-2 inline-block align-middle">coming soon</span>
              </span>
            ) : (
              <NavigationMenu.Link asChild key={item.href}>
                <Link
                  href={item.href}
                  className="group/link relative block py-1.5 text-base font-medium text-lava transition-colors w-fit"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-lava opacity-0 -translate-y-0.5 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-y-0" />
                </Link>
              </NavigationMenu.Link>
            ),
          )}
        </div>
      </div>
      <div className="w-[65%] p-6">
        {rightLabel && <PanelLabel slate={slate}>{rightLabel}</PanelLabel>}
        {children || (
          <div
            className={cn(
              "flex items-center justify-center h-full rounded-lg border border-dashed min-h-[80px]",
              slate
                ? "border-white/20 text-white/30"
                : "border-cream text-slate-50",
            )}
          >
            <span className="text-xs uppercase tracking-wide">Placeholder</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Mobile dropdown ----------

function MobileDropdown({
  label,
  items,
  isOpen,
  onToggle,
  onNavigate,
}: {
  label: string;
  items: { label: string; href: string; comingSoon?: boolean }[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className=" border-cream">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-lg text-lava hover:text-slate transition-all px-4 py-4"
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "size-5 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-3 space-y-1 px-4">
              {items.map((item) =>
                item.comingSoon ? (
                  <span
                    key={item.href + item.label}
                    className="block py-2 text-sm font-medium text-lava/50 cursor-default"
                  >
                    {item.label}
                    <span className="bg-lava text-white text-body-xxs px-1.5 py-0.5 ml-2 inline-block align-middle">
                      coming soon
                    </span>
                  </span>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-sm font-medium text-lava hover:text-slate transition-colors"
                    onClick={onNavigate}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Nav panel cards ----------

function JobCard({
  job,
  slate,
}: {
  job: { name: string; slug: string; department?: string; workLocation?: string };
  slate?: boolean;
}) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={`/careers/${job.slug}`}
        className={cn(
          "block p-2 -mx-2 transition-colors",
          slate ? "hover:bg-white/10" : "hover:bg-offwhite",
        )}
      >
        <p className="text-base font-medium leading-snug">
          {job.name}
        </p>
        {(job.department || job.workLocation) && (
          <p className="text-body-sm opacity-60 mt-1">
            {[job.department, job.workLocation].filter(Boolean).join(", ")}
          </p>
        )}
      </Link>
    </NavigationMenu.Link>
  );
}

function PressReleaseCard({
  pr,
  slate,
}: {
  pr: { title: string; slug: string };
  slate?: boolean;
}) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={`/knowledge-hub/press-releases/${pr.slug}`}
        className={cn(
          "block transition-colors",
          slate ? "hover:bg-white/10" : "hover:bg-offwhite",
        )}
      >
        <div className="border border-lava/25 p-4">
          <p className="text-base font-bold leading-snug">
            {pr.title}
          </p>
        </div>
      </Link>
    </NavigationMenu.Link>
  );
}

function PressReleaseList({
  prs,
  slate,
}: {
  prs: { title: string; slug: string }[];
  slate?: boolean;
}) {
  return (
    <div className="space-y-2">
      {prs.map((pr) => (
        <NavigationMenu.Link asChild key={pr.slug}>
          <Link
            href={`/knowledge-hub/press-releases/${pr.slug}`}
            className={cn(
              "block p-3 border border-lava/25 transition-colors",
              slate ? "hover:bg-white/10" : "hover:bg-offwhite",
            )}
          >
            <p className="text-sm font-medium leading-snug">
              {pr.title}
            </p>
          </Link>
        </NavigationMenu.Link>
      ))}
    </div>
  );
}

function SuccessStoryCard({
  story,
  slate,
}: {
  story: { title: string; slug: string; client: string; clientLogo?: string | null };
  slate?: boolean;
}) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={`/knowledge-hub/success-stories/${story.slug}`}
        className={cn(
          "flex items-center gap-3 p-3 border border-lava/25 transition-colors",
          slate ? "hover:bg-white/10" : "hover:bg-offwhite",
        )}
      >
        <div className="size-14 shrink-0 flex items-center justify-center p-1 overflow-hidden">
          {story.clientLogo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={story.clientLogo}
              alt={story.client}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <span className={cn(
              "text-[6px] font-bold leading-tight text-center uppercase",
              slate ? "text-white" : "text-lava",
            )}>
              {story.client}
            </span>
          )}
        </div>
        <p className="text-sm leading-snug">
          {story.title}
        </p>
      </Link>
    </NavigationMenu.Link>
  );
}

// ---------- Nav ----------

export interface NavProps {
  featuredJob?: {
    name: string;
    slug: string;
    department?: string;
    workLocation?: string;
  } | null;
  recentPR?: {
    title: string;
    slug: string;
  } | null;
  recentPRs?: {
    title: string;
    slug: string;
  }[];
  featuredSuccessStory?: {
    title: string;
    slug: string;
    client: string;
    clientLogo?: string | null;
  } | null;
}

export function Nav({ featuredJob, recentPR, recentPRs = [], featuredSuccessStory }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isArticlePage =
    (pathname.startsWith("/knowledge-hub/blogs/") && pathname !== "/knowledge-hub/blogs") ||
    (pathname.startsWith("/knowledge-hub/press-releases/") && pathname !== "/knowledge-hub/press-releases") ||
    (pathname.startsWith("/knowledge-hub/success-stories/") && pathname !== "/knowledge-hub/success-stories");
  const progressValue = useMotionValue(0);
  const scaleX = useSpring(progressValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Article scroll progress (blogs, press releases, success stories)
  useEffect(() => {
    if (!isArticlePage) return;
    const onScroll = () => {
      const content = document.querySelector("[data-article-content]");
      if (!content) return;
      const rect = content.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const progress = (mid - rect.top) / rect.height;
      progressValue.set(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isArticlePage, progressValue]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <NavigationMenu.Root className="relative w-full">
        {/* ---- Visual nav bar ---- */}
        <div
          className={cn(
            "relative transition-all duration-500",
            mobileOpen
              ? "z-[70] bg-white"
              : scrolled
                ? "bg-white/95 backdrop-blur-xl"
                : "bg-slate-light-1 border-transparent",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between px-5 md:px-8 max-w-viewport w-full mx-auto transition-all duration-500",
              scrolled ? "py-4" : "py-5 md:py-7",
            )}
          >
            {/* Logo — always lava, bigger at top */}
            <Link href="/" className="flex items-center text-lava origin-center hover:scale-90 transition-all duration-300">
              <Logo
                size="md"
                className={cn(
                  "transition-all duration-500",
                  scrolled ? "h-10" : "h-14",
                )}
              />
            </Link>

            {/* ---- Desktop Navigation ---- */}
            <NavigationMenu.List className="hidden lg:flex items-center gap-0.5">
              <NavLink href="/hpc" pathname={pathname}>
                HPC
              </NavLink>
              <NavLink href="/hardware" pathname={pathname}>
                Hardware
              </NavLink>

              {/* Services */}
              <NavigationMenu.Item>
                <Trigger>Services</Trigger>
                <NavigationMenu.Content>
                  <DropdownPanel
                    title="Services"
                    links={servicesItems}
                    slate={!scrolled}
                    rightLabel={recentPRs.length > 0 ? "Recent News" : undefined}
                  >
                    {recentPRs.length > 0 ? (
                      <PressReleaseList prs={recentPRs} slate={!scrolled} />
                    ) : undefined}
                  </DropdownPanel>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* About */}
              <NavigationMenu.Item>
                <Trigger>About</Trigger>
                <NavigationMenu.Content>
                  <DropdownPanel
                    title="About"
                    links={aboutItems}
                    slate={!scrolled}
                    rightLabel={
                      featuredJob
                        ? "We're Hiring!"
                        : recentPR
                          ? "What's New"
                          : undefined
                    }
                  >
                    {featuredJob ? (
                      <JobCard job={featuredJob} slate={!scrolled} />
                    ) : recentPR ? (
                      <PressReleaseCard pr={recentPR} slate={!scrolled} />
                    ) : undefined}
                  </DropdownPanel>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* Resources — two-column */}
              <NavigationMenu.Item>
                <Trigger>Resources</Trigger>
                <NavigationMenu.Content>
                  <DropdownPanel
                    title="Resources"
                    links={resourcesLinks}
                    slate={!scrolled}
                    rightLabel={featuredSuccessStory ? "Recent Success" : undefined}
                  >
                    {featuredSuccessStory ? (
                      <SuccessStoryCard story={featuredSuccessStory} slate={!scrolled} />
                    ) : undefined}
                  </DropdownPanel>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavLink href="/contact" pathname={pathname}>
                Contact
              </NavLink>
            </NavigationMenu.List>

            {/* ---- Mobile toggle ---- */}
            <button
              className="lg:hidden text-lava hover:text-slate transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Article scroll progress bar */}
          {isArticlePage && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-lava origin-left"
              style={{ scaleX }}
            />
          )}
        </div>

        {/* ---- Dropdown viewport — below nav bar with gap ---- */}
        <div className="absolute left-0 right-0 top-full hidden lg:flex justify-end">
          <div className="max-w-viewport w-full mx-auto px-5 md:px-8 flex justify-end">
            <NavigationMenu.Viewport
              className={cn(
                "relative mt-3 overflow-hidden shadow-lg origin-top-right transition-all duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                scrolled
                  ? "bg-white border border-cream"
                  : "bg-slate-light-1 border border-white/10",
              )}
            />
          </div>
        </div>
      </NavigationMenu.Root>

      {/* ---- Mobile backdrop ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-white/50 backdrop-blur-sm lg:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ---- Mobile menu ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="absolute inset-x-0 top-full z-[65] lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative max-h-[calc(100vh-100%)] overflow-y-auto pb-8"
            >
              <div className="w-full max-w-md mx-auto px-5 pt-3">
                <nav className="flex flex-col bg-white p-4 pb-6 shadow-xl border border-cream divide-y divide-cream">
                  <Link
                    href="/hpc"
                    className="text-lg text-lava hover:text-slate transition-all px-4 py-4"
                    onClick={closeMobile}
                  >
                    HPC
                  </Link>
                  <Link
                    href="/hardware"
                    className="text-lg text-lava hover:text-slate transition-all px-4 py-4"
                    onClick={closeMobile}
                  >
                    Hardware
                  </Link>
                  <MobileDropdown
                    label="Services"
                    items={servicesItems}
                    isOpen={mobileDropdown === "services"}
                    onToggle={() =>
                      setMobileDropdown(
                        mobileDropdown === "services" ? null : "services",
                      )
                    }
                    onNavigate={closeMobile}
                  />
                  <MobileDropdown
                    label="About"
                    items={aboutItems}
                    isOpen={mobileDropdown === "about"}
                    onToggle={() =>
                      setMobileDropdown(
                        mobileDropdown === "about" ? null : "about",
                      )
                    }
                    onNavigate={closeMobile}
                  />
                  <MobileDropdown
                    label="Resources"
                    items={resourcesLinks}
                    isOpen={mobileDropdown === "resources"}
                    onToggle={() =>
                      setMobileDropdown(
                        mobileDropdown === "resources" ? null : "resources",
                      )
                    }
                    onNavigate={closeMobile}
                  />
                  <Link
                    href="/contact"
                    className="text-lg text-lava hover:text-slate transition-all px-4 py-4"
                    onClick={closeMobile}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
