import { expect, test } from "@playwright/test";
import { GetBookingResponse } from "../types/GetBookingResponse.types";

test.describe("Get booking details", () => {
  test("By id - path param", async ({ request }) => {
    const bookingId = 2601;

    const response = await request.get(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    );
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test("By name - Query param", async ({ request }) => {
    const firstname = "Jim";
    const lastname = "Brown";

    const response = await request.get(
      `https://restful-booker.herokuapp.com/booking`,
      {
        params: {
          firstname,
          lastname,
        },
      },
    );
    const responseBody: GetBookingResponse[] = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody.length).toBeGreaterThan(0);

    for (const booking of responseBody) {
      expect(booking).toHaveProperty("bookingid");
      expect(typeof booking.bookingid).toBe("number");
      expect(booking.bookingid).not.toBe(0);
    }
  });
});
