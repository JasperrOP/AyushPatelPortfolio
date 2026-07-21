const LINKS = [
  { label: "Email", href: "mailto:ayush30904@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-patel-383027295/" },
  { label: "GitHub", href: "https://github.com/JasperrOP" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 gutter py-12">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <div>
          <p className="display text-2xl text-paper">
            Ayush<span className="text-violet-bright">.</span>Patel
          </p>
          <p className="mt-3 text-sm leading-6 text-paper/50">
            Software &amp; AI/ML Engineer · Unjha, Mehsana, Gujarat, India
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {LINKS.map((link) => (
            <a
              key={link.label}
              className="mono text-xs uppercase tracking-[0.18em] text-paper/55 transition-colors hover:text-violet-bright"
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
            >
              {`{ ${link.label.toUpperCase()} }`}
            </a>
          ))}
        </div>
      </div>

      <p className="mono mt-12 text-[0.68rem] tracking-wider text-paper/30">
        © {new Date().getFullYear()} Ayush Patel
      </p>
    </footer>
  );
}
