import { redirect } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";

type TPageProps = {
  params: Promise<{ locale: string }>;
};

const LocationPage = async ({ params }: TPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect({ href: "/contact", locale });
};

export default LocationPage;
