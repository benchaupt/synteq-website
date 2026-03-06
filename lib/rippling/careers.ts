const BOARD_SLUG = "synteq-digital";
const JOBS_URL = `https://ats.rippling.com/${BOARD_SLUG}/jobs`;

interface RipplingJobListItem {
  id: string;
  name: string;
  department: { name: string };
  locations: Array<{ name: string; workplaceType: string }>;
}

interface RipplingJobDetail {
  uuid: string;
  name: string;
  department: { name: string };
  workLocations: string[];
  employmentType: { label: string; id: string };
  description: { company?: string; role?: string };
}

interface RipplingPageData {
  props: {
    pageProps: {
      apiData: {
        jobBoardSlug: string;
      };
      dehydratedState: {
        queries: Array<{
          state: {
            data: {
              items: RipplingJobListItem[];
              totalItems: number;
              totalPages: number;
            };
          };
          queryKey: unknown[];
        }>;
      };
    };
  };
}

interface RipplingDetailPageData {
  props: {
    pageProps: {
      apiData: {
        jobPost: RipplingJobDetail;
      };
    };
  };
}

export interface ScrapedJob {
  ripplingId: string;
  name: string;
  department: string;
  workLocation: string;
  employmentType: string;
  descriptionMarkdown: string;
  slug: string;
}

function extractNextData(html: string): unknown {
  const startMarker = '<script id="__NEXT_DATA__" type="application/json">';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) throw new Error("Could not find __NEXT_DATA__ in page");
  const jsonStart = startIdx + startMarker.length;
  const endIdx = html.indexOf("</script>", jsonStart);
  if (endIdx === -1) throw new Error("Could not find end of __NEXT_DATA__");
  return JSON.parse(html.slice(jsonStart, endIdx));
}

/**
 * Convert Rippling's inline-styled HTML into clean markdown.
 * Handles: p, h1-h4, ul/ol/li, b/strong, i/em, br, hr, span, meta
 */
function htmlToMarkdown(html: string): string {
  let text = html;

  // Remove <meta> tags
  text = text.replace(/<meta[^>]*>/gi, "");

  // Headings (h1-h4) — extract inner text
  text = text.replace(/<h1[^>]*>(.*?)<\/h1>/gi, (_, content) => `# ${stripTags(content)}\n\n`);
  text = text.replace(/<h2[^>]*>(.*?)<\/h2>/gi, (_, content) => `## ${stripTags(content)}\n\n`);
  text = text.replace(/<h3[^>]*>(.*?)<\/h3>/gi, (_, content) => `### ${stripTags(content)}\n\n`);
  text = text.replace(/<h4[^>]*>(.*?)<\/h4>/gi, (_, content) => `#### ${stripTags(content)}\n\n`);

  // Bold
  text = text.replace(/<b[^>]*>(.*?)<\/b>/gi, (_, content) => `**${stripTags(content)}**`);
  text = text.replace(/<strong[^>]*>(.*?)<\/strong>/gi, (_, content) => `**${stripTags(content)}**`);

  // Italic
  text = text.replace(/<i[^>]*>(.*?)<\/i>/gi, (_, content) => `*${stripTags(content)}*`);
  text = text.replace(/<em[^>]*>(.*?)<\/em>/gi, (_, content) => `*${stripTags(content)}*`);

  // Line breaks
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Horizontal rules
  text = text.replace(/<hr\s*\/?>/gi, "\n---\n\n");

  // List items — convert before stripping ul/ol
  // Nested lists: items inside nested ul get "  - " prefix
  text = text.replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, (match) => {
    return processListBlock(match, false);
  });
  text = text.replace(/<ol[^>]*>[\s\S]*?<\/ol>/gi, (match) => {
    return processListBlock(match, true);
  });

  // Paragraphs
  text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, (_, content) => {
    const cleaned = stripTags(content).trim();
    return cleaned ? `${cleaned}\n\n` : "\n";
  });

  // Strip remaining tags (span, div, etc.)
  text = stripTags(text);

  // Clean up excessive whitespace
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.replace(/\*\*\*\*/g, "**"); // Fix double-bold from nested b>strong

  return text.trim();
}

function processListBlock(html: string, ordered: boolean): string {
  const lines: string[] = [];
  let counter = 1;

  // Extract list items, handling nesting
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;
  while ((match = liRegex.exec(html)) !== null) {
    const content = match[1];

    // Check if this li contains a nested list — if so, skip it as a container
    if (content.match(/<[uo]l[^>]*>/i) && !stripTags(content.replace(/<[uo]l[\s\S]*<\/[uo]l>/gi, "")).trim()) {
      continue;
    }

    // Check nesting depth by looking at surrounding context
    const beforeMatch = html.slice(0, match.index);
    const depth = (beforeMatch.match(/<[uo]l[^>]*>/gi) || []).length - (beforeMatch.match(/<\/[uo]l>/gi) || []).length - 1;
    const indent = "  ".repeat(Math.max(0, depth));

    const cleanContent = stripTags(content.replace(/<[uo]l[\s\S]*<\/[uo]l>/gi, "")).trim();
    if (!cleanContent) continue;

    const prefix = ordered && depth === 0 ? `${counter++}. ` : "- ";
    lines.push(`${indent}${prefix}${cleanContent}`);
  }

  return lines.join("\n") + "\n\n";
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
}

function slugify(name: string, id: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}-${id.slice(0, 8)}`;
}

export function getApplyUrl(ripplingId: string): string {
  return `https://ats.rippling.com/${BOARD_SLUG}/jobs/${ripplingId}/apply?jobBoardSlug=${BOARD_SLUG}&jobId=${ripplingId}&step=application`;
}

export function getRipplingJobUrl(ripplingId: string): string {
  return `https://ats.rippling.com/${BOARD_SLUG}/jobs/${ripplingId}`;
}

async function fetchJobIds(): Promise<RipplingJobListItem[]> {
  const res = await fetch(JOBS_URL, {
    headers: { "User-Agent": "SynteqDigital-JobSync/1.0" },
  });
  if (!res.ok) throw new Error(`Failed to fetch jobs list: ${res.status}`);
  const html = await res.text();
  const data = extractNextData(html) as RipplingPageData;

  const queries = data.props.pageProps.dehydratedState.queries;
  const jobQuery = queries.find(
    (q) =>
      Array.isArray(q.queryKey) &&
      q.queryKey.includes("job-posts")
  );

  if (!jobQuery) throw new Error("Could not find job-posts query in page data");
  return jobQuery.state.data.items;
}

async function fetchJobDetail(jobId: string): Promise<ScrapedJob> {
  const url = `${JOBS_URL}/${jobId}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "SynteqDigital-JobSync/1.0" },
  });
  if (!res.ok) throw new Error(`Failed to fetch job detail ${jobId}: ${res.status}`);
  const html = await res.text();
  const data = extractNextData(html) as RipplingDetailPageData;

  const job = data.props.pageProps.apiData.jobPost;

  const descriptionParts = [
    job.description.role || "",
    job.description.company || "",
  ].filter(Boolean);

  const combinedHtml = descriptionParts.join("\n<hr/>\n");

  return {
    ripplingId: job.uuid,
    name: job.name,
    department: job.department?.name || "",
    workLocation: job.workLocations?.[0] || "",
    employmentType: job.employmentType?.id || "",
    descriptionMarkdown: htmlToMarkdown(combinedHtml),
    slug: slugify(job.name, job.uuid),
  };
}

export async function scrapeAllJobs(): Promise<ScrapedJob[]> {
  const jobItems = await fetchJobIds();
  const jobs: ScrapedJob[] = [];

  for (const item of jobItems) {
    const detail = await fetchJobDetail(item.id);
    jobs.push(detail);
  }

  return jobs;
}
