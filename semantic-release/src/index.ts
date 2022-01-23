export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export const sub = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a - b;
};

export const times = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a * b;
};

export const division = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  if (a === 0 || b === 0) {
    throw new Error('ゼロ徐算エラー');
  }
  return a / b;
};

export const random = () => {
  return Math.round(Math.random() * 100);
};

export const round = (a: number, b: number) => {
  const val = 10 * b;
  return Math.round((a * val) / val);
};

export const lucky = () => {
  return 7;
};
