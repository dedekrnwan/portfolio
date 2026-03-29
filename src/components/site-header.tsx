"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import type { LinkItem } from "@/lib/portfolio";

type SiteHeaderProps = {
  shortName: string;
  primaryLinks: LinkItem[];
  secondaryLinks: LinkItem[];
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SiteHeader({
  shortName,
  primaryLinks,
  secondaryLinks,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDetailsElement>(null);

  function closeMenus() {
    setMobileOpen(false);
    if (moreMenuRef.current) {
      moreMenuRef.current.open = false;
    }
  }

  const secondaryNavigation = (
    <div className="grid gap-2">
      {secondaryLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noreferrer" : undefined}
          onClick={closeMenus}
          className="rounded-md px-3 py-2 text-sm text-neutral-700 transition-all hover:bg-black/10 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <nav className="relative z-[70] mx-auto flex w-full max-w-screen-lg items-center pt-9 font-mono">
        <Link
          className="mr-6 text-lg font-black text-neutral-800 duration-300 dark:text-white"
          href="/"
        >
          {shortName}
          <span className="bg-gradient-to-r from-[#6310ff] to-[#1491ff] bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]">
            .
          </span>
        </Link>

        <div className="flex flex-grow justify-start">
          <div className="hidden items-center gap-4 lg:inline-flex">
            {primaryLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={[
                    "rounded-md px-3 py-2 transition-all",
                    active
                      ? "bg-black/10 text-neutral-900 dark:bg-white/10 dark:text-white"
                      : "text-neutral-700 hover:bg-black/10 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-200",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}

            <details ref={moreMenuRef} className="group relative z-[80]">
              <summary className="flex list-none items-center rounded-md px-3 py-2 text-neutral-700 transition-all hover:bg-black/10 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-200">
                More
                <ChevronRight className="ml-1 size-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="absolute left-0 top-12 z-[90] w-52 rounded-2xl border border-black/10 bg-white/90 p-2 shadow-xl backdrop-blur dark:border-neutral-800 dark:bg-[#161617]/95">
                {secondaryNavigation}
              </div>
            </details>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex size-10 items-center justify-center rounded-md !bg-transparent text-neutral-900 hover:bg-neutral-300 dark:text-neutral-100 dark:hover:bg-white/15 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/40 px-6 py-6 backdrop-blur-sm lg:hidden">
          <div className="card-surface mx-auto max-w-screen-lg rounded-3xl p-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-base font-bold text-neutral-900 dark:text-white">
                Navigation
              </p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-2 text-neutral-700 hover:bg-black/10 dark:text-neutral-300 dark:hover:bg-white/10"
                aria-label="Close navigation"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-2">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={[
                    "rounded-xl px-4 py-3",
                    isActive(pathname, link.href)
                      ? "bg-black/10 text-neutral-900 dark:bg-white/10 dark:text-white"
                      : "text-neutral-700 dark:text-neutral-300",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="my-5 h-px bg-black/10 dark:bg-white/10" />
            {secondaryNavigation}
          </div>
        </div>
      ) : null}
    </>
  );
}
