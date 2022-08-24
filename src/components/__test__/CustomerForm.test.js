import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import CustomerForm from "../CustomerForm";
import { server } from "../../mock/SERVER.JS";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
const MockCustomer = () => {
  return (
    <BrowserRouter>
      <CustomerForm />
    </BrowserRouter>
  );
};
describe("CustomerForm", () => {
  test("Testing Customer Form Name Page ", async () => {
    render(<MockCustomer />);
    const labelName = screen.getByText(/Nam/i);
    expect(labelName.innerHTML).toBe("Name");
    const inputName = screen.getByTestId("name");
    fireEvent.blur(inputName, { target: { value: "" } });
    expect(inputName.innerHTML).toBe("");
    const errorName = screen.getByText(/ *Name is a Required/i);
    expect(errorName.innerHTML).toBe(" *Name is a Required");
  });
  test("Testing Customer Form Email Page ", async () => {
    render(<MockCustomer />);
    const labelName = screen.getByText(/Ema/i);
    expect(labelName.innerHTML).toBe("Email");
    const inputName = screen.getByTestId("email");
    fireEvent.change(inputName, { target: { value: "SK@gmail.com" } });
    expect(inputName.value).toBe("SK@gmail.com");
    expect(screen.queryByText("SK@gmail.com")).not.toBeInTheDocument();
  });
  test("should submit form", async () => {
    render(<MockCustomer />);
    const inputName = screen.getByTestId("name");
    fireEvent.change(inputName, { target: { value: "John" } });
    const inputEmail = screen.getByTestId("email");
    fireEvent.change(inputEmail, { target: { value: "SK@gmail.com" } });
    const inputPhone = screen.getByTestId("phone");
    fireEvent.change(inputPhone, { target: { value: "987654321" } });

    const buttonSubmit = screen.getByText(/Save Customer/i);
    fireEvent.click(buttonSubmit);
  });
});
