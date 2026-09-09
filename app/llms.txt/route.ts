import { profile, projects } from "@/data/public";

export const dynamic = "force-static";

export function GET() {
  const projectLines = projects.map((project) => {
    const href = "href" in project ? project.href : undefined;
    return `- ${project.title}: ${project.statement}${href ? ` (${href})` : ""}`;
  });

  const body = [
    `# ${profile.name}`,
    "",
    profile.proposition,
    "",
    `Canonical website: ${profile.domain}`,
    `GitHub: ${profile.github}`,
    `LinkedIn: ${profile.linkedin}`,
    "",
    "## Selected work",
    ...projectLines,
    "",
    "Machine-readable profile: /profile.json",
    "Machine-readable projects: /projects.json",
  ].join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
