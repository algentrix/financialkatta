import { deflateSync } from "node:zlib"
import { writeFileSync } from "node:fs"

const width = 1200
const height = 630

const font: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10001", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  ".": ["00000", "00000", "00000", "00000", "00000", "01100", "01100"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
}

function crc32(buffer: Buffer) {
  let crc = ~0
  for (const byte of buffer) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1
  }
  return ~crc >>> 0
}

function chunk(type: string, data: Buffer) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const name = Buffer.from(type)
  const checksum = Buffer.alloc(4)
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])))
  return Buffer.concat([length, name, data, checksum])
}

const pixels = Buffer.alloc(width * height * 3, 0)
function setPixel(x: number, y: number, color: [number, number, number]) {
  if (x < 0 || y < 0 || x >= width || y >= height) return
  const offset = (y * width + x) * 3
  pixels[offset] = color[0]
  pixels[offset + 1] = color[1]
  pixels[offset + 2] = color[2]
}

function fill(color: [number, number, number]) {
  for (let index = 0; index < pixels.length; index += 3) {
    pixels[index] = color[0]
    pixels[index + 1] = color[1]
    pixels[index + 2] = color[2]
  }
}

function rect(x: number, y: number, w: number, h: number, color: [number, number, number]) {
  for (let row = y; row < y + h; row += 1) {
    for (let col = x; col < x + w; col += 1) setPixel(col, row, color)
  }
}

function text(value: string, x: number, y: number, scale: number, color: [number, number, number]) {
  let cursor = x
  for (const character of value) {
    const glyph = font[character] ?? font[" "]
    glyph.forEach((row, rowIndex) => {
      ;[...row].forEach((cell, colIndex) => {
        if (cell === "1") rect(cursor + colIndex * scale, y + rowIndex * scale, scale, scale, color)
      })
    })
    cursor += 6 * scale
  }
}

const night: [number, number, number] = [30, 30, 30]
const sage: [number, number, number] = [103, 186, 148]
const slate: [number, number, number] = [106, 107, 128]
const paper: [number, number, number] = [255, 255, 255]

fill(night)
rect(72, 168, 150, 6, sage)
rect(72, 182, 64, 6, slate)
text("FINANCIALKATTA", 72, 230, 8, paper)
text("PUNE", 72, 320, 5, sage)
text("INVESTMENTS  INSURANCE  LOANS", 72, 430, 3, [242, 242, 242])

const raw = Buffer.alloc((width * 3 + 1) * height)
for (let y = 0; y < height; y += 1) {
  raw[y * (width * 3 + 1)] = 0
  pixels.copy(raw, y * (width * 3 + 1) + 1, y * width * 3, (y + 1) * width * 3)
}

const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(width, 0)
ihdr.writeUInt32BE(height, 4)
ihdr[8] = 8
ihdr[9] = 2
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw)),
  chunk("IEND", Buffer.alloc(0)),
])

writeFileSync(new URL("../public/og-image.png", import.meta.url), png)
console.log("Wrote Open Graph image.")
