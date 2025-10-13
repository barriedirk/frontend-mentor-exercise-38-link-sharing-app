export const generateNumericId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);

  return Number(`${timestamp}${random}`);
};
