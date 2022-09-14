const regexPatterns = {
  nonNumbers: /\D/g,
};

export const formatPhoneNumber = <T extends string | undefined>(value: T): T => {
  if (typeof value === 'string') {
    return value.replace(regexPatterns.nonNumbers, '') as T;
  }

  return value;
};
