import { useState, useCallback } from 'react';

// Mock AI responses based on portfolio content
const portfolioData = {
  experience: [
    "Yash has 3+ years of experience in software development",
    "He worked as a Software Engineer at Appgallop Pvt. Ltd. where he optimized code performance by 20% and reduced bug rates by 25%",
    "At Amazon, he served as a Resolution Specialist and Customer Service Associate, developing internal tools and knowledge management systems",
    "He also successfully ran his own food truck business, demonstrating entrepreneurship and operational management skills"
  ],
  skills: [
    "Frontend: JavaScript (90%), React (85%), HTML5 (88%), CSS3 (85%)",
    "Backend: Node.js (82%), Java (78%), Python (75%), MySQL (80%)",
    "Tools: Git/GitHub (88%), Postman (85%), Jira (82%), Linux (75%)",
    "Methodologies: Full SDLC, Agile Development, Performance Optimization, Knowledge Management"
  ],
  projects: [
    "E-commerce Platform: Full-stack solution with user authentication and database integration",
    "AI Image Generator: Advanced generative AI platform creating visual art from text prompts",
    "Quantum Simulation: Interactive quantum computing simulator with real-time visualization",
    "Jio Business Marketplace: UI/backend integration with third-party APIs",
    "Multiple React applications including weather search and interactive games"
  ],
  contact: [
    "Email: yashaldiya@gmail.com",
    "Phone: +91 7976401542",
    "GitHub: github.com/yashasvi9199",
    "Location: Jaipur, India"
  ]
};

const generateAIResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Simple pattern matching for demo purposes
  // In a real implementation, you'd use an AI API
  if (message.includes('experience') || message.includes('work') || message.includes('job')) {
    return portfolioData.experience.join(' ');
  }
  
  if (message.includes('skill') || message.includes('tech') || message.includes('programming')) {
    return portfolioData.skills.join(' ');
  }
  
  if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
    return portfolioData.projects.join(' ');
  }
  
  if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
    return portfolioData.contact.join(' ');
  }
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm your AI portfolio assistant. I can tell you about Yash's experience, skills, projects, or how to contact him. What would you like to know?";
  }
  
  return "I'm an AI assistant for Yash's portfolio. I can help you learn about his professional experience, technical skills, projects, or contact information. What specific information are you looking for?";
};

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage) => {
    setIsLoading(true);
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Generate AI response
    const aiResponse = generateAIResponse(userMessage);
    
    // Add AI response
    setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    setIsLoading(false);
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    clearHistory
  };
};