import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import { SITE } from "@/content/consts";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const ThassosPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thassos");

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("subtitle")}
        imageSrc="/images/hero/IMG_1512-HDR-min.jpg"
        imagePosition="object-[center_30%]"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <p className="text-lg leading-relaxed text-muted">{t("intro")}</p>

        <article className="mt-12">
          <h2 className="font-display text-2xl text-sea">{t("historyTitle")}</h2>
          <p className="mt-3 leading-relaxed text-muted">{t("historyBody")}</p>
        </article>

        <article className="mt-12">
          <h2 className="font-display text-2xl text-sea">
            {t("landmarksTitle")}
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{t("landmarksBody")}</p>
        </article>

        <article className="mt-12">
          <h2 className="font-display text-2xl text-sea">{t("beautyTitle")}</h2>
          <p className="mt-3 leading-relaxed text-muted">{t("beautyBody")}</p>
        </article>

        <article className="mt-12">
          <h2 className="font-display text-2xl text-sea">{t("kiniraTitle")}</h2>
          <p className="mt-3 leading-relaxed text-muted">{t("kiniraBody")}</p>
        </article>

        <article className="mt-12">
          <h2 className="font-display text-2xl text-sea">{t("ferriesTitle")}</h2>
          <p className="mt-3 leading-relaxed text-muted">{t("ferriesBody")}</p>
          <a
            href={SITE.ferriesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sea underline underline-offset-4 hover:text-sea-deep"
          >
            {t("ferriesLinkLabel")}
          </a>
        </article>
      </section>
    </>
  );
};

export default ThassosPage;
