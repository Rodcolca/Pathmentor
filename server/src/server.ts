import { createApp } from './app';
import { config } from './config/env';
import { logger } from './logging/logger';

const app = createApp(config);

const server = app.listen(config.port, () => {
  logger.info(`🚀 Server listening on http://localhost:${config.port}`);
});

const shutdown = (signal: string) => {
  logger.info({ signal }, 'Received shutdown signal');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  logger.error({ err: reason }, 'Unhandled promise rejection');
});
