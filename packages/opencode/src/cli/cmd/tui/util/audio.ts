import * as OpenTuiCore from "@opentui/core"
import * as Log from "@opencode-ai/core/util/log"

const log = Log.create({ service: "tui.audio" })

export type AudioErrorContext = {
  action: string
  status?: number
}

export type AudioPlayOptions = {
  volume?: number
  pan?: number
  loop?: boolean
  groupId?: number
}

export type AudioSound = number
export type AudioVoice = number

type AudioEngine = {
  on(event: "error", listener: (error: Error, context: AudioErrorContext) => void): unknown
  loadSoundFile(filePath: string): Promise<AudioSound | null>
  play(sound: AudioSound, options?: AudioPlayOptions): AudioVoice | null
  stopVoice(voice: AudioVoice): boolean
  start(): boolean
  isStarted(): boolean
  dispose(): void
}

let audio: AudioEngine | null | undefined
const sounds = new Map<string, Promise<AudioSound | null>>()

function getAudio() {
  if (audio !== undefined) return audio
  try {
    const next = (OpenTuiCore as { Audio?: { create(options?: { autoStart?: boolean }): AudioEngine } }).Audio?.create({
      autoStart: false,
    })
    if (!next) {
      audio = null
      return null
    }
    next.on("error", (error: Error, context: AudioErrorContext) => {
      log.debug("tui audio error", { error, context })
    })
    audio = next
    return next
  } catch (error) {
    log.debug("failed to create tui audio", { error })
    audio = null
    return null
  }
}

export function loadSoundFile(file: string) {
  const current = getAudio()
  if (!current) return Promise.resolve(null)
  const cached = sounds.get(file)
  if (cached) return cached
  const task = current.loadSoundFile(file).catch((error) => {
    log.debug("failed to load tui sound", { file, error })
    return null
  })
  sounds.set(file, task)
  return task
}

export function play(sound: AudioSound, options?: AudioPlayOptions) {
  const current = getAudio()
  if (!current) return null
  if (!current.isStarted() && !current.start()) return null
  return current.play(sound, options)
}

export function stopVoice(voice: AudioVoice) {
  return audio?.stopVoice(voice) ?? false
}

export function dispose() {
  audio?.dispose()
  audio = undefined
  sounds.clear()
}

export * as TuiAudio from "./audio"
