import { Section } from "@/components/Section";
import { getWritingBySlug, getAllWritings } from "@/content/writing";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export async function generateStaticParams() {
    const writings = getAllWritings();
    return writings.map((writing) => ({
        slug: writing.slug,
    }));
}

// metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const writing = getWritingBySlug(slug);

    if (!writing) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: writing.title,
        description: writing.excerpt,
    };
}

export default async function WritingPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const writing = getWritingBySlug(slug);

    if (!writing) {
        notFound();
    }

    // maybe need to use react-markdown if needed
    const renderContent = (content: string) => {
        const lines = content.split("\n");
        const elements: React.ReactNode[] = [];
        let currentParagraph: (string | React.ReactNode)[] = [];
        let inCodeBlock = false;
        let codeBlockContent: string[] = [];
        let codeBlockLanguage = "";
        let inList = false;
        let listItems: string[] = [];

        const flushParagraph = () => {
            if (currentParagraph.length > 0) {
                const text = currentParagraph.join(" ");
                if (text.trim()) {
                    elements.push(
                        <p key={elements.length} className="mt-4 text-base leading-relaxed">
                            {currentParagraph}
                        </p>
                    );
                }
                currentParagraph = [];
            }
        };

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={elements.length} className="mt-4 ml-6 list-disc space-y-2">
                        {listItems.map((item, idx) => (
                            <li key={idx} className="text-base leading-relaxed">
                                {item}
                            </li>
                        ))}
                    </ul>
                );
                listItems = [];
            }
            inList = false;
        };

        const flushCodeBlock = () => {
            if (codeBlockContent.length > 0) {
                const code = codeBlockContent.join("\n");
                elements.push(
                    <pre
                        key={elements.length}
                        className="mt-4 p-4 bg-[var(--muted)]/10 rounded overflow-x-auto"
                    >
                        <code className="text-sm">{code}</code>
                    </pre>
                );
                codeBlockContent = [];
                codeBlockLanguage = "";
            }
        };

        lines.forEach((line, index) => {
            if (line.startsWith("```")) {
                if (inCodeBlock) {
                    flushCodeBlock();
                    inCodeBlock = false;
                } else {
                    flushParagraph();
                    flushList();
                    codeBlockLanguage = line.slice(3).trim();
                    inCodeBlock = true;
                }
                return;
            }

            if (inCodeBlock) {
                codeBlockContent.push(line);
                return;
            }

            if (line.startsWith("# ")) {
                flushParagraph();
                flushList();
                elements.push(
                    <h1 key={elements.length} className="mt-8 text-2xl font-semibold">
                        {line.slice(2)}
                    </h1>
                );
                return;
            }

            if (line.startsWith("## ")) {
                flushParagraph();
                flushList();
                elements.push(
                    <h2 key={elements.length} className="mt-6 text-xl font-semibold">
                        {line.slice(3)}
                    </h2>
                );
                return;
            }

            if (line.startsWith("### ")) {
                flushParagraph();
                flushList();
                elements.push(
                    <h3 key={elements.length} className="mt-4 text-lg font-semibold">
                        {line.slice(4)}
                    </h3>
                );
                return;
            }

            if (line.trim().startsWith("- ")) {
                flushParagraph();
                if (!inList) {
                    inList = true;
                }
                listItems.push(line.trim().slice(2));
                return;
            }

            if (inList && !line.trim().startsWith("- ")) {
                flushList();
            }

            if (line.includes("`")) {
                const parts = line.split("`");
                const processedParts: (string | React.ReactNode)[] = [];
                parts.forEach((part, i) => {
                    if (i % 2 === 1) {
                        // This is code
                        processedParts.push(
                            <code
                                key={i}
                                className="px-1 py-0.5 bg-[var(--muted)]/20 rounded text-sm font-mono"
                            >
                                {part}
                            </code>
                        );
                    } else {
                        processedParts.push(part);
                    }
                });
                currentParagraph.push(...processedParts);
                return;
            }

            if (line.trim() === "") {
                flushParagraph();
            } else {
                currentParagraph.push(line);
            }
        });

        flushParagraph();
        flushList();
        flushCodeBlock();

        return elements;
    };

    return (
        <Section>
            <Link
                href="/writing"
                className="text-sm text-[var(--muted)] hover:text-[var(--fg)] mb-6 inline-block"
            >
                ← Back to Writing
            </Link>

            <article>
                <h1 className="text-3xl font-semibold">{writing.title}</h1>
                <p className="mt-2 text-sm text-[var(--muted)]">
                    {formatDate(writing.date)}
                </p>

                {writing.tags && writing.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
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

                <div className="mt-8 prose prose-invert max-w-none">
                    {renderContent(writing.content)}
                </div>
            </article>
        </Section>
    );
}
