import { postMsg } from './discord.js'
import { getMessage } from './messages.js'
import { delay, config } from './config.js'

const regularPoster = async (role) => {
  const message = await getMessage(role === ROLE.initiator)
  if (message) await postMsg(message)
  await delay(config.postDelay)
}

const ROLE = { initiator: 0, replier: 1 }

while (true) {
  try {
    await regularPoster(ROLE.replier)
  } catch (e) {
    console.log(`[${new Date().toLocaleString()}]: Request failed - ${e.message}`)
  }
}
