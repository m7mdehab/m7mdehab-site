import { profile, projects } from "@/data/public";

export const dynamic = "force-static";

export function GET() {
  const projectLines = projects.map((project) => {
    const href = "href" in project ? project.href : undefined;
    const caseStudy = `${profile.domain}/work/${project.slug}`;
    const evidence = href ? ` · [Public evidence](${href})` : "";
    return `- **${project.title}** — ${project.statement} · [Case study](${caseStudy})${evidence}`;
  });

  const body = [
    `# ${profile.name}`,
    "",
    profile.proposition,
    "",
    `- [Canonical website](${profile.domain})`,
    `- [GitHub](${profile.github})`,
    `- [LinkedIn](${profile.linkedin})`,
    "",
    "## Selected work",
    ...projectLines,
    "",
    "## Machine-readable resources",
    `- [Profile JSON](${profile.domain}/profile.json)`,
    `- [Projects JSON](${profile.domain}/projects.json)`,
  ].join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
