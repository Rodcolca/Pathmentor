export class HttpError extends Error {
  public readonly status: number;
  public readonly expose: boolean;

  constructor(status: number, message: string, expose = false) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.expose = expose;
    Error.captureStackTrace?.(this, HttpError);
  }
}
