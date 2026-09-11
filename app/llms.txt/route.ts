import { profile } from "@/data/public";
import { projectRecords, serviceRecords, writingRecords } from "@/data/discoverability";

export const dynamic = "force-static";

export function GET() {
  const projectLines = projectRecords.map((project) => {
    const evidence = project.publicEvidenceUrl ? ` · [Public evidence](${project.publicEvidenceUrl})` : "";
    const services = project.directServices.length
      ? ` · Direct services: ${project.directServices.map((service) => service.title).join(", ")}`
      : "";
    return `- **${project.title}** — ${project.statement} · [Case study](${project.caseStudyUrl})${evidence}${services}`;
  });

  const serviceLines = serviceRecords.map((service) =>
    `- **${service.title}** — ${service.description} Proof: ${service.proofLabel}. [Service context](${service.url})`,
  );

  const writingLines = writingRecords.map((article) =>
    `- **${article.title}** — ${article.description} · Derived from: ${article.derivedFromProject.title} · [Essay](${article.url})`,
  );

  const body = [
    `# ${profile.name}`,
    "",
    profile.proposition,
    "",
    `- [Canonical website](${profile.domain})`,
    `- [GitHub](${profile.github})`,
    `- [LinkedIn](${profile.linkedin})`,
    "",
    "## Services",
    ...serviceLines,
    "",
    "## Selected work",
    ...projectLines,
    "",
    "## Writing",
    ...writingLines,
    "",
    "## Interpretation notes",
    "- Service proof is intentionally asymmetric. Public project evidence is used only where it directly supports the claim.",
    "- Authority writing is first-hand editorial analysis derived from inspectable project evidence; it does not widen the underlying project's publication or ownership claims.",
    "- Presaira and Solar Site Selection may demonstrate analytical reasoning, but they are not represented as Power BI artifacts.",
    "- Enterprise migration work is represented only at a public-safe experience level; confidential client systems, mappings and outputs are not reconstructed for the site.",
    "- Project ownership language is project-specific; product leadership is not inflated into sole coding where the evidence does not support that claim.",
    "",
    "## Machine-readable resources",
    `- [Profile JSON](${profile.domain}/profile.json)`,
    `- [Projects JSON](${profile.domain}/projects.json)`,
    `- [Services JSON](${profile.domain}/services.json)`,
    `- [Writing JSON](${profile.domain}/writing.json)`,
  ].join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}