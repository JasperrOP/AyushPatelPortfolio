import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="grid min-h-screen place-items-center gutter pt-20 text-center"
    >
      <div>
        <p className="eyebrow text-paper/60">404 / Signal lost</p>
        <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)] text-paper">
          This page
          <br />
          isn&apos;t here
          <span className="text-violet-bright">.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-md text-paper/55">
          The route you requested doesn&apos;t exist or has been moved.
        </p>
        <Link
          data-magnetic
          data-hover-lift
          href="/"
          className="pill mt-12 border border-white/20 bg-white/[0.04] text-paper hover:bg-paper hover:text-void"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
