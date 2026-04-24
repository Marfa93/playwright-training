import { test, expect } from "@playwright/test";
import { BookingRequestBody } from "../types/bookingRequestBody.types";
import { BookingResponseBody } from "../types/bookingResponseBody.types";

test("Create POST request using static body", async ({ request }) => {
  const requestBody: BookingRequestBody = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-06-01",
      checkout: "2026-06-05",
    },
    additionalneeds: "Breakfast",
  };

  const response = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: requestBody,
    },
  );
  const responseBody: BookingResponseBody = await response.json();
  const booking = responseBody.booking;

  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  expect(responseBody).toHaveProperty("bookingid");
  expect(responseBody).toHaveProperty("booking");

  expect(booking).toMatchObject({
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    additionalneeds: "Breakfast",
  });

  expect(booking.bookingdates).toMatchObject({
    checkin: "2026-06-01",
    checkout: "2026-06-05",
  });
});
