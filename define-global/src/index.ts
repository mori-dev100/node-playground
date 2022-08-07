export function hello(): void {
  const message: string = HELLO_RESPONCE_MESSAGE;

  console.log(message);
}

const a: string = HELLO_RESPONCE_MESSAGE;
const b: string = window.HELLO_RESPONCE_MESSAGE;
const c: string = global.HELLO_RESPONCE_MESSAGE;
const d: string = globalThis.HELLO_RESPONCE_MESSAGE;

export { a, b, c, d };
