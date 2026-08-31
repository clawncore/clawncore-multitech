import { useState, useCallback, useRef } from 'react';

export type MessageRole = 'user' | 'assistant';
export type AIStatus = 'idle' | 'thinking' | 'responding';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Simulated responses to demonstrate the ecosystem awareness
const MOCK_KNOWLEDGE_BASE = [
  {
    keywords: ['agriculture', 'drone', 'crop', 'farming'],
    response: "ClawnCore's Smart Agriculture division utilizes autonomous drone swarms for multispectral NDVI mapping and real-time yield prediction. Would you like to activate the field simulation module?",
  },
  {
    keywords: ['security', 'cyber', 'threat', 'hack'],
    response: "Our Cybersecurity Mesh architecture employs zero-trust quantum-resistant encryption. The predictive models neutralize lateral movement anomalies in under 4ms. I can display the real-time threat map if you wish.",
  },
  {
    keywords: ['cloud', 'server', 'scale', 'infrastructure'],
    response: "The Cloud Intelligence Nexus guarantees 99.999% uptime across a multi-region serverless fabric. Current telemetry shows 840 TB of stream processing occurring today.",
  },
  {
    keywords: ['hello', 'hi', 'start', 'initiate'],
    response: "Systems active. I am ClawnAI, the intelligence layer orchestrating this multitech ecosystem. How can I assist you with our infrastructure today?",
  },
];

export function useAIConversation() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-0',
      role: 'assistant',
      content: 'Connection established. I am ClawnAI. How can we build the future together?',
      timestamp: new Date(),
    }
  ]);
  const [status, setStatus] = useState<AIStatus>('idle');
  const [inputValue, setInputValue] = useState('');
  
  // To handle typing effect cancellation if user submits fast
  const typingIntervalRef = useRef<number | null>(null);

  const simulateStreaming = (text: string) => {
    setStatus('responding');
    const msgId = `msg-${Date.now()}`;
    
    setMessages(prev => [...prev, {
      id: msgId,
      role: 'assistant',
      content: '', // Start empty
      timestamp: new Date(),
    }]);

    let i = 0;
    if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);

    typingIntervalRef.current = window.setInterval(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        
        // Ensure we are modifying the right message
        if (newMessages[lastIndex].id === msgId) {
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            content: text.slice(0, i + 1),
          };
        }
        return newMessages;
      });

      i++;
      if (i >= text.length) {
        if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
        setStatus('idle');
      }
    }, 25); // typing speed
  };

  const getBestResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    for (const kb of MOCK_KNOWLEDGE_BASE) {
      if (kb.keywords.some(kw => lowerInput.includes(kw))) {
        return kb.response;
      }
    }
    
    return "I am analyzing your request against our current infrastructure capabilities. The ecosystem is continuously learning. Can you specify which service sector you are focused on?";
  };

  const submitMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setStatus('thinking');

    // Simulate network delay for "thinking"
    setTimeout(() => {
      const responseText = getBestResponse(content);
      simulateStreaming(responseText);
    }, 1200);
  }, []);

  return {
    messages,
    status,
    inputValue,
    setInputValue,
    submitMessage,
  };
}
