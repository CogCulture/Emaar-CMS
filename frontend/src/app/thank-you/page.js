// src/app/thank-you/page.js
import Link from "next/link";
import { getPage } from "@/services/pageService";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const page = await getPage("thank-you");
  const { title, description } = page?.seo || {};
  return {
    title: title || "Thank you | Emaar India",
    description: description || "Your enquiry has been sent.",
    robots: { index: false, follow: false },
  };
}

const BTN =
  "inline-flex h-[60px] items-center justify-center px-7 font-nav text-[12px] font-bold uppercase tracking-[0.2em] transition-colors duration-300";
const SOLID = `${BTN} border border-[#111] bg-[#111] text-white hover:bg-transparent hover:text-[#111]`;
const OUTLINE = `${BTN} border border-[#1c1a17]/60 text-[#1c1a17] hover:bg-[#111] hover:text-white`;

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Thank you" },
];

export default async function ThankYouPage() {
  const page = await getPage("thank-you");

  const kicker = page?.kicker || "Enquiry received";
  const title = page?.title || "Thank you.";
  const text = page?.text || "Your enquiry has been sent. A member of the Emaar team will get back to you shortly. For a faster answer, call 800 EMAAR (36227).";
  const phoneLabel1 = page?.phone_label_1 || "Toll free within the UAE, 24/7";
  const phoneValue1 = page?.phone_value_1 || "800 EMAAR (36227)";
  const phoneHref1 = page?.phone_href_1 || "tel:80036227";
  const phoneLabel2 = page?.phone_label_2 || "From outside the UAE";
  const phoneValue2 = page?.phone_value_2 || "+971 4 366 1688";
  const phoneHref2 = page?.phone_href_2 || "tel:+97143661688";
  const backLabel = page?.back_label || "Back to home";
  const backHref = page?.back_href || "/";
  const contactLabel = page?.contact_label || "Contact us";
  const contactHref = page?.contact_href || "/contact-us";

  return (
    <main id="main-content" data-testid="contact-thank-you-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <section aria-labelledby="thank-you-title"
        className="px-[clamp(20px,4vw,64px)] pb-24 pt-10 text-[#1c1a17] sm:pb-32 lg:px-[max(5vw,32px)]">
        <nav aria-label="Breadcrumb">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2.5 p-0 font-nav text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65">
            {crumbs.map((b, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={b.label} className="flex items-center gap-2.5">
                  {b.href && !last ? <Link href={b.href} className="hover:text-[#1c1a17]">{b.label}</Link>
                    : <span aria-current={last ? "page" : undefined}>{b.label}</span>}
                  {!last && <span aria-hidden="true" className="opacity-50">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>

        <hr className="mb-0 mt-16 h-px border-0 bg-[#111] sm:mt-20" />

        <div className="mt-14 grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-[5vw]">
          <div>
            <p className="m-0 font-nav text-[12px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/65">{kicker}</p>
            <dl className="m-0 mt-8 flex flex-col">
              <div className="border-b border-[#1c1a17]/10 py-4 first:pt-0">
                <dt className="font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/60">{phoneLabel1}</dt>
                <dd className="m-0 mt-2 text-[15px]">
                  <a href={phoneHref1} className="border-b border-[#1c1a17]/30 pb-[1px] hover:border-[#1c1a17]">{phoneValue1}</a>
                </dd>
              </div>
              <div className="border-b border-[#1c1a17]/10 py-4">
                <dt className="font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/60">{phoneLabel2}</dt>
                <dd className="m-0 mt-2 text-[15px]">
                  <a href={phoneHref2} className="border-b border-[#1c1a17]/30 pb-[1px] hover:border-[#1c1a17]">{phoneValue2}</a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h1 id="thank-you-title"
              className="m-0 font-serif text-[44px] font-light leading-[1.05] text-[#111] sm:text-[64px] lg:text-[76px]">
              {title}
            </h1>
            <p className="mb-0 mt-8 max-w-[780px] text-[18px] leading-[1.6] text-[#1c1a17]/70 sm:text-[22px]">
              {text}
            </p>
            <div className="mt-14 flex flex-wrap gap-4">
              <Link href={backHref} className={SOLID}>{backLabel}</Link>
              <Link href={contactHref} className={OUTLINE}>{contactLabel}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}