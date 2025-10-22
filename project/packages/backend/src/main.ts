import { createApp } from './createApp';

let server: ReturnType<typeof import('http').createServer> | null = null;
console.log('main.ts loaded');

try {
  const PORT = process.env.PORT ?? 1234;

  const app = createApp();

  server = app.listen(PORT, () => {
    console.log(`✅ Server listening on http://localhost:${PORT}`);
  });

  // Handle graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`📴 Received ${signal}, shutting down server...`);
    if (server) {
      server.close(() => {
        console.log('✅ Server closed gracefully.');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Handle unexpected errors
  process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    if (server) {
      server.close(() => process.exit(1));
    } else {
      process.exit(1);
    }
  });

  process.on('unhandledRejection', (reason) => {
    console.error('❌ Unhandled Rejection:', reason);
    if (server) {
      server.close(() => process.exit(1));
    } else {
      process.exit(1);
    }
  });
} catch (err) {
  console.error('❌ Server crashed during setup:', err);
}
