// Serviço de armazenamento local (funciona em desenvolvimento)
// Será substituído pela API quando em produção

const STORAGE_KEY = "livelo_users";

export const saveUserToLocal = (data) => {
  try {
    const users = getUsersFromLocal();
    const newUser = {
      id: users.length + 1,
      ...data,
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return { success: true, id: newUser.id };
  } catch (error) {
    console.error("Erro ao salvar localmente:", error);
    return { success: false, error: error.message };
  }
};

export const getUsersFromLocal = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const deleteUsersFromLocal = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
