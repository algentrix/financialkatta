export type VideoItem = {
  id: string
  title: string
  description: string
  /** 11-character YouTube id. The embed uses youtube-nocookie. */
  youtubeId: string
}

export const videos: VideoItem[] = []

export function isYoutubeId(value: string) {
  return /^[a-zA-Z0-9_-]{11}$/.test(value)
}
