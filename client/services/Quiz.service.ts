import request, { httpErrorHander } from "./http.request";
import { QuizType } from "../components/Quiz";
import { QuizResultType } from "../components/QuizResult";

const getQuiz = async (slug: string): Promise<QuizType> => {
  try {
    const response: any = await request.get("/quiz/" + slug);

    if (response.data.error)
      return Promise.reject(httpErrorHander({ response }));

    return response.data.data;
  } catch (err) {
    return Promise.reject(httpErrorHander(err));
  }
};

const postAnswers = async (
  questionId: String,
  answers: String[]
): Promise<QuizResultType> => {
  try {
    const response: any = await request.post("/quiz-result/" + questionId, {
      answers,
    });

    if (response.data.error)
      return Promise.reject(httpErrorHander({ response }));

    return response.data.data;
  } catch (err) {
    return Promise.reject(httpErrorHander(err));
  }
};

const QuizService = { getQuiz, postAnswers };

export default QuizService;
