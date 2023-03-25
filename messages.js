import { questions } from './questions.js'
import { getMessageToReply } from './discord.js'
import { getResponse } from './chatgpt.js'

export const getMessage = async (useDict) => {
  return useDict ? questions[Math.floor(Math.random() * questions.length)] : await getSmartReply()
}

const getSmartReply = async () => {
  const question = await getMessageToReply()
  return await getResponse(question)
}
