import { Section } from "@/components/Section";
import { getAllWritings } from "@/content/writing";
import Link from "next/link";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function Writing() {
    const writings = getAllWritings();

    return (
        <Section>
            <h1 className="text-3xl font-semibold">Writing</h1>
            <p className="mt-4 text-[var(--muted)]">
                Thoughts, tutorials, and reflections on software engineering and technology.
            </p>

            {writings.length === 0 ? (
                <p className="mt-8 text-base text-[var(--muted)]">
                    No posts yet. Check back soon!
                </p>
            ) : (
                <div className="mt-8 space-y-8">
                    {writings.map((writing) => (
                        <article key={writing.id}>
                            <Link
                                href={`/writing/${writing.slug}`}
                                className="block group"
                            >
                                <h2 className="text-lg font-semibold group-hover:text-[var(--fg)] transition-colors">
                                    {writing.title}
                                </h2>
                                <p className="mt-2 text-sm text-[var(--muted)]">
                                    {formatDate(writing.date)}
                                </p>
                                <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                                    {writing.excerpt}
                                </p>
                                {writing.tags && writing.tags.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {writing.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-1 rounded bg-[var(--muted)]/20 text-[var(--muted)]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </Section>
    );
}
