
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth, User } from "./AuthContext";
import { toast } from "sonner";

// Message type definition
export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  chatId: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: {
    type: "image" | "file";
    url: string;
    name: string;
  }[];
}

// Chat type definition
export interface Chat {
  id: string;
  name: string;
  type: "private" | "group";
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

// Chat context type
interface ChatContextType {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (content: string, attachments?: { type: "image" | "file", url: string, name: string }[]) => void;
  markChatAsRead: (chatId: string) => void;
  isLoadingMessages: boolean;
}

// Mock data for chats
const MOCK_CHATS: Chat[] = [
  {
    id: "chat1",
    name: "Marketing Team",
    type: "group",
    participants: [
      { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin" },
      { id: "2", name: "Regular User", email: "user@example.com", role: "user", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user" },
      { id: "3", name: "Sarah Johnson", email: "sarah@example.com", role: "user", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
    ],
    unreadCount: 2,
  },
  {
    id: "chat2",
    name: "Sarah Johnson",
    type: "private",
    participants: [
      { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin" },
      { id: "3", name: "Sarah Johnson", email: "sarah@example.com", role: "user", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
    ],
    unreadCount: 0,
  },
  {
    id: "chat3",
    name: "Project X Discussion",
    type: "group",
    participants: [
      { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin" },
      { id: "2", name: "Regular User", email: "user@example.com", role: "user", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user" },
      { id: "4", name: "Michael Chen", email: "michael@example.com", role: "user", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael" },
    ],
    unreadCount: 5,
  },
];

// Mock messages for demonstration
const generateMockMessages = (chatId: string): Message[] => {
  const baseMessages: Message[] = [
    {
      id: `${chatId}-msg1`,
      content: "Hey team, how's the project coming along?",
      senderId: "1",
      senderName: "Admin User",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      chatId,
      timestamp: new Date(Date.now() - 3600000 * 48),
      isRead: true,
    },
    {
      id: `${chatId}-msg2`,
      content: "We're making good progress! Just finalizing the last details.",
      senderId: "2",
      senderName: "Regular User",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      chatId,
      timestamp: new Date(Date.now() - 3600000 * 47),
      isRead: true,
    },
    {
      id: `${chatId}-msg3`,
      content: "Great! I've attached the latest design mockups for review.",
      senderId: "3",
      senderName: "Sarah Johnson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      chatId,
      timestamp: new Date(Date.now() - 3600000 * 46),
      isRead: true,
      attachments: [
        {
          type: "image" as const,
          url: "https://via.placeholder.com/400x300",
          name: "mockup-v3.jpg",
        },
      ],
    },
    {
      id: `${chatId}-msg4`,
      content: "These look fantastic! Let's discuss them in our next meeting.",
      senderId: "1",
      senderName: "Admin User",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      chatId,
      timestamp: new Date(Date.now() - 3600000 * 24),
      isRead: false,
    },
    {
      id: `${chatId}-msg5`,
      content: "I've prepared the presentation slides for tomorrow.",
      senderId: "2",
      senderName: "Regular User",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      chatId,
      timestamp: new Date(Date.now() - 3600000 * 2),
      isRead: false,
      attachments: [
        {
          type: "file" as const,
          url: "#",
          name: "presentation.pdf",
        },
      ],
    },
  ];

  // Add some randomization to make chats look different
  return baseMessages.slice(0, Math.floor(Math.random() * 3) + 3);
};

// Create the chat context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Chat provider props
interface ChatProviderProps {
  children: ReactNode;
}

// Chat provider component
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);

  // Load chats for the current user
  useEffect(() => {
    if (isAuthenticated && user) {
      // In a real app, you would fetch this from an API
      const userChats = MOCK_CHATS.map(chat => {
        // Generate mock messages for each chat
        const mockMessages = generateMockMessages(chat.id);
        
        // Set last message
        return {
          ...chat,
          lastMessage: mockMessages[mockMessages.length - 1],
        };
      });
      
      setChats(userChats);
    } else {
      setChats([]);
      setActiveChat(null);
    }
  }, [isAuthenticated, user]);

  // Load messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      setIsLoadingMessages(true);
      
      // Simulate loading messages from API
      setTimeout(() => {
        const chatMessages = generateMockMessages(activeChat.id);
        setMessages(chatMessages);
        setIsLoadingMessages(false);
        
        // Mark chat as read
        markChatAsRead(activeChat.id);
      }, 800);
    } else {
      setMessages([]);
    }
  }, [activeChat]);

  // Send a message
  const sendMessage = useCallback((content: string, attachments?: { type: "image" | "file", url: string, name: string }[]) => {
    if (!activeChat || !user) return;
    
    // Create a new message
    const newMessage: Message = {
      id: `${activeChat.id}-msg${Date.now()}`,
      content,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      chatId: activeChat.id,
      timestamp: new Date(),
      isRead: false,
      attachments,
    };
    
    // Add message to state
    setMessages(prev => [...prev, newMessage]);
    
    // Update the chat's last message
    setChats(prev =>
      prev.map(chat =>
        chat.id === activeChat.id
          ? { ...chat, lastMessage: newMessage }
          : chat
      )
    );
    
    // In a real app, you would send this to your backend service
    console.log("Message sent:", newMessage);
    
    // Simulate receiving a reply after a delay (for demo purposes)
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const responder = activeChat.participants.find(p => p.id !== user.id) || activeChat.participants[0];
        
        const replyMessage: Message = {
          id: `${activeChat.id}-reply${Date.now()}`,
          content: "Thanks for your message! I'll look into this and get back to you soon.",
          senderId: responder.id,
          senderName: responder.name,
          senderAvatar: responder.avatar,
          chatId: activeChat.id,
          timestamp: new Date(),
          isRead: true,
        };
        
        setMessages(prev => [...prev, replyMessage]);
        
        setChats(prev =>
          prev.map(chat =>
            chat.id === activeChat.id
              ? { ...chat, lastMessage: replyMessage }
              : chat
          )
        );
        
        toast.info(`New message from ${responder.name}`);
      }, 3000 + Math.random() * 5000);
    }
  }, [activeChat, user]);

  // Mark chat as read
  const markChatAsRead = useCallback((chatId: string) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, unreadCount: 0 }
          : chat
      )
    );
    
    // In a real app, you would notify your backend service
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        messages,
        setActiveChat,
        sendMessage,
        markChatAsRead,
        isLoadingMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Chat hook for easy access
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
