import { Section } from "@/app/_components/section";
import { ContactInfo } from "@/app/(site)/contact/_components/contact-info";
import { ContactForm } from "@/app/(site)/contact/_components/contact-form";

export const metadata = {
  title: "Contact | Synteq Digital",
  description:
    "Get in touch with Synteq Digital for enterprise hardware, HPC, and IT services.",
};

export default function ContactPage() {
  return (
    <>
      <Section background="slate-light-3" className="pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <ContactInfo />
          <div className="bg-white p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
