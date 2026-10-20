"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import type { InquiryStatus } from "@/generated/prisma/enums";

const requireAdmin = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
};

export const updateInquiryStatus = async (
  id: string,
  status: InquiryStatus,
) => {
  await requireAdmin();
  await prisma.inquiry.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin");
  revalidatePath(`/admin/inquiries/${id}`);
};

export const signOutAdmin = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
};
