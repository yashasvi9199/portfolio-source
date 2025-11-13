import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../../hooks/ai/useChatbot';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { messages, sendMessage, isLoading, clearHistory } = useChatbot();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    await sendMessage(inputMessage);
    setInputMessage('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const suggestedQuestions = [
    "Tell me about Yash's experience",
    "What projects has he worked on?",
    "What are his technical skills?",
    "How can I contact him?"
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6c63ff, #00ff88)',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(108, 99, 255, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 25px rgba(108, 99, 255, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 20px rgba(108, 99, 255, 0.4)';
        }}
      >
        🤖
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '5rem',
          right: '2rem',
          width: '350px',
          height: '500px',
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(108, 99, 255, 0.3)',
          borderRadius: '20px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#00ff88',
                animation: 'glow 2s ease-in-out infinite'
              }} />
              <h3 style={{ margin: 0, color: 'white', fontSize: '1rem' }}>
                Portfolio Assistant
              </h3>
            </div>
            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ×
            </button>
          </div>

          {/* Messages Container */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
                <p>Hello! I'm your AI assistant. Ask me about Yash's portfolio!</p>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      style={{
                        padding: '0.5rem',
                        background: 'rgba(108, 99, 255, 0.1)',
                        border: '1px solid rgba(108, 99, 255, 0.3)',
                        borderRadius: '10px',
                        color: '#6c63ff',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '0.75rem 1rem',
                  background: message.sender === 'user' 
                    ? 'linear-gradient(135deg, #6c63ff, #4a44b5)'
                    : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  color: 'white',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}
              >
                {message.text}
              </div>
            ))}

            {isLoading && (
              <div style={{
                alignSelf: 'flex-start',
                padding: '0.75rem 1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                color: '#888',
                fontSize: '0.9rem'
              }}>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <span>Thinking</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#6c63ff',
                      animation: 'bounce 1.4s infinite ease-in-out'
                    }} />
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#6c63ff',
                      animation: 'bounce 1.4s infinite ease-in-out 0.2s'
                    }} />
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#6c63ff',
                      animation: 'bounce 1.4s infinite ease-in-out 0.4s'
                    }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about projects, skills, experience..."
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'linear-gradient(135deg, #6c63ff, #4a44b5)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  opacity: isLoading || !inputMessage.trim() ? 0.5 : 1
                }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
          @keyframes glow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </>
  );
};

export default AIChatbot;