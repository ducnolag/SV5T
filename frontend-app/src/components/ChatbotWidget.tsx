import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

const QUICK_QUESTIONS = [
  'Tiêu chí Học tập tốt yêu cầu gì?',
  'Hạn nộp hồ sơ là khi nào?',
  'Cần bao nhiêu minh chứng?',
  'Quy trình duyệt hồ sơ như thế nào?',
];

export default function ChatbotWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Tôi là trợ lý AI của hệ thống SV5T. Tôi có thể giúp bạn tìm hiểu quy chế xét danh hiệu Sinh viên 5 Tốt. Bạn muốn hỏi gì?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    
    // Add user message and a placeholder for assistant message
    setMessages(prev => [...prev, userMsg, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          // Keep the last partial line in the buffer
          buffer = lines.pop() || "";
          
          for (const line of lines) {
            if (line.startsWith('data:')) {
              const dataStr = line.substring(line.indexOf(':') + 1).trim();
              if (!dataStr) continue;
              try {
                const data = JSON.parse(dataStr);
                if (data.error) {
                  setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].content = data.error;
                    return newMsgs;
                  });
                  break;
                }
                
                // Parse VNPT response format
                if (data.object && data.object.sb && data.object.sb.card_data) {
                  const cards = data.object.sb.card_data;
                  const textCard = cards.find((c: any) => c.type === 'text');
                  if (textCard && textCard.text) {
                    setMessages(prev => {
                      const newMsgs = [...prev];
                      newMsgs[newMsgs.length - 1].content = textCard.text;
                      return newMsgs;
                    });
                  }
                }
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (err) {
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.';
        return newMsgs;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
      style={{ height: '480px' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">AI Tư vấn SV5T</p>
            <p className="text-blue-200 text-xs">VNPT SmartBot · RAG</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'assistant' ? 'bg-blue-100' : 'bg-indigo-100'
            }`}>
              {msg.role === 'assistant' ? <Bot size={14} className="text-blue-600" /> : <User size={14} className="text-indigo-600" />}
            </div>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-sm'
                  : 'bg-slate-100 text-slate-800 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <p className="text-xs text-slate-400 px-1">📄 {msg.sources.join(', ')}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot size={14} className="text-blue-600" />
            </div>
            <div className="px-3 py-2 bg-slate-100 rounded-2xl rounded-tl-sm">
              <Loader2 size={14} className="animate-spin text-slate-400" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1">
          {QUICK_QUESTIONS.map(q => (
            <button key={q} onClick={() => sendMessage(q)}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors border border-blue-100">
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-slate-100 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Hỏi về quy chế SV5T..."
          className="flex-1 text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()}
          className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 disabled:opacity-40 transition-colors flex-shrink-0">
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
