interface Window {
  turnstile?: {
    render: (container: HTMLElement, options: TurnstileOptions) => string
    reset: (widgetId?: string) => void
    remove: (widgetId: string) => void
  }
}

interface TurnstileOptions {
  sitekey: string
  callback?: (token: string) => void
  "error-callback"?: () => void
  "expired-callback"?: () => void
  theme?: "light" | "dark" | "auto"
  size?: "normal" | "compact"
  tabindex?: number
  appearance?: "always" | "execute" | "interaction-only"
}
