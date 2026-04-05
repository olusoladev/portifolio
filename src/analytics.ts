type EventParams = Record<string, string | number | boolean>;
type GtagCommand = "js" | "config" | "event";
type Gtag = (command: GtagCommand, target: string | Date, params?: EventParams | { send_page_view: boolean }) => void;

declare global {
  interface Window {
    __gaInitialized?: boolean;
    dataLayer: unknown[];
    gtag?: Gtag;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const scriptId = "ga4-script";
console.log(measurementId)

function hasAnalytics(): boolean {
  return typeof measurementId === "string" && measurementId.trim().length > 0;
}

function ensureGtag(): Gtag | null {
  if (typeof window === "undefined") {
    return null;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  return window.gtag;
}

export function initAnalytics(): void {
  if (!hasAnalytics() || typeof document === "undefined") {
    return;
  }

  const gtag = ensureGtag();

  if (!gtag) {
    return;
  }

  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  if (window.__gaInitialized) {
    return;
  }

  gtag("js", new Date());
  gtag("config", measurementId as string, { send_page_view: false });
  window.__gaInitialized = true;
}

export function trackPageView(pagePath = window.location.pathname + window.location.hash): void {
  if (!hasAnalytics() || typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const gtag = ensureGtag();

  if (!gtag) {
    return;
  }

  gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath,
  });
}

export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (!hasAnalytics() || typeof window === "undefined") {
    return;
  }

  const gtag = ensureGtag();

  if (!gtag) {
    return;
  }

  gtag("event", eventName, params);
}
