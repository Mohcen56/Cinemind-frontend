import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/src/lib/api/auth';
import { setCurrentUser } from '@/src/lib/utils/auth-utils';
import { logger } from '@/src/lib/utils/logger';
import type { User } from '@/src/types/User';

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
      setLoading(false); // ✅ stop loading
      if (redirectIfGuest) router.replace(redirectIfGuest);
      return;
    }

    try {
      // First try to get user from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        logger.log('Loaded user from localStorage');
      }
      
      // Then fetch fresh profile from API
      const profile = await authAPI.getProfile();
      setUser(profile.user);
      // Persist latest user for other hooks/components
      setCurrentUser(profile.user);
      logger.log('Fetched fresh user from API');
    } catch (error) {
      logger.error('Failed to fetch user profile:', error);
      // If API fails but we have stored user, keep using it
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else if (redirectIfGuest) {
        router.replace(redirectIfGuest);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    await authAPI.logout();
    router.replace('/login');
  };

  const refetchUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  return { user, setUser, isLoading, logout, refetchUser };
}
