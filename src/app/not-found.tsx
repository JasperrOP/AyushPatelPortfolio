import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center px-5 pt-20 text-center">
      <div>
        <p className="eyebrow">404 / Signal lost</p>
        <h1 className="display mt-6 text-6xl md:text-9xl">
          This page
          <br />
          isn&apos;t here.
        </h1>
        <p className="mt-6 max-w-md text-white/55">
          The route you requested doesn&apos;t exist or has been moved.
        </p>
        <Link
          data-magnetic
          href="/"
          className="mt-10 inline-block border-b border-white pb-2 text-lg transition-colors hover:text-signal"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
