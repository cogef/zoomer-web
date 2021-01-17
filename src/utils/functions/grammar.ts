export const formatSingularity = (word: string, num: number) => {
  if (num === 1) return word;
  return word + 's';
};
