import { test, expect } from "@playwright/test";

const USERNAME = process.env.TEST_USER_USERNAME ?? "standard_user";
const PASSWORD = process.env.TEST_USER_PASSWORD ?? "pizza123";

test.describe("Smoke with locators (M02)", () => {

    test("TC-01 - Catalog shows at least 1 pizza", async ({page}) =>{
        // Arrange
        await page.goto("/");
 
        // Act
        //await page.getByTestId("username-desktop").fill(USERNAME);

        await page.getByRole("textbox", { name: "standard_user" }).fill(USERNAME);
 
        await page.getByTestId("password-desktop").fill(PASSWORD);

        await page.getByTestId("market-MX").click();

        //await page.getByTestId("login-button-desktop").click();

        // Level 1
        await page.getByRole("button", { name: "Sign In" }).click();

        // Assert
      
        const pizzaCards = page.locator('[data-testid^="pizza-card-"]');
        await expect(pizzaCards.first()).toBeVisible();
        const count = await pizzaCards.count();
        expect(count).toBeGreaterThan(0);
        expect(count).toBeGreaterThanOrEqual(1);
    })
});