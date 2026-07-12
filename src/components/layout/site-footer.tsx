export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 text-xs text-white/55 md:flex-row md:items-end">
        <div>
          <p className="text-lg font-semibold tracking-[-0.02em] text-white">
            Ayush<span className="text-signal">.</span>Patel
          </p>
          <p className="mt-2 leading-6">Software Engineer & AI/ML Engineer · Unjha, Mehsana, Gujarat, India</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <a className="transition-colors hover:text-white" href="mailto:ayush30904@gmail.com">
            Email
          </a>
          <a
            className="transition-colors hover:text-white"
            href="https://www.linkedin.com/in/ayush-patel-383027295/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="transition-colors hover:text-white"
            href="https://github.com/JasperrOP"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
