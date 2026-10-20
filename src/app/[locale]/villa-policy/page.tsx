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
    {
      title: t("reservationsTitle"),
      paragraphs: [
        t("reservationsBody1"),
        t("reservationsBody2"),
        t("reservationsBody3"),
      ],
    },
    {
      title: t("cancelTitle"),
      paragraphs: [
        t("cancelBody1"),
        t("cancelBody2"),
        t("cancelBody3"),
        t("cancelBody4"),
      ],
    },
    {
      title: t("checkInTitle"),
      paragraphs: [
        t("checkInBody1"),
        t("checkInBody2"),
        t("checkInBody3"),
      ],
    },
    {
      title: t("rulesTitle"),
      paragraphs: [
        t("rulesIntro"),
        t("rulesQuietIntro"),
        t("rulesQuietAfternoon"),
        t("rulesQuietNight"),
        t("rulesQuietForbidden"),
        t("rulesLegal"),
        t("rulesCapacity"),
        t("rulesExtraGuests"),
        t("rulesPets"),
      ],
    },
    {
      title: t("cleaningTitle"),
      paragraphs: [
        t("cleaningBody1"),
        t("cleaningBody2"),
        t("cleaningBody3"),
      ],
    },
    {
      title: t("securityTitle"),
      paragraphs: [
        t("securityBody1"),
        t("securityBody2"),
        t("securityBody3"),
      ],
    },
    {
      title: t("paymentsTitle"),
      paragraphs: [t("paymentsBody1"), t("paymentsBody2")],
    },
    {
      title: t("respectTitle"),
      paragraphs: [t("respectBody"), t("respectThanks")],
    },
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1660-HDR-min.jpg"
        imagePosition="object-[center_40%]"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <div className="space-y-12">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="font-display text-2xl text-sea md:text-[1.75rem]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default VillaPolicyPage;
