import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/App';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';
import { MainLayout } from '@/layouts/MainLayout';

const HomePage = lazy(() => import('@/pages/Home'));
const VehicleDetailPage = lazy(() => import('@/pages/VehicleDetail'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: 'vehicle/:id',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <VehicleDetailPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
