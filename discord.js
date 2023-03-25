import axios from 'axios'
import { config } from './config.js'

let lastReportedMsgId = 0
const msgContentHash = {}

export const postMsg = (message) =>
  axios.post(
    `https://discord.com/api/v9/channels/${config.channelId}/messages`,
    {
      content: message,
      flags: 0,
      nonce: Date.now(),
      tts: false,
    },
    {
      headers: {
        authorization: config.discordToken,
        'content-type': 'application/json',
      },
    }
  )

export const getMessageToReply = async () => {
  const latestMessages = await getLatestDiscordChanelMessages(1)
  return filterNotReportedMessages(latestMessages)[0].content
}

const getLatestDiscordChanelMessages = async (latestCount) => {
  try {
    var url = `https://discord.com/api/v9/channels/${config.channelId}/messages?limit=${latestCount}`
    return (
      await axios.get(url, {
        headers: {
          authorization: config.discordToken,
        },
      })
    ).data
  } catch (e) {
    console.log(`[${new Date().toLocaleString()}]: getLatestDiscordChanelMessages failed with - ${e.message}`)
    return []
  }
}

const filterNotReportedMessages = (messages) => {
  const messagesToReport = messages.filter((m) => m.id > lastReportedMsgId || hashCode(m.content) != msgContentHash[m.id])
  lastReportedMsgId = messagesToReport[0]?.id ? Math.max(messagesToReport[0]?.id, lastReportedMsgId) : lastReportedMsgId
  messages.forEach((m) => (msgContentHash[m.id] = hashCode(m.content)))
  return messagesToReport
}

const hashCode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
