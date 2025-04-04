
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
};

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    // Generate a unique ID for the message
    const newId = Date.now().toString();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message to chat
    const userMessage: Message = {
      id: newId,
      text,
      isUser: true,
      timestamp
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call the API
      const response = await axios.post('/chat-llm', { text });
      
      // Add bot response to chat
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          text: response.data.response || "I'm sorry, I couldn't process that.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      
      // Add error message
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-muted/20">
      <div className="p-3 border-b bg-background">
        <h1 className="text-lg font-semibold text-center">AI Assistant</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map(message => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && <LoadingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto w-full">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatBox;
