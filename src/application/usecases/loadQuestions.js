import { getQuestions } from "../../infrastructure/api/questionsApi";

export const loadQuestions = async () => {
  return await getQuestions();
};
