import { render, fireEvent, screen } from "@testing-library/react";
import Question from "../Question";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Test Question", () => {
  it("renders Question component", () => {
    const question = {
      title: "question title",
      answers: [
        { _id: "1", text: "answer 1" },
        { _id: "2", text: "answer 2" },
      ],
    };

    render(<Question question={question} onAnswer={() => {}} />);

    expect(screen.getByText("question title")).toBeInTheDocument();
    expect(screen.getByText("answer 1")).toBeInTheDocument();
    expect(screen.getByText("answer 2")).toBeInTheDocument();
  });

  it("calls the onAnswer callback on answer selection", () => {
    const mockCallBack = jest.fn();
    const question = {
      title: "question title",
      answers: [
        { _id: "1", text: "answer 1" },
        { _id: "2", text: "answer 2" },
      ],
    };

    render(<Question question={question} onAnswer={mockCallBack} />);

    fireEvent.click(screen.getByText("answer 1"));
    fireEvent.click(screen.getByText("answer 2"));
    expect(mockCallBack).toHaveBeenCalledTimes(2);
  });
});
