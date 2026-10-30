import { existsSync, readFileSync } from 'node:fs'

/** BotFather tokens are `<numeric id>:<secret>`. The secret is not logged. */
const BOT_TOKEN = /^\d{6,}:[A-Za-z0-9_-]{30,}$/
const ENV_KEY = /^[A-Za-z_][A-Za-z0-9_]*$/

export class ConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConfigError'
  }
}

/**
 * Read a BotFather token. The thrown message never includes the supplied value.
 * Empty and whitespace-only values are the same failure.
 */
export function readBotToken(env: NodeJS.ProcessEnv): string {
  const token = env.TELEGRAM_BOT_TOKEN?.trim() ?? ''
  if (token === '') {
    throw new ConfigError(
      'TELEGRAM_BOT_TOKEN is not set. Copy apps/bot/.env.example to apps/bot/.env and paste the token from @BotFather.'
    )
  }
  if (!BOT_TOKEN.test(token)) {
    throw new ConfigError(
      'TELEGRAM_BOT_TOKEN is not a BotFather token. Expected <numeric id>:<secret>.'
    )
  }
  return token
}

/** Replace every occurrence of `secret` so logs cannot echo the bot token. */
export function redact(text: string, secret: string): string {
  if (secret === '') return text
  return text.split(secret).join('[redacted]')
}

/**
 * Apply KEY=VALUE lines onto `env`. Existing keys win, so a shell export beats the file.
 * Supports comments, blank lines, optional `export`, and one pair of quotes.
 * Does not expand variables.
 */
export function applyEnvText(text: string, env: NodeJS.ProcessEnv): void {
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (trimmed === '' || trimmed.startsWith('#')) continue
    const body = trimmed.startsWith('export ') ? trimmed.slice('export '.length).trim() : trimmed
    const eq = body.indexOf('=')
    if (eq <= 0) continue
    const key = body.slice(0, eq).trim()
    if (!ENV_KEY.test(key)) continue
    let value = body.slice(eq + 1).trim()
    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1)
    }
    if (env[key] === undefined) env[key] = value
  }
}

/** Load `path` when it exists. A missing file leaves `env` unchanged. */
export function loadEnvFile(path: string, env: NodeJS.ProcessEnv = process.env): void {
  if (!existsSync(path)) return
  applyEnvText(readFileSync(path, 'utf8'), env)
}
