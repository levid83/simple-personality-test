import { render, fireEvent, screen } from "@testing-library/react";
import QuizService from "../../services/Quiz.service";
import Quiz, { QuizType } from "../Quiz";

let quiz: QuizType;
beforeEach(() => {
  quiz = {
    _id: "12345",
    title: "quiz title",
    questions: [
      {
        title: "question 1 title",
        answers: [
          { _id: "1", text: "answer 1" },
          { _id: "2", text: "answer 2" },
        ],
      },
      {
        title: "question 2 title",
        answers: [
          { _id: "3", text: "answer 3" },
          { _id: "4", text: "answer 4" },
        ],
      },
      {
        title: "question 3 title",
        answers: [
          { _id: "5", text: "answer 5" },
          { _id: "6", text: "answer 6" },
        ],
      },
    ],
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Test Quiz", () => {
  it("renders Quiz component", () => {
    render(<Quiz quiz={quiz} />);

    expect(screen.getByText("quiz title")).toBeInTheDocument();
    expect(screen.getByText("question 1 title")).toBeInTheDocument();
  });

  it("has next button", () => {
    render(<Quiz quiz={quiz} />);
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("renders only 1 question at once", () => {
    render(<Quiz quiz={quiz} />);

    expect(screen.queryByText("question 2 title")).toBeNull();
  });

  it("renders the next question after the previous answer", async () => {
    render(<Quiz quiz={quiz} />);

    fireEvent.click(screen.getByText("answer 1"));
    fireEvent.click(screen.getByText("Next"));

    expect(await screen.findByText("question 2 title")).toBeInTheDocument();
  });

  it("can change the answer before showing the next question", async () => {
    render(<Quiz quiz={quiz} />);

    fireEvent.click(screen.getByText("answer 1"));
    fireEvent.click(screen.getByText("answer 2"));
    fireEvent.click(screen.getByText("Next"));

    expect(await screen.findByText("question 2 title")).toBeInTheDocument();
  });

  it("renders Finish button for the last question", async () => {
    render(<Quiz quiz={quiz} />);

    fireEvent.click(screen.getByText("answer 1"));
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByText("answer 3"));
    fireEvent.click(screen.getByText("Next"));

    expect(await screen.findByText("Finish")).toBeInTheDocument();
  });

  it("renders quiz results when submit the answers", async () => {
    QuizService.postAnswers = jest.fn().mockResolvedValue({
      score: {
        level: "introvert",
        text: "result text",
      },
    });

    render(<Quiz quiz={quiz} />);

    fireEvent.click(screen.getByText("answer 1"));
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByText("answer 3"));
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByText("answer 5"));
    fireEvent.click(screen.getByText("Finish"));

    expect(
      await screen.findByText(/Your personality type/)
    ).toBeInTheDocument();
  });

  it("renders error page when receives error from the server", async () => {
    QuizService.postAnswers = jest.fn().mockRejectedValue({
      code: 500,
    });

    render(<Quiz quiz={quiz} />);

    fireEvent.click(screen.getByText("answer 1"));
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByText("answer 3"));
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByText("answer 5"));
    fireEvent.click(screen.getByText("Finish"));

    expect(await screen.findByText(/500/)).toBeInTheDocument();
  });
});
