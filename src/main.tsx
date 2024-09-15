import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App.tsx';
import './index.css';
import { Auth } from './Auth.tsx';
import { NotFound } from './404.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth/:authToken',
    element: <Auth />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
