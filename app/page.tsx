import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

export default function Home() {
    return (
        <Section>
            <section id={profile.id}>
                <h1 className="text-3xl font-semibold">{profile.name}</h1>

                <p className="mt-2 text-[var(--muted)]">
                    {profile.location} · <a href={`mailto:${profile.email}`} className="text-[var(--muted)] hover:text-[var(--fg)]" target="_blank" rel="noopener noreferrer">Email</a> · <a href={profile.linkedin} className="text-[var(--muted)] hover:text-[var(--fg)]" target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href={profile.github} className="text-[var(--muted)] hover:text-[var(--fg)]" target="_blank" rel="noopener noreferrer">GitHub</a>
                </p>

                <p className="mt-6 text-base leading-relaxed">
                    {profile.bio}
                </p>

                <p className="mt-6 text-base leading-relaxed">
                    I'm currently working on <a href={profile.currentProjectUrl} className="text-[var(--muted)] hover:text-[var(--fg)]" target="_blank" rel="noopener noreferrer">{profile.currentProjectName}</a>, a coffee chat scheduling tool..
                </p>

                <details className="mt-12" open>
                    <summary className="text-lg font-semibold cursor-pointer">
                        Career Goals
                        <span className="ml-2 text-sm text-[var(--muted)]">(expand)</span>
                    </summary>
                    <p className="mt-6 text-base leading-relaxed">
                        {profile.careerGoals}
                    </p>
                </details>

                <details className="mt-12">
                    <summary className="text-lg font-semibold cursor-pointer">
                        Martial Arts
                        <span className="ml-2 text-sm text-[var(--muted)]">(expand)</span>
                    </summary>
                    <p className="mt-6 text-base leading-relaxed">
                        {profile.martialArts}
                    </p>
                </details>

                <details className="mt-12">
                    <summary className="text-lg font-semibold cursor-pointer">
                        Geography
                        <span className="ml-2 text-sm text-[var(--muted)]">(expand)</span>
                    </summary>
                    <p className="mt-6 text-base leading-relaxed">
                        {profile.geography}
                    </p>
                </details>

                <details className="mt-12">
                    <summary className="text-lg font-semibold cursor-pointer">
                        Sports
                        <span className="ml-2 text-sm text-[var(--muted)]">(expand)</span>
                    </summary>
                    <p className="mt-6 text-base leading-relaxed">
                        {profile.sports}
                    </p>
                </details>
            </section>
        </Section>
    );
}
