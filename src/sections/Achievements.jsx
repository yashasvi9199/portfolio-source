import React, { useState } from 'react';
import outskillCert from '../assets/outskill cert.jpg';

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const achievements = [
    {
      id: 1,
      title: "Generative AI Mastermind",
      issuer: "Outskill",
      year: "2025",
      description: "Completed advanced Generative AI training program",
      certificate: outskillCert // Using the uploaded image for now
    },
    {
      id: 2,
      title: "JioCloud Go Live & GA Projects",
      issuer: "Jio",
      year: "2023",
      description: "Certificate of Recognition for successful project deployment",
      certificate: outskillCert // Placeholder - replace later
    },
    {
      id: 3,
      title: "Customer Obsession Award",
      issuer: "Amazon",
      year: "2019",
      description: "Recognized for exceptional customer service and dedication",
      certificate: outskillCert // Placeholder - replace later
    },
    {
      id: 4,
      title: "Trainee of the Batch",
      issuer: "Amazon",
      year: "2019",
      description: "Top performer among new hires in training batch",
      certificate: outskillCert // Placeholder - replace later
    }
  ];

  const closeModal = () => {
    setSelectedAchievement(null);
  };

  return (
    <section id="achievements" className="achievements-section" style={{
      background: 'transparent',
      padding: '5rem 0'
    }}>
      <div className="container">
        <h2 style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #6c63ff, #00ff88)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          Awards & Achievements
        </h2>
        
        <p style={{
          textAlign: 'center',
          fontSize: '1.2rem',
          color: '#888',
          marginBottom: '4rem',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Recognized for excellence in technology, customer service, and professional development
        </p>

        <div className="achievements-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="achievement-card"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setSelectedAchievement(achievement)}
            >
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #6c63ff, #00ff88)',
                borderBottomLeftRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {achievement.year}
              </div>

              <h3 style={{
                color: '#fff',
                fontSize: '1.4rem',
                marginBottom: '1rem',
                fontWeight: '600',
                paddingRight: '60px'
              }}>
                {achievement.title}
              </h3>

              <div style={{
                color: '#6c63ff',
                fontSize: '1.1rem',
                marginBottom: '1rem',
                fontWeight: '500'
              }}>
                {achievement.issuer}
              </div>

              <p style={{
                color: '#b0b0b0',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {achievement.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: '#00ff88',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                <i className="fas fa-award" style={{ marginRight: '0.5rem' }}></i>
                Click to view certificate
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Modal */}
        {selectedAchievement && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000',
            backdropFilter: 'blur(10px)'
          }} onClick={closeModal}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '90%',
              maxHeight: '90%',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)'
            }} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#fff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                ×
              </button>
              
              <h3 style={{
                color: '#fff',
                textAlign: 'center',
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #6c63ff, #00ff88)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {selectedAchievement.title}
              </h3>
              
              <div style={{
                textAlign: 'center',
                color: '#b0b0b0',
                marginBottom: '2rem'
              }}>
                {selectedAchievement.issuer} • {selectedAchievement.year}
              </div>

              <img 
                src={selectedAchievement.certificate} 
                alt={`${selectedAchievement.title} Certificate`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '60vh',
                  borderRadius: '10px',
                  border: '2px solid rgba(255, 255, 255, 0.1)'
                }}
              />
              
              <div style={{
                textAlign: 'center',
                marginTop: '1.5rem',
                color: '#888',
                fontSize: '0.9rem'
              }}>
                Click outside to close
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;