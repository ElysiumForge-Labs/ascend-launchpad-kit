# ascend-launchpad-kit

TypeScript toolkit for the Ascend launchpad on Elysium — SDK, simulator, indexer, CLI, and Telegram bot.

Part of [ElysiumForge Labs](https://github.com/ElysiumForge-Labs).

## Packages

| Path | Package | Role |
| --- | --- | --- |
| `packages/core` | `@ascendkit/core` | Chain config, addresses, protocol constants, ABI, pool-key / CREATE2 derivation |
| `packages/sim` | `@ascendkit/sim` | Fee, fill, and quote simulation (replays on-chain fill math) |
| `packages/indexer` | `@ascendkit/indexer` | Typed read model over Ascend launchpad logs |
| `packages/cli` | `@ascendkit/cli` | CLI (`ak` / `ascendkit`): pools, fee, quote, decode, watch |
| `apps/bot` | `@ascendkit/bot` | Read-only Telegram bot for Elysium testnet |
| `tools/abi-extract` | `@ascendkit/abi-extract` | Reproducible ABI extraction from vendored verified sources (solc 0.8.30) |

Fill rules for the launchpad flywheel are pinned in [`docs/flywheel.md`](docs/flywheel.md).

## Requirements

Node.js 20 or newer.

## Setup

```bash
npm install
npm run build
npm test
```

## CLI

```bash
npm run cli -- --help
npm run cli -- pools
npm run cli -- pool <token-or-poolId>
npm run cli -- fee <token>
npm run cli -- quote <token> <amount>
npm run cli -- decode <raw-tx-or-calldata>
npm run cli -- watch <token>
```

Point the CLI at Elysium testnet RPC via config / env (see `ak config`). Workspace package names remain `@ascendkit/*`.

## Examples

Runnable scripts that use the packages directly (not the CLI). Build first, then:

| Script | Needs RPC | What it shows |
| --- | --- | --- |
| `examples/01-predict-pool.mjs` | no | Decode a raw `launch()` tx and predict token address + poolId offline |
| `examples/02-track-pool.mjs` | yes | List pools; snapshot fee state and bid inventory |
| `examples/03-watch-pool.mjs <token>` | yes | Poll pool events as they land |
| `examples/04-simulate-fill.mjs` | no | Replay real `Filled` events through the fill simulator |

```bash
npm run demo
# or individually:
node examples/01-predict-pool.mjs
node examples/02-track-pool.mjs
node examples/03-watch-pool.mjs 0x20c97309F0e1849d2403F97d56D619845C7b2253
node examples/04-simulate-fill.mjs
```

## Verify ABIs

```bash
npm run verify
```

## License

MIT.

---

Unofficial community project. Not affiliated with Kinetiq/Hyperliquid.
