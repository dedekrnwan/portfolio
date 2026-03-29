import Link from "next/link";

import type { PortfolioData } from "@/lib/portfolio";

type SiteFooterProps = {
  footer: PortfolioData["footer"];
  personName: string;
};

export function SiteFooter({ footer, personName }: SiteFooterProps) {
  return (
    <footer className="mx-auto w-full max-w-screen-md pb-12">
      <hr className="mx-auto mb-5 w-full border border-neutral-200 dark:border-neutral-800" />
      <p className="mb-4 text-sm text-neutral-700 opacity-50 dark:text-neutral-300">
        {footer.copyrightLabel} &copy; {footer.yearStart} - {footer.yearEnd} {personName}
      </p>
      <div className="grid gap-6 sm:grid-cols-3">
        {footer.columns.map((column) => (
          <div key={column.title} className="text-neutral-700 dark:text-neutral-400">
            <p className="mb-2 mt-1 font-bold text-neutral-800 dark:text-white">
              {column.title}
            </p>
            {column.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="mt-1 block duration-100 hover:text-neutral-700 hover:underline dark:hover:text-neutral-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
