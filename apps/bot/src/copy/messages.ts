import { ADDRESSES, elysiumTestnet, FEE } from '@ascendkit/core'
import { feeSchedule } from '@ascendkit/sim'
import { BOT_COMMANDS } from '../commands/meta.js'

export interface HtmlMessage {
  text: string
}

export function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

/** /start and /help. Built from BOT_COMMANDS so the menu and the reply cannot drift. */
export function formatWelcome(): HtmlMessage {
  const commands = BOT_COMMANDS.map(
    (command) => `/${command.command} — ${escapeHtml(command.description)}`
  ).join('\n')
  return {
    text: [
      '<b>AscendKit</b>',
      'Unofficial reader for the Ascend launchpad. This bot does not hold keys or sign transactions.',
      '',
      `Chain <code>${elysiumTestnet.id}</code> ${escapeHtml(elysiumTestnet.name)}`,
      `Launchpad <code>${escapeHtml(ADDRESSES.ascendLaunchpad)}</code>`,
      '',
      '<b>Commands</b>',
      commands,
      '',
      '/pool, /watch, and /launch are not in this build.'
    ].join('\n')
  }
}

/** Sniper-tax table for the decay window. Integer rows come from @ascendkit/sim. */
export function formatFeeSchedule(): HtmlMessage {
  const horizon = Number(FEE.DECAY_SECONDS)
  const rows = feeSchedule(horizon)
    .map((step) => {
      const elapsed = `t+${step.elapsedSeconds}s`.padEnd(8)
      const pips = String(step.pips).padEnd(10)
      return `${elapsed}${pips}${step.percent}%`
    })
    .join('\n')
  const table = escapeHtml(`elapsed  pips      percent\n${rows}`)
  return {
    text: [
      '<b>Sniper tax</b>',
      `Every launch starts at ${FEE.START_PIPS / 10_000}% and is ${FEE.BASE_PIPS / 10_000}% from ${horizon}s onward.`,
      '',
      `<pre>${table}</pre>`,
      '',
      'The live value is <code>currentFee(poolId)</code> on the launchpad.'
    ].join('\n')
  }
}

export function formatUnknownCommand(name: string): HtmlMessage {
  return { text: `No command /${escapeHtml(name)}. Send /help for the list.` }
}
