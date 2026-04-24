import { test, expect } from "@playwright/test";
import { readJSONFile } from "../../utils/commonUtils";
import { BookingRequestBody } from "../types/bookingRequestBody.types";
import { BookingResponseBody } from "../types/bookingResponseBody.types";

test("Create POST request using JSON file", async ({ request }) => {
  const postRequestFile = `${__dirname}/../../data/post_request_body.json`;
  const requestBody: BookingRequestBody = readJSONFile(postRequestFile);

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
