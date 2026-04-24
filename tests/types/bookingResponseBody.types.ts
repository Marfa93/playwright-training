import { BookingRequestBody } from "./bookingRequestBody.types";

export type BookingResponseBody = {
  bookingid: number;
  booking: BookingRequestBody;
};
