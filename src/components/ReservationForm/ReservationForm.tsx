"use client";

import { useMemo, useState, type FC, type FormEvent } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { useTranslations } from "next-intl";
import { createInquiry } from "@/actions/inquiry";
import { CONTENT } from "./consts";
import type { TReservationFormProps, TReservationFormState } from "./types";

const initialState: TReservationFormState = {
  arrivalDate: "",
  departureDate: "",
  studioCount: 1,
  apartmentCount: 0,
  name: "",
  phone: "",
  email: "",
  additionalInfo: "",
};

export const ReservationForm: FC<TReservationFormProps> = ({
  blockedDates = [],
}) => {
  const t = useTranslations("reservation");
  const [range, setRange] = useState<DateRange | undefined>();
  const [form, setForm] = useState<TReservationFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorKey, setErrorKey] = useState<"error" | "unavailable">("error");

  const blocked = useMemo(
    () => blockedDates.map((date) => parseISO(date)),
    [blockedDates],
  );

  const onSelectRange = (next: DateRange | undefined) => {
    setRange(next);
    setForm((prev) => ({
      ...prev,
      arrivalDate: next?.from ? format(next.from, "yyyy-MM-dd") : "",
      departureDate: next?.to ? format(next.to, "yyyy-MM-dd") : "",
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const result = await createInquiry(form);
    if (result.ok) {
      setStatus("success");
      setForm(initialState);
      setRange(undefined);
      return;
    }
    setErrorKey(result.error === "unavailable" ? "unavailable" : "error");
    setStatus("error");
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
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <p className={labelClass}>
          {t("selectDates")} <span className="text-olive">*</span>
        </p>
        <p className="mt-1 text-xs text-muted">
          {t("checkInHint")} · {t("checkOutHint")}
        </p>
        {blockedDates.length > 0 ? (
          <p className="mt-1 text-xs text-olive">{t("blockedHint")}</p>
        ) : null}
        <div className="mt-3 overflow-x-auto rounded-sm border border-sea/10 bg-white p-3">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={onSelectRange}
            disabled={[{ before: new Date() }, ...blocked]}
            numberOfMonths={2}
          />
        </div>
        {form.arrivalDate && form.departureDate ? (
          <p className="mt-2 text-sm text-sea">
            {t("arrival")}: {form.arrivalDate} → {t("departure")}:{" "}
            {form.departureDate}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className={labelClass}>{t("studios")}</span>
          <select
            className={fieldClass}
            value={form.studioCount}
            onChange={(e) =>
              setForm((p) => ({ ...p, studioCount: Number(e.target.value) }))
            }
          >
            {CONTENT.unitOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={labelClass}>{t("apartments")}</span>
          <select
            className={fieldClass}
            value={form.apartmentCount}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                apartmentCount: Number(e.target.value),
              }))
            }
          >
            {CONTENT.unitOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className={labelClass}>
            {t("name")} <span className="text-olive">*</span>
          </span>
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
        <label>
          <span className={labelClass}>
            {t("email")} <span className="text-olive">*</span>
          </span>
          <input
            required
            type="email"
            className={fieldClass}
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>{t("additional")}</span>
          <textarea
            rows={4}
            className={fieldClass}
            value={form.additionalInfo}
            onChange={(e) =>
              setForm((p) => ({ ...p, additionalInfo: e.target.value }))
            }
          />
        </label>
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-700">{t(errorKey)}</p>
      ) : null}

      <button
        type="submit"
        disabled={
          status === "sending" || !form.arrivalDate || !form.departureDate
        }
        className="rounded-sm bg-sea px-8 py-3 text-sm font-semibold text-white transition hover:bg-sea-deep disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
};
