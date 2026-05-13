import { useState, useRef, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from '../../api/axios'
import FarmerSidebar from '../../components/FarmerSidebar'
import Topbar from '../../components/Topbar'

const AiAdvisor = () => {
  const { user } = useUser()
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Habari! Mimi ni mshauri wako wa kilimo. Niulize kuhusu bei za mazao au usimamizi wa fedha!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      setLoading(true)
      const response = await axios.post('/api/ai/chat', { message: userMessage })
      setMessages(prev => [...prev, { role: 'ai', content: response.data.reply }])
    } catch (error) {
      console.log(error)
      setMessages(prev => [...prev, { role: 'ai', content: 'Samahani, kuna tatizo. Jaribu tena.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      <FarmerSidebar />
      <div className="flex flex-1 flex-col">
        <Topbar title="AI Advisor" />
        <main className="flex flex-1 flex-col overflow-hidden px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto flex h-full w-full max-w-4xl flex-col">
            <div className="rounded-t-2xl bg-white px-6 py-4 shadow-sm">
              <h1 className="text-xl font-semibold text-stone-900">🤖 AI Advisor</h1>
              <p className="mt-1 text-sm text-stone-500">Your personal farming assistant</p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-white px-4 py-4 sm:px-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                      msg.role === 'user'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-100 text-stone-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl bg-stone-100 px-4 py-3 sm:max-w-[75%]">
                    <p className="text-sm text-stone-600">AI is thinking...</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="rounded-b-2xl bg-white px-4 py-4 shadow-sm sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Uliza swali..."
                  disabled={loading}
                  className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white disabled:bg-stone-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:bg-emerald-300 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AiAdvisor
