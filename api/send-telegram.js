export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = await request.json();
    
    // Get environment variables from Vercel
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Validate required fields
    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    // Validate environment variables
    if (!botToken || !chatId) {
      console.error('Missing Telegram environment variables');
      return response.status(500).json({ error: 'Server configuration error' });
    }

    // Send message to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `📧 New Portfolio Message!\n\n👤 Name: ${name}\n📧 Email: ${email}\n📋 Subject: ${subject}\n💬 Message: ${message}`,
        parse_mode: 'HTML'
      })
    });

    const result = await telegramResponse.json();
    
    if (result.ok) {
      console.log('Telegram message sent successfully');
      return response.status(200).json({ success: true });
    } else {
      console.error('Telegram API error:', result);
      return response.status(500).json({ error: 'Failed to send notification' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}