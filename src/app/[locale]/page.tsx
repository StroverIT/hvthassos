import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/Hero";
import VirtualTour from "@/components/VirtualTour";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const HomePage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tAcc = await getTranslations("accommodation");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Hero />

      <section className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24 md:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden md:sticky md:top-28 md:aspect-[4/5]">
          <Image
            src="/images/hero/DJI_0180-min.jpg"
            alt={t("welcomeTitle")}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_40%]"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl leading-tight text-sea md:text-4xl">
            {t("welcomeTitle")}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
            <p>{t("welcomeBody")}</p>
            <p>{t("welcomeBody2")}</p>
            <p>{t("welcomeBody3")}</p>
            <p>{t("welcomeGarden")}</p>
            <p>{t("welcomeAdventure")}</p>
            <p className="font-medium text-sea">{t("welcomeLicense")}</p>
          </div>
          <Link
            href="/accommodation"
            className="mt-8 inline-block border-b border-sea pb-1 text-sm font-semibold text-sea"
          >
            {tCommon("ctaAccommodation")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl text-sea md:text-5xl">
            {t("staysTitle")}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link href="/accommodation#studios" className="group block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/studios/1.jpg"
                alt={tAcc("studiosTitle")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-display text-3xl text-sea">
              {tAcc("studiosTitle")}
            </h3>
            <p className="mt-1 text-sm text-olive">{tAcc("studiosView")}</p>
            <p className="mt-2 line-clamp-3 max-w-md text-sm leading-relaxed text-muted">
              {tAcc("studiosBody")}
            </p>
          </Link>

          <Link href="/accommodation#apartments" className="group block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/apartments/1.jpg"
                alt={tAcc("apartmentsTitle")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-display text-3xl text-sea">
              {tAcc("apartmentsTitle")}
            </h3>
            <p className="mt-1 text-sm text-olive">{tAcc("apartmentsView")}</p>
            <p className="mt-2 line-clamp-3 max-w-md text-sm leading-relaxed text-muted">
              {tAcc("apartmentsBody")}
            </p>
          </Link>
        </div>
      </section>

      <section className="bg-foam px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl items-end gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-4xl text-sea md:text-5xl">
              {t("tourTeaserTitle")}
            </h2>
            <p className="mt-4 text-muted">{t("tourTeaserBody")}</p>
          </div>
          <VirtualTour />
        </div>
      </section>
    </>
  );
};

export default HomePage;
