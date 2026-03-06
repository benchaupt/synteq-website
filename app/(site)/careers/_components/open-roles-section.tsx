import { Section } from "@/app/_components/section";
import { Button } from "@/app/_components/button";
import { getJobListings } from "@/lib/payload/job-listings";
import { OpenRolesList } from "./open-roles-list";

export async function OpenRolesSection() {
  const jobs = await getJobListings();

  if (jobs.length === 0) {
    return (
      <Section background="white" id="open-roles">
        <div className="py-16">
          <h2 className="heading1 mb-4">Want to Make an Impact? <br /> We&apos;d Love to Meet You</h2>
          <p className="text-lava text-body mb-8">
            While we have no published listings at the moment, we&apos;re always looking for exceptional talent to join our team.
          </p>
          <Button variant="primary" size="md" href="/contact">
            Get in Touch
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section background="white" id="open-roles">
      <div className="py-16">
        <h2 className="heading mb-8">Want to Make an Impact? <br /> We&apos;d Love to Meet You</h2>
        <OpenRolesList
          jobs={jobs.map((job) => ({
            id: job.id,
            name: job.name,
            slug: job.slug,
            department: job.department,
            workLocation: job.workLocation,
            employmentType: job.employmentType,
          }))}
        />
      </div>
    </Section>
  );
}
