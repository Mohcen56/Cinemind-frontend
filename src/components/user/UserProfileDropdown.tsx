"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthGate } from "@/hooks/useAuthGate";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNotification } from "@/app/hooks/useNotification";



const Icon = {
  User: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Settings: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M1 12h6m6 0h6" />
    </svg>
  ),

  Help: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  ),
  LogOut: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  ),
};





export default function UserDropdown({ align = "left", leftOffset = "left-30", rightOffset = "right-0" }: { align?: "left" | "right"; leftOffset?: string; rightOffset?: string }) {
  const { user, isLoading, logout } = useAuthGate();
  const notify = useNotification()
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const avatarSrc = useMemo(() => {
    console.log('User avatar:', user?.avatar);
    if (!user?.avatar) {
      return "/icons/ayano.jpg";
    }
    return user.avatar;
  }, [user?.avatar]);

  useEffect(() => {
    console.log('UserDropdown - user:', user);
    console.log('UserDropdown - isLoading:', isLoading);
  }, [user, isLoading]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (isLoading) return null;

  const sideClass = align === "left" ? leftOffset : rightOffset;
  
  
  // If no user, show guest dropdown with login option
  if (!user) {
    return (
      <div className="flex z-50" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-10 h-10 sm:w-20 sm:h-20 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all"
          aria-label="Toggle user menu"
          title="User menu"
        >
          <Avatar className="w-full h-full">
            <AvatarImage src="/icons/ayano.jpg" alt="Guest" />
            <AvatarFallback>G</AvatarFallback>
          </Avatar>
        </button>

        {open && (
          <div
            className={`absolute ${sideClass} top-23 w-40 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-700 z-9999 p-2`}
          >
            <div
              className={`absolute -top-1.5 w-3 h-3 bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-700 rotate-45`}
            />

            {/* Menu */}
            <div className="py-1">
              <MenuItem
                icon={<Icon.User />}
                text="Login"
                onClick={() => router.push("/login")}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex z-50" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-15 h-15 sm:w-20 sm:h-20 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all"
        aria-label="Toggle user profile menu"
        title="Profile menu"
      >
        <Avatar className="w-full h-full">
          <AvatarImage src={avatarSrc} alt="Profile" />
          <AvatarFallback>{user?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
      </button>

      {open && (
        <div
          className={`absolute ${sideClass} top-17  sm:top-23 sm:w-70 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-700 z-9999 p-2`}
        >
          <div
            className={`absolute -top-1.5 w-3 h-3 bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-700 rotate-45`}
          />

          {/* Header */}
          {user && (
            <div className="px-1 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center space-x-3 mb-2">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={avatarSrc} alt="Profile" />
                  <AvatarFallback>{user.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    {user.username}
                  
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {user.email}
                  </div>
                 
                 
                </div>
              </div>
            </div>
          )}

          {/* Menu */}
          <div className="py-1">
           
              
          {/* Menu
                <MenuItem
                  icon={<Icon.User />}
                  text="Your Profile"
                  onClick={() => router.push("/profile")}
                />
            */}
            <MenuItem
                  icon={<Bookmark className="w-4 h-7"/>}
                  text="Saved Movies"
                  onClick={() => router.push("/saved")}
                />

           {/* Menu  <MenuItem
                  icon={<Icon.Settings />}
                  text="Settings"
                  onClick={() => router.push("/settings")}
                />
*/}
                <div className="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />
                <MenuItem
                  icon={<Icon.LogOut />}
                  text="Sign Out"
                  danger
                  onClick={() => {
                    logout();
                    router.push("/login");
                    notify.info('Logged out')
                  }}
                />
             
            
          </div>
        </div>
      )}
    </div>
  );
}

// Small subcomponent for consistency
function MenuItem({
  icon,
  text,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-3 ${
        danger ? "text-red-600" : "text-zinc-700 dark:text-zinc-300"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}
