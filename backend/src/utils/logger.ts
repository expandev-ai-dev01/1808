// A more robust logger like Winston or Pino would be configured here.
// For this foundation, we'll use a simple console wrapper.

const log = (level: string, message: string, meta?: object) => {
  const timestamp = new Date().toISOString();
  console.log(
    JSON.stringify({
      timestamp,
      level,
      message,
      ...(meta && { meta }),
    })
  );
};

export const logger = {
  info: (message: string, meta?: object) => log('info', message, meta),
  warn: (message: string, meta?: object) => log('warn', message, meta),
  error: (message: string, meta?: object) => log('error', message, meta),
  debug: (message: string, meta?: object) => log('debug', message, meta),
};
