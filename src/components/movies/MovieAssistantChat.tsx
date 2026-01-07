"use client";

import { FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChatBubble, ChatBubbleMessage } from '@/components/ui/ChatBubble'
import { ChatMessageList } from '@/components/ui/ChatMessageList'
import { ChatInput } from '@/components/ui/chat-input'
import { Button } from '@/components/ui/button'
import { Bot, Paperclip, Mic, CornerDownLeft } from 'lucide-react'
import { ExpandableChat, ExpandableChatHeader, ExpandableChatBody, ExpandableChatFooter } from '@/components/ui/expandable-chat';
import { useAuthGate } from '@/hooks/useAuthGate';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { sendChatMessage } from '@/lib/api/api';
import { sanitizeChatText } from '@/lib/utils/text';
import { useChatContext } from '@/providers/ChatProvider';

type Recommendation = { id: number; title: string; poster_path?: string | null; overview?: string };

export function MovieAssistantChat() {
  const { user } = useAuthGate();
  const { messages, setMessages } = useChatContext();
  const [input, setInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration is complete before rendering
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, content: userMessage, sender: 'user' },
    ]);
    setInput("");
    setIsChatLoading(true);

    try {
      // Build conversation history from previous messages (last 10 for context)
      const history = messages.slice(-10).map((msg) => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content,
        movies: msg.movies?.map((m) => ({ id: m.id, title: m.title })),
      }));
      
      const response = await sendChatMessage(userMessage, history);
      let aiText = sanitizeChatText(response?.response_text ?? "", userMessage);
      if (!aiText || aiText.length < 2) {
        // Fallback based on intent
        const intentSaved = /saved|watchlist|later/i.test(userMessage);
        aiText = intentSaved ? "Here are picks from your saved list." : "Here are some recommendations you might enjoy.";
      }
      const recs: Recommendation[] = Array.isArray(response?.movies) ? response.movies : [];
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, content: aiText, sender: 'ai', movies: recs },
      ]);
    } catch (err) {
      console.warn("Chat request failed", err);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, content: "Something went wrong reaching the assistant. Please try again.", sender: 'ai' },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
      <ExpandableChat size="xl" position="bottom-right" icon={<Bot className="h-6 w-6" />}> 
        <ExpandableChatHeader className="flex-col p-4 text-center justify-center">
          <Bot className="h-10 w-10 text-white" />Cinmind ai
        </ExpandableChatHeader>

        <ExpandableChatBody>
          <ChatMessageList>
            {isHydrated && messages.map((message) => (
              <ChatBubble key={message.id} variant={message.sender === 'user' ? 'sent' : 'received'}>
                {message.sender === 'user' ? (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={user?.avatar || "/icons/ayano.jpg"} alt={user?.username || "User"} />
                    <AvatarFallback>{user?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-8 w-8 shrink-0 rounded-full bg-purple-600 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}
                
                <div className="flex flex-col ">
                  <ChatBubbleMessage variant={message.sender === 'user' ? 'sent' : 'received'}>
                    {message.content}
                  </ChatBubbleMessage>

                  {message.sender === 'ai' && message.movies && message.movies.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2 ml-0">
                      {message.movies.slice(0, 6).map((m) => (
                        <Link key={m.id} href={`/movie/${m.id}`} className="group">
                          <div className="overflow-hidden rounded-lg border border-white/10 bg-black/30">
                            {m.poster_path ? (
                              <Image
                                src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                                alt={m.title}
                                width={120}
                                height={180}
                                className="w-full h-32 object-cover group-hover:opacity-90 transition-opacity"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-32 flex items-center justify-center text-xs text-muted-foreground bg-slate-700">No poster</div>
                            )}
                            <div className="p-1 text-xs text-white/90 truncate text-center">{m.title}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </ChatBubble>
            ))}

            {isChatLoading && (
              <ChatBubble variant="received">
                <div className="h-8 w-8 shrink-0 rounded-full bg-purple-600 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}
          </ChatMessageList>
        </ExpandableChatBody>

        <ExpandableChatFooter>
          <form onSubmit={handleSubmit} className="flex items-center gap-3 rounded-lg bg-background p-2">
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as unknown as FormEvent);
                }
              }}
              className="min-h-12 flex-1 resize-none rounded-lg bg-background border-0 px-3 py-2 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center gap-2">
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground" aria-label="Attach file" title="Attach file" onClick={() => {}}>
                <Paperclip className="h-4 w-4" />
              </button>
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground" aria-label="Voice input" title="Voice input" onClick={() => {}}>
                <Mic className="h-4 w-4" />
              </button>
              <Button type="submit" size="sm" className="ml-auto hover:scale-105 gap-1.5">
                Send Message
                <CornerDownLeft className="h-3.5 w-3.5" />
              </Button>
            </div>
          </form>
        </ExpandableChatFooter>
      </ExpandableChat>
  );
}
