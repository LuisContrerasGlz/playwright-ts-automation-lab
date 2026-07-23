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

test.describe("Smoke parametrized by market", () => {
  for (const market of markets) {
    test(`TC-${market.code} - login + catalog in market ${market.code}`, async ({ page }) => {

      // Arrange
      await page.goto("/");

      // Act
      await page.getByTestId("username-desktop").fill(standardUser.username);
      await page.getByTestId("password-desktop").fill(standardUser.password);
      await page.getByTestId(`market-${market.code}`).click();
      await page.getByTestId("login-button-desktop").click();

      // Assert
      await expect(page).toHaveURL(/\/catalog/);

      const symbol = currencySymbols[market.currency];
      // Guard clause
        if (!symbol) return; // Skip if currency symbol is not defined

        await expect(page.locator("body")).toContainText(symbol);

    });
  }
});