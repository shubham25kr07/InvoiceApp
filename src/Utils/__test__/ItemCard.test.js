import { fireEvent, getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemCard from "../ItemCard";
describe("ItemCard", () => {
  test("should display name prop value passed", () => {
    render(<ItemCard Name="Laptop" />);
    const divNameElement = screen.getByText(/Laptop/i);
    expect(divNameElement).toBeInTheDocument();
  });

  test("should display quantity prop value passed", () => {
    render(<ItemCard Quantity="22" />);
    const divQuantityElement = screen.getByText(/22/i);
    expect(divQuantityElement).toBeInTheDocument();
  });
  test("should display Amount prop value passed", () => {
    render(<ItemCard Amount="1100" />);
    const divAmountElement = screen.getByText(/1100/i);
    expect(divAmountElement).toBeInTheDocument();
  });
});
