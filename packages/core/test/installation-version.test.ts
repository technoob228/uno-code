import { describe, expect, test } from "bun:test"
import { pluginVersion } from "../src/installation/version"

describe("pluginVersion", () => {
  test("strips the Uno fork suffix so npm can resolve @opencode-ai/plugin", () => {
    expect(pluginVersion("1.14.48-uno.1")).toBe("1.14.48")
    expect(pluginVersion("1.14.48-uno.dev")).toBe("1.14.48")
    expect(pluginVersion("1.14.48-uno")).toBe("1.14.48")
    expect(pluginVersion("uno-v1.14.48-uno.1")).toBe("1.14.48")
    expect(pluginVersion("uno-v1.14.48-uno.2")).toBe("1.14.48")
  })

  test("keeps upstream versions as they are", () => {
    expect(pluginVersion("1.14.48")).toBe("1.14.48")
    expect(pluginVersion("0.0.0-202509210803")).toBe("0.0.0-202509210803")
  })
})
