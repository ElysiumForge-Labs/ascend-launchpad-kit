import type { Context } from 'grammy'
import type { HtmlMessage } from './copy/messages.js'

export async function replyHtml(ctx: Context, message: HtmlMessage): Promise<void> {
  await ctx.reply(message.text, { parse_mode: 'HTML' })
}
