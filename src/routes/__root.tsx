import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-600.css";
import "@fontsource/fraunces/latin-500.css";
import "@fontsource/fraunces/latin-600.css";
import "@fontsource/fraunces/latin-500-italic.css";
import "@fontsource/fraunces/latin-600-italic.css";
import "@fontsource/audiowide/latin-400.css";
import appCss from "../styles.css?url";

const APP_NAME = "Asmara Web Design";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Asmara Web Design builds websites for small businesses in Metro Atlanta and fixes what breaks in them. Web development and technical support since 2020.",
      },
      { name: "theme-color", content: "#0a6b64" },
      { property: "og:title", content: APP_NAME },
      {
        property: "og:description",
        content:
          "Asmara Web Design builds websites for small businesses in Metro Atlanta and fixes what breaks in them.",
      },
      { property: "og:image", content: "https://asmaraweb.netlify.app/og.jpg?v=ivory" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:image", content: "https://asmaraweb.netlify.app/og.jpg?v=ivory" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png?v=ivory" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
