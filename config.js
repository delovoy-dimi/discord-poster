export const config = {
  discordToken: 'xxxxx',
  postDelay: 60 * 1000 * 62, //62 mins interval
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
