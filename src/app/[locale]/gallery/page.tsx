import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { GALLERY_IMAGES } from "@/content/consts";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const GalleryPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/DJI_0180-min.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <GalleryGrid images={GALLERY_IMAGES} />
      </section>
    </>
  );
};

export default GalleryPage;
