import axios from 'axios'
import { config } from './config.js'

const payload = {
  type: 2,
  application_id: '159985415099514880',
  guild_id: '1078033205556416652',
  channel_id: '1083350705089302579',
  session_id: '9b0b39a77fb0c8de2ece96eb6b3e468e',
  data: {
    version: '1083348951710830601',
    id: '1083348951664709632',
    guild_id: '1078033205556416652',
    name: 'work',
    type: 1,
    options: [],
    application_command: {
      id: '1083348951664709632',
      application_id: '159985415099514880',
      version: '1083348951710830601',
      default_member_permissions: '2147483648',
      type: 1,
      nsfw: false,
      name: 'work',
      description: 'Work for one hour and come back to claim your paycheck',
      guild_id: '1078033205556416652',
      options: [{ type: 3, name: 'action', description: 'Optional action like claim' }],
    },
    attachments: [],
  },
  nonce: Date.now(),
}

const form = new FormData()
form.append('payload_json', JSON.stringify(payload))

export const postInteraction = async () => {
  try {
    await axios.post(`https://discord.com/api/v9/interactions`, form, {
      headers: {
        authorization: config.discordToken,
        'content-type': 'multipart/form-data',
      },
    })
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
