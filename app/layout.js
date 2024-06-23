// /app/layout.js
'use client'
import { useEffect } from 'react';
import ClientSessionProvider from './ClientSessionProvider';
import './globals.css';

function Layout({ children, session }) {
  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body>
        <ClientSessionProvider session={session}>
          <div>
            {children}
          </div>
        </ClientSessionProvider>
      </body>
    </html>
  );
}

export default Layout;
