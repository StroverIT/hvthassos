export type TSendMailInput = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export type TContactMailPayload = {
  name: string;
  company?: string | null;
  phone?: string | null;
  email: string;
  subject: string;
  message: string;
};

export type TInquiryMailPayload = {
  arrivalDate: Date;
  departureDate: Date;
  studioCount: number;
  apartmentCount: number;
  name: string;
  address?: string | null;
  phone?: string | null;
  email: string;
  additionalInfo?: string | null;
};
