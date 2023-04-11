import { postInteraction } from './discord.js'
import { delay, config } from './config.js'

const post = async () => {
  await postInteraction()
}

while (true) {
  try {
    await post()
    await delay(config.postDelay)
  } catch (e) {
    console.log(`[${new Date().toLocaleString()}]: Request failed - ${e.message}`)
  }
}
