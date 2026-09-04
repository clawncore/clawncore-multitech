import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Send, Cpu, Network, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import { useAIConversation, Message } from '../../hooks/useAIConversation';

interface AICommandCenterProps {
  hook: ReturnType<typeof useAIConversation>;
}

const SUGGESTIONS = [
  { label: 'Explore Agriculture AI', icon: Network },
  { label: 'Simulate Cyber Threat', icon: ShieldAlert },
  { label: 'Cloud Infrastructure Scale', icon: Cpu },
];

export function AICommandCenter({ hook }: AICommandCenterProps) {
  const { messages, status, inputValue, setInputValue, submitMessage } = hook;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(inputValue);
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
      
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-20">
        <div className="pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">ClawnAI Core</h1>
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === 'idle' ? 'bg-cyan-400' : 'bg-blue-600'}`} />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  {status === 'idle' ? 'Awaiting Input' : status === 'thinking' ? 'Processing Stream' : 'Generating Response'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col justify-end p-4 md:p-8 pb-12 pointer-events-auto">
        
        {/* Messages Log */}
        <div className="w-full max-h-[50vh] overflow-y-auto mb-8 pr-4 custom-scrollbar flex flex-col gap-6 mask-image-fade-top">
          <AnimatePresence initial={false}>
            {messages.map((msg: Message, i: number) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                    <Activity className="w-4 h-4 text-blue-400" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                  msg.role === 'user' 
                    ? 'bg-white text-black rounded-tr-sm' 
                    : 'bg-white/90 backdrop-blur-xl shadow-md border border-slate-200 text-slate-600 rounded-tl-sm'
                }`}>
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-light">
                    {msg.content}
                    {/* Blinking cursor if this is the active typing message */}
                    {status === 'responding' && i === messages.length - 1 && (
                      <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-blue-400 animate-pulse" />
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTIONS.map((suggestion, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              onClick={() => submitMessage(suggestion.label)}
              disabled={status !== 'idle'}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <suggestion.icon className="w-3 h-3 text-cyan-400" />
              {suggestion.label}
            </motion.button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative group">
          {/* Ambient glow behind input */}
          <div className={`absolute -inset-1 rounded-2xl blur-lg transition-opacity duration-500 ${status !== 'idle' ? 'bg-blue-100 opacity-100' : 'bg-cyan-500/10 opacity-0 group-focus-within:opacity-100'}`} />
          
          <div className="relative flex items-center bg-white backdrop-blur-2xl shadow-lg border border-slate-300 rounded-2xl p-2 transition-colors focus-within:border-cyan-500/50 focus-within:bg-black/80">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={status !== 'idle'}
              placeholder={status === 'idle' ? "Type a command..." : "Processing request..."}
              className="flex-1 bg-transparent border-none text-slate-900 px-4 py-3 focus:outline-none placeholder:text-slate-400 disabled:opacity-50"
            />
            <Button 
              type="submit" 
              disabled={!inputValue.trim() || status !== 'idle'}
              className="w-12 h-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center disabled:bg-slate-100 disabled:text-slate-700 transition-all shrink-0 ml-2"
            >
              <Send className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </form>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .mask-image-fade-top { mask-image: linear-gradient(to bottom, transparent, black 15%); }
      `}} />
    </div>
  );
}
