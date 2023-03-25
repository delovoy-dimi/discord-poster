export const config = {
  discordToken: 'xxxxxx',
  channelId: 'xxxxxx',
  openaiApiKey: 'xxxxxx',
  openaiOrg: 'xxxxxx',
  postDelay: 30 * 1000,
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
