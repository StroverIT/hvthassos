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

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1439-min.jpg"
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
            <p className="mt-6 text-sm text-muted">
              GPS: {SITE.gps.lat}, {SITE.gps.lng}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-sea">{t("formTitle")}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
