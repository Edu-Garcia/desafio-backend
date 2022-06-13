export const calculateAge = (birthDate: Date) => {
  return Math.floor(
    Math.ceil(
      Math.abs(birthDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    ) / 365.25
  );
};
