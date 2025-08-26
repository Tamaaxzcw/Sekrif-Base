import fs from "fs"
import path from "path"
import config from "../config.js"

export async function loadPlugins() {
  let plugins = []
  let files = fs.readdirSync(config.plugins).filter(f => f.endsWith(".js"))
  for (let file of files) {
    let plugin = (await import(path.resolve(config.plugins, file))).default
    plugins.push(plugin)
  }
  return plugins
}
