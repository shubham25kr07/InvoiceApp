import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextArea from "../TextArea";

describe("TextArea Field", () => {
  const onChangeMock = jest.fn();

  test("should change input field value on change", async () => {
    render(<TextArea placeholder={"textarea"} onChange={onChangeMock} />);
    const inputElement = screen.getByPlaceholderText(/textarea/i);
    fireEvent.change(inputElement, { target: { value: "jack" } });
    expect(onChangeMock).toHaveBeenCalled();
    //  expect(onChangeMock).toHaveBeenCalledWith();
    expect(inputElement.value).toBe("jack");
  });
});
