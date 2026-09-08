import { profile, projects } from "@/data/public";
export const dynamic = "force-static";
export function GET() {
  const body = [`# ${profile.name}`, "", profile.proposition, "", `Canonical website: ${profile.domain}`, `GitHub: ${profile.github}`, `LinkedIn: ${profile.linkedin}`, "", "## Selected work", ...projects.map((project) => `- ${project.title}: ${project.statement}${project.href ? ` (${project.href})` : ""}`), "", "Machine-readable profile: /profile.json", "Machine-readable projects: /projects.json"].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
