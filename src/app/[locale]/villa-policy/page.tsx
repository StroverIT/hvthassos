import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import VillaPolicyContent from "@/components/VillaPolicyContent";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const VillaPolicyPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("villaPolicy");

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1660-HDR-min.jpg"
        imagePosition="object-[center_40%]"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <VillaPolicyContent />
      </section>
    </>
  );
};

export default VillaPolicyPage;
