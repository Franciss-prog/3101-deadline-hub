export const srCodeRegex = /^[0-9]{2}-[0-9]{5}$/;

export const srCodeFormat = (srCode: string): boolean => {
  return srCodeRegex.test(srCode);
};
