import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormInput from "../FormInput";
describe("FormInput Fields", () => {
  test("should change input field value on change", async () => {
    render(<FormInput label="name" />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "jacks" } });
    expect(inputElement.value).toBe("jacks");
  });
});
