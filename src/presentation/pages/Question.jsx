import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ContentVideo from "../components/common/video/ContentVideo";
import EndQuiz from "../components/endquiz/EndQuiz";
import ResultQuiz from "../components/resultquiz/ResultQuiz";
import ReactQuill from "react-quill"; 
import { loadQuestions } from "../../infrastructure/api/questionsApi";
import "react-quill/dist/quill.snow.css"; 
import useWindowWidth from "../../hooks/useWindowWidth";

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [editorContent, setEditorContent] = useState(""); 
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResultQuiz, setShowResultQuiz] = useState(false);
  const [score, setScore] = useState(0); 
  const [totalQuestions, setTotalQuestions] = useState(0); 
  const [answers, setAnswers] = useState([]); 

  const windowWidth = useWindowWidth();

  const isMobile = windowWidth <= 768;

  const accuracy = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : 0;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await loadQuestions(); 
        setQuestions(data);
      } catch (error) {
        console.error("Erro ao buscar as questões:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let isAnswered = false; 
    let isCorrect = false;
  
    if (currentQuestion) {
      if (currentQuestion.isSelect) {        
        isAnswered = selectedOption !== "";
        isCorrect = isAnswered && selectedOption === currentQuestion.correctAnswer;
      } else if (currentQuestion.isTextEditor) {        
        isAnswered = editorContent.trim() !== ""; 
        isCorrect = true; 
      } else {       
        isAnswered = selectedOption !== "";
        isCorrect = isAnswered && selectedOption === currentQuestion.correctAnswer;
      }      
      if (isAnswered) {
        setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore)); 
      }
  
     
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          questionId: currentQuestion.id,
          isCorrect,
          userAnswer: isAnswered ? (currentQuestion.isTextEditor ? editorContent : selectedOption) : "Não Respondida",
        },
      ]);
    }  

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(""); 
      setEditorContent(""); 
    } else {
      setTotalQuestions(questions.length);
      setQuizCompleted(true);
    }
  };
  
  
  
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Layout>
      <div className="container-question">
        {quizCompleted ? (
          showResultQuiz ? (
            <>
              <ContentVideo />
              <ResultQuiz  accuracy={accuracy}
                            answers={answers}
                            score={score}
                            totalQuestions={totalQuestions} />
            </>
          ) : (
            <>
           <ContentVideo />
              <EndQuiz onShowResult={() => setShowResultQuiz(true)} />
            </>
          )
        ) : (
          <>
              {!isMobile && <ContentVideo />}
            <div className="panel">
              <div className="question">
                <div className="title-question">
                  <h1>{currentQuestion?.title}</h1>
                  <p>{currentQuestion?.question}</p>

                  {/* Renderizando de acordo com o tipo da questão */}
                  {currentQuestion?.isSelect ? (
                    <div className="campo-question">
                      <select
                        className="combo-select"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      >
                        <option value="">Selecione uma opção</option>
                        {currentQuestion?.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : currentQuestion?.isTextEditor ? (
                    <div className="campo-question">
                      <ReactQuill
                        value={editorContent}
                        onChange={setEditorContent}
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ align: [] }],
                            ["bold", "italic", "underline"],
                            ["link"],
                            ["blockquote", "code-block"],
                            [{ color: [] }, { background: [] }],
                            [{ script: "sub" }, { script: "super" }],
                            ["undo", "redo"],
                          ],
                        }}
                        formats={[
                          "header",
                          "font",
                          "list",
                          "align",
                          "bold",
                          "italic",
                          "underline",
                          "link",
                          "blockquote",
                          "code-block",
                          "color",
                          "background",
                          "script",
                          "undo",
                          "redo",
                        ]}
                        placeholder="Escreva sua resposta aqui..."
                        style={{
                          height: "180px",
                          width: "100%",
                          border: "none",
                          borderRadius: "1px",
                        }}
                      />
                    </div>
                  ) : (
                    currentQuestion?.options?.map((option, index) => (
                      <div className="question-item" key={index}>
                        <div className="campo-question">
                          <label className="check-question">
                            <input
                              type="radio"
                              name={`question${currentQuestion.id}`}
                              value={option}
                              onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            {option}
                          </label>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>             
              <button
                id="quizButton"
                className={`start-quiz ${
                  quizCompleted
                    ? "quiz-completed" // Classe para quando o quiz é concluído
                    : currentQuestionIndex === 0
                    ? "start" // Classe para a primeira questão
                    : currentQuestionIndex === questions.length - 1
                    ? "final-step" // Classe para a última questão antes de completar
                    : "in-progress" // Classe para as questões intermediárias
                }`}
                onClick={handleNextQuestion}
              >
                {quizCompleted ? "Finalizar" : currentQuestionIndex === questions.length - 1 ? "Finalizar" : "Próximo"}
                <span className="material-symbols-outlined icon">arrow_right_alt</span>
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
