import { ReactElement, useEffect, useState } from "react";
import Question from "./Question";
import { postAnswers } from "../services/Quiz.service";
import QuizResult, { QuizResultType } from "./QuizResult";
import Error from "next/error";

export type QuizType = {
  questions: [];
  _id: string;
};

type ErrorTpye = { error: any; code: number };

const Quiz = ({ quiz }: { quiz: QuizType }): ReactElement => {
  const [counter, setCounter] = useState<number>(0);
  const [answers, addAnswer] = useState<string[]>([]);

  const [quizResult, setQuizResult] = useState<QuizResultType | null>(null);
  const [error, setError] = useState<ErrorTpye | null>(null);

  const onAnswer = (answer: string): void => {
    addAnswer((ans) => [
      ...(ans[counter] === undefined ? ans : ans.slice(0, -1)),
      answer,
    ]);
  };
  const onNext = (): void => {
    setCounter((c) => c + 1);
  };

  useEffect(() => {
    if (counter === quiz.questions.length) {
      postAnswers(quiz._id, answers)
        .then((data) => {
          setQuizResult(data);
        })
        .catch((err) => setError(err));
    }
  }, [answers, counter, quiz.questions.length, quiz._id]);

  return counter < quiz.questions.length ? (
    <>
      <Question
        question={quiz.questions[counter]}
        onAnswer={onAnswer}
      ></Question>
      <button
        onClick={() => onNext()}
        disabled={answers[counter] === undefined}
      >
        Next
      </button>
    </>
  ) : quizResult ? (
    <QuizResult result={quizResult} />
  ) : error ? (
    <Error statusCode={error.code} />
  ) : (
    <div>...Loading</div>
  );
};

export default Quiz;
