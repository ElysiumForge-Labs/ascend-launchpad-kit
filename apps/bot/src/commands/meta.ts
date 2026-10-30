import type { BotCommand } from 'grammy/types'

/** Menu and /help share this list. Descriptions stay under Telegram's 256-character cap. */
export const BOT_COMMANDS: readonly BotCommand[] = [
  { command: 'start', description: 'Chain, launchpad address, and command list' },
  { command: 'fee', description: 'Sniper-tax schedule from launch to the 1% floor' },
  { command: 'help', description: 'List commands' }
]
