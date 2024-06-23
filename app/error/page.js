// /pages/auth/error.js
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page after a 10-second delay
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen text-center p-4">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p>There was an error during authentication. You will be redirected to the home page in 10 seconds...</p>
      </div>
    </div>
  );
};

export default AuthErrorPage;
