
import React from 'react';
import { cn } from '@/lib/utils';

type ChatBubbleProps = {
  message: string;
  isUser: boolean;
  timestamp?: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, timestamp }) => {
  return (
    <div 
      className={cn(
        "flex w-full mb-4 fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-md",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-accent text-accent-foreground rounded-tl-none"
        )}
      >
        <p className="text-sm sm:text-base whitespace-pre-wrap break-words">{message}</p>
        {timestamp && (
          <div className={cn(
            "text-[10px] mt-1 opacity-70 text-right",
            isUser ? "text-primary-foreground/70" : "text-accent-foreground/70"
          )}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
