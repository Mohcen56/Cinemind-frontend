export function sanitizeChatText(text: string, userQuery?: string): string {
  if (!text) return "";
  let t = text;
  // Strip Markdown bullets and emphasis
  t = t.replace(/[\*`_]/g, "");
  t = t.replace(/^\s*[-•]\s*/gm, "");
  // Collapse whitespace
  t = t.replace(/\s+/g, " ").trim();

  // If the user asked for saved/watchlist, be concise
  if (userQuery && /saved|watchlist|later/i.test(userQuery)) {
    return "Here are picks from your saved list.";
  }

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
