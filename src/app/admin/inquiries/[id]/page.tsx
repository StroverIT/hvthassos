import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { updateInquiryStatus } from "@/actions/admin";

type TPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

const InquiryDetailPage = async ({ params }: TPageProps) => {
  const { id } = await params;

  let inquiry;
  try {
    inquiry = await prisma.inquiry.findUnique({ where: { id } });
  } catch {
    notFound();
  }

  if (!inquiry) {
    notFound();
  }

  const markRead = updateInquiryStatus.bind(null, inquiry.id, "READ");
  const markArchived = updateInquiryStatus.bind(null, inquiry.id, "ARCHIVED");
  const markNew = updateInquiryStatus.bind(null, inquiry.id, "NEW");

  const rows: { label: string; value: string }[] = [
    { label: "Submitted", value: format(inquiry.createdAt, "dd MMM yyyy HH:mm") },
    { label: "Status", value: inquiry.status },
    { label: "Name", value: inquiry.name },
    { label: "Email", value: inquiry.email },
    { label: "Phone", value: inquiry.phone || "—" },
    { label: "Address", value: inquiry.address || "—" },
    {
      label: "Arrival",
      value: format(inquiry.arrivalDate, "dd MMM yyyy"),
    },
    {
      label: "Departure",
      value: format(inquiry.departureDate, "dd MMM yyyy"),
    },
    { label: "Studios", value: String(inquiry.studioCount) },
    { label: "Apartments", value: String(inquiry.apartmentCount) },
    {
      label: "Additional info",
      value: inquiry.additionalInfo || "—",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <Link href="/admin" className="text-sm text-sea hover:underline">
        ← Back to inquiries
      </Link>

      <h1 className="mt-6 font-display text-3xl text-sea">Inquiry detail</h1>

      <dl className="mt-8 space-y-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 border-b border-sea/10 pb-4 sm:grid-cols-[160px_1fr]"
          >
            <dt className="text-sm font-medium text-muted">{row.label}</dt>
            <dd className="whitespace-pre-wrap text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <form action={markNew}>
          <button
            type="submit"
            className="border border-sea/20 px-4 py-2 text-sm hover:bg-foam"
          >
            Mark NEW
          </button>
        </form>
        <form action={markRead}>
          <button
            type="submit"
            className="border border-sea/20 px-4 py-2 text-sm hover:bg-foam"
          >
            Mark READ
          </button>
        </form>
        <form action={markArchived}>
          <button
            type="submit"
            className="border border-sea/20 px-4 py-2 text-sm hover:bg-foam"
          >
            Archive
          </button>
        </form>
      </div>

      <p className="mt-8">
        <a
          href={`mailto:${inquiry.email}`}
          className="text-sm font-semibold text-sea hover:underline"
        >
          Reply by email
        </a>
      </p>
    </div>
  );
};

export default InquiryDetailPage;
