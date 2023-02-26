# Description

The tool posts messages to the specified channel at set intervals

# Requirements

`node` and `npm` are required to run the tool.

# Launch

- Fill required parameters in the `app.js` file:

  - `discordToken` is an authorization token for Discord API actions. Can be peeked via DevTools of a Discord Web version. When a user is logged in all their requests have this token in `authorization` header
    ![image](https://user-images.githubusercontent.com/123946175/219636681-c603aa81-7d78-4f9b-bb1a-5430e8b8ff0f.png)

  - `channelId` numeric id of the channel
  - `postDelay` interval in milliseconds

- Run the `npm install` command to fetch required packages

- Run `node app.js` to start the app
