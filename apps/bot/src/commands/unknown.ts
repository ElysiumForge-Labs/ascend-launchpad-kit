import type { Bot } from 'grammy'
import { formatUnknownCommand } from '../copy/messages.js'
import { replyHtml } from '../reply.js'
import { BOT_COMMANDS } from './meta.js'
import { commandTarget } from './target.js'

const known = new Set(BOT_COMMANDS.map((command) => command.command))

/** Reply only when the text is a command for this bot and no handler owns it. */
export function registerUnknown(bot: Bot): void {
  bot.on('message:text', async (ctx) => {
    const name = commandTarget(ctx.message.text, ctx.me.username)
    if (name === undefined || known.has(name)) return
    await replyHtml(ctx, formatUnknownCommand(name))
  })
}
