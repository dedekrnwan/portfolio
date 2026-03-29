import type { ReactNode } from "react";

import { portfolio } from "@/lib/portfolio";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader
        shortName={portfolio.person.shortName}
        primaryLinks={portfolio.navigation.primary}
        secondaryLinks={portfolio.navigation.secondary}
      />
      <main className="mx-auto min-h-screen w-full max-w-screen-lg">{children}</main>
      <div className="noise pointer-events-none absolute inset-0" />
      <div className="color-rays" />
      <SiteFooter footer={portfolio.footer} personName={portfolio.person.name} />
    </>
  );
}
