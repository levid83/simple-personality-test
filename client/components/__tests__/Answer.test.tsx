import { render, fireEvent, screen } from "@testing-library/react";
import Answer from "../Answer";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Test Answer", () => {
  it("renders Answer component", () => {
    render(
      <Answer answer={{ _id: "1", text: "answer text" }} onAnswer={() => {}} />
    );
    expect(screen.getByText("answer text")).toBeInTheDocument();
    expect(screen.getByRole("radio", { hidden: true })).toHaveAttribute(
      "id",
      "answer1"
    );
  });

  it("calls the onAnswer callback on answer selection", () => {
    const mockCallBack = jest.fn();
    render(
      <Answer
        answer={{ _id: "1", text: "answer text" }}
        onAnswer={mockCallBack}
      />
    );

    fireEvent.click(screen.getByText("answer text"));
    fireEvent.click(screen.getByTestId("answer1"));
    expect(mockCallBack).toHaveBeenCalledTimes(2);
  });
});
