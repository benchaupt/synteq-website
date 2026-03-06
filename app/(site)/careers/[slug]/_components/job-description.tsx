interface Props {
  markdown: string;
}

export function JobDescription({ markdown }: Props) {
  const html = markdownToHtml(markdown);

  return (
    <div
      className="prose max-w-none text-lava-90 prose-headings:text-lava prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-ul:my-3 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-1.5 prose-li:leading-relaxed prose-hr:my-10 prose-hr:border-cream prose-strong:text-lava"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const result: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      if (inList) { result.push(`</${listType}>`); inList = false; }
      const level = headingMatch[1].length;
      result.push(`<h${level}>${inlineFormat(headingMatch[2])}</h${level}>`);
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      if (inList) { result.push(`</${listType}>`); inList = false; }
      result.push("<hr />");
      continue;
    }

    // Unordered list item
    const ulMatch = line.match(/^(\s*)- (.+)$/);
    if (ulMatch) {
      if (!inList) { result.push("<ul>"); inList = true; listType = "ul"; }
      const indent = ulMatch[1].length >= 2;
      result.push(`<li${indent ? ' class="ml-4"' : ""}>${inlineFormat(ulMatch[2])}</li>`);
      continue;
    }

    // Ordered list item
    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== "ol") {
        if (inList) result.push(`</${listType}>`);
        result.push("<ol>");
        inList = true;
        listType = "ol";
      }
      result.push(`<li>${inlineFormat(olMatch[2])}</li>`);
      continue;
    }

    // Empty line — close list if open
    if (line.trim() === "") {
      if (inList) { result.push(`</${listType}>`); inList = false; }
      continue;
    }

    // Paragraph
    if (inList) { result.push(`</${listType}>`); inList = false; }
    result.push(`<p>${inlineFormat(line)}</p>`);
  }

  if (inList) result.push(`</${listType}>`);

  return result.join("\n");
}

function inlineFormat(text: string): string {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic
  text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  return text;
}
