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
  return (
    <div className="answer" onClick={() => onAnswer(answer._id)}>
      <input type="radio" name="answer" id={"answer" + answer._id} />
      <label htmlFor={"answer" + answer._id}>{answer.text}</label>
      <span className="checkmark"></span>
    </div>
  );
};
export default Answer;
