/**
 * The reference's section-header signature: a wide-tracked eyebrow, a giant
 * heading that always ends in a period, then a right-aligned uppercase
 * statement pushed to the opposite corner.
 */
export function SectionHead({
  eyebrow,
  title,
  statement,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  statement: string;
  /** "light" = white on black. "dark" = ink on a flipped colour block. */
  tone?: "light" | "dark";
}) {
  const eyebrowTone = tone === "light" ? "text-paper" : "text-blaze";
  const titleTone = tone === "light" ? "text-paper" : "text-amber-signal";
  const statementTone = tone === "light" ? "text-paper" : "text-salmon";

  return (
    <header className="gutter">
      <p data-anim="head-eyebrow" className={`eyebrow ${eyebrowTone}`}>
        {eyebrow}
      </p>

      <h2
        data-anim="head-title"
        className={`display mt-10 text-[clamp(3.5rem,11vw,9.5rem)] ${titleTone}`}
      >
        {title}
        <span className="text-violet-bright">.</span>
      </h2>

      <div className="mt-16 flex justify-end md:mt-24">
        <p
          data-anim="head-statement"
          className={`statement max-w-[46ch] ${statementTone}`}
        >
          {statement}
        </p>
      </div>
    </header>
  );
}
