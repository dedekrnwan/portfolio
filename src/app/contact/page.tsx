import type { Metadata } from "next";

import { ContactSection, PageIntro } from "@/components/sections";
import { buildTitle, portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: buildTitle("Contact"),
  description: portfolio.contact.intro,
};

export default function ContactPage() {
  return (
    <div className="mb-16">
      <PageIntro title={portfolio.contact.title} description={portfolio.contact.intro} />
      <ContactSection
        contact={portfolio.contact}
        email={portfolio.person.email}
      />
    </div>
  );
}
