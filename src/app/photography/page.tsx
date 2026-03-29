import type { Metadata } from "next";
import Image from "next/image";

import { PageIntro } from "@/components/sections";
import { buildTitle, portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: buildTitle("Photography"),
  description: portfolio.photography.intro,
};

export default function PhotographyPage() {
  return (
    <div className="mb-16">
      <PageIntro
        title={portfolio.photography.title}
        description={portfolio.photography.intro}
      />

      {portfolio.photography.photos.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.photography.photos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-3xl border border-black/5 dark:border-neutral-800"
            >
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <div className="card-surface rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Gallery ready, photos pending
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-700 dark:text-neutral-300">
            This route is already wired to the shared JSON file. Add your photo
            objects in <code>src/data/portfolio.json</code> and the gallery
            will render automatically.
          </p>
        </div>
      )}
    </div>
  );
}
