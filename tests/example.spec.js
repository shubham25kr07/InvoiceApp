// @ts-check
const { test, expect } = require("@playwright/test");
const getRandomString = (name) => {
  const num = Math.floor(Math.random() * 1000);
  if (name == "") return `${num}`;
  return `name${num}`;
};
test.skip("item add page", async ({ page }) => {
  await page.goto("http://localhost:3000/item/");
  await page.click("text = Add Item");

  await page.fill("input[name='name']", getRandomString("laptop"));
  await page.fill("input[name='price']", getRandomString(""));
  await page.fill("textarea[name='Item_Description']", "This is laptop");
  await page.click('button:text("Save Item")');
  await page.waitForTimeout(5000);
});

test("invoice add page", async ({ page }) => {
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
});
