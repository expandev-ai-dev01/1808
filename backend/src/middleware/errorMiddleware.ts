import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { config } from '@/config';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  let message = err.isOperational ? err.message : 'An unexpected error occurred.';

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input provided.',
        details: err.errors.map((e) => ({ path: e.path, message: e.message })),
      },
      timestamp: new Date().toISOString(),
    });
  }

  // Don't expose sensitive error details in production
  if (config.env === 'production' && !err.isOperational) {
    // Log the full error for debugging
    console.error('UNHANDLED ERROR:', err);
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.name || 'INTERNAL_SERVER_ERROR',
      message,
      details: config.env !== 'production' ? err.stack : undefined,
    },
    timestamp: new Date().toISOString(),
  });
};
