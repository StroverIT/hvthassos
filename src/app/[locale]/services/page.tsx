import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const ServicesPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const items = [
    { title: t("cleaningTitle"), body: t("cleaningBody") },
    { title: t("parkingTitle"), body: t("parkingBody") },
    { title: t("bbqTitle"), body: t("bbqBody") },
    { title: t("wifiTitle"), body: t("wifiBody") },
    { title: t("staffTitle"), body: t("staffBody") },
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1580-HDR-min.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title}>
              <h2 className="font-display text-2xl text-sea">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
