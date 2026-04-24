import { test, expect } from "@playwright/test";
import { BookingRequestBody } from "../types/bookingRequestBody.types";
import { readJSONFile } from "../../utils/commonUtils";
import { BookingResponseBody } from "../types/bookingResponseBody.types";
import { TokenResponseBody } from "../types/tokenResponseBody.types";

test("Update booking (PUT)", async ({ request }) => {
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

  console.log("bookingID: ", bookingId); //XXX

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

  console.log("token: ", token); //XXX

  //Sending update request (put)
  const putRequestFile = `${__dirname}/../../data/put_request_body.json`;
  const putBody: BookingRequestBody = readJSONFile(putRequestFile);
  const updateResponse = await request.put(
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
  console.log("Response: ", updateResponseBody);
});
