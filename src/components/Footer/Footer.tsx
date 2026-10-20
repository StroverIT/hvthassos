import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS, SITE } from "@/content/consts";
import { CONTENT } from "./consts";

export const Footer = async () => {
  const t = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const tContact = await getTranslations("contact");

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
          <p className="text-sm text-foam/70">
            GPS: {SITE.gps.lat}, {SITE.gps.lng}
          </p>
          <p className="mt-4 text-xs text-foam/50">
            © {new Date().getFullYear()} {tFooter("rights")}. {tFooter("license")}:{" "}
            {SITE.licenseLabel}
          </p>
          <a
            href={SITE.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-sand hover:underline"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};
