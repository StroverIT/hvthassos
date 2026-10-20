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

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24 md:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-[4/5]">
          <Image
            src="/images/hero/DJI_0180-min.jpg"
            alt={t("welcomeTitle")}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">
            {t("welcomeTitle")}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-sea md:text-5xl">
            {tCommon("brand")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            {t("welcomeBody")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {t("welcomeGarden")}
          </p>
          <Link
            href="/accommodation"
            className="mt-8 inline-block border-b border-sea pb-1 text-sm font-semibold text-sea"
          >
            {tCommon("ctaAccommodation")}
          </Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <article className="group relative min-h-[420px] overflow-hidden">
            <Image
              src="/images/hero/IMG_1512-HDR-min.jpg"
              alt={t("paradiseTitle")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
                {t("paradiseMeta")}
              </p>
              <h2 className="mt-2 font-display text-3xl text-white drop-shadow-sm md:text-4xl">
                {t("paradiseTitle")}
              </h2>
              <p className="mt-3 line-clamp-3 max-w-md text-sm leading-relaxed text-white">
                {t("adventureBody")}
              </p>
            </div>
          </article>

          <article className="group relative min-h-[420px] overflow-hidden">
            <Image
              src="/images/hero/IMG_1650-min.jpg"
              alt={t("goldenTitle")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
                {t("goldenMeta")}
              </p>
              <h2 className="mt-2 font-display text-3xl text-white drop-shadow-sm md:text-4xl">
                {t("goldenTitle")}
              </h2>
              <p className="mt-3 line-clamp-3 max-w-md text-sm leading-relaxed text-white">
                {t("adventureGolden")}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl text-sea md:text-5xl">
            {t("staysTitle")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t("staysBody")}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link href="/accommodation" className="group block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/accommodation/studio/studio-14.jpg"
                alt={tAcc("studiosTitle")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
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

          <Link href="/accommodation" className="group block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/accommodation/apartment/apartment-9.jpg"
                alt={tAcc("apartmentsTitle")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
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
