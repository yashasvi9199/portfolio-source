import React, { useState, useEffect } from 'react';
import { useVoiceCommands } from '../../hooks/voice/useVoiceCommands';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, isSupported, startListening, stopListening } = useVoiceCommands();

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      startListening();
      setIsListening(true);
    }
  };

  useEffect(() => {
    if (transcript) {
      // Handle voice commands
      const command = transcript.toLowerCase();
      
      if (command.includes('scroll to skills') || command.includes('show skills')) {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('scroll to projects') || command.includes('show projects')) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('scroll to experience') || command.includes('show experience')) {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('scroll to contact') || command.includes('show contact')) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('go to top') || command.includes('home')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [transcript]);

  if (!isSupported) {
    return null; // Hide if speech recognition not supported
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '2rem',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      {/* Voice Control Button */}
      <button
        onClick={toggleListening}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: isListening 
            ? 'linear-gradient(135deg, #ff6b6b, #ff8e8e)'
            : 'linear-gradient(135deg, #00ff88, #00cc6a)',
          border: 'none',
          color: 'white',
          fontSize: '1.2rem',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          animation: isListening ? 'pulse 1.5s infinite' : 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        {isListening ? '🎤' : '🎙️'}
      </button>

      {/* Transcript Display */}
      {transcript && (
        <div style={{
          background: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(108, 99, 255, 0.3)',
          borderRadius: '10px',
          padding: '0.5rem 1rem',
          color: 'white',
          fontSize: '0.8rem',
          maxWidth: '200px',
          textAlign: 'center'
        }}>
          {transcript}
        </div>
      )}

      {/* Voice Commands Help */}
      {!isListening && (
        <div style={{
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '0.75rem',
          color: '#888',
          fontSize: '0.7rem',
          maxWidth: '150px',
          textAlign: 'center',
          display: 'none' // Hidden by default, show on hover
        }}>
          Try saying: "Scroll to projects", "Show skills", "Go to contact"
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default VoiceControl;