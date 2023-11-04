export const isNumeric = (value: string | number): boolean => {
  if (typeof value !== 'string' && typeof value !== 'number') return false; // we only process strings and numbers
  return !isNaN(value as number) && !isNaN(parseFloat(value as string));
};

export const uniqueId = (): string => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};
