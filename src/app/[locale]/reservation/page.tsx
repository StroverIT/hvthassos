import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import ReservationForm from "@/components/ReservationForm";
import { SEASON_PERIODS } from "@/content/consts";
import { getBlockedDateStrings } from "@/lib/booking-ical";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const ReservationPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("reservation");
  const tCommon = await getTranslations("common");
  const blockedDates = await getBlockedDateStrings();

  return (
    <>
      <PageHero
        title={t("title")}
        intro={t("intro")}
        imageSrc="/images/hero/IMG_1641-min.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-16 overflow-x-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-olive">
            {tCommon("seasonLabel")}
          </p>
          <p className="mt-2 text-sm text-muted">{tCommon("perNightNote")}</p>
          <table className="mt-6 w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-sea/20">
                <th className="py-3 pr-4 font-medium text-sea" />
                {SEASON_PERIODS.map((period) => (
                  <th key={period} className="px-2 py-3 font-medium text-sea">
                    {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-sea/10">
                <td className="py-3 pr-4 font-medium">{t("tableStudio")}</td>
                {SEASON_PERIODS.map((period) => (
                  <td key={`s-${period}`} className="px-2 py-3 text-olive">
                    {tCommon("askForPrice")}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">{t("tableApartment")}</td>
                {SEASON_PERIODS.map((period) => (
                  <td key={`a-${period}`} className="px-2 py-3 text-olive">
                    {tCommon("askForPrice")}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-sea">{t("formTitle")}</h2>
          <div className="mt-8">
            <ReservationForm blockedDates={blockedDates} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ReservationPage;
