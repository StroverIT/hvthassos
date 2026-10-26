"use server";

import { z } from "zod";
import { buildContactMail, sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

const DEFAULT_SUBJECT = "Message from the contact form";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().trim().min(1).max(40),
  email: z.string().email(),
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
    console.error("Contact validation failed:", parsed.error.flatten());
    return { ok: false, error: "validation" };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        subject: DEFAULT_SUBJECT,
        message: parsed.data.message,
      },
    });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return { ok: false, error: "server" };
  }

  try {
    await sendMail(buildContactMail(parsed.data));
  } catch (error) {
    console.error("Failed to send contact email:", error);
  }

  return { ok: true };
};
