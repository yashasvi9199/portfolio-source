import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="section" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
    }}>
      <div className="container">
        <h2 style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #6c63ff, #00ff88)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Get In Touch
        </h2>
        
        <div className="contact-content" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          <div className="contact-info">
            <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>Let's Connect</h3>
            <p style={{ marginBottom: '2rem', color: '#888', lineHeight: '1.6' }}>
              I'm always interested in new opportunities, collaborations, 
              and discussing cutting-edge technologies. Feel free to reach out!
            </p>
            
            <div className="contact-methods" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(108, 99, 255, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6c63ff'
                }}>
                  ✉️
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>Email</div>
                  <div style={{ color: '#888' }}>yashasvi@example.com</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(0, 255, 136, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00ff88'
                }}>
                  💼
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>LinkedIn</div>
                  <div style={{ color: '#888' }}>linkedin.com/in/yashasvi</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 107, 107, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff6b6b'
                }}>
                  💻
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>GitHub</div>
                  <div style={{ color: '#888' }}>github.com/yashasvi9199</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem',
                    backdropFilter: 'blur(20px)'
                  }}
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem',
                    backdropFilter: 'blur(20px)'
                  }}
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem',
                    resize: 'vertical',
                    backdropFilter: 'blur(20px)',
                    minHeight: '120px'
                  }}
                />
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact