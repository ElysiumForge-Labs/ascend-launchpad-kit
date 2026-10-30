import type { Bot } from 'grammy'
import { formatFeeSchedule } from '../copy/messages.js'
import { replyHtml } from '../reply.js'

export function registerFee(bot: Bot): void {
  bot.command('fee', async (ctx) => {
    await replyHtml(ctx, formatFeeSchedule())
  })
}
