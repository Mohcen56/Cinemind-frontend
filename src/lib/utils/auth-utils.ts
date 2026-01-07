import type { User } from "@/types/User";

/**
 * Auth Utilities
 * 
 * Token is stored in HTTP-only cookie (set by backend) - XSS safe!
 * Only user info is stored in localStorage for UI purposes.
 * A simple flag cookie is set for proxy.ts server-side auth check.
 */

// Set a simple flag cookie for server-side auth check in proxy.ts
// This is NOT the actual token - just indicates logged in state
function setAuthFlagCookie(loggedIn: boolean): void {
  if (typeof document === "undefined") return;
  if (loggedIn) {
    const expires = new Date(Date.now() + 7 * 864e5).toUTCString();
    document.cookie = `authToken=authenticated; expires=${expires}; path=/; SameSite=Lax`;
  } else {
    document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
  // Set flag cookie for server-side route protection
  setAuthFlagCookie(true);
}

export function clearAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  // Clear the flag cookie
  setAuthFlagCookie(false);
}

export function isAuthenticated(): boolean {
  // Check if user exists in localStorage
  return getCurrentUser() !== null;
}
