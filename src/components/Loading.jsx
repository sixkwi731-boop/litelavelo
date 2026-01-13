import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <img src="/icon.svg" alt="Carregando" className="loading-icon" />
        <p className="loading-text">Carregando...</p>
      </div>
    </div>
  );
};

export default Loading;
