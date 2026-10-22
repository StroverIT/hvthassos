export type TSendMailInput = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export type TContactMailPayload = {
  name: string;
  phone?: string | null;
  email: string;
  message: string;
};

export type TInquiryMailPayload = {
  arrivalDate: Date;
  departureDate: Date;
  studioCount: number;
  apartmentCount: number;
  name: string;
  phone?: string | null;
  email: string;
  additionalInfo?: string | null;
};
