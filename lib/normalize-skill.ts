export function normalizeSkillName(name: string): string {
  return name
    .replace(/\([^)]*\)/g, "")
    .trim()
    .toLowerCase()
}
