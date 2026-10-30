const COMMAND_NAME = /^[a-z0-9_]{1,32}$/

/**
 * Command name addressed to this bot, or undefined when the text is not one.
 * A @mention for a different bot is ignored so group chats stay quiet.
 */
export function commandTarget(text: string, botUsername?: string): string | undefined {
  if (!text.startsWith('/')) return undefined
  const head = text.slice(1).split(/\s/, 1)[0]
  if (head === undefined || head === '') return undefined

  const at = head.indexOf('@')
  const rawName = at === -1 ? head : head.slice(0, at)
  const mention = at === -1 ? undefined : head.slice(at + 1)
  if (mention !== undefined) {
    if (botUsername === undefined || botUsername === '') return undefined
    if (mention.toLowerCase() !== botUsername.toLowerCase()) return undefined
  }

  const name = rawName.toLowerCase()
  if (!COMMAND_NAME.test(name)) return undefined
  return name
}
