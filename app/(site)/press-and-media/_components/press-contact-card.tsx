import Image from "next/image";
import { CSSIcon } from "@/app/_components/icon";
import { Button } from "@/app/_components/button";

const socialLinks = [
  {
    name: "socials/telegram-logo",
    href: "https://t.me/synteqdigital",
    label: "Telegram",
  },
  {
    name: "socials/x-logo",
    href: "https://x.com/SynteqDigital",
    label: "X",
  },
  {
    name: "socials/linkedin-logo",
    href: "https://www.linkedin.com/company/synteqdigital/",
    label: "LinkedIn",
  },
] as const;

export function PressContactCard() {
  return (
    <div>
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <h2 className="heading1">Press Contact</h2>
        <Button variant="primary" size="md" href="/contact">
          Contact
        </Button>
      </div>

      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        {/* Square photo */}
        <Image
          src="/images/team/patty.webp"
          alt="Aubrey Graham"
          width={90}
          height={90}
          className="size-22 object-cover grayscale"
        />

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="heading6">Aubrey Graham</span>
            <span className="text-body text-lava/50">
              Director of Marketing &amp; Communication
            </span>
          </div>

          {/* Email + socials in a row */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:name@synteq.digital"
              className="group relative text-body font-medium text-lava"
            >
              name@synteq.digital
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-lava transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-lava transition-transform duration-200 hover:scale-85"
                >
                  <CSSIcon name={social.name} size="sm" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
