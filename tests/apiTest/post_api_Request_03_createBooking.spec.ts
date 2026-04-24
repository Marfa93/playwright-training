import { test, expect } from "@playwright/test";
import { BookingRequestBody } from "../types/bookingRequestBody.types";
import { BookingResponseBody } from "../types/bookingResponseBody.types";
import {
  getFirstName,
  getLastName,
  getRandomBool,
  getRandomNumber,
  getRandomWord,
} from "../../utils/randomDataGenerator";
import { DateTime } from "luxon";

test("Create POST request using random data", async ({ request }) => {
  const requestBody: BookingRequestBody = {
    firstname: getFirstName(),
    lastname: getLastName(),
    totalprice: getRandomNumber(),
    depositpaid: getRandomBool(),
    bookingdates: {
      checkin: DateTime.now().toFormat(`yyyy-MM-dd`),
      checkout: DateTime.now().plus({ day: 5 }).toFormat(`yyyy-MM-dd`),
    },
    additionalneeds: getRandomWord(),
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
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid: requestBody.depositpaid,
    additionalneeds: requestBody.additionalneeds,
  });

  expect(booking.bookingdates).toMatchObject({
    checkin: requestBody.bookingdates.checkin,
    checkout: requestBody.bookingdates.checkout,
  });
});
