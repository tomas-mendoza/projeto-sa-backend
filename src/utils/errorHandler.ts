export default function errorHandler(error: unknown) {
  if(error instanceof Error) {
    return error.message;
  }
}
