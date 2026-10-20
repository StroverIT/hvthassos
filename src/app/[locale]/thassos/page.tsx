import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";

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
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1512-HDR-min.jpg"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <article>
          <h2 className="font-display text-2xl text-sea">{t("koiniraTitle")}</h2>
          <p className="mt-3 leading-relaxed text-muted">{t("koiniraBody")}</p>
        </article>
        <article className="mt-12">
          <h2 className="font-display text-2xl text-sea">{t("ferriesTitle")}</h2>
          <p className="mt-3 leading-relaxed text-muted">{t("ferriesBody")}</p>
        </article>
      </section>
    </>
  );
};

export default ThassosPage;
