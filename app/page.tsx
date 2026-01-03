import { Section } from "@/components/Section";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <Section>
        <h1 className="text-3xl font-semibold">Harish Jaisankar</h1>
        <p className="mt-2 text-[var(--muted)]">
          Backend / Systems Engineer · Ann Arbor, MI
        </p>

        <p className="mt-6 leading-relaxed text-[var(--fg)]">
          I’m a software engineer focused on backend and systems work, with
          interests in distributed systems, networking, operating systems,
          and parallel computing. I care about correctness, performance,
          and building systems that scale predictably.
        </p>
      </Section>
    </main>
  );
}
