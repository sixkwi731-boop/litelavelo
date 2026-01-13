// Detecta tipo de dispositivo e informações do navegador

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  
  // Detecta tipo de dispositivo
  let deviceType = 'Desktop';
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceType = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    deviceType = 'Mobile';
  }
  
  // Detecta sistema operacional
  let os = 'Unknown';
  if (userAgent.indexOf('Win') !== -1) os = 'Windows';
  else if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
  else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
  else if (userAgent.indexOf('Android') !== -1) os = 'Android';
  else if (userAgent.indexOf('iOS') !== -1 || userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) os = 'iOS';
  
  // Detecta navegador
  let browser = 'Unknown';
  if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome';
  else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari';
  else if (userAgent.indexOf('Firefox') !== -1) browser = 'Firefox';
  else if (userAgent.indexOf('Edg') !== -1) browser = 'Edge';
  else if (userAgent.indexOf('Opera') !== -1 || userAgent.indexOf('OPR') !== -1) browser = 'Opera';
  
  // Detecta tamanho da tela
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  
  return {
    deviceType,
    os,
    browser,
    screenSize: `${screenWidth}x${screenHeight}`,
    userAgent: userAgent.substring(0, 200) // Limita tamanho
  };
};

export const getDeviceString = () => {
  const info = getDeviceInfo();
  return `${info.deviceType} | ${info.os} | ${info.browser} | ${info.screenSize}`;
};
