import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mb-16 mt-20">
      <h1 className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] bg-clip-text text-4xl font-black tracking-[-0.03em] text-fill-transparent">
        404 - Page not found
      </h1>
      <p className="mb-4 mt-2 text-lg text-neutral-700 dark:text-neutral-400">
        We&apos;re sorry, we can&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center rounded-md bg-neutral-200 px-4 py-2 font-medium text-neutral-700 duration-200 hover:bg-neutral-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
      >
        Go home
        <ArrowRight className="ml-2 size-4 duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
