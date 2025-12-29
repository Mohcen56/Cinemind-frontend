import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api/auth';
import { setCurrentUser, clearAuth } from '@/lib/utils/auth-utils';
import { logger } from '@/lib/utils/logger';
import type { User } from '@/types/User';

export function useAuthGate({ redirectIfGuest }: { redirectIfGuest?: string } = {}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('authToken');

    // 🔹 Short-circuit safely (don't call API if no token)
    if (!token) {
      logger.log('No token, skipping getCurrentUser');
      setUser(null); // Clear any stale user data
      setLoading(false); // ✅ stop loading
      if (redirectIfGuest) router.replace(redirectIfGuest);
      return;
    }

    try {
      // Try to fetch fresh profile from API
      const profile = await authAPI.getProfile();
      setUser(profile.user);
      // Persist latest user for other hooks/components
      setCurrentUser(profile.user);
      logger.log('Fetched fresh user from API');
    } catch (error: any) {
      logger.error('Failed to fetch user profile:', error);
      // If we get a 401, token is invalid/expired - clear auth completely
      if (error?.response?.status === 401) {
        logger.log('Token invalid/expired (401), clearing auth and redirecting to login');
        clearAuth();
        setUser(null); // Clear user state immediately
        if (redirectIfGuest) {
          router.replace(redirectIfGuest);
        }
        return;
      }
      // For other errors, keep showing user state but log the error
      logger.error('API error (not 401), keeping existing user data');
      setUser(null); // Don't show stale data for non-401 errors either
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    
    // Set up periodic token validation (check every 5 minutes)
    const tokenCheckInterval = setInterval(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        fetchUser();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(tokenCheckInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
    router.replace('/login');
  };

  const refetchUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  return { user, setUser, isLoading, logout, refetchUser };
}
