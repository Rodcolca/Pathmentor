import type { ErrorRequestHandler } from 'express';
import { logger } from '../logging/logger';
import { HttpError } from '../errors/httpError';

const isProduction = process.env.NODE_ENV === 'production';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const status = err instanceof HttpError ? err.status : 500;
  const isExposed = err instanceof HttpError ? err.expose : status !== 500;
  const message = isExposed || status !== 500 ? err.message : 'Internal Server Error';

  logger.error(
    {
      err,
      requestId: req.id,
      status
    },
    'Unhandled error'
  );

  const response: Record<string, unknown> = { error: message };

  if (!isProduction && (isExposed || status !== 500) && err.stack) {
    response.stack = err.stack;
  }

  res.status(status).json(response);
};
