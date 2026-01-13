// Validação de CPF
export const isValidCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(10))) return false;

  return true;
};

// Validação de E-mail
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de CPF ou E-mail
export const isValidCPFOrEmail = (value) => {
  const cleanValue = value.replace(/[^\d]/g, "");
  if (cleanValue.length === 11) {
    return isValidCPF(value);
  }
  return isValidEmail(value);
};

// Validação de Telefone
export const isValidPhone = (phone) => {
  const cleanPhone = phone.replace(/[^\d]/g, "");
  return cleanPhone.length === 11 || cleanPhone.length === 10;
};

// Formatação de CPF
export const formatCPF = (value) => {
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return value;
};

// Formatação de Telefone
export const formatPhone = (value) => {
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length <= 11) {
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return numbers.replace(/(\d{2})(\d)/, "($1) $2");
    } else if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d)/, "($1) $2-$3");
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  }
  return value;
};
