const axios = require('axios')

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body
        
        if (!message) {
            return res.status(400).json({ message: 'Message is required' })
        }

        if (!process.env.OPENROUTER_API_KEY) {
            console.error('OPENROUTER_API_KEY is not set')
            return res.status(500).json({ message: 'AI service not configured' })
        }

        console.log('Sending message to AI:', message)
        
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', 
            {
                model: 'openai/gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an AI advisor for Agri-Smart, a Kenyan farming marketplace. You help farmers with: 1) Sales advice - local pricing, 2) Financial advice - managing income, expenses, profits. Keep responses simple, practical and relevant to Kenyan farmers. Respond in English or Kiswahili based on how farmer writes.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:5173',
                    'X-Title': 'Agri-Smart'
                }
            }
        )
        
        console.log('AI response received')
        const reply = response.data.choices[0].message.content
        res.status(200).json({ reply })
    } catch (error) {
        console.error('AI Error:', error.response?.data || error.message)
        res.status(500).json({ 
            message: error.response?.data?.error?.message || error.message || 'AI service error'
        })
    }
}

module.exports = { chatWithAI }