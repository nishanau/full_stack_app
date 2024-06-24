'use client'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ClientSessionProvider from './components/common/ClientSessionProvider';
import Navbar from './components/navbar/Navbar';
import './globals.css';

function Layout({ children, session }) {
  const pathname = usePathname();

  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  // Define routes where the navbar should not be shown
  const noNavbarRoutes = ['/auth/login', '/auth/signup'];

  // Check if the current route is one of the routes without a navbar
  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body>
        <ClientSessionProvider session={session}>
          {showNavbar && <Navbar />}
          <div>
            {children}
          </div>
        </ClientSessionProvider>
      </body>
    </html>
  );
}

export default Layout;
