
import React, { useState, useRef, useEffect } from "react";
import { useChat, Chat, Message } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Search, Send, PaperclipIcon, Image, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Messaging = () => {
  const { user } = useAuth();
  const { chats, activeChat, setActiveChat, messages, sendMessage, isLoadingMessages } = useChat();
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [attachments, setAttachments] = useState<{ type: "image" | "file"; url: string; name: string }[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Filter chats based on search term
  const filteredChats = chats.filter((chat) => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to the bottom of the message list when messages update
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      setTimeout(() => {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }, 100);
    }
  }, [messages]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "file" | "image") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      // For a real app, you would upload the file to a server and get a URL
      // Here we're using object URLs for demo purposes
      const url = URL.createObjectURL(file);
      setAttachments(prev => [...prev, { type: type === "image" ? "image" : "file", url, name: file.name }]);
    });

    // Reset the input
    e.target.value = "";
  };

  // Remove an attachment
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim() && attachments.length === 0) return;
    sendMessage(messageInput, attachments);
    setMessageInput("");
    setAttachments([]);
  };

  // Handle pressing Enter to send a message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col fade-in">
      <h1 className="text-3xl font-bold mb-6">Messaging</h1>
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Chat sidebar */}
        <Card className="w-80 hidden md:flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Conversations</CardTitle>
          </CardHeader>
          <div className="px-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="px-4 py-2">
              {filteredChats.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No conversations found
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted mb-1 text-left",
                      activeChat?.id === chat.id && "bg-muted"
                    )}
                    onClick={() => setActiveChat(chat)}
                  >
                    <Avatar className="h-10 w-10">
                      {chat.type === "private" ? (
                        <AvatarImage
                          src={
                            chat.participants.find((p) => p.id !== user?.id)
                              ?.avatar
                          }
                          alt={chat.name}
                        />
                      ) : (
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {chat.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{chat.name}</p>
                        {chat.lastMessage && (
                          <p className="text-xs text-muted-foreground">
                            {format(
                              new Date(chat.lastMessage.timestamp),
                              "h:mm a"
                            )}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage ? chat.lastMessage.content : "No messages yet"}
                        </p>
                        {chat.unreadCount > 0 && (
                          <Badge variant="default" className="ml-auto">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat area */}
        <Card className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              <CardHeader className="border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {activeChat.type === "private" ? (
                      <AvatarImage
                        src={
                          activeChat.participants.find((p) => p.id !== user?.id)
                            ?.avatar
                        }
                        alt={activeChat.name}
                      />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {activeChat.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{activeChat.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      {activeChat.type === "group"
                        ? `${activeChat.participants.length} members`
                        : "Online now"}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea
                className="flex-1 p-4"
                ref={scrollAreaRef}
              >
                {isLoadingMessages ? (
                  <div className="h-full flex-center">
                    <div className="animate-pulse text-primary">Loading messages...</div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="h-full flex-center text-muted-foreground">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        isOwnMessage={message.senderId === user?.id}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>

              <div className="p-4 border-t">
                {/* Attachments preview */}
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="relative group">
                        {attachment.type === "image" ? (
                          <div className="w-20 h-20 rounded border overflow-hidden">
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="border rounded p-2 flex items-center space-x-2">
                            <PaperclipIcon size={16} />
                            <span className="text-sm truncate max-w-[120px]">
                              {attachment.name}
                            </span>
                          </div>
                        )}
                        <button
                          className="absolute -top-2 -right-2 bg-background rounded-full border"
                          onClick={() => removeAttachment(index)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Message input */}
                <div className="flex items-center space-x-2">
                  <div className="flex-none space-x-1">
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => handleFileUpload(e, "file")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <PaperclipIcon className="h-5 w-5" />
                    </Button>

                    <input
                      type="file"
                      className="hidden"
                      ref={imageInputRef}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "image")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <Image className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  
                  <Button onClick={handleSendMessage} type="button">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex-center flex-col p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex-center text-primary mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Select a conversation</h3>
              <p className="text-muted-foreground mt-2 text-center">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isOwnMessage && "flex-row-reverse"
      )}
    >
      {!isOwnMessage && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "space-y-1 max-w-[80%]",
          isOwnMessage && "items-end"
        )}
      >
        {!isOwnMessage && (
          <p className="text-xs text-muted-foreground">{message.senderName}</p>
        )}
        
        <div
          className={cn(
            "rounded-lg px-4 py-2 break-words",
            isOwnMessage
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          {message.content}
        </div>
        
        {/* Display attachments if any */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="space-y-2 mt-2">
            {message.attachments.map((attachment, index) => (
              <div key={index}>
                {attachment.type === "image" ? (
                  <div className="max-w-xs rounded-lg overflow-hidden border">
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2 border rounded bg-background hover:bg-muted"
                  >
                    <PaperclipIcon size={16} />
                    <span className="text-sm">{attachment.name}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          {format(new Date(message.timestamp), "h:mm a")}
        </p>
      </div>
    </div>
  );
};

// Adding missing imports
import { MessageCircle } from "lucide-react";

export default Messaging;
