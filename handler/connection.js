import makeWASocket, { useMultiFileAuthState, Browsers } from "@adiwajshing/baileys"
import pino from "pino"
import config from "../config.js"

export async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState(config.session)

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !config.pairing,
    auth: state,
    browser: Browsers.macOS("Safari")
  })

  // Pairing code (no QR)
  if (config.pairing && !sock.authState.creds.registered) {
    let code = await sock.requestPairingCode(config.nomerbot)
    console.log(`Your Pairing Code: ${code}`)
  }

  sock.ev.on("creds.update", saveCreds)
  return sock
}
