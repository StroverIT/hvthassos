import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import { SITE } from "@/content/consts";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const LocationPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("location");

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1656-min.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            <article>
              <h2 className="font-display text-2xl text-sea">{t("byCarTitle")}</h2>
              <p className="mt-3 leading-relaxed text-muted">{t("byCarBody")}</p>
            </article>
            <article>
              <h2 className="font-display text-2xl text-sea">
                {t("byPlaneTitle")}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{t("byPlaneBody")}</p>
            </article>
          </div>
          <div>
            <h2 className="mb-4 font-display text-2xl text-sea">{t("mapTitle")}</h2>
            <div className="aspect-[4/3] overflow-hidden bg-foam">
              <iframe
                title={t("mapTitle")}
                src={SITE.mapEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationPage;
