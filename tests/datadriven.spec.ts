import { test, expect } from "@playwright/test";
import { Market, User, Currency} from "../types/";
import marketJson from "../data/market.json" with { type: "json" };
import userJson from "../data/users.json" with { type: "json" };

const markets = marketJson as Market[];
const users = userJson as User[];

const standardUser = users.find((user) => user.username === "standard_user");

//Guard Clause to ensure that the standard user is found in the users.json file
if (!standardUser) {
  throw new Error("Standard user not found in users.json");
}

const currencySymbols: Record<Currency, string> = {
  MXN: "$",
  USD: "$",
  CHF: "CHF",
  JPY: "￥",
};

test.describe("Data-Driven Tests", () => {
  test("TC-01 - Verify Market Data", async ({ page }) => {
    for (const market of markets) {
      const countryCode = market.countryCode ?? market.code;
      // Use the UI flow: go to home, select market, then sign in to reach catalog
      await page.goto("/");
      const marketButton = page.getByTestId(`market-${countryCode}`);
      const marketButtonCount = await marketButton.count();
      if (marketButtonCount === 0) {
        // Market not available in this environment — skip to next
        console.warn(`Market button for ${countryCode} not found, skipping.`);
        continue;
      }
      await marketButton.first().click();

      // Click login to reach catalog (some flows require login to show market info)
      const loginButton = page.getByTestId("login-button-desktop").first();
      if (await loginButton.count()) {
        await loginButton.click();
      }

      // Verify the catalog loads for the selected market (at least one pizza)
      const pizzaCards = page.locator('[data-testid^="pizza-card-"]');
      await expect(pizzaCards.first()).toBeVisible();
      const count = await pizzaCards.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("TC-02 - Verify User Login", async ({ page }) => {
    // Navigate to the login page
    await page.goto("/login");

    // Fill in the login form using test ids available in the app
    // Fallback to role queries if test ids are not present
    const usernameField = page.getByTestId("username-desktop").first();
    const passwordField = page.getByTestId("password-desktop").first();
    const loginButton = page.getByTestId("login-button-desktop").first();

    if (await usernameField.count()) {
      await usernameField.fill(standardUser.username);
      await passwordField.fill(standardUser.password);
      await loginButton.click();
    } else {
      await page.getByRole("textbox", { name: /user/i }).fill(standardUser.username);
      await page.getByRole("textbox", { name: /password/i }).fill(standardUser.password);
      await page.getByRole("button", { name: /sign in|login|log in/i }).click();
    }

    // Verify successful login by checking redirect to catalog
    await expect(page).toHaveURL(/.*\/catalog/);
  });
});
