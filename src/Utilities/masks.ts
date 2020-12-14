const onlyNumbersRegex = /\D/g;

export const alphaNumericSite = (value: string): string | undefined => value?.replace(/[^a-zA-Z0-9\s]/g, '');

export const cpfMask = (value: string): string | undefined =>
  value
    ?.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

export const cnpjMask = (value: string | null): string | undefined =>
  value
    ?.replace(onlyNumbersRegex, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

const isCpf = (value: string): boolean => {
  if (value) {
    const transformedValue = value.replace(/\D/g, '');
    return transformedValue.length <= 11;
  }
  return false;
};

export const documentMask = (value: string): string | undefined => {
  if (isCpf(value)) {
    return cpfMask(value);
  }
  return cnpjMask(value);
};
export const phoneMask = (value: string): string | undefined =>
  value?.replace(onlyNumbersRegex, '').replace(/(\d{2})(\d{4,5})(\d{4,})/, function (regex, arg2, arg3, arg4) {
    return `(${arg2}) ${arg3}-${arg4.slice(0, 4)}`;
  });

export const whatsAppPhoneMask = (value: string): string | undefined =>
  value?.replace(onlyNumbersRegex, '').replace(/(\d{2})(\d{5})(\d{4})/, function (regex, arg2, arg3, arg4) {
    return `(${arg2}) ${arg3}-${arg4.slice(0, 4)}`;
  });

export const countryCodeMask = (value: string) =>
  value?.replace(onlyNumbersRegex, '').replace(/(\d{1,})/, (regex, arg1) => {
    return `+${arg1.substring(0, 2)}`;
  });
export const cepMask = (value: string): string | undefined => value?.replace(/^(\d{5})(\d{3})/, '$1-$2');

export const moneyMask = (price: string) => {
  let priceAsString = price.replace(onlyNumbersRegex, '');
  priceAsString = priceAsString.replace('.', '');

  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(priceAsString) / 100);
};

export const moneyUnmask = (price: string) => {
  const priceAsString = price.replace(onlyNumbersRegex, '');

  return Number(priceAsString) / 100;
};

export const weightMask = (minimum: string | number, maximum: string | number) => {
  const minimumAsNumber = Number(minimum);
  const maximumAsNumber = Number(maximum);
  return `de ${minimumAsNumber / 1000}kg até ${maximumAsNumber / 1000}kg`;
};
