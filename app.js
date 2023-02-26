import axios from 'axios'

const discordToken = 'xxxxxxxxx'
const channelId = '000000000'
const postDelay = 10000 // every 10 seconds

const shouldDelete = true

const message = 'GM!'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let msgResult = {}

const postMsg = () =>
  axios.post(
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

const deleteMsg = () =>
  axios.delete(`https://discord.com/api/v9/channels/${channelId}/messages/${msgResult.data.id}`, {
    headers: {
      authorization: discordToken,
    },
  })

const regularPoster = async () => {
  await postMsg()
  await delay(postDelay)
}

let firstTime = true
const cleanupPoster = async () => {
  if (firstTime) {
    msgResult = await postMsg()
    firstTime = false
  }

  await delay(postDelay)

  deleteMsg()
  msgResult = await postMsg()
}

while (true) {
  try {
    if (shouldDelete) {
      await cleanupPoster()
    } else {
      await regularPoster()
    }

    console.log(`[${new Date().toLocaleString()}]: ${message}`)
  } catch (e) {
    console.log(`[${new Date().toLocaleString()}]: Request failed - ${e.message}`)
  }
}
