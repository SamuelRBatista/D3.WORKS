import React from "react";
import "./ContentVideo.css";

export default function ContentVideo(){
    return(
    <div className="video-container">
        <video className="video-item"
          autoPlay
          loop
          muted          
        >
          <source src="/img/video.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
    </div>
    )
}