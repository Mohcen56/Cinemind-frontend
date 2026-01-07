import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api/auth';
import { setCurrentUser, clearAuth, getCurrentUser } from '@/lib/utils/auth-utils';
import { logger } from '@/lib/utils/logger';
import type { User } from '@/types/User';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Shared query key for auth state
const AUTH_QUERY_KEY = ['auth', 'user'];

export function useAuthGate({ redirectIfGuest }: { redirectIfGuest?: string } = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use React Query to cache and dedupe profile fetches
  const { data: user, isLoading, refetch } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const cachedUser = getCurrentUser();
      if (!cachedUser) {
        return null;
      }
      
      try {
        const profile = await authAPI.getProfile();
        setCurrentUser(profile.user);
        return profile.user;
      } catch (error: any) {
        if (error?.response?.status === 401) {
          clearAuth();
          return null;
        }
        // Return cached user on other errors
        return cachedUser;
      }
    },
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Keep in cache for 10 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Handle redirect for guests
  useEffect(() => {
    if (!isLoading && !user && redirectIfGuest) {
      router.replace(redirectIfGuest);
    }
  }, [isLoading, user, redirectIfGuest, router]);

  const logout = async () => {
    await authAPI.logout();
    clearAuth();
    queryClient.setQueryData(AUTH_QUERY_KEY, null);
    router.replace('/login');
  };

  const refetchUser = async () => {
    await refetch();
  };

  const setUser = (newUser: User | null) => {
    queryClient.setQueryData(AUTH_QUERY_KEY, newUser);
    if (newUser) {
      setCurrentUser(newUser);
    }
  };

  return { user: user ?? null, setUser, isLoading, logout, refetchUser };
}
