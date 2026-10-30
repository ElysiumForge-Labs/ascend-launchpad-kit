import { fileURLToPath } from 'node:url'
import { elysiumTestnet } from '@ascendkit/core'
import { createBot } from './bot.js'
import { BOT_COMMANDS } from './commands/meta.js'
import { loadEnvFile, readBotToken, redact } from './config.js'

async function main(): Promise<void> {
  loadEnvFile(fileURLToPath(new URL('../.env', import.meta.url)))
  const token = readBotToken(process.env)
  const bot = createBot(token)
  await bot.init()
  await bot.api.setMyCommands([...BOT_COMMANDS])
  const username = bot.botInfo.username
  if (username === undefined) throw new Error('Telegram did not return a bot username')
  console.log(`@${username} polling on chain ${elysiumTestnet.id}`)
  await bot.start({ drop_pending_updates: true })
}

main().catch((err: unknown) => {
  const token = process.env.TELEGRAM_BOT_TOKEN ?? ''
  const message = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
  console.error(redact(message, token))
  process.exitCode = 1
})
