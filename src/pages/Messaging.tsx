import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Messaging Page
 * Direct communication between teachers and students
 */

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderImage?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: string[];
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantImage?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'teacher_1',
    participantName: 'Dr. Michael Chen',
    lastMessage: 'Thank you for attending the last session. Great progress!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        senderId: 'teacher_1',
        senderName: 'Dr. Michael Chen',
        content: 'Hello! How are you doing?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isRead: true,
      },
      {
        id: 'm2',
        senderId: 'student_1',
        senderName: 'You',
        content: 'Hi Dr. Chen! I am doing well, thank you for asking.',
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
        isRead: true,
      },
      {
        id: 'm3',
        senderId: 'teacher_1',
        senderName: 'Dr. Michael Chen',
        content: 'Thank you for attending the last session. Great progress!',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isRead: false,
      },
    ],
  },
  {
    id: '2',
    participantId: 'teacher_2',
    participantName: 'Sarah Williams',
    lastMessage: 'Your SAT score improved by 150 points! Congratulations!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'teacher_2',
        senderName: 'Sarah Williams',
        content: 'Your SAT score improved by 150 points! Congratulations!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true,
      },
    ],
  },
  {
    id: '3',
    participantId: 'teacher_3',
    participantName: 'James Patterson',
    lastMessage: 'See you next Monday at 3 PM for the business presentation practice',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    messages: [
      {
        id: 'm5',
        senderId: 'teacher_3',
        senderName: 'James Patterson',
        content: 'See you next Monday at 3 PM for the business presentation practice',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        isRead: true,
      },
    ],
  },
];

export default function Messaging() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'student_1',
      senderName: 'You',
      content: messageInput,
      timestamp: new Date(),
      isRead: false,
    };

    selectedConversation.messages.push(newMessage);
    selectedConversation.lastMessage = messageInput;
    selectedConversation.lastMessageTime = new Date();
    setMessageInput('');
  };

  const filteredConversations = mockConversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full max-h-[calc(100vh-200px)]">
            {/* Conversations Sidebar */}
            <div className="glass-card border border-white/10 rounded-2xl p-4 flex flex-col">
              {/* Header */}
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-foreground/50" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full p-3 rounded-lg text-left transition-smooth ${
                      selectedConversation?.id === conversation.id
                        ? 'bg-accent/20 border border-accent/50'
                        : 'hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {conversation.participantName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold truncate">{conversation.participantName}</h3>
                          {conversation.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex-shrink-0">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground/70 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-foreground/50 mt-1">
                          {conversation.lastMessageTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* New Message Button */}
              <Button className="w-full gap-2 mt-4 gradient-button">
                <Plus className="w-4 h-4" />
                New Message
              </Button>
            </div>

            {/* Chat Area */}
            {selectedConversation ? (
              <div className="lg:col-span-2 glass-card border border-white/10 rounded-2xl flex flex-col">
                {/* Chat Header */}
                <div className="border-b border-white/10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      {selectedConversation.participantName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{selectedConversation.participantName}</h3>
                      <p className="text-sm text-foreground/70">Online</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'student_1' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.senderId === 'student_1'
                            ? 'bg-accent text-white rounded-br-none'
                            : 'bg-white/20 border border-white/30 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === 'student_1' ? 'text-white/70' : 'text-foreground/70'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t border-white/10 p-4">
                  <div className="flex gap-2 items-end">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                    />
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
                      <Smile className="w-5 h-5" />
                    </button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2 glass-card border border-white/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-foreground/70">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
