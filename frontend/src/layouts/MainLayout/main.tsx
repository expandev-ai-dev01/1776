import { Outlet } from 'react-router-dom';
import type { MainLayoutProps } from './types';

export const MainLayout = ({ className }: MainLayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${className || ''}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-[--color-background]">
        <div className="container mx-auto px-4 h-16 center justify-between">
          <h1 className="text-2xl font-bold text-[--color-primary-600]">Catálogo de Carros</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t bg-[--color-muted]">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-[--color-muted-foreground]">
          <p>&copy; {new Date().getFullYear()} Catálogo de Carros. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
