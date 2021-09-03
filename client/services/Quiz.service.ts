import request, { httpErrorHander } from "./http.request";
import { QuizType } from "../components/Quiz";
import { QuizResultType } from "../components/QuizResult";

const getQuiz = async (slug: string): Promise<QuizType> => {
  try {
    const response = await request.get("/quiz/" + slug);

    if (!response.data) return Promise.reject(response.status);

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
    const response = await request.post("/quiz-result/" + questionId, {
      answers,
    });

    if (!response.data) return Promise.reject(response.status);

    return response.data.data;
  } catch (err) {
    return Promise.reject(httpErrorHander(err));
  }
};

export { getQuiz, postAnswers };
