export const generateTempId = () =>
  Number(`${Date.now()}-${Math.floor(Math.random() * 10000)}`);
