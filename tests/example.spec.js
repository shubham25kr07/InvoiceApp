// @ts-check
const { test, expect } = require("@playwright/test");
const getRandomString = (name) => {
  const num = Math.floor(Math.random() * 1000);
  if (name == "") return `${num}`;
  return `name${num}`;
};
test("item add page", async ({ page }) => {
  await page.goto("http://localhost:3000/item/");
  await page.click("text = Add Item");

  await page.fill("input[name='name']", getRandomString("laptop"));
  await page.fill("input[name='price']", getRandomString(""));
  await page.fill("textarea[name='Item_Description']", "This is laptop");
  await page.click('button:text("Save Item")');
  await page.waitForTimeout(5000);
});

test.skip("invoice add page", async ({ page }) => {
  await page.goto("http://localhost:3000/invoice/");
  await page.click("text = Add Invoice");
  // await page.click("text = Change");
  // await page.selectOption("#selectId", "2");
  // await page.click('button:text("Add")');
  // await page.click("text = Add");
  // await page.fill('[id="dueDate"]', "08/10/2022");
  // await page.click("text = Add an Item");
  // await page.selectOption("#selectId", ["0", "1"]);
  // await page.click('button:text("Add")');
  // await page.fill("input[name='0']", "3");
  // await page.fill("textarea[name='Item_Description']", "This is invoice");
  // await page.click('button:text("Save Invoice")');
  // await page.waitForTimeout(5000);
  await page.locator("text=Add Invoice").click();
  // Click text=Change
  await page.locator("text=Change").click();
  // Click select
  await page.locator("select").click();
  // Click #form2 >> text=Add
  await page.locator("#form2 >> text=Add").click();
  // Fill input[name="DueDate"]
  await page.locator('input[name="DueDate"]').fill("2022-08-26");
  // Click text=Add an Item
  await page.locator("text=Add an Item").click();
  // Click select
  await page.locator("select").click();
  // Click select
  await page.locator("select").click({
    modifiers: ["Meta"],
  });
  // Click select
  await page.locator("select").click({
    modifiers: ["Meta"],
  });
  // Click #form2 >> text=Add
  await page.locator("#form2 >> text=Add").click();
  // Click input[name="\30 "]
  await page.locator('input[name="\\30 "]').click();
  // Fill input[name="\30 "]
  await page.locator('input[name="\\30 "]').fill("02");
  await page.locator("text=Save Invoice").click();
});
