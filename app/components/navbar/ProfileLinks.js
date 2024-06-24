import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { signOut } from 'next-auth/react';

const ProfileLinks = () => {
  return (
    <div className="flex space-x-4">
      <Link href="/profile" passHref>
        <Button type="link" className="text-white hover:text-gray-300">
          Profile
        </Button>
      </Link>
      <Button type="link" className="text-white hover:text-red-500" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};

export default ProfileLinks;
