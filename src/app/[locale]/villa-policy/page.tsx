import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const VillaPolicyPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("villaPolicy");

  const sections = [
    { title: t("checkInTitle"), body: t("checkInBody") },
    { title: t("depositTitle"), body: t("depositBody") },
    { title: t("cancelTitle"), body: t("cancelBody") },
    { title: t("smokingTitle"), body: t("smokingBody") },
  ];

  return (
    <>
      <PageHero title={t("title")} imageSrc="/images/hero/IMG_1660-HDR-min.jpg" />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <div className="space-y-10">
          {sections.map((s) => (
            <article key={s.title}>
              <h2 className="font-display text-2xl text-sea">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default VillaPolicyPage;
