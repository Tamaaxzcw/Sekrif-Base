export default {
  command: "menu",
  alias: ["help"],
  tags: "general",
  async run(m, sock, config) {
    let text = `
「 ${config.namebot} 」

👑 Owner : ${config.nameowner}
📱 Nomer : ${config.nomerbot}
🔧 Mode  : ${config.mode}

> Command Utama:
- .menu
- .ping
- .owner
    `
    await sock.sendMessage(m.chat, { text }, { quoted: m })
  }
}
