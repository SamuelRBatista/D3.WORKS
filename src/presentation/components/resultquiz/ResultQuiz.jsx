import { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useNavigate } from "react-router-dom";
import "./ResultQuiz.css";

// Registre os elementos necessários
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ResultQuiz = ({ accuracy, score, totalQuestions, answers }) => {
  const navigate = useNavigate();

  const chartRef = useRef(null); // Referência para o gráfico

  const unansweredCount = answers.filter(answer => answer.userAnswer === "Não Respondida").length;

  const data = {
    labels: ["Acertos", "Erros", "Não Respondidas"],
    datasets: [
      {
        data: [score, totalQuestions - score - unansweredCount, unansweredCount],
        backgroundColor: ["#2A52F0", "#AE2831", "#40C2E9"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Remove a legenda padrão
      },
      datalabels: {
        color: "#fff", // Cor do texto
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0); // Soma total
          const percentage = ((value / total) * 100).toFixed(1); // Calcula a porcentagem
          return `${percentage}%`; // Exibe a porcentagem
        },
        font: {
          size: 16,
        },
      },
    },
  };

  const initQuiz = () => {
    navigate("/");  // Navega para a tela inicial (HomePage)
  };
 
  return (
    <div className="graphic-layer">
      <div className="result-quiz" style={{ display: "flex", alignItems: "center" }}>
      <div className="graphic-content">
            <div style={{ width: "452px", height: "144px", margin: "0 auto" }}>
              <Doughnut  data={data} ref={chartRef} options={options} />
            </div>
      </div>

            {/* Legenda personalizada ao lado do gráfico */}
            <div className="graphic-content">
            <div style={{ marginLeft: "30px", width:"169px", color:"#fff"}}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: "#2A52F0",
                    marginRight: "10px",
                  }}></div>
                  <span>Acertos</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: "#40C2E9",
                    marginRight: "10px",
                  }}></div>
                  <span>Sem respostas</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: "#AE2831",
                    marginRight: "10px",
                  }}></div>
                  <span>Erros</span>          
                </div>
              </div>                            
            </div> 


            </div>
       
          </div>
          <button className="init-quiz" onClick={initQuiz}  >
              Responder novamente
              <span className="material-symbols-outlined icon">arrow_right_alt</span>
          </button>
      </div>
    );
  };

export default ResultQuiz;
