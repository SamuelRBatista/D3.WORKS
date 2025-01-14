import React from "react";
import "./EndQuiz.css";

export default function EndQuiz({ onShowResult }){
    return(
    
     
     
     <div className="endquiz">               

            <div className="title-endquiz">
                <h1>Parabéns seu teste foi enviado com sucesso</h1>
                <p>Em breve entraremos em contato com mais informações.</p>                
            </div>
            <button id="resultQuiz" className="end-quiz" onClick={onShowResult}  >
            Ver resultado
            <span className="material-symbols-outlined icon">arrow_right_alt</span>
            </button>
            
        </div>
    
           
      
      
        
    )
}