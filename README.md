# Uno Code

AI coding agent for the terminal. Bundled with [Uno Work](https://github.com/technoob228/uno-work), but also works standalone.

Uno Code is a fork of [OpenCode](https://github.com/anomalyco/opencode), customized for the UNO ecosystem — connected to Uno's LLM Gateway for model access out of the box.

## How it works

Uno Code runs as a CLI agent in your terminal. It reads and edits files, runs commands, and interacts with Git — all guided by an LLM. When used inside Uno Work, it's auto-installed on first launch and configured to use Uno LLM by default.

## Installation

Uno Code is automatically installed when you launch [Uno Work](https://github.com/technoob228/uno-work). No manual setup required.

For standalone use:

```bash
# Build from source
bun install
bun run build
```

The binary is placed in `~/.unowork/uno-code/bin/uno-code`.

## Configuration

Uno Code uses the same config format as OpenCode (`~/.config/opencode/config.json`), with Uno-specific defaults:

- **Model provider**: Uno LLM Gateway (`api.getuno.xyz/llm/v1`) by default
- **API key**: set via Uno Work settings or `UNO_API_KEY` environment variable

## Relationship to OpenCode

Uno Code tracks upstream OpenCode for core agent capabilities. UNO-specific changes:

- Default provider points to Uno LLM Gateway instead of direct OpenAI/Anthropic APIs
- Branding and display names
- Integration hooks for Uno Work desktop app (binary path registration, version reporting)

The underlying `driverKind` remains `"opencode"` for settings compatibility.

## Contact

- Website: [getuno.xyz](https://getuno.xyz)
- Support: [hello@getuno.xyz](mailto:hello@getuno.xyz)
- Telegram: [@get_uno_support](https://t.me/get_uno_support)
