import Link from "next/link";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { signOutAdmin } from "@/actions/admin";

export const dynamic = "force-dynamic";

const AdminInquiriesPage = async () => {
  let inquiries: Awaited<ReturnType<typeof prisma.inquiry.findMany>> = [];
  let dbError = false;

  try {
    inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-sea">Inquiries</h1>
          <p className="mt-1 text-sm text-muted">
            All reservation requests from the website
          </p>
        </div>
        <form action={signOutAdmin}>
          <button
            type="submit"
            className="border border-sea/20 px-4 py-2 text-sm text-sea hover:bg-foam"
          >
            Sign out
          </button>
        </form>
      </div>

      {dbError ? (
        <p className="mt-10 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-800">
          Database not configured. Set DATABASE_URL and run Prisma migrate.
        </p>
      ) : null}

      {!dbError && inquiries.length === 0 ? (
        <p className="mt-10 text-muted">No inquiries yet.</p>
      ) : null}

      {inquiries.length > 0 ? (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-sea/20 text-xs uppercase tracking-wider text-muted">
                <th className="py-3 pr-3 font-medium">Date</th>
                <th className="py-3 pr-3 font-medium">Guest</th>
                <th className="py-3 pr-3 font-medium">Stay</th>
                <th className="py-3 pr-3 font-medium">Units</th>
                <th className="py-3 pr-3 font-medium">Status</th>
                <th className="py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="border-b border-sea/10 hover:bg-foam/50"
                >
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">
                    {format(inquiry.createdAt, "dd MMM yyyy HH:mm")}
                  </td>
                  <td className="py-3 pr-3">
                    <p className="font-medium">{inquiry.name}</p>
                    <p className="text-muted">{inquiry.email}</p>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    {format(inquiry.arrivalDate, "dd.MM.yyyy")} →{" "}
                    {format(inquiry.departureDate, "dd.MM.yyyy")}
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    S:{inquiry.studioCount} / A:{inquiry.apartmentCount}
                  </td>
                  <td className="py-3 pr-3">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                        inquiry.status === "NEW"
                          ? "bg-olive/15 text-olive"
                          : inquiry.status === "READ"
                            ? "bg-sea/10 text-sea"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="font-medium text-sea hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default AdminInquiriesPage;
