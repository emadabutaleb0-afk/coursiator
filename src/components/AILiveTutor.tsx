import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, Volume2, Settings, X, Copy, Download, AlertCircle, Bot } from 'lucide-react';
import { aiService } from '@/lib/aiService';

/**
 * Design Philosophy: Modern Gradient Tech
 * - AI Live Tutor with video avatar
 * - Real-time chat interface
 * - Interactive learning
 */

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  type?: 'text' | 'correction' | 'suggestion';
}

interface AITutorProps {
  studentName?: string;
  currentLevel?: string;
  topicFocus?: string;
  onClose?: () => void;
}

// aiResponses array removed in favor of MockAIService

export default function AILiveTutor({
  studentName = 'Student',
  currentLevel = 'Intermediate',
  topicFocus = 'Speaking Practice',
  onClose,
}: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello ${studentName}! I'm your AI English tutor. Today we're focusing on ${topicFocus}. How can I help you improve your English today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [avatarExpression, setAvatarExpression] = useState('neutral');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState({
    speed: 1,
    volume: 80,
    accent: 'neutral',
    feedback: 'detailed',
  });

  /* 
   * Speech Recognition & Synthesis 
   */
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Stop after one sentence for turn-taking
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSendMessage(transcript); // Auto-send on voice end
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setAvatarExpression('neutral');
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setAvatarExpression('neutral');
      };
    }
  }, []);

  // Update Settings Effect (e.g. if we want to change accent dynamically)
  // For simplicity, we just use default voice or finding the first English one.

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.speed;
      utterance.volume = settings.volume / 100;

      // Try to find a good English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Google')) || voices.find(v => v.lang.includes('en'));
      if (englishVoice) utterance.voice = englishVoice;

      utterance.onstart = () => setAvatarExpression('happy'); // 'Speaking' face
      utterance.onend = () => setAvatarExpression('neutral');

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setAvatarExpression('thinking');

    try {
      // Get response from service
      const responseText = await aiService.sendMessage(textToSend);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      speakText(responseText); // Speak the response

      setAvatarExpression('happy');
    } catch (error) {
      console.error("Failed to get AI response", error);
      setIsTyping(false);
      setAvatarExpression('neutral');
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) { /* ignore if already stopped */ }
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
          setAvatarExpression('listening');
        } catch (e) {
          console.error("Start error:", e);
          // Likely already started or permission denied previously
          alert("Couldn't start microphone. Please check permissions.");
          setIsListening(false);
        }
      } else {
        alert("Speech recognition not supported in this browser. Try Chrome.");
      }
    }
  };

  const getAvatarEmoji = (expression: string) => {
    switch (expression) {
      case 'listening':
        return '👂';
      case 'thinking':
        return '🤔';
      case 'happy': // Speaking
        return '🗣️';
      case 'neutral':
      default:
        return '🤖';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 rounded-lg overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Live Tutor</h2>
          <p className="text-sm opacity-90">{topicFocus} • Level: {currentLevel}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/20 rounded-lg transition-smooth"
          >
            <Settings className="w-5 h-5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-smooth"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white/80 backdrop-blur-md border-b border-white/20 p-4 space-y-4">
          <div>
            <label className="text-sm font-semibold block mb-2">Speech Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.speed}
              onChange={(e) => setSettings({ ...settings, speed: parseFloat(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs text-foreground/60 mt-1">{settings.speed.toFixed(1)}x</p>
          </div>

          <div>
            <label className="text-sm font-semibold block mb-2">Volume</label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => setSettings({ ...settings, volume: parseInt(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs text-foreground/60 mt-1">{settings.volume}%</p>
          </div>

          <div>
            <label className="text-sm font-semibold block mb-2">Feedback Level</label>
            <select
              value={settings.feedback}
              onChange={(e) => setSettings({ ...settings, feedback: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10"
            >
              <option value="basic">Basic</option>
              <option value="detailed">Detailed</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Avatar Section */}
        <div className="w-48 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-lg border-2 border-white/20 p-6">
          <div className="mb-4 text-accent/80 p-4 bg-white/10 rounded-full border border-white/20 shadow-lg">
            <img
              src="/assets/robot-avatar.png"
              alt="AI Tutor Avatar"
              className="w-24 h-24 object-contain"
            />
          </div>

          <div className="text-center mb-4">
            <p className="text-sm font-semibold text-foreground/70">AI Tutor</p>
            <p className="text-xs text-foreground/50">Ready to help</p>
          </div>

          {isListening && (
            <div className="flex gap-1 mb-4">
              <div className="w-1 h-6 bg-accent rounded-full animate-pulse"></div>
              <div className="w-1 h-8 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-6 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          )}

          <div className="w-full space-y-2">
            <button
              onClick={handleMicClick}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-smooth ${isListening
                ? 'bg-red-500 text-white'
                : 'bg-accent text-white hover:bg-accent/90'
                }`}
            >
              <Mic className="w-4 h-4" />
              {isListening ? 'Stop' : 'Speak'}
            </button>

            <button
              onClick={() => {
                const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai');
                if (lastAiMessage) speakText(lastAiMessage.text);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/20 text-foreground hover:bg-white/30 transition-smooth font-semibold"
            >
              <Volume2 className="w-4 h-4" />
              Repeat
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${message.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-br-none'
                    : message.type === 'correction'
                      ? 'bg-yellow-500/20 text-foreground border border-yellow-500/30 rounded-bl-none'
                      : 'bg-white/80 text-foreground border border-white/20 rounded-bl-none'
                    }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-foreground/50'
                    }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 text-foreground border border-white/20 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your response or practice speaking..."
              className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/80 focus:outline-none focus:border-accent"
            />
            <button
              onClick={() => handleSendMessage()}
              className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-smooth"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/50 border-t border-white/20 px-6 py-3 flex justify-between items-center text-xs text-foreground/60">
        <div className="flex gap-4">
          <button className="flex items-center gap-1 hover:text-accent transition-smooth">
            <Copy className="w-4 h-4" />
            Copy Chat
          </button>
          <button className="flex items-center gap-1 hover:text-accent transition-smooth">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <p>Session Duration: 45:32</p>
      </div>
    </div>
  );
}
