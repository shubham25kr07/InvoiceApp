import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Invoice from "../Invoice";
import { BrowserRouter } from "react-router-dom";
import { EntityDetailsContext } from "../../App";
import { CustomerApi, InvoiceApi } from "../../Utils/Network";
import { useEffect, useState } from "react";
import { server } from "../../mock/SERVER.JS";
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const MockInvoice = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const propsValue = {
    invoiceList,
    setInvoiceList,
  };
  useEffect(() => {
    InvoiceApi(setInvoiceList);
    console.log("useEffect");
  }, []);
  console.log("outside");
  return (
    <EntityDetailsContext.Provider value={propsValue}>
      <BrowserRouter>
        <Invoice />
      </BrowserRouter>
    </EntityDetailsContext.Provider>
  );
};
describe("Invoice", () => {
  test("should have invoice list  ", async () => {
    render(<MockInvoice />);
    //  const value1 = await screen.findByTestId("custom-element");
    //  expect(value1.innerHTML).toBe("NO Customers");
    // const invoiceValue = await screen.findByTestId("invoice-element");

    // expect(await screen.findByTestId("invoice-element")).toBeInTheDocument();
    const noinvoiceValue = screen.getByTestId("no-invoice-element");
    expect(noinvoiceValue).toBeInTheDocument();
  });
});
