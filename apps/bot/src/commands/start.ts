import type { Bot, Context } from 'grammy'
import { formatWelcome } from '../copy/messages.js'
import { replyHtml } from '../reply.js'

async function welcome(ctx: Context): Promise<void> {
  await replyHtml(ctx, formatWelcome())
}

export function registerStart(bot: Bot): void {
  bot.command('start', welcome)
  bot.command('help', welcome)
}
