import { Section } from "@/app/_components/section";

export const metadata = {
  title: "Privacy Policy | Synteq Digital",
  description:
    "Synteq Digital privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-24 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="title mb-4">Privacy Policy</h1>
        <p className="mb-12 text-sm text-slate">Last updated: June 19, 2024</p>

        <div className="space-y-10 text-body leading-relaxed text-lava-90">
          <section>
            <h2 className="heading2 mb-4">Overview</h2>
            <p>
              Synteq Digital Operations US LLC (&ldquo;Synteq,&rdquo;
              &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              describes its policies for collecting, using, and disclosing
              information when you access our service. This policy should be read
              alongside the Terms of Use for the website.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Data Collection</h2>
            <h3 className="heading3 mb-3">Personal Data</h3>
            <p className="mb-4">
              Personal data we may collect includes:
            </p>
            <ul className="mb-6 list-disc space-y-1 pl-6">
              <li>Email address, name, and phone number</li>
              <li>Address, state, ZIP code, and city</li>
              <li>Usage data from device interactions</li>
            </ul>

            <h3 className="heading3 mb-3">Usage Data</h3>
            <p className="mb-4">
              Usage data automatically collected includes:
            </p>
            <ul className="mb-6 list-disc space-y-1 pl-6">
              <li>IP address, browser type and version</li>
              <li>Pages visited and time spent on pages</li>
              <li>Unique device identifiers</li>
              <li>Mobile device operating system information</li>
            </ul>

            <h3 className="heading3 mb-3">Third-Party Social Media</h3>
            <p>
              Our service may allow account creation via third-party social media
              platforms such as Google, Facebook, Twitter, and LinkedIn.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">
              Tracking Technologies &amp; Cookies
            </h2>
            <p className="mb-4">
              We use cookies, Flash cookies, and web beacons. These are
              categorized as:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Necessary / Essential</strong> &mdash; Session cookies
                required for basic functionality
              </li>
              <li>
                <strong>Policy / Notice Acceptance</strong> &mdash; Persistent
                cookies that remember your consent choices
              </li>
              <li>
                <strong>Functionality</strong> &mdash; Persistent cookies that
                remember your preferences
              </li>
              <li>
                <strong>Tracking &amp; Performance</strong> &mdash; Persistent
                third-party cookies for analytics
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading2 mb-4">How We Use Your Data</h2>
            <p className="mb-4">We use your data to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Provide and monitor our service</li>
              <li>Manage your account</li>
              <li>Perform contractual obligations</li>
              <li>Communicate with you</li>
              <li>Send news and special offers (with consent)</li>
              <li>Manage your requests</li>
              <li>Facilitate business transfers</li>
              <li>Improve our service and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="heading2 mb-4">Data Sharing</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Service providers who assist in operating our service</li>
              <li>Business partners</li>
              <li>Affiliates</li>
              <li>Other users in public areas</li>
              <li>Third parties with your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="heading2 mb-4">Data Retention</h2>
            <p>
              We retain personal data as long as necessary for the purposes
              stated in this policy and for legal compliance. Usage data is
              generally retained for shorter periods unless needed for security
              or functionality improvements.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Data Transfer</h2>
            <p>
              Your information may be processed outside your jurisdiction. By
              submitting information, you consent to such transfers. We take all
              steps reasonably necessary to ensure your data is treated securely.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Disclosure of Data</h2>
            <p className="mb-4">
              We may disclose your data:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>In business transactions (mergers, acquisitions)</li>
              <li>To law enforcement when required by law</li>
              <li>For legal compliance</li>
              <li>To protect our rights, property, and safety</li>
              <li>Against legal liability</li>
            </ul>
          </section>

          <section>
            <h2 className="heading2 mb-4">Security</h2>
            <p>
              No method of transmission over the Internet is 100% secure. We use
              commercially acceptable means to protect your personal data but
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Third-Party Service Providers</h2>
            <p className="mb-4">
              <strong>Google Analytics</strong> &mdash; We use Google Analytics
              to track website traffic. You can opt out via the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                Google Analytics browser add-on
              </a>
              .
            </p>
            <p>
              <strong>Email Marketing</strong> &mdash; We use Mailchimp and
              HubSpot for newsletters and promotional communications.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">GDPR Privacy Rights</h2>
            <p className="mb-4">
              If you are in the European Economic Area, your rights include:
            </p>
            <ul className="mb-4 list-disc space-y-1 pl-6">
              <li>Access, update, or delete your personal data</li>
              <li>Correct incomplete or inaccurate information</li>
              <li>Object to processing of your data</li>
              <li>Request data erasure</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>
              You may file complaints with your local Data Protection Authority.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">
              CCPA Privacy (California Residents)
            </h2>
            <p className="mb-4">
              Categories of personal information we collect:
            </p>
            <ul className="mb-6 list-disc space-y-1 pl-6">
              <li>Identifiers (name, email, IP address)</li>
              <li>Customer records (phone, address, financial information)</li>
              <li>Internet activity</li>
              <li>Other categories as defined by the CCPA</li>
            </ul>
            <p className="mb-4">California residents have the right to:</p>
            <ul className="mb-4 list-disc space-y-1 pl-6">
              <li>Receive notice of data collection</li>
              <li>Request disclosure of collected data</li>
              <li>Opt out of personal data sales</li>
              <li>Delete personal data (with certain exceptions)</li>
              <li>Non-discrimination for exercising these rights</li>
            </ul>
            <p>
              Requests may be submitted by mail to: 244 Brainerd Street, South
              Hadley, MA 01075.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Children&apos;s Privacy</h2>
            <p>
              Our service does not address anyone under the age of 13. If you
              believe your child has provided personal data, please contact us so
              we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Links to Other Websites</h2>
            <p>
              Our site may contain links to third-party websites with separate
              privacy policies. We assume no responsibility for the content,
              privacy policies, or practices of external sites.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will
              be posted on this page, and we will notify you via email or a
              prominent notice on our website.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, contact us:
            </p>
            <ul className="mt-3 list-none space-y-1 pl-0">
              <li>
                <strong>Mail:</strong> 1981 Memorial Drive, #277, Chicopee, MA
                01020-4322
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@synteq.digital"
                  className="underline underline-offset-2"
                >
                  info@synteq.digital
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </Section>
  );
}
