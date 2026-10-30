import type { Bot } from 'grammy'
import { registerFee } from './fee.js'
import { registerStart } from './start.js'
import { registerUnknown } from './unknown.js'

export function registerCommands(bot: Bot): void {
  registerStart(bot)
  registerFee(bot)
  registerUnknown(bot)
}
