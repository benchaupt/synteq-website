import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { CSSIcon } from "@/app/_components/icon";
import { Container } from "@/app/_components/container";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "Our Story", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Digital Mining",
    links: [
      { label: "Hardware", href: "/hardware" },
      { label: "Repair", href: "/repair" },
      { label: "Consulting", href: "/contact" },
    ],
  },
  {
    title: "HPC",
    links: [
      { label: "Solutions", href: "/hpc" },
      { label: "SLA", href: "/hpc#what-sets-us-apart" },
      { label: "Locations", href: "/hpc#dc-locations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Knowledge Block", href: "/knowledge-hub" },
      { label: "Client Support", href: "/contact?interest=support" },
    ],
  },
];

const socialLinks = [
  { name: "socials/telegram-logo", href: "https://t.me/synteqdigital", label: "Telegram" },
  { name: "socials/x-logo", href: "https://x.com/SynteqDigital", label: "X" },
  { name: "socials/linkedin-logo", href: "https://www.linkedin.com/company/synteqdigital/", label: "LinkedIn" },
];

const legalLinks = [
  { label: "Privacy Policy.", href: "/privacy-policy" },
  { label: "Website Accessibility.", href: "/accessibility" },
  { label: "Terms of Use.", href: "/terms-of-service" },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-cream">
      <Container className="pt-16 md:pt-24 pb-8 md:pb-12 flex flex-col">
        {/* Logo */}
        <div className="text-slate hover:scale-95 transition-transform duration-200 w-fit">
          <Logo className="h-12 w-auto" />
        </div>

        {/* Middle: Mission + Link Columns */}
        <div className="flex flex-col lg:flex-row gap-24 pt-8">
          {/* Mission + Email */}
          <div className="flex flex-col gap-2 max-w-md shrink-0">
            <h3 className="heading6 font-medium">Our Mission</h3>
            <p className="body">
              We help our clients succeed in their digital compute operations
              by finding unique purchase opportunities, providing expert
              industry insight, and offering an elevated client experience.
            </p>
            <a
              href="mailto:info@synteq.digital"
              className="text-xl font-semibold pt-4 text-lava hover:scale-95 transition-transform duration-200 w-fit"
            >
              info@synteq.digital
            </a>
          </div>

          {/* Link Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-[repeat(4,auto)] md:justify-between gap-y-12 gap-x-6">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-2.5">
                <h3 className="text-base font-bold text-lava mb-1 whitespace-nowrap">
                  {column.title}
                </h3>
                {column.links.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="text-base font-medium text-lava hover:text-slate transition-colors duration-200 whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-6 pt-22">
          {/* Social + Copyright row (mobile: space-between, desktop: social left) */}
          <div className="flex items-center justify-between md:justify-start">
            <div className="flex gap-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-lava hover:scale-90 transition-transform duration-200"
                >
                  <CSSIcon name={social.name} className="size-6!" />
                </a>
              ))}
            </div>
            <p className="text-[10px] text-lava md:hidden">
              &copy; {new Date().getFullYear()} Synteq Digital.
            </p>
          </div>

          {/* Legal + Copyright (desktop) */}
          <div className="flex w-full justify-between gap-6 md:items-center">
            <div className="flex w-full justify-between gap-6 md:w-auto md:gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[10px] text-lava hover:text-slate transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="hidden text-[10px] text-lava md:block">
              &copy; {new Date().getFullYear()} Synteq Digital.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
