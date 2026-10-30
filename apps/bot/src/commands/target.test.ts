import { describe, expect, it } from 'vitest'
import { commandTarget } from './target.js'

describe('commandTarget', () => {
  it('reads a bare command and a mention of this bot', () => {
    expect(commandTarget('/fee', 'AscendKitBot')).toBe('fee')
    expect(commandTarget('/Fee@AscendKitBot 12', 'AscendKitBot')).toBe('fee')
  })

  it('ignores another bot, plain text, and names Telegram would reject', () => {
    expect(commandTarget('/fee@other', 'AscendKitBot')).toBeUndefined()
    expect(commandTarget('hello', 'AscendKitBot')).toBeUndefined()
    expect(commandTarget('/fee<script>', 'AscendKitBot')).toBeUndefined()
    expect(commandTarget('/fee@AscendKitBot', undefined)).toBeUndefined()
  })
})
