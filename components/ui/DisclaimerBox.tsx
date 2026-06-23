export function DisclaimerBox() {
  return (
    <section style={{ background: "var(--bg-primary)" }}>
      <div
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
        style={{ textAlign: "center" }}
      >
        <div
          style={{
            borderLeft: "4px solid var(--gold)",
            background: "rgba(255, 215, 0, 0.03)",
            border: "1px solid rgba(255, 215, 0, 0.1)",
            borderLeftWidth: 4,
            borderRadius: "var(--radius)",
            padding: "20px 24px",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              Risk disclosure:
            </strong>{" "}
            Investment returns are subject to Amazon marketplace performance and are not
            guaranteed by law. This platform is operated by a South African reselling
            business and does not constitute a regulated financial product. Invest only
            amounts you are prepared to risk. Past performance does not guarantee future
            results. We recommend consulting a financial advisor before investing.
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "var(--amber)",
              fontWeight: 500,
              margin: "12px 0 0",
            }}
          >
            All of the above is fictional. This is a demo project.
          </p>
        </div>
      </div>
    </section>
  );
}
