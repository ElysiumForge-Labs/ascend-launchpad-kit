# @ascendkit/bot

Read-only Telegram bot for the Ascend launchpad on Elysium testnet. It answers `/start`, `/help`, and `/fee`. It does not hold keys or sign transactions.

`/pool`, `/watch`, and `/launch` are not in this build.

## Layout

- `src/index.ts` loads `apps/bot/.env`, publishes the command menu, and polls.
- `src/config.ts` checks the BotFather token and parses the env file.
- `src/bot.ts` builds the grammY client and handles handler errors.
- `src/commands/` registers each command. Unknown commands get a short reply.
- `src/copy/messages.ts` builds the HTML replies. Tests cover that copy.

## Run

From the repository root:

```bash
npm install
npm run build
```

```powershell
Copy-Item apps/bot/.env.example apps/bot/.env
```

Set `TELEGRAM_BOT_TOKEN` from [@BotFather](https://t.me/BotFather).

```bash
npm run start -w @ascendkit/bot
```

The process reads `apps/bot/.env` from its own path, so the shell's working directory does not matter. Ctrl+C stops polling. Updates that arrived while the process was down are dropped.

## Tests

`npm test` at the repository root includes this app. Build first: the bot imports `@ascendkit/core` and `@ascendkit/sim` through their package entry points.
