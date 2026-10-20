export type TReservationFormState = {
  arrivalDate: string;
  departureDate: string;
  studioCount: number;
  apartmentCount: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  additionalInfo: string;
};

export type TReservationFormProps = {
  blockedDates?: string[];
};
