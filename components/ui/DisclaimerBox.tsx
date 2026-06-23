export function DisclaimerBox() {
  return (
    <section className="bg-white dark:bg-[var(--surface)] border-b border-[var(--border-tertiary)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-lg border-l-4 border-[#FAC775] bg-[var(--surface-muted)] px-5 py-4 text-xs text-[var(--text-secondary)] leading-relaxed">
          <strong className="text-[var(--text-primary)] font-medium">Risk disclosure:</strong> Investment returns are subject to Amazon marketplace performance and are not guaranteed by law. This platform is operated by a South African reselling business and does not constitute a regulated financial product. Invest only amounts you are prepared to risk. Past performance does not guarantee future results. We recommend consulting a financial advisor before investing.
          <br /><br />
          <strong className="text-amber-700 font-medium">All of the above is fictional. This is a demo project.</strong>
        </div>
      </div>
    </section>
  );
}
