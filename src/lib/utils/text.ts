export function sanitizeChatText(text: string, userQuery?: string): string {
  if (!text) return "";
  let t = text;
  // Strip Markdown bullets and emphasis
  t = t.replace(/[\*`_]/g, "");
  t = t.replace(/^\s*[-•]\s*/gm, "");
  // Collapse whitespace
  t = t.replace(/\s+/g, " ").trim();

 

  return t;
}
