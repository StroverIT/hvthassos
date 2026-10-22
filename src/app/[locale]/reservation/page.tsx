import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import ReservationForm from "@/components/ReservationForm";
import VillaPolicyContent from "@/components/VillaPolicyContent";
import { getBlockedDateStrings } from "@/lib/booking-ical";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const ReservationPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("reservation");
  const blockedDates = await getBlockedDateStrings();

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1641-min.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-sea">{t("formTitle")}</h2>
          <div className="mt-8">
            <ReservationForm blockedDates={blockedDates} />
          </div>

          <div className="mt-16 rounded-sm border border-sea/10 bg-foam px-5 py-8 md:px-6 md:py-10">
            <VillaPolicyContent showIntro compact />
          </div>
        </div>
      </section>
    </>
  );
};

export default ReservationPage;
