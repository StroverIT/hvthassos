import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import VirtualTour from "@/components/VirtualTour";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const VirtualTourPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("virtualTour");

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/DJI_0177-min.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <VirtualTour />
      </section>
    </>
  );
};

export default VirtualTourPage;
