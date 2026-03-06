import { Section } from "@/app/_components/section";

export const metadata = {
  title: "Terms of Use | Synteq Digital",
  description:
    "Synteq Digital terms of use — rules and conditions for using our website and services.",
};

export default function TermsOfServicePage() {
  return (
    <Section className="pt-24 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="title mb-4">Terms of Use</h1>
        <p className="mb-12 text-sm text-slate">Last updated: June 19, 2024</p>

        <div className="space-y-10 text-body leading-relaxed text-lava-90">
          <section>
            <p>
              SYNTEQ.DIGITAL is a website operated by Synteq Digital Operations
              US LLC and its affiliates (&ldquo;Synteq&rdquo;). By visiting the
              site, you accept these terms and agree to comply with them. If you
              disagree with any part of these terms, you must not use the site.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Changes to Terms &amp; Site</h2>
            <p>
              Synteq may amend these terms periodically. We may update and change
              the site at any time and do not guarantee continuous availability
              or uninterrupted service.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Privacy Policy</h2>
            <p>
              Please review our{" "}
              <a
                href="/privacy-policy"
                className="underline underline-offset-2"
              >
                Privacy Policy
              </a>{" "}
              to understand how we collect and process your data when you visit
              our site.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Electronic Communications</h2>
            <p>
              By visiting or emailing Synteq, you consent to receiving
              electronic communications. All agreements, notices, disclosures,
              and other communications provided electronically satisfy any legal
              requirement that such communications be in writing.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Using Material on This Site</h2>
            <p className="mb-4">
              Synteq owns all intellectual property rights in the site and its
              content. You may print or download extracts for personal use only
              and must acknowledge Synteq as the author.
            </p>
            <p className="mb-4">
              Commercial use of any material requires a license, which can be
              obtained by contacting{" "}
              <a
                href="mailto:legal@synteq.digital"
                className="underline underline-offset-2"
              >
                legal@synteq.digital
              </a>
              .
            </p>
            <p>
              Prohibited activities include probing site vulnerabilities, tracing
              other users, and any unlawful use.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">License &amp; Site Access</h2>
            <p>
              Synteq grants a limited, non-exclusive license for personal use
              only. The site cannot be reproduced, duplicated, copied, sold, or
              commercially exploited without written consent. Hyperlinks to the
              home page are permitted as long as they do not portray the company
              in a misleading way.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Your Account</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password security. Synteq reserves the right to refuse
              service and terminate accounts at its discretion.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">No Offer or Advice</h2>
            <p>
              Site content is informational only and does not constitute
              professional advice. You should obtain independent professional
              guidance before relying on site information or making decisions
              based on it.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Links to Other Websites</h2>
            <p>
              Third-party links are provided for convenience and do not
              constitute endorsement. Synteq has no control over linked sites and
              excludes liability for their content, accuracy, or security.
              Third-party sites operate under their own separate privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">
              Disclaimer of Warranties &amp; Limitation of Liability
            </h2>
            <p className="mb-4">
              Synteq makes no claim or representations regarding the accuracy or
              completeness of site content. The site and all content are provided
              &ldquo;as is&rdquo; and &ldquo;as available.&rdquo;
            </p>
            <p>
              Synteq disclaims all warranties, express or implied, and is not
              liable for any indirect, consequential, or special damages,
              including business interruption and lost profits, arising from the
              use of this site.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Copyright Complaints</h2>
            <p>
              Report any copyright infringement to{" "}
              <a
                href="mailto:legal@synteq.digital"
                className="underline underline-offset-2"
              >
                legal@synteq.digital
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Viruses</h2>
            <p>
              You must configure your own systems for accessing this site and use
              appropriate antivirus protection. Introducing malicious code is
              prohibited and may constitute a criminal offense.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Applicable Law</h2>
            <p>
              These terms are governed by the laws of the State of Delaware, with
              non-exclusive jurisdiction in Delaware courts.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">Termination</h2>
            <p>
              Synteq reserves the right to terminate your access without notice
              if your conduct violates these terms.
            </p>
          </section>

          <section>
            <h2 className="heading2 mb-4">
              Modification &amp; Severability
            </h2>
            <p>
              Synteq reserves the right to modify the site and these policies at
              any time. If any provision is found to be invalid or unenforceable,
              the remaining provisions remain in full effect.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
