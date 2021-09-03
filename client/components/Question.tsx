import Answer, { AnswerType } from "./Answer";

type QuestionType = {
  title: string;
  answers: [];
};

const Question = (props: {
  question: QuestionType;
  onAnswer: (id: string) => void;
}) => {
  const { question, onAnswer } = props;

  return (
    <div>
      <span>{question.title}</span>
      <ul>
        {question.answers.map((a: AnswerType, idx: number) => (
          <Answer key={a._id} answer={a} onAnswer={onAnswer} />
        ))}
      </ul>
    </div>
  );
};

export default Question;
