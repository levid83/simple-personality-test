export type AnswerType = {
  _id: string;
  text: Text;
};

const Answer = ({
  answer,
  onAnswer,
}: {
  answer: AnswerType;
  onAnswer: (id: string) => void;
}) => {
  return <li onClick={() => onAnswer(answer._id)}>{answer.text}</li>;
};
export default Answer;
