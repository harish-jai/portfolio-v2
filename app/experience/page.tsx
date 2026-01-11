import { Section } from "@/components/Section";
import { experiences } from "@/content/experience";

export default function Experience() {
    return (
        <Section>
            <h1 className="text-3xl font-semibold">Experience</h1>
            <p className="mt-4 text-[var(--muted)]">
                <a href="/Jaisankar_Harish_Resume.pdf" className="text-[var(--muted)] hover:text-[var(--fg)]" target="_blank" rel="noopener noreferrer">Click to view my Resume</a>
            </p>

            <div className="mt-8 space-y-12">
                {experiences.map((exp) => (
                    <section key={exp.id} id={exp.id}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">{exp.company}</h2>
                                <p className="text-base text-[var(--muted)]">{exp.role} · {exp.team}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 text-sm text-[var(--muted)]">
                                <p>{exp.dates}</p>
                                {exp.location && <p>{exp.location}</p>}
                            </div>
                        </div>

                        {exp.blurb && (
                            <div className="mt-4 space-y-3">
                                {exp.blurb
                                    .split('/paragraph-break/')
                                    .map(para => para.trim())
                                    .filter(para => para.length > 0)
                                    .map((para, idx) => (
                                        <p key={idx} className="text-base leading-relaxed">
                                            {para}
                                        </p>
                                    ))}
                            </div>
                        )}

                        {exp.stack.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm text-[var(--muted)]">
                                    Technologies: {exp.stack.join(", ")}
                                </p>
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </Section>
    );
}
