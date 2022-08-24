import { fireEvent, getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectList from "../SelectList";
import { INVOICE_CUSTOMER_MODAL_HEADER } from "../Constants";
const customerList = [
  {
    id: 3,
    name: "heel",
    email: "rahul@gmail.com",
    phone_number: "92828282",
    created_at: "2022-08-09T16:06:31+05:30",
  },
];
// optionValue = { INVOICE_CUSTOMER_MODAL_HEADER };
const setModalCustomerList = jest.fn();
describe("ItemCard", () => {
  test("should display name prop value passed", () => {
    render(
      <SelectList
        dataList={customerList}
        setList={setModalCustomerList}
        optionValue={INVOICE_CUSTOMER_MODAL_HEADER}
      />
    );

    const buttonElement = screen.getByText(/Ad/i);
    fireEvent.click(screen.getByText(/heel/i));
    fireEvent.click(buttonElement);

    expect(buttonElement).toBeInTheDocument();
  });
});
