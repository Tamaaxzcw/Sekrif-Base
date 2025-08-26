import config from "../config.js"

export async function messageHandler(m, sock, plugins) {
  try {
    if (!m.message) return
    let type = Object.keys(m.message)[0]
    let body = (m.message.conversation || 
                m.message[type]?.text || 
                m.message[type]?.caption || "").trim()

    if (!body.startsWith(config.prefix)) return
    let args = body.slice(config.prefix.length).split(/ +/)
    let command = args.shift().toLowerCase()

    let plugin = plugins.find(p => 
      p.command === command || (p.alias && p.alias.includes(command))
    )

    if (plugin) {
      await plugin.run(m, sock, config, args)
    }
  } catch (e) {
    console.error("Handler Error:", e)
  }
}
