import React from 'react';
import Link from 'next/link';

const AuthLinks = () => {
  return (
    <>
      <Link href="/auth/login" className="text-white hover:text-gray-300">Login</Link>
      <Link href="/auth/signup" className="text-white hover:text-gray-300">Sign Up</Link>
    </>
  );
};

export default AuthLinks;
