'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white border-b py-4 px-6 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-gray-800">
          ColorHunt
        </Link>
        <div className="flex items-center gap-4">
          {session?.user && (
            <Link href="/favorites" className="font-semibold text-gray-600 hover:text-blue-600">
              Favorites
            </Link>
          )}
          {status === 'authenticated' ? (
            <>
              <span className="text-gray-600 hidden sm:inline">Hi, {session.user.name}</span>
              <button onClick={() => signOut()} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => signIn('github')} className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-900 transition-colors">
              Login with GitHub
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}