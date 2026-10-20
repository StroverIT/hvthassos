"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().max(120).optional(),
  phone: z.string().max(40).optional(),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(5).max(4000),
});

export type TContactResult =
  | { ok: true }
  | { ok: false; error: string };

export const createContactMessage = async (
  input: z.infer<typeof contactSchema>,
): Promise<TContactResult> => {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation" };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        company: parsed.data.company || null,
        phone: parsed.data.phone || null,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "server" };
  }
};
