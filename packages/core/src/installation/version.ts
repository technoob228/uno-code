declare global {
  const OPENCODE_VERSION: string
  const OPENCODE_CHANNEL: string
}

export const InstallationVersion = typeof OPENCODE_VERSION === "string" ? OPENCODE_VERSION : "local"
export const InstallationChannel = typeof OPENCODE_CHANNEL === "string" ? OPENCODE_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"

// Uno builds carry a fork suffix (`1.14.48-uno.1`), but `@opencode-ai/plugin`
// is only published under upstream versions. Asking npm for the suffixed
// version 404s on every start, so the config-dir install never finishes and
// leaves a partial packument in ~/.npm/_cacache/tmp each time.
export function pluginVersion(version: string) {
  return version.replace(/-uno(\.[0-9A-Za-z.-]*)?$/, "")
}

export const InstallationPluginVersion = InstallationLocal ? undefined : pluginVersion(InstallationVersion)
