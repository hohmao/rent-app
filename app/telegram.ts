export function initTelegram() {
  if (typeof window !== "undefined") {
    const tg = (window as any).Telegram?.WebApp

    if (tg) {
      tg.ready()
      tg.expand()
    }
  }
}