// /app/ClientSessionProvider.js
"use client";
import { SessionProvider } from 'next-auth/react';

const ClientSessionProvider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default ClientSessionProvider;
