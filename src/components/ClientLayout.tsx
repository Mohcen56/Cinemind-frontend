"use client";

import { ReactNode } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

interface ClientLayoutProps {
  children: ReactNode;
}

/**
 * Client-side layout wrapper that provides error boundary protection.
 * This component wraps the main content and catches any runtime errors
 * in the component tree, displaying a user-friendly error page.
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
