"use server";

import { z } from "zod";
import { rangeOverlapsBookingBlock } from "@/lib/booking-ical";
import { buildInquiryMail, sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  arrivalDate: z.string().min(1),
  departureDate: z.string().min(1),
  studioCount: z.coerce.number().int().min(0).max(4),
  apartmentCount: z.coerce.number().int().min(0).max(4),
  name: z.string().min(2).max(120),
  address: z.string().max(200).optional(),
  phone: z.string().max(40).optional(),
  email: z.string().email(),
  additionalInfo: z.string().max(2000).optional(),
});

export type TInquiryResult =
  | { ok: true }
  | { ok: false; error: string };

export const createInquiry = async (
  input: z.infer<typeof inquirySchema>,
): Promise<TInquiryResult> => {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation" };
  }

  const data = parsed.data;
  const arrival = new Date(data.arrivalDate);
  const departure = new Date(data.departureDate);

  if (
    Number.isNaN(arrival.getTime()) ||
    Number.isNaN(departure.getTime()) ||
    departure <= arrival
  ) {
    return { ok: false, error: "dates" };
  }

  if (data.studioCount === 0 && data.apartmentCount === 0) {
    return { ok: false, error: "units" };
  }

  if (await rangeOverlapsBookingBlock(arrival, departure)) {
    return { ok: false, error: "unavailable" };
  }

  const inquiryPayload = {
    arrivalDate: arrival,
    departureDate: departure,
    studioCount: data.studioCount,
    apartmentCount: data.apartmentCount,
    name: data.name,
    address: data.address || null,
    phone: data.phone || null,
    email: data.email,
    additionalInfo: data.additionalInfo || null,
  };

  try {
    await prisma.inquiry.create({
      data: inquiryPayload,
    });
  } catch {
    return { ok: false, error: "server" };
  }

  try {
    await sendMail(buildInquiryMail(inquiryPayload));
  } catch (error) {
    console.error("Failed to send inquiry email:", error);
  }

  return { ok: true };
};
