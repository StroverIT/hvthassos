import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import { APARTMENT_IMAGES, STUDIO_IMAGES } from "@/content/consts";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const AccommodationPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("accommodation");

  const amenities = [
    t("amenityAc"),
    t("amenityKitchen"),
    t("amenityBath"),
    t("amenityBalcony"),
    t("amenityTv"),
    t("amenityWifi"),
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1524-min.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl text-sea">{t("studiosTitle")}</h2>
            <p className="mt-2 text-sm font-medium text-olive">{t("studiosView")}</p>
            <p className="mt-4 leading-relaxed text-muted">{t("studiosBody")}</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {STUDIO_IMAGES.slice(0, 4).map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={t("studiosTitle")}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-sea">
              {t("apartmentsTitle")}
            </h2>
            <p className="mt-2 text-sm font-medium text-olive">
              {t("apartmentsView")}
            </p>
            <p className="mt-4 leading-relaxed text-muted">{t("apartmentsBody")}</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {APARTMENT_IMAGES.slice(0, 4).map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={t("apartmentsTitle")}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl text-sea">{t("amenitiesTitle")}</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {amenities.map((item) => (
              <li
                key={item}
                className="border-l-2 border-olive pl-4 text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default AccommodationPage;
