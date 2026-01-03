export function Section({
    title,
    children,
  }: {
    title?: string;
    children: React.ReactNode;
  }) {
    return (
      <section className="mb-16">
        {title && (
          <h2 className="mb-4 text-lg font-medium text-[var(--fg)]">
            {title}
          </h2>
        )}
        {children}
      </section>
    );
  }
  