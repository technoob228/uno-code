# Uno Code — release flow

This fork lives on the `uno/rebrand` branch (and any feature branches forked
from it). The main branch tracks upstream `sst/opencode` so future
`git merge upstream/dev` stays cheap.

## Cutting a release

1. Make sure `uno/rebrand` is up to date and `bun run typecheck` passes (locally).
2. Decide on a tag. Format: `uno-v<upstream-version>-uno.<n>`. Example:
   `uno-v1.14.48-uno.1`.
3. Tag and push:
   ```sh
   git tag uno-v1.14.48-uno.1
   git push origin uno-v1.14.48-uno.1
   ```
4. The `.github/workflows/uno-release.yml` workflow picks up the push,
   builds single-binary `uno-code` for darwin/linux/windows × {arm64,x64},
   packages them as `uno-code-<os>-<arch>.{zip,tar.gz}`, and attaches them
   to a GitHub Release on `technoob228/uno-code`.

## Artifact layout (matches `apps/desktop/src/unoCodeInstaller.ts`)

| Platform        | Asset name                          |
| --------------- | ----------------------------------- |
| darwin arm64    | `uno-code-darwin-arm64.zip`         |
| darwin x64      | `uno-code-darwin-x64.zip`           |
| linux arm64     | `uno-code-linux-arm64.tar.gz`       |
| linux x64       | `uno-code-linux-x64.tar.gz`         |
| windows x64     | `uno-code-windows-x64.zip`          |

(Windows arm64 is intentionally not built — upstream `publish.yml` signs it
via Azure Trusted Signing, which this lightweight workflow does not.)

## Local one-shot build (no release)

For dev iteration without cutting a release, run from the fork root:

```sh
bun install
bun packages/opencode/script/build.ts --single --skip-embed-web-ui
```

Output binary: `packages/opencode/dist/opencode-<os>-<arch>/bin/uno-code`.
Copy it to `~/.unowork/uno-code/bin/uno-code` for use by the Uno Work desktop
app's `UnoDriver`.
