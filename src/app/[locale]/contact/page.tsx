import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/content/consts";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const ContactPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tLocation = await getTranslations("location");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1439-min.jpg"
        imagePosition="object-[center_40%]"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-sea">{t("findUs")}</h2>
            <p className="mt-4 text-muted">{SITE.addressLabel}</p>
            <a
              href={`mailto:${SITE.emailLabel}`}
              className="mt-2 block text-sea hover:underline"
            >
              {SITE.emailLabel}
            </a>
            <div className="mt-4 space-y-1">
              {SITE.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block text-muted hover:text-sea"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl text-sea">{t("formTitle")}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foam">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <h2 className="font-display text-3xl text-sea md:text-4xl">
            {tLocation("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{tLocation("intro")}</p>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div className="space-y-10">
              <article>
                <h3 className="font-display text-2xl text-sea">
                  {tLocation("byCarTitle")}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {tLocation("byCarBody")}
                </p>
              </article>
              <article>
                <h3 className="font-display text-2xl text-sea">
                  {tLocation("byPlaneTitle")}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {tLocation("byPlaneBody")}
                </p>
              </article>
            </div>
            <div>
              <h3 className="mb-4 font-display text-2xl text-sea">
                {tLocation("mapTitle")}
              </h3>
              <a
                href={SITE.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/3] overflow-hidden bg-white"
              >
                <iframe
                  title={tLocation("mapTitle")}
                  src={SITE.mapEmbedUrl}
                  className="pointer-events-none h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <span className="absolute inset-x-0 bottom-0 bg-[#004d7c]/90 px-4 py-3 text-center text-sm font-semibold text-white transition group-hover:bg-[#0064a2]">
                  {tCommon("openInMaps")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
