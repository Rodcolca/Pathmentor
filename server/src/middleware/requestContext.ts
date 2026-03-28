import type { RequestHandler } from 'express';
import { randomUUID } from 'crypto';
import { logger } from '../logging/logger';

export const requestContext: RequestHandler = (req, res, next) => {
  req.id = randomUUID();
  const startTime = Date.now();
  const childLogger = logger.child({
    requestId: req.id,
    method: req.method,
    path: req.path
  });

  childLogger.info({ event: 'request:start', ip: req.ip }, 'Incoming request');

  res.on('finish', () => {
    childLogger.info(
      {
        event: 'request:finish',
        statusCode: res.statusCode,
        durationMs: Date.now() - startTime
      },
      'Request completed'
    );
  });

  res.on('close', () => {
    childLogger.debug(
      {
        event: 'request:close',
        statusCode: res.statusCode,
        durationMs: Date.now() - startTime
      },
      'Connection closed'
    );
  });

  next();
};
