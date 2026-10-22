"use client";

import { useState, type FC, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { createContactMessage } from "@/actions/contact";

export const ContactForm: FC = () => {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const result = await createContactMessage(form);
    setStatus(result.ok ? "success" : "error");
    if (result.ok) {
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-sm bg-foam px-6 py-10 text-center">
        <h3 className="font-display text-2xl text-sea">{t("successTitle")}</h3>
        <p className="mt-2 text-muted">{t("successBody")}</p>
      </div>
    );
  }

  const fieldClass =
    "mt-1 w-full border border-sea/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-sea";
  const labelClass = "block text-sm font-medium text-ink";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className={labelClass}>{t("name")} *</span>
          <input
            required
            className={fieldClass}
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </label>
        <label>
          <span className={labelClass}>{t("phone")}</span>
          <input
            type="tel"
            className={fieldClass}
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          />
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>{t("email")} *</span>
          <input
            required
            type="email"
            className={fieldClass}
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>{t("message")} *</span>
          <textarea
            required
            rows={5}
            className={fieldClass}
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          />
        </label>
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-700">{t("error")}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-sm bg-sea px-8 py-3 text-sm font-semibold text-white transition hover:bg-sea-deep disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
};
