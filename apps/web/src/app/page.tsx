import { SignedOut } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect('/dashboard');

  return (
    <main className="mx-auto max-w-2xl p-8">
      <SignedOut>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome</h1>
          <p className="text-lg text-gray-600 mb-8">Please sign in or create an account to get started.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/sign-in"
            className="rounded-lg border-2 border-blue-600 px-6 py-3 text-blue-600 font-medium hover:bg-blue-50 transition-colors duration-200 text-center"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors duration-200 text-center shadow-md"
          >
            Create account
          </Link>
        </div>
      </SignedOut>
    </main>
  );
}

