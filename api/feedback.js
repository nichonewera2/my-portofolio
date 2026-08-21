// Vercel serverless function — runs on the server, never shipped to the
// browser. Keeps BOT_TOKEN and ADMIN_ID safely on the server side; the
// client only ever talks to this endpoint, never to Telegram directly.
//
// Required environment variables (set in Vercel → Project → Settings →
// Environment Variables — NOT committed to the repo):
//   BOT_TOKEN  — the same Telegram bot token used by the Termux bot
//   ADMIN_ID   — your Telegram user ID (8108598809)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body || {}
  const { message, name, hp } = body

  // Honeypot — a real visitor never fills this hidden field. Bots that
  // blindly fill every input will trip it; we just pretend success so
  // they don't learn anything, and skip actually sending to Telegram.
  if (hp) {
    res.status(200).json({ ok: true })
    return
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Message is required.' })
    return
  }
  if (message.length > 800) {
    res.status(400).json({ error: 'Message is too long (max 800 characters).' })
    return
  }

  const token = process.env.BOT_TOKEN
  const chatId = process.env.ADMIN_ID
  if (!token || !chatId) {
    console.error('[api/feedback] Missing BOT_TOKEN or ADMIN_ID environment variable')
    res.status(500).json({ error: 'Server is not configured yet.' })
    return
  }

  const safeName = (typeof name === 'string' && name.trim() ? name.trim() : 'Anonymous').slice(0, 80)
  const text =
    `📨 *New feedback from the website*\n\n` +
    `From: ${safeName}\n\n` +
    message.trim().slice(0, 800)

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    })
    const data = await tgRes.json()

    if (!data.ok) {
      console.error('[api/feedback] Telegram API rejected the message:', data)
      res.status(502).json({ error: 'Could not deliver the message. Try again later.' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/feedback] Unexpected error calling Telegram:', err)
    res.status(500).json({ error: 'Unexpected server error. Try again later.' })
  }
}
