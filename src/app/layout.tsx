import type { Metadata } from "next";

import "../styles/globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { ChatProvider } from "@/providers/ChatProvider";
import { MovieAssistantChat } from "@/components/movies/MovieAssistantChat";

export const metadata: Metadata = {
  title: "Cinemind",
  description: "Discover and search for movies with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload Google Fonts for better performance and to avoid FOUT */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
         <ChatProvider>
           <QueryProvider>
            {children}
           </QueryProvider>
           <MovieAssistantChat />
         </ChatProvider>
      </body>
    </html>
  );
}
