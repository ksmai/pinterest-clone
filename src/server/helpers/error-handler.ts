export function errorHandler(
  err: Error|any,
  req: any,
  res: any,
  next: any,
) {
  const statusCode = err.status || 400;
  const message = err.message || err;

  res.status(statusCode).json({ error: message });
}
