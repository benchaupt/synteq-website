import { Section } from "@/app/_components/section";

export const metadata = {
  title: "Website Accessibility | Synteq Digital",
  description:
    "Synteq Digital accessibility statement — our commitment to ADA compliance and inclusive design.",
};

export default function AccessibilityPage() {
  return (
    <Section className="pt-24 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="title mb-4">Website Accessibility</h1>
        <p className="mb-12 text-sm text-slate">Last updated: May 13, 2024</p>

        <div className="space-y-10 text-body leading-relaxed text-lava-90">
          <section>
            <h2 className="heading2 mb-4">Introduction</h2>
            <p>
              Welcome to Synteq Digital. Our purpose is to provide an excellent
              experience for our clients. This purpose influences everything we
              do, and we are committed to ensuring our digital solutions meet
              accessibility standards and that we continue to improve the user
              experience for everyone who visits this website.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">
              WCAG 2.0 Level A Best Practices
            </h2>
            <p className="mb-4">
              We built our website under the following conditions in order to
              meet the Level A Best Practices under WCAG 2.0:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Font size</strong> &mdash; Text is appropriately sized
                for readability
              </li>
              <li>
                <strong>Color contrast</strong> &mdash; Sufficient contrast
                ratios between text and backgrounds
              </li>
              <li>
                <strong>Image alt tags</strong> &mdash; Descriptive alternative
                text for images
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading2 mb-4">Our Approach</h2>
            <p className="mb-4">
              Synteq Digital undertakes to respect every person and their
              individual needs. In pursuit of this, our efforts are ongoing and
              our work here is not done. We are continuing to review additional
              accessibility options so that each user has the best experience
              possible.
            </p>
            <p>
              <strong>Feedback:</strong> We appreciate and consider feedback from
              you in order to further improve our website&apos;s accessibility.
              You can find our contact details at the bottom of this page.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">
              Changes to This Statement
            </h2>
            <p>
              We may update this ADA Compliance statement from time to time in
              order to improve our site. We will notify you of any changes by
              posting the updated statement on this page and updating the
              &ldquo;Last updated&rdquo; date above.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Contact Us</h2>
            <p>
              If you have any questions or suggestions regarding our
              accessibility efforts, you can contact us:
            </p>
            <ul className="mt-3 list-none space-y-1 pl-0">
              <li>
                <strong>Mail:</strong> 1981 Memorial Drive, #277, Chicopee, MA
                01020-4322
              </li>
            </ul>
          </section>
        </div>
      </div>
    </Section>
  );
}
