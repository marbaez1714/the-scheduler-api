export const regexPatterns = {
  nonNumbers: /\D/g,
  phoneNumber: /^(\d{3}-\d{3}-\d{4})$|^(\d{10})$/, // 123-456-7890
};

export const checkDelete = (value?: string | null) => {
  return value === '' ? null : value;
};
