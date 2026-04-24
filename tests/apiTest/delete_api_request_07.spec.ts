import { test, expect } from "@playwright/test";
import { readJSONFile } from "../../utils/commonUtils";
import { BookingRequestBody } from "../types/bookingRequestBody.types";
import { BookingResponseBody } from "../types/bookingResponseBody.types";
import { TokenResponseBody } from "../types/tokenResponseBody.types";

test("Delete booking (e2e)", async ({ request }) => {
  // Create a booking
  const postRequestFile = `${__dirname}/../../data/post_request_body.json`;
  const postBody: BookingRequestBody = readJSONFile(postRequestFile);

  const createBookingResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: postBody,
    },
  );
  expect(createBookingResponse.ok()).toBeTruthy();

  const createResponseBody: BookingResponseBody =
    await createBookingResponse.json();
  const bookingId = createResponseBody.bookingid;

  // Get the booking
  const getResponse = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
  );
  const getResponseBody = await getResponse.json();

  // Update booking
  // Get a token first
  const tokenRequestFile = `${__dirname}/../../data/token_request_body.json`;
  const tokenBody: BookingRequestBody = readJSONFile(tokenRequestFile);

  const tokenResponse = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: tokenBody,
    },
  );
  expect(tokenResponse.ok()).toBeTruthy();

  const tokenResponseBody: TokenResponseBody = await tokenResponse.json();
  const token = tokenResponseBody.token;

  //Sending update request (patch)
  const putRequestFile = `${__dirname}/../../data/patch_request_body.json`;
  const putBody: Partial<BookingRequestBody> = readJSONFile(putRequestFile);
  const updateResponse = await request.patch(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      data: putBody,
      headers: {
        Cookie: `token=${token}`,
      },
    },
  );

  expect(updateResponse.ok()).toBeTruthy();
  expect(updateResponse.status()).toBe(200);

  const updateResponseBody: BookingRequestBody = await updateResponse.json();

  // Delete booking
  const deleteResponse = await request.delete(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    },
  );

  expect(deleteResponse.ok()).toBeTruthy();
  expect(deleteResponse.statusText()).toBe("Created");
  expect(deleteResponse.status()).toBe(201);
});
