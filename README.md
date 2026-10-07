# Wolvesey Chapter No. 6818

Official website prototype for Wolvesey Chapter No. 6818, Winchester, Hampshire.

## Cloudflare Workers deployment

This is an assets-only Cloudflare Worker. The Worker name in `wrangler.jsonc` is **wolvesey-chapter** and must match the existing Worker in Cloudflare. The public HTML is authored in the repository root `index.html`; the build command copies it to `dist/index.html`. Only `dist/` is published, keeping deployment tools and source-side files out of public assets.

### Configure automatic deployments (once)

1. Open **Cloudflare → Workers & Pages → wolvesey-chapter → Settings → Builds**.
2. Choose **Connect**, link GitHub, and select **legacyinteractive/wolvesey-chapter**.
3. Production branch: `main`; root directory: repository root (leave blank); build command: `npm run build`; deploy command: `npx wrangler deploy`.
4. Enable automatic production builds. Save and trigger a build (or push the next commit).
5. Check **Deployments / Builds** for a successful build and open the workers.dev URL attached to your own Worker. Only then attach a custom domain.

If the Worker was already linked to the repo, pushing this configuration commit should be sufficient to trigger a new build.

### Local development

Install Node 20+ and run:

```sh
npm install
npm run check
npm run build
npm run preview
```

For a manual production deploy with your Cloudflare credentials available, run `npm run deploy`.

### Important content notes

- Meetings are **indicative dates calculated** from the second-Wednesday meeting pattern. Check the summons for any changes, location, or time.
- **Members Area** is an explicitly disabled placeholder. Never publish private Chapter documents via the public static assets directory.
- The meeting image is a locally hosted user-supplied Chapter photograph. Other illustrative Winchester images are Wikimedia Commons references; confirm and replace these where appropriate before public launch.
- For a formal contact channel, replace the social-media links with the official Chapter Secretary contact information after approval.

### Deployment health check

After a successful deployment, open `/health.txt` on the Worker domain. A response of `ok: wolvesey-chapter` confirms the updated static assets are being served. This endpoint does not check external image hosts or private authentication.

## Homepage polish (October 2026)

Navigation and brand alignment, footer structure, privacy and accessibility pages, SEO metadata, sitemap, and favicon are included. The unrelated Cornwall regalia image has been removed and replaced with the user-supplied Chapter photograph. **The user-supplied higher-resolution black-and-white Wolvesey Chapter group photograph is now hosted as `assets/wolvesey-companion-bw.png` and included in the Cloudflare deployment**; social share URLs are not stable image URLs. The Workers development hostname is the current canonical URL: update canonical and sitemap together when the permanent domain is chosen.

The black-and-white Chapter photo uses `object-fit: contain` to prevent heads being cropped at different screen widths.

## Royal Arch branding

The source logo uploaded as `assets/royal-arch-logo.png` is actually SVG (XML), not PNG. Use `assets/royal-arch-logo.svg` everywhere; `favicon.svg` mirrors the same original uploaded vector without redraw. The Cloudflare build copies the SVG into its asset directory, and the verification workflow checks both copies stay identical.

## October demo polish

The public demo banner is consistent on the homepage, accessibility, and privacy pages. Typography and mobile navigation were refined without introducing a members login. GitHub CI checks the banner, mobile spacing, social preview image and absence of obsolete footer rules. Review third-party image availability, exact meeting details, and any required privacy wording before announcing a public launch.

## Visitor information and calendar reminders

The homepage now offers accessible visitor and Royal Arch joining information, grounded in UGLE and Provincial listings. The Winchester Masonic Centre address is identified as a directory-recorded venue, **not a substitute for the summons**. Indicative meeting dates can be saved as a date-only, transparent, tentative calendar file generated in the browser; no user information is sent or stored. Members-only content remains disabled.

## Batch 1 — quote & typography (2026-10-07)
- Replaced all visible references to the old quote with **“the finest chapter in the universe”**.
- Improved quote legibility, line breaks, responsive stacking, paragraph measures, contrast and headline spacing.
- Static regression assertions added; real-world iPad/iPhone visual sign-off is still required.

## Batch 2 — responsive, image, accessibility and SEO (2026-10-07)
- The menu converts to mobile before navigation links collide on narrow desktops/tablets (CSS and JS at 1220px).
- Hero title scales down on phones (including 320–360px), news and Royal Arch sections reflow on tablets, image presentation no longer artificially exaggerates portrait contrast, and arrows/footer text are clearer.
- Added `noindex, noarchive` **only while the concept/demo is unauthorised** to homepage, privacy and accessibility pages; this must be deliberately removed alongside demo banner when Chapter approves launch. Keep metadata, structured data, sitemap and canonical prepared but do not treat preview as a released public site.
- Automated source regression tests added. **Manual live Cloudflare, responsive device and external asset checks remain open in Linear.**

## Concept review preparation (2026-10-07)
- Hero watermark opacity increased only to 0.067.
- Public /review.html overview linked from all demo banners. Covers implemented features, provisional content, disabled Members Area, feedback process and production decisions.
- Review page remains noindex/noarchive and is included in build and CI.

## Reviewer audit (7 October 2026)
- GitHub CI now checks internal navigation, linked files, alternative text, ARIA references, duplicate IDs and external-link opener safety with scripts/audit-review.mjs.
- Review guide now has keyboard skip navigation. Privacy language clarifies third-party technical requests may still be processed; it does not collect feedback through a form.
- Static tests cannot replace manual responsive/mobile QA, remote link availability or production security review.
