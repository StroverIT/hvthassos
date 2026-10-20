import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import { APARTMENT_IMAGES, STUDIO_IMAGES } from "@/content/consts";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const AccommodationPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("accommodation");

  const studioFeatures = [
    t("studiosFeature1"),
    t("studiosFeature2"),
    t("studiosFeature3"),
    t("studiosFeature4"),
    t("studiosFeature5"),
    t("studiosFeature6"),
    t("studiosFeature7"),
  ];

  const apartmentFeatures = [
    t("apartmentsFeature1"),
    t("apartmentsFeature2"),
    t("apartmentsFeature3"),
    t("apartmentsFeature4"),
    t("apartmentsFeature5"),
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc={STUDIO_IMAGES[0]}
        imagePosition="object-[center_40%]"
      />

      <section
        id="studios"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-olive">{t("studiosView")}</p>
          <h2 className="mt-2 font-display text-3xl text-sea md:text-4xl">
            {t("studiosTitle")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            {t("studiosBody")}
          </p>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-sea">
            {t("studiosFeaturesTitle")}
          </h3>
          <ul className="mt-4 space-y-3">
            {studioFeatures.map((item) => (
              <li
                key={item}
                className="border-l-2 border-olive pl-4 leading-relaxed text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            {t("studiosClosing")}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {STUDIO_IMAGES.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={src}
                alt={t("studiosTitle")}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/reservation"
            className="inline-block bg-sea px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-sea-deep"
          >
            {t("reserveLabel")}
          </Link>
        </div>
      </section>

      <section id="apartments" className="scroll-mt-24 bg-foam">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-olive">
              {t("apartmentsView")}
            </p>
            <h2 className="mt-2 font-display text-3xl text-sea md:text-4xl">
              {t("apartmentsTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {t("apartmentsBody")}
            </p>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-sea">
              {t("apartmentsFeaturesTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              {apartmentFeatures.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-olive pl-4 leading-relaxed text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              {t("apartmentsClosing")}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {APARTMENT_IMAGES.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={src}
                  alt={t("apartmentsTitle")}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/reservation"
              className="inline-block bg-sea px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-sea-deep"
            >
              {t("reserveLabel")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccommodationPage;
