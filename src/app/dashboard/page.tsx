'use client';

import { useAuthGate } from '@/src/hooks/useAuthGate';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuthGate({ redirectIfGuest: '/login' });
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg bg-dark-100 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <button
              onClick={logout}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-light-100/10 p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">Profile Information</h2>
              <div className="space-y-2">
                <p className="text-light-200">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-light-200">
                  <span className="font-semibold">Username:</span> {user.username}
                </p>
                {user.avatar && (
                  <div className="mt-4">
                    <p className="mb-2 font-semibold text-light-200">Avatar:</p>
                    <img
                      src={user.avatar}
                      alt="User avatar"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => router.push('/')}
              className="mt-4 rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
            >
              Browse Movies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
