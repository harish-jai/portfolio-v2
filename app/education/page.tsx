import { Section } from "@/components/Section";
import { educationTracks, school } from "@/content/education";

export default function Education() {
    return (
        <Section>
            <h1 className="text-3xl font-semibold">{school.name}</h1>
            <p className=" text-xl mt-4 text-base">
                {school.degree}
            </p>

            <div className="mt-8 space-y-12">
                {educationTracks.map((track) => (
                    <div key={track.track}>
                        <h2 className="text-2xl font-semibold mb-4">{track.track} Courses</h2>
                        <div className="space-y-6">
                            {track.courses.map((course) => (
                                <section key={course.id} id={course.id}>
                                    <h3 className="text-xl font-semibold">{course.id}: {course.name}</h3>
                                    {course.technologies && course.technologies.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-base text-[var(--muted)]">
                                                Technologies: {course.technologies.join(", ")}
                                            </p>
                                        </div>
                                    )}
                                    {course.blurb && (
                                        <p className="mt-4 text-base leading-relaxed">
                                            {course.blurb}
                                        </p>
                                    )}
                                    {course.projects && course.projects.length > 0 && (
                                        <div className="mt-4">
                                            <ul className="space-y-3">
                                                {course.projects.map((project, idx) => (
                                                    <li key={idx}>
                                                        <p className="text-base font-semibold">
                                                            {project.title}
                                                        </p>
                                                        <p className="text-base text-[var(--muted)] leading-relaxed">
                                                            {project.description}
                                                        </p>
                                                        {project.links && project.links.length > 0 && (
                                                            <div className="mt-2 space-x-4">
                                                                {project.links.map((link, linkIdx) => {
                                                                    const isPDF = link.endsWith('.pdf');
                                                                    const linkText = isPDF ? 'Paper' : (link.includes('github.com') ? 'GitHub' : 'Link');
                                                                    return (
                                                                        <a
                                                                            key={linkIdx}
                                                                            href={link}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-sm text-[var(--muted)] hover:text-[var(--fg)] underline"
                                                                        >
                                                                            {linkText}
                                                                        </a>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <hr className="mt-6 border-[var(--muted)]" />
                                </section>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}