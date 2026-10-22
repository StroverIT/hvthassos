import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS, SITE } from "@/content/consts";
import { CONTENT } from "./consts";

export const Footer = async () => {
  const t = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const tContact = await getTranslations("contact");
  const tCommon = await getTranslations("common");
  const tLocation = await getTranslations("location");

  return (
    <footer className="bg-[#004d7c] text-foam">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-2xl text-white">{SITE.brandLabel}</p>
          <p className="mt-3 text-sm text-foam/70">{SITE.addressLabel}</p>
          <a
            href={CONTENT.emailHrefLabel}
            className="mt-2 block text-sm text-sand hover:underline"
          >
            {SITE.emailLabel}
          </a>
          <div className="mt-3 space-y-1 text-sm text-foam/80">
            {SITE.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="block hover:text-white"
              >
                {phone}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand hover:underline"
            >
              Facebook
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-sand">
            {tContact("findUs")}
          </p>
          <nav className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-foam/75 transition hover:text-white"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sand">
            {tLocation("mapTitle")}
          </p>
          <a
            href={SITE.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/3] overflow-hidden bg-[#003a5c]"
          >
            <iframe
              title={tLocation("mapTitle")}
              src={SITE.mapEmbedUrl}
              className="pointer-events-none h-full w-full border-0 opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-2 text-center text-xs font-semibold text-white transition group-hover:bg-[#0064a2]">
              {tCommon("openInMaps")}
            </span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-foam/70 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {tFooter("rights")}
          </p>
          <p className="md:text-right">
            <span className="text-foam/55">{tFooter("licenseNote")}</span>
            <span className="mt-1 block font-medium tracking-wide text-sand md:mt-0 md:ml-2 md:inline">
              {tFooter("license")}: {SITE.licenseLabel}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
