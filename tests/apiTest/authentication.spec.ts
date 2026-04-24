import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("Public API - No Auth", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log(responseData);
  });

  test("Basic authentication", async ({ request }) => {
    const userName = "user";
    const password = "test";
    const response = await request.get(
      `https://httpbin.org/basic-auth/${userName}/${password}`,
      {
        headers: {
          Authorization: "Basic " + btoa(`${userName}:${password}`),
          // Buffer.from(`${userName}:${password}`).toString("base64"),
        },
      },
    );
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log(responseData);
  });

  test.skip("Bearer token authentication - Repos", async ({ request }) => {
    const token = "token";

    const response = await request.get(`https://api.github.com/user/repos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log(responseData);
  });

  test.skip("Bearer token authentication - User", async ({ request }) => {
    const token = "token";

    const response = await request.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log(responseData);
  });

  test.skip("API key authentication", async ({ request }) => {
    const apiKey = "apiKey";

    const response = await request.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: "Paris",
          appid: apiKey,
        },
      },
    );

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log(responseData);
  });

  test.skip("API Key Auth - Header", async ({ request }) => {
    const response = await request.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: { q: "India", key: "key" },
      },
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
  });
});
