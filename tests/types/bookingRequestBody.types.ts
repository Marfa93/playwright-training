type BookingDates = {
  checkin: string;
  checkout: string;
};

export type BookingRequestBody = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
};
