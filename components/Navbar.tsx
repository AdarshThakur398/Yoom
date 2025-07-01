import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <div className="flex-between px-6 py-4 top-0 fixed z-50 w-full bg-dark-1 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Yoom logo"
          className="max-sm:w-8 max-sm:h-8"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">Yoom</p>
      </Link>

      <div className="flex-between gap-5">
        <SignedIn>
 <UserButton/>

        </SignedIn>
        <SignedOut>
       <Link
  href="/sign-in"
  className="text-white font-medium"
>
  Sign In
</Link>


        </SignedOut>
        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;
