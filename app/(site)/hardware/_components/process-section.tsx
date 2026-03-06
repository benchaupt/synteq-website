import { Button } from "@/app/_components/button";

const steps = [
  {
    step: 1,
    title: "Introduction & Product Selection",
    description:
      "We start with a conversation — whether that's a call, Telegram chat, tweet, email, or text — so we can understand your needs and find the best solution for you. We understand that market conditions can change quickly, which is why we are responsive and communicative, but never pushy, when it comes to closing a deal.",
  },
  {
    step: 2,
    title: "Order Prep & Logistics",
    description:
      "Once your order is secured, we start working proactively to prepare you for delivery and provide regular updates on your order's status, even if you're handling the shipping yourself.",
  },
  {
    step: 3,
    title: "Support That Never Ends",
    description:
      "We always confirm that your order was received in good condition, but our support doesn't stop there. We're available to answer any questions or address any needs you have after your machines are plugged in, from support to sourcing replacement parts.",
  },
];

export function ProcessSection() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-start justify-between gap-8">
        <h2 className="heading">Our Process</h2>
        <div className="hidden md:block">
          <Button href="/contact" size="md">
            Get Started
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.step}
            className="flex flex-col gap-6 rounded-xl border border-cream p-8"
          >
            <span className="subheading">Step {step.step}</span>
            <h3 className="heading3 font-semibold">{step.title}</h3>
            <p className="text-body text-slate leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <Button href="/contact" size="md">
          Get Started
        </Button>
      </div>
    </div>
  );
}
