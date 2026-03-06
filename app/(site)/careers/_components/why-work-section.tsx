import { CSSIcon } from "@/app/_components/icon";
import { StyledHeading } from "@/app/_components/styled-heading";

const values = [
  {
    icon: "careers/collaboration-icon",
    title: "Great People, Real Collaboration",
    description:
      "We work with talented, driven teammates who bring out the best in each other. It\u2019s a supportive, high-trust environment built on respect and shared goals.",
  },
  {
    icon: "careers/growth-icon",
    title: "Challenging Work That Stays Interesting",
    description:
      "Our industry moves fast, and so do we. We solve new problems, learn continuously, and grow our skill sets along the way.",
  },
  {
    icon: "careers/leadership-icon",
    title: "Strong Leadership & Clear Vision",
    description:
      "We are building something ambitious, and everyone has the opportunity to make an impact. Our leadership team empowers us with trust, transparency, and room to innovate.",
  },
];

export function WhyWorkSection() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6 max-w-3xl">
        <StyledHeading as="h2" className="heading1">
          Why Work at Synteq?
        </StyledHeading>
        <p className="text-body text-lava">
          Here you&apos;ll join a team that values initiative, continuous
          improvement, and welcomes employee ideas and ways to make our work
          better. We hold ourselves to high standards and take pride in
          delivering excellent results. As a remote-first team across the U.S.
          and Canada, we stay grounded in what matters most: our people and how
          we grow together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-16">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col gap-4">
            <CSSIcon name={value.icon} size="2xl" className="text-lava" />
            <div className="flex flex-col gap-2">
              <h3 className="heading4">{value.title}</h3>
              <p className="text-body text-lava">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
