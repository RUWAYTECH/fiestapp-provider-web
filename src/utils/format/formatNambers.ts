export const formatDecimal = (value: number, decimal = 2) => {
    return value.toFixed(decimal);
}

export const isNumber = (value: any) => {
    return !isNaN(Number(value));
  }

export const isString = (valor: any) => {
    return typeof valor === 'string';
}

export const formatNumbers = (nums: number[]): string[] => {
    return nums.map(num => num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }));
  };
