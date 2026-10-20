import ical from "node-ical";
import { prisma } from "@/lib/prisma";

export type TBookingIcalEvent = {
  uid: string;
  summary: string | null;
  startDate: Date;
  endDate: Date;
};

const getIcalUrls = (): string[] => {
  const raw = process.env.BOOKING_ICAL_URLS ?? process.env.BOOKING_ICAL_URL ?? "";
  return raw
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
};

const toUtcDay = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

/**
 * Booking.com iCal: DTEND is exclusive (checkout day is free).
 * We store [start, end) as startDate inclusive, endDate exclusive.
 */
export const parseBookingIcal = async (
  url: string,
): Promise<TBookingIcalEvent[]> => {
  const data = await ical.async.fromURL(url);
  const events: TBookingIcalEvent[] = [];

  for (const item of Object.values(data)) {
    if (!item || typeof item !== "object") continue;
    if (!("type" in item) || (item as { type?: string }).type !== "VEVENT") {
      continue;
    }

    const event = item as {
      uid?: string;
      summary?: string;
      start?: Date;
      end?: Date;
    };
    if (!event.start || !event.end) continue;

    const startDate = toUtcDay(new Date(event.start));
    const endDate = toUtcDay(new Date(event.end));
    if (endDate <= startDate) continue;

    events.push({
      uid: String(event.uid ?? `${url}-${startDate.toISOString()}`),
      summary: event.summary ? String(event.summary) : null,
      startDate,
      endDate,
    });
  }

  return events;
};

export const syncBookingIcal = async (): Promise<{
  synced: number;
  urls: number;
}> => {
  const urls = getIcalUrls();
  if (urls.length === 0) {
    return { synced: 0, urls: 0 };
  }

  const allEvents: (TBookingIcalEvent & { sourceUrl: string })[] = [];
  for (const url of urls) {
    const events = await parseBookingIcal(url);
    for (const event of events) {
      allEvents.push({ ...event, sourceUrl: url });
    }
  }

  const uids = allEvents.map((event) => event.uid);

  await prisma.$transaction(async (tx) => {
    for (const event of allEvents) {
      await tx.bookingBlock.upsert({
        where: { uid: event.uid },
        create: {
          uid: event.uid,
          summary: event.summary,
          startDate: event.startDate,
          endDate: event.endDate,
          sourceUrl: event.sourceUrl,
          syncedAt: new Date(),
        },
        update: {
          summary: event.summary,
          startDate: event.startDate,
          endDate: event.endDate,
          sourceUrl: event.sourceUrl,
          syncedAt: new Date(),
        },
      });
    }

    if (uids.length > 0) {
      await tx.bookingBlock.deleteMany({
        where: { uid: { notIn: uids } },
      });
    } else {
      await tx.bookingBlock.deleteMany();
    }
  });

  return { synced: allEvents.length, urls: urls.length };
};

/** Expand blocked nights as YYYY-MM-DD (checkout day not included). */
export const getBlockedDateStrings = async (): Promise<string[]> => {
  try {
    const blocks = await prisma.bookingBlock.findMany({
      select: { startDate: true, endDate: true },
    });

    const dates = new Set<string>();
    for (const block of blocks) {
      const cursor = new Date(block.startDate);
      const end = new Date(block.endDate);
      while (cursor < end) {
        dates.add(cursor.toISOString().slice(0, 10));
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }
    }
    return [...dates].sort();
  } catch {
    return [];
  }
};

export const rangeOverlapsBookingBlock = async (
  arrival: Date,
  departure: Date,
): Promise<boolean> => {
  try {
    const overlap = await prisma.bookingBlock.findFirst({
      where: {
        startDate: { lt: departure },
        endDate: { gt: arrival },
      },
      select: { id: true },
    });
    return Boolean(overlap);
  } catch {
    return false;
  }
};
