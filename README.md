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
- Current hero and supporting images are external Wikimedia Commons references; replace these with approved, locally stored Chapter imagery before public launch.
- For a formal contact channel, replace the social-media links with the official Chapter Secretary contact information after approval.

### Deployment health check

After a successful deployment, open `/health.txt` on the Worker domain. A response of `ok: wolvesey-chapter` confirms the updated static assets are being served. This endpoint does not check external image hosts or private authentication.
