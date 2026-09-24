import { h } from "preact"

/**
 * The site header: wordmark plus minimal editorial navigation.
 *
 *   options:
 *     brand: "Indic Knowledge"
 *     links:
 *       Discover: "/"
 *       About: "/about"
 *
 * Links are listed in config so the site never ships a nav item whose
 * destination does not exist yet; an empty map renders no nav.
 *
 * The wordmark is a link inside a banner, not a heading. Quartz's page-title
 * component emits an <h2>, which would otherwise sit above the page's own
 * <h1> and break the heading order.
 *
 * Root-relative hrefs ("/about") are rewritten to page-relative paths so they
 * survive the GitHub Pages sub-path deploy and local preview alike.
 */
const css = `
.site-head { display: contents; }
.site-brand {
  display: inline-flex;
  align-items: center;
  gap: var(--ik-s3, 0.75rem);
  font-family: var(--ik-serif, var(--bodyFont));
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: var(--ik-ink, var(--dark));
  text-decoration: none;
  background: none;
  white-space: nowrap;
}
.site-brand::before {
  content: "";
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--ik-copper, var(--tertiary));
  flex: none;
}
.site-nav { display: flex; align-items: baseline; gap: var(--ik-s5, 1.5rem); flex-wrap: wrap; }
.site-nav a {
  font-family: var(--ik-sans, sans-serif);
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--ik-ink-muted, var(--gray));
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  white-space: nowrap;
  background: none;
}
.site-nav a:hover,
.site-nav a[aria-current="page"] {
  color: var(--ik-ink, var(--dark));
  border-bottom-color: var(--ik-copper, var(--secondary));
}
`

/** "entries/foo" -> "../", "index" -> "./" */
const pathToRoot = (slug) => {
  const parts = String(slug ?? "").split("/").filter((p) => p.length > 0)
  const depth = Math.max(parts.length - 1, 0)
  return depth === 0 ? "./" : "../".repeat(depth)
}

const normalise = (slug) => {
  const s = String(slug ?? "").replace(/\/$/, "")
  return s === "" || s === "index" ? "index" : s
}

export const SiteNav = (opts) => {
  const links = (opts && opts.links) || {}
  const brand = opts && opts.brand

  const Component = ({ fileData, cfg }) => {
    const slug = fileData?.slug ?? ""
    const root = pathToRoot(slug)
    const here = normalise(slug)

    const resolve = (url) => {
      if (!url.startsWith("/")) return url
      const target = url.slice(1)
      return root + (target === "" ? "" : target)
    }
    const targetSlug = (url) => (url.startsWith("/") ? normalise(url.slice(1)) : null)

    const label = brand ?? cfg?.pageTitle ?? "Home"
    const entries = Object.entries(links)

    return h("div", { class: "site-head" }, [
      h("a", { class: "site-brand", href: root, key: "brand" }, label),
      entries.length === 0
        ? null
        : h(
            "nav",
            { class: "site-nav", "aria-label": "Primary", key: "nav" },
            entries.map(([text, url]) =>
              h(
                "a",
                {
                  href: resolve(url),
                  key: text,
                  ...(targetSlug(url) === here ? { "aria-current": "page" } : {}),
                },
                text,
              ),
            ),
          ),
    ])
  }

  Component.css = css
  return Component
}

export default SiteNav
