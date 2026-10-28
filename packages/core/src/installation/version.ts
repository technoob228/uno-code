declare global {
  const OPENCODE_VERSION: string
  const OPENCODE_CHANNEL: string
}

export const InstallationVersion = typeof OPENCODE_VERSION === "string" ? OPENCODE_VERSION : "local"
export const InstallationChannel = typeof OPENCODE_CHANNEL === "string" ? OPENCODE_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"

// Uno builds carry the release tag as their version (`uno-v1.14.48-uno.1`,
// local builds `1.14.48-uno.dev`), but `@opencode-ai/plugin` is only published
// under upstream versions. Asking npm for the Uno version fails on every start,
// so the config-dir install never finishes and leaves a partial packument in
// ~/.npm/_cacache/tmp each time.
export function pluginVersion(version: string) {
  const uno = version.match(/^(?:uno-)?v?(\d+\.\d+\.\d+)-uno(?:[.-].*)?$/)
  return uno ? uno[1] : version
}

export const InstallationPluginVersion = InstallationLocal ? undefined : pluginVersion(InstallationVersion)
