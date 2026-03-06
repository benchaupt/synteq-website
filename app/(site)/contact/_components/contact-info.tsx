import Link from "next/link";
import { CSSIcon } from "@/app/_components/icon";

const contactChannels = [
  { label: "General", email: "info@synteq.com" },
  { label: "Sales", email: "sales@synteq.com" },
  { label: "Careers", email: "careers@synteq.digital" },
  { label: "Media & Press", email: "pr@synteq.digital" },
  { label: "Support", email: "support@synteq.digital" },
] as const;

const socialLinks = [
  { name: "socials/telegram-logo", href: "https://t.me/synteqdigital", label: "Telegram" },
  { name: "socials/x-logo", href: "https://x.com/SynteqDigital", label: "X" },
  { name: "socials/linkedin-logo", href: "https://www.linkedin.com/company/synteqdigital/", label: "LinkedIn" },
] as const;

export function ContactInfo() {
  return (
    <div className="flex flex-col justify-between gap-12">
      {/* Header */}
      <div className="flex flex-col gap-5">
        <h1 className="title">Contact Us.</h1>
        <p className="body max-w-4xl">
          Whether you&apos;re seeking ASIC miners, energy solutions, electrical
          infrastructure, or consultation, it all starts with a conversation.
        </p>
      </div>

      {/* Contact channels */}
      <div className="flex flex-col gap-6">
        {contactChannels.map((channel) => (
          <div key={channel.label} className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-lava">
              {channel.label}
            </span>
            <a
              href={`mailto:${channel.email}`}
              className="heading6 w-fit origin-left hover:scale-95 transition-transform"
            >
              {channel.email}
            </a>
          </div>
        ))}
      </div>

      {/* Social + support */}
      <div className="flex flex-col gap-8">
        {/* Social icons */}
        <div className="flex gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-lava hover:scale-90 transition-all"
            >
              <CSSIcon name={social.name} size="lg" />
            </a>
          ))}
        </div>

        {/* Support link */}
        <p className="text-sm text-lava flex items-center gap-1.5">
          Looking for support?
          <Link
            href="/contact?interest=support"
            className="group inline-flex items-center gap-1 font-semibold underline-offset-4 underline decoration-lava bg-[linear-gradient(theme(colors.lava),theme(colors.lava))] bg-[position:0_100%] bg-no-repeat bg-[size:100%_0%] transition-all duration-500 ease-out hover:bg-[size:100%_100%] hover:text-white px-1 -mx-1"
          >
            Client Support
            <CSSIcon
              name="arrow-up-right"
              size="sm"
              className="transition-transform duration-500 ease-out group-hover:rotate-45"
            />
          </Link>
        </p>
      </div>
    </div>
  );
}
