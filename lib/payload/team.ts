import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";

export const getAllTeamMembers = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const members = await payload.find({
      collection: "team-members",
      depth: 1,
      limit: 100,
      sort: "sortOrder",
    });
    return members.docs;
  },
  ["team-members"],
  { tags: ["team-members"], revalidate: 600 },
);

export async function getTeamMembers(department?: string) {
  const all = await getAllTeamMembers();
  if (!department) return all;
  return all.filter((m) => {
    const deps = m.department;
    if (Array.isArray(deps)) return (deps as string[]).includes(department);
    return deps === department;
  });
}

export async function getTeamByDepartments(departments: string[]) {
  const all = await getAllTeamMembers();
  return all.filter((m) => {
    const deps = m.department;
    if (Array.isArray(deps))
      return deps.some((d: string) => departments.includes(d));
    return departments.includes(deps as string);
  });
}
