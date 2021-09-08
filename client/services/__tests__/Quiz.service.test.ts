import { QuizType } from "../../components/Quiz";
import axios from "axios";

import QuizService from "../Quiz.service";

let testQuiz: QuizType;
beforeEach(async () => {
  testQuiz = {
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

describe("Test Quiz Service", () => {
  it("should fetch quiz data", async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: { data: testQuiz },
    });
    const res = await QuizService.getQuiz("test-slug");

    expect(res).toMatchObject(testQuiz);
  });

  it("should reject on server error", async () => {
    expect.assertions(1);
    axios.get = jest
      .fn()
      .mockRejectedValue({ status: 500, message: "server error" });
    try {
      await QuizService.getQuiz("test-slug");
    } catch (err: any) {
      expect(err).toStrictEqual({ code: 500, error: "server error" });
    }
  });

  it("should reject on missing quiz", async () => {
    expect.assertions(1);

    axios.get = jest.fn().mockResolvedValue({
      status: 401,
      data: { error: "missing quiz" },
    });

    try {
      await QuizService.getQuiz("test-slug");
    } catch (err: any) {
      expect(err).toStrictEqual({ code: 401, error: "missing quiz" });
    }
  });

  it("should send answers", async () => {
    const answers = ["1abcd", "2abcd", "3abcd"];
    axios.post = jest.fn().mockResolvedValue({ data: { data: {} } });
    const res = await QuizService.postAnswers("test-slug", answers);

    expect(axios.post).toBeCalledWith("/quiz-result/test-slug", { answers });
  });

  it("should get the results", async () => {
    const answers = ["1abcd", "2abcd", "3abcd"];

    axios.post = jest.fn().mockResolvedValue({
      data: {
        data: {
          score: {
            level: "introvert",
            text: "result text",
          },
        },
      },
    });
    const res = await QuizService.postAnswers("test-slug", answers);

    expect(res.score.level).toBe("introvert");
    expect(res.score.text).toBe("result text");
  });

  it("should reject on server error", async () => {
    expect.assertions(1);
    const answers = ["1abcd", "2abcd", "3abcd"];
    axios.post = jest
      .fn()
      .mockRejectedValue({ status: 500, message: "server error" });

    try {
      const res = await QuizService.postAnswers("test-slug", answers);
    } catch (err: any) {
      expect(err).toStrictEqual({ code: 500, error: "server error" });
    }
  });

  it("should reject on missing result", async () => {
    expect.assertions(1);
    const answers = ["1abcd", "2abcd", "3abcd"];
    axios.post = jest.fn().mockResolvedValue({
      status: 401,
      data: { error: "missing result" },
    });

    try {
      const res = await QuizService.postAnswers("test-slug", answers);
    } catch (err: any) {
      expect(err).toStrictEqual({ code: 401, error: "missing result" });
    }
  });
});
