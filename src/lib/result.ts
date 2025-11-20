export function success<T>(data: T, message?: string) {
  return {
    code: 200,
    data,
    message,
  };
}

export function fail(message: string) {
  return {
    code: 500,
    data: null,
    message,
  };
}
