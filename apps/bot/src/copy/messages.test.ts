import { describe, expect, it } from 'vitest'
import { ADDRESSES, elysiumTestnet } from '@ascendkit/core'
import { BOT_COMMANDS } from '../commands/meta.js'
import { escapeHtml, formatFeeSchedule, formatUnknownCommand, formatWelcome } from './messages.js'

describe('formatWelcome', () => {
  it('names the chain, the launchpad, and every registered command', () => {
    const { text } = formatWelcome()
    expect(text).toContain(String(elysiumTestnet.id))
    expect(text).toContain(ADDRESSES.ascendLaunchpad)
    expect(text).toContain('does not hold keys')
    for (const command of BOT_COMMANDS) {
      expect(command.command).toMatch(/^[a-z0-9_]{1,32}$/)
      expect(command.description.length).toBeGreaterThan(0)
      expect(command.description.length).toBeLessThanOrEqual(256)
      expect(text).toContain(`/${command.command}`)
      expect(text).toContain(command.description)
    }
  })
})

describe('formatFeeSchedule', () => {
  it('shows the 90% open and the 1% floor in a monospace table', () => {
    const { text } = formatFeeSchedule()
    expect(text).toContain('90%')
    expect(text).toContain('1%')
    expect(text).toContain('<pre>')
    expect(text).toContain('t+0s')
    expect(text).toContain('900000')
    expect(text).toContain('t+5s')
    expect(text).toContain('10000')
  })
})

describe('formatUnknownCommand', () => {
  it('escapes the name before it is placed in HTML', () => {
    expect(escapeHtml('a<b>&')).toBe('a&lt;b&gt;&amp;')
    expect(formatUnknownCommand('nope').text).toBe('No command /nope. Send /help for the list.')
  })
})
