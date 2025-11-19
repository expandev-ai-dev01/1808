import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Placeholder for a global Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">App Header</div>
      </header>

      <main className="container py-8">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Placeholder for a global Footer */}
      <footer className="border-t">
        <div className="container py-4 text-center text-sm text-muted-foreground">App Footer</div>
      </footer>
    </div>
  );
};
