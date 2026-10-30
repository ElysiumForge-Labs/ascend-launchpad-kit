import { describe, expect, it } from 'vitest'
import { applyEnvText, ConfigError, readBotToken, redact } from './config.js'

const SAMPLE = '123456789:AAHabcdefghijklmnopqrstuvwxyz0123456789'

describe('readBotToken', () => {
  it('returns a trimmed BotFather token', () => {
    expect(readBotToken({ TELEGRAM_BOT_TOKEN: `  ${SAMPLE}  ` })).toBe(SAMPLE)
  })

  it('refuses a missing token without echoing a placeholder', () => {
    expect(() => readBotToken({})).toThrow(ConfigError)
    expect(() => readBotToken({ TELEGRAM_BOT_TOKEN: '   ' })).toThrow(/not set/)
  })

  it('refuses a malformed token and does not include it in the error', () => {
    const bad = 'not-a-token'
    try {
      readBotToken({ TELEGRAM_BOT_TOKEN: bad })
      expect.fail('expected ConfigError')
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigError)
      expect(err instanceof Error ? err.message : '').not.toContain(bad)
    }
  })
})

describe('redact', () => {
  it('strips the token from a log line', () => {
    expect(redact(`getMe failed for ${SAMPLE}`, SAMPLE)).toBe('getMe failed for [redacted]')
  })

  it('leaves the line alone when there is no secret', () => {
    expect(redact('polling', '')).toBe('polling')
  })
})

describe('applyEnvText', () => {
  it('parses comments, quotes, and export, and does not override existing keys', () => {
    const env: NodeJS.ProcessEnv = { TELEGRAM_BOT_TOKEN: 'from-shell' }
    applyEnvText(
      [
        '# comment',
        '',
        'export TELEGRAM_BOT_TOKEN="from-file"',
        "OTHER='kept'"
      ].join('\n'),
      env
    )
    expect(env.TELEGRAM_BOT_TOKEN).toBe('from-shell')
    expect(env.OTHER).toBe('kept')
  })
})
