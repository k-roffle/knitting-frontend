export const splitText = (text: string, splitter: string): string[] => {
  return text
    .split(splitter)
    .map((tag) => tag.trim())
    .filter((value) => value);
};
