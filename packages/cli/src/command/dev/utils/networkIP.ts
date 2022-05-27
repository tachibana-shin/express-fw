import { networkInterfaces } from "os"

export default function getIPAddress() {
  for (const iface of Object.values(networkInterfaces())) {
    if (!iface) continue
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      )
        return alias.address
    }
  }
  return "0.0.0.0"
}