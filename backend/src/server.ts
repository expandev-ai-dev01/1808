import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import 'dotenv/config';

import { config } from '@/config';
import { errorMiddleware } from '@/middleware/errorMiddleware';
import { notFoundMiddleware } from '@/middleware/notFoundMiddleware';
import apiRoutes from '@/routes';

const app: Application = express();

// Security & Core Middleware
app.use(helmet());
app.use(cors(config.api.cors));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (config.env !== 'test') {
  app.use(morgan('combined'));
}

// Health check endpoint (does not require versioning)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes with versioning
app.use('/api', apiRoutes);

// 404 Handler for unmatched routes
app.use(notFoundMiddleware);

// Centralized Error Handling Middleware
app.use(errorMiddleware);

const server = app.listen(config.api.port, () => {
  console.log(`Server running on port ${config.api.port} in ${config.env} mode`);
});

// Graceful Shutdown
const signals = ['SIGTERM', 'SIGINT'];

function gracefulShutdown(signal: string) {
  process.on(signal, () => {
    console.log(`\n${signal} received, closing server gracefully.`);
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
}

signals.forEach(gracefulShutdown);

export default app;
