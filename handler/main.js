import { connect } from "./connection.js"
import { loadPlugins } from "./pluginLoader.js"
import { messageHandler } from "./handler.js"

let sock = await connect()
let plugins = await loadPlugins()

sock.ev.on("messages.upsert", async ({ messages }) => {
  let m = messages[0]
  if (!m.message) return
  m.chat = m.key.remoteJid
  m.sender = m.key.participant || m.key.remoteJid
  await messageHandler(m, sock, plugins)
})
