export const validateInnNumber = (inn: string | number): boolean => {
  let result = false;
  if (typeof inn === 'number') {
    inn = inn.toString();
  } else if (typeof inn !== 'string') {
    inn = '';
  } else {
    const checkDigit = (inn: string, coefficients: number[]): number => {
      let n = 0;
      for (let i = 0; i < coefficients.length; i++) {
        n += coefficients[i] * parseInt(inn[i]);
      }
      return (n % 11) % 10;
    };

    const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
    if (n10 === parseInt(inn[9])) {
      result = true;
    }
  }
  return result;
};

export const phoneNumber = (input: string) => {
  const trimmedInput = input.trim().replace(/ /g, '');
  return /^\d*$/.test(trimmedInput) || /^(\+7)/.test(trimmedInput);
};

export const formatPhoneNumber = (input: string) => {
  const trimInput = input.trim().replace(/(?!^\+)\D/g, '');

  const mainNumber = trimInput.slice(0, 12);
  const additionalDigits = trimInput.slice(12);

  let formNumber = '';

  if (mainNumber.length <= 2) {
    formNumber = mainNumber;
  } else if (mainNumber.length <= 5) {
    formNumber = `${mainNumber.slice(0, 2)} ${mainNumber.slice(2)}`;
  } else if (mainNumber.length <= 8) {
    formNumber = `${mainNumber.slice(0, 2)} ${mainNumber.slice(2, 5)} ${mainNumber.slice(5)}`;
  } else if (mainNumber.length <= 10) {
    formNumber = `${mainNumber.slice(0, 2)} ${mainNumber.slice(2, 5)} ${mainNumber.slice(5, 8)} ${mainNumber.slice(8)}`;
  } else {
    formNumber = `${mainNumber.slice(0, 2)} ${mainNumber.slice(2, 5)} ${mainNumber.slice(5, 8)} ${mainNumber.slice(8, 10)} ${mainNumber.slice(10, 12)}`;
  }

  return formNumber + additionalDigits;
};

export const validPhoneNumber = (input: string) => {
  const trimmedInput = input.trim().replace(/(?!^\+)\D/g, '');
  return trimmedInput.match(/(^8|7|\+7)(\d{10})/);
};
