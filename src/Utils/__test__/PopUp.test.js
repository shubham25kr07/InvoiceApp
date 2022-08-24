import { fireEvent, getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PopUp from "../PopUp";
describe("Popup ", () => {
  test("should display popUp", () => {
    const showModel = jest.fn();
    render(<PopUp displayModel={true} showModel={showModel} />);

    const buttonElement = screen.getByText(/Cl/i);
    fireEvent.click(buttonElement);
    expect(buttonElement).toBeInTheDocument();
  });
});
