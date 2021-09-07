import { render, screen } from "@testing-library/react";

import QuizResult, { QuizResultType } from "../QuizResult";

let quizResult: QuizResultType;
beforeEach(() => {
  quizResult = {
    score: {
      level: "introvert",
      text: "result text",
    },
  };
});

describe("Test QuizResult", () => {
  it("renders QuizResult component", () => {
    render(<QuizResult result={quizResult} />);

    expect(screen.getByText(/Your personality type is/)).toBeInTheDocument();
    expect(screen.getByText("INTROVERT")).toBeInTheDocument();
    expect(screen.getByText(/result text/)).toBeInTheDocument();
  });
});
