import { fireEvent, getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../Table";
import { INVOICE_COLUMN } from "../Constants";
// displayModel, showModel, children
const invoiceList = [
  {
    CreatedAt: "2022-07-28T00:03:47+05:30",
    CustomerName: "shubham",
    DueDate: "1999-12-31T05:30:00+05:30",
    InvoiceId: 2,
    Notes: "",
    PaidStatus: "Not Paid",
    ReferenceNumber: "jmuJOeGDuh",
    Status: "Not Sent",
    TotalAmount: 1196,
    billing_address: "",
  },
];
describe("Table ", () => {
  test("should display same Name", () => {
    render(
      <Table
        column={INVOICE_COLUMN}
        datalist={invoiceList}
        pagination={false}
      />
    );

    const headerTitle = screen.getByText(/CUSTOME/i);
    expect(headerTitle.innerHTML).toBe("CUSTOMER");
    const nameRowVlaue = screen.getByText(/shubh/i);
    expect(nameRowVlaue.innerHTML).toBe("shubham");
    expect(screen.queryByText(/Next/i)).not.toBeInTheDocument();
  });
  test("should display next button", () => {
    const setCurrentPage = jest.fn();
    render(
      <Table
        column={INVOICE_COLUMN}
        datalist={invoiceList}
        pagination={true}
        setCurrentPage={setCurrentPage}
        currentPage={1}
      />
    );
    const buttonElement = screen.getByText(/Next/i);
    fireEvent.click(buttonElement);
    expect(buttonElement).toBeInTheDocument();
  });
});
