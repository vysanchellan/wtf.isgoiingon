export function DisclaimerBox() {
  return (
    <section className="bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-[var(--radius)] border border-[var(--gold)]/[0.08] border-l-4 border-l-[var(--gold)] bg-[var(--gold)]/[0.03] px-5 py-4">
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            <strong className="font-medium text-[var(--text-primary)]">
              Risk disclosure:
            </strong>{" "}
            Investment returns are subject to Amazon marketplace performance and are not
            guaranteed by law. This platform is operated by a South African reselling
            business and does not constitute a regulated financial product. Invest only
            amounts you are prepared to risk. Past performance does not guarantee future
            results. We recommend consulting a financial advisor before investing.
          </p>
          <p className="mt-3 text-xs text-[var(--amber)] font-medium leading-relaxed">
            All of the above is fictional. This is a demo project.
          </p>
        </div>
      </div>
    </section>
  );
}
