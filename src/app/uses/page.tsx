import type { Metadata } from "next";

import { PageIntro } from "@/components/sections";
import { buildTitle, portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: buildTitle("What I Use"),
  description: portfolio.uses.intro,
};

export default function UsesPage() {
  return (
    <div className="mb-16">
      <PageIntro title={portfolio.uses.title} description={portfolio.uses.intro} />
      <div className="grid gap-6 md:grid-cols-3">
        {portfolio.uses.categories.map((category) => (
          <section key={category.title} className="card-surface rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              {category.title}
            </h2>
            <div className="mt-4 space-y-3">
              {category.items.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/5 bg-black/[0.03] px-4 py-3 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
