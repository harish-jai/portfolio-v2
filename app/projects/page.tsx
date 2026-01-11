import { Section } from "@/components/Section";
import { projects } from "@/content/projects";

export default function Projects() {
    return (
        <Section>
            <h1 className="text-3xl font-semibold">Projects</h1>
            <p className="mt-4 text-[var(--muted)]">
                Projects I've built with demos and source code.
            </p>

            {projects.length === 0 ? (
                <p className="mt-8 text-base text-[var(--muted)]">
                    No projects listed yet.
                </p>
            ) : (
                <div className="mt-8 space-y-12">
                    {projects.map((project) => (
                        <section key={project.id} id={project.id}>
                            <h2 className="text-lg font-semibold">{project.name}</h2>
                            <p className="mt-2 text-base leading-relaxed">{project.blurb}</p>

                            {project.details && (
                                <p className="mt-4 text-base leading-relaxed">{project.details}</p>
                            )}

                            {project.stack.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-[var(--muted)]">
                                        Tech Stack: {project.stack.join(", ")}
                                    </p>
                                </div>
                            )}

                            {project.links && (project.links.github || project.links.demo) && (
                                <div className="mt-4 space-x-4">
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            className="text-sm text-[var(--muted)] hover:text-[var(--fg)]"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                    {project.links.demo && (
                                        <a
                                            href={project.links.demo}
                                            className="text-sm text-[var(--muted)] hover:text-[var(--fg)]"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Demo
                                        </a>
                                    )}
                                </div>
                            )}
                        </section>
                    ))}
                </div>
            )}
        </Section>
    );
}
