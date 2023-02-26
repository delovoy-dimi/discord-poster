import axios from 'axios'

const discordToken = 'xxxxxxxxx'
const channelId = '000000000'
const postDelay = 1000 // every 1 second

const message = 'GM!'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

while (true) {
  try {
    await axios.post(
      `https://discord.com/api/v9/channels/${channelId}/messages`,
      {
        content: message,
        flags: 0,
        nonce: Date.now(),
        tts: false,
      },
      {
        headers: {
          authorization: discordToken,
          'content-type': 'application/json',
        },
      }
    )
    console.log(`[${new Date().toLocaleString()}]: ${message}`)
  } catch (e) {
    console.log(`[${new Date().toLocaleString()}]: Request failed - ${e.message}`)
  }
  await delay(postDelay)
}
