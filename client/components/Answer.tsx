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
    <div className="answer">
      <input
        type="radio"
        name="answer"
        id={"answer" + answer._id}
        hidden
      ></input>
      <label
        htmlFor={"answer" + answer._id}
        onClick={() => onAnswer(answer._id)}
      >
        {answer.text}
      </label>
      <label
        className="checkmark"
        htmlFor={"answer" + answer._id}
        onClick={() => onAnswer(answer._id)}
      ></label>
    </div>
  );
};
export default Answer;
