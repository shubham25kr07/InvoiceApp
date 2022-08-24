import { fireEvent, getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LeftNavigation from "../LeftNavigation";
import { BrowserRouter } from "react-router-dom";
// displayModel, showModel, children
const MockCustomer = () => {
  return (
    // <Customer />

    <BrowserRouter>
      <LeftNavigation />
    </BrowserRouter>
  );
};
describe("LeftNavigation ", () => {
  test("should display LeftNavigation Bar", () => {
    render(<MockCustomer />);
    const leftNabitem1 = screen.getByText(/CUS/i);
    expect(leftNabitem1.innerHTML).toBe("CUSTOMER");
    const leftNabitem2 = screen.getByText(/ITE/i);
    expect(leftNabitem2.innerHTML).toBe("ITEM");
    const leftNabitem3 = screen.getByText(/INV/i);
    expect(leftNabitem3.innerHTML).toBe("INVOICE");
  });
});
