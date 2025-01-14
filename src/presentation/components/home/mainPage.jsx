import React from "react";
import { useNavigate } from "react-router-dom";
import ContentVideo from "../common/video/ContentVideo";

export default function Main() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/question");
  };

  return (
    <>
      <div className="container">
        <ContentVideo/>
        <div className="abertura">
          <div className="abertura-container">
            <div className="abertura-title">
              <h1>Parabéns por chegar até aqui!</h1>
              <p>
                Prepare-se para uma jornada incrível! Na D3, você terá a oportunidade de fazer
                parte de um time talentoso e trabalhar em projetos desafiadores.
              </p>
              <p>Tire uma cópia do arquivo Figma e envie para o e-mail fornecido na vaga.</p>
            </div>
          </div>
          <button  className="btn-quiz"  onClick={handleStartQuiz}>
            Iniciar quiz
            <span className="material-symbols-outlined icon">arrow_right_alt</span>
          </button>
        </div>
      </div>
    </>
  );
}
