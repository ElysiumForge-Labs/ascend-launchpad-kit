import { Bot, type BotError, type Context } from 'grammy'
import { redact } from './config.js'
import { registerCommands } from './commands/register.js'

export function createBot(token: string): Bot {
  const bot = new Bot(token)
  registerCommands(bot)
  bot.catch((err) => onBotError(err, token))
  return bot
}

async function onBotError(err: BotError<Context>, token: string): Promise<void> {
  const detail = err.error instanceof Error ? `${err.error.name}: ${err.error.message}` : String(err.error)
  console.error(redact(detail, token))
  try {
    await err.ctx.reply('That request failed. Try again in a moment.')
  } catch (replyError) {
    const replyDetail =
      replyError instanceof Error ? `${replyError.name}: ${replyError.message}` : String(replyError)
    console.error(redact(replyDetail, token))
  }
}
