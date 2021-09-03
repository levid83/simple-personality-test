// @ts-ignore not @type/html-to-react package exists
import { Parser } from "html-to-react";
import { ReactElement } from "react";

type ScoreType = {
  level: string;
  text: string;
};

export type QuizResultType = {
  score: ScoreType;
};

const QuizResult = ({ result }: { result?: QuizResultType }): ReactElement => {
  return (
    <div>
      <div>Your personality type is: {result?.score.level}</div>
      <div>{Parser().parse(result?.score.text)}</div>
    </div>
  );
};

export default QuizResult;
