export function sanitizeChatText(text: string, userQuery?: string): string {
  if (!text) return "";
  let t = text;
  // Strip Markdown bullets and emphasis
  t = t.replace(/[\*`_]/g, "");
  t = t.replace(/^\s*[-•]\s*/gm, "");
  // Collapse whitespace
  t = t.replace(/\s+/g, " ").trim();

  // Prefer the first sentence or cap length
  const firstSentenceMatch = t.match(/^(.*?[.!?])\s/);
  if (firstSentenceMatch) {
    t = firstSentenceMatch[1].trim();
  }

  if (t.length > 160) {
    t = t.slice(0, 157).trim() + "...";
  }
  return t;
}
