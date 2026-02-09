export function slugifyTopic(topic: string): string {
  const normalized = topic
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "skill";
}
