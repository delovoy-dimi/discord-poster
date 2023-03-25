import { config } from './config.js'

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  organization: config.openaiOrg,
  apiKey: config.openaiApiKey,
})
const openai = new OpenAIApi(configuration)

const legend = 'reply concise as grumpy old man'

export const getResponse = async (question) => {
  try {
    // https://platform.openai.com/docs/api-reference/chat/create
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      n: 1,
      stop: '.',
      messages: [{ role: 'user', content: `${legend}: "${question}"` }],
    })
    return response.data.choices[0].message.content
  } catch (e) {
    console.log(`[${new Date().toLocaleString()}]: getResponse from chatGPT failed with - ${e.response.data}`)
  }
}
