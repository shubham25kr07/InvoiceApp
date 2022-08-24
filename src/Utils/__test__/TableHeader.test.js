import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { INVOICE_ITEMS_COLUMN } from "../Constants";
import TableHeader from "../TableHeader";

describe("TableHeader", () => {
  test("Testing Table Header", async () => {
    render(<TableHeader columns={INVOICE_ITEMS_COLUMN} />);
    const value = screen.getByText("Items");
    expect(value).toBeInTheDocument();
  });
  test("Testing Table Header", async () => {
    render(<TableHeader columns={INVOICE_ITEMS_COLUMN} />);
    const value = screen.getByText("Quantity");
    expect(value).toBeInTheDocument();
  });
  test("Testing Table Header", async () => {
    render(<TableHeader columns={INVOICE_ITEMS_COLUMN} />);
    const value = screen.getByText("Price");
    expect(value).toBeInTheDocument();
  });
});
