import Link from "next/link";
import { ArrowUpRight, BarChart3, Blocks, BrainCircuit, DatabaseZap, Mail, ShieldCheck } from "lucide-react";
import { emailComposeHref } from "@/data/contact-links";
import { projects, services } from "@/data/public";
import { Reveal } from "@/components/reveal";

function cleanText(value: string) {
  return value.replaceAll(" — ", " · ").replaceAll("—", "·");
}

const serviceIcons = [DatabaseZap, BarChart3, BrainCircuit, Blocks] as const;

export function ServicesPageView() {
  return (
    <div className="services-modern">
      <section className="services-modern-hero shell">
        <Reveal className="services-modern-hero-copy">
          <p className="eyebrow">Services · Evidence first</p>
          <h1>Useful outcomes, backed by the <em>right kind of proof.</em></h1>
          <p>Data migration, analytics, ML/AI and product delivery. Each service is framed by what can be demonstrated publicly and what remains experience-backed because of confidentiality or publication limits.</p>
        </Reveal>
        <Reveal delay={0.08} className="services-modern-principle">
          <span aria-hidden="true"><ShieldCheck size={22} /></span>
          <strong>Clear boundaries are part of the service.</strong>
          <p>No inflated capability claims, no generic cross-sell and no pretending every engagement produces the same public evidence.</p>
        </Reveal>
      </section>

      <section id="services" className="services-modern-grid shell" aria-label="Service areas">
        {services.map((service, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];
          const relatedProjects = service.projectSlugs
            .map((slug) => projects.find((project) => project.slug === slug))
            .filter((project): project is (typeof projects)[number] => Boolean(project));

          return (
            <Reveal as="article" key={service.id} delay={index * 0.05} className="services-modern-card service-card" id={`service-${service.id}`}>
              <div className="services-modern-card-top">
                <span className="services-modern-icon" aria-hidden="true"><Icon size={21} /></span>
                <span className="services-modern-proof">{cleanText(service.proofLabel)}</span>
              </div>
              <p className="services-modern-capability">{cleanText(service.capability)}</p>
              <h2>{cleanText(service.title)}</h2>
              <p className="services-modern-description">{cleanText(service.description)}</p>
              <div className="services-modern-evidence">
                <small>Evidence</small>
                <p>{cleanText(service.evidence)}</p>
              </div>
              <div className="services-modern-context">
                <small>Context</small>
                <p>{cleanText(service.projectContext)}</p>
                {relatedProjects.length ? (
                  <div className="services-modern-projects" aria-label={`${service.title} evidence projects`}>
                    {relatedProjects.map((project) => (
                      <Link key={project.slug} href={`/work/${project.slug}`} data-conversion="service-to-project" data-service-id={service.id}>
                        {cleanText(project.title)} <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
              <a
                className="services-modern-contact"
                href={emailComposeHref(service.contactSubject)}
                target="_blank"
                rel="noreferrer"
                data-conversion="service-to-contact"
                data-service-id={service.id}
              >
                Discuss this work <Mail size={15} aria-hidden="true" />
              </a>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
