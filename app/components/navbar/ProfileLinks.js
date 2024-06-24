import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const ProfileLinks = () => {
  return (
    <>
      <Link href="/profile" className="text-white hover:text-gray-300">Profile</Link>
      <button onClick={() => signOut()} className="text-white hover:text-gray-300">Logout</button>
    </>
  );
};

export default ProfileLinks;
