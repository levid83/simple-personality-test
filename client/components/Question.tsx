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
    <div className="question">
      <span className="title">{question.title}</span>
      <div className="answers">
        {question.answers.map((a: AnswerType, idx: number) => (
          <Answer key={a._id} answer={a} onAnswer={onAnswer} />
        ))}
      </div>
    </div>
  );
};

export default Question;
