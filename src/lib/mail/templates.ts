import { CONTENT } from "./consts";
import type { TContactMailPayload, TInquiryMailPayload } from "./types";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const display = (value?: string | null): string =>
  value?.trim() ? value.trim() : CONTENT.emptyValueLabel;

const formatDate = (date: Date): string =>
  date.toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const row = (label: string, value: string): string =>
  `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #e8e4dc;color:#5c574e;width:180px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e8e4dc;color:#1a1814;vertical-align:top;white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`;

const wrapTable = (title: string, rows: string): string =>
  `<div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;color:#1a1814;">
    <h1 style="font-size:22px;margin:0 0 16px;">${escapeHtml(title)}</h1>
    <table style="width:100%;border-collapse:collapse;background:#faf8f4;border:1px solid #e8e4dc;">
      ${rows}
    </table>
  </div>`;

export const buildContactMail = (payload: TContactMailPayload) => {
  const subject = `${CONTENT.contactSubjectPrefixLabel}: ${payload.subject}`;

  const fields: Array<[string, string]> = [
    [CONTENT.contactNameLabel, payload.name],
    [CONTENT.contactCompanyLabel, display(payload.company)],
    [CONTENT.contactPhoneLabel, display(payload.phone)],
    [CONTENT.contactEmailLabel, payload.email],
    [CONTENT.contactSubjectLabel, payload.subject],
    [CONTENT.contactMessageLabel, payload.message],
  ];

  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = wrapTable(
    CONTENT.contactSubjectPrefixLabel,
    fields.map(([label, value]) => row(label, value)).join(""),
  );

  return { subject, text, html, replyTo: payload.email };
};

export const buildInquiryMail = (payload: TInquiryMailPayload) => {
  const subject = `${CONTENT.inquirySubjectPrefixLabel}: ${payload.name}`;

  const fields: Array<[string, string]> = [
    [CONTENT.inquiryNameLabel, payload.name],
    [CONTENT.inquiryEmailLabel, payload.email],
    [CONTENT.inquiryPhoneLabel, display(payload.phone)],
    [CONTENT.inquiryAddressLabel, display(payload.address)],
    [CONTENT.inquiryArrivalLabel, formatDate(payload.arrivalDate)],
    [CONTENT.inquiryDepartureLabel, formatDate(payload.departureDate)],
    [CONTENT.inquiryStudiosLabel, String(payload.studioCount)],
    [CONTENT.inquiryApartmentsLabel, String(payload.apartmentCount)],
    [CONTENT.inquiryAdditionalInfoLabel, display(payload.additionalInfo)],
  ];

  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = wrapTable(
    CONTENT.inquirySubjectPrefixLabel,
    fields.map(([label, value]) => row(label, value)).join(""),
  );

  return { subject, text, html, replyTo: payload.email };
};
