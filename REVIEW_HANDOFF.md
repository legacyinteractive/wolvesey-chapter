# Wolvesey Chapter No. 6818 — Website concept handoff
*Prepared by Legacy Interactive · 7 October 2026 · Review-only demo, not production approval*

## Links to share
- **Website concept:** https://wolvesey-chapter.jack-576.workers.dev/
- **Reviewer's overview:** https://wolvesey-chapter.jack-576.workers.dev/review.html
- **Deployment health:** https://wolvesey-chapter.jack-576.workers.dev/health.txt
- **Live build revision:** https://wolvesey-chapter.jack-576.workers.dev/revision.txt

The review page is accessible from the visible **Website demo — concept only** notice.

## What is already in the demonstration
- Royal Arch red / charcoal / white brand, supplied official Chapter logo, and supplied monochrome group photograph.
- Responsive public homepage, information about Royal Arch and the Chapter, meeting pattern, joining/visiting FAQ, social-profile links, and tentative calendar reminders.
- Clear non-functional Members Area preview (no login and no private data published).
- Privacy and accessibility pages, SEO metadata and social image, robots and sitemap. All pages remain **noindex/noarchive** while in concept.
- Credited website designer: Legacy Interactive.

## QA evidence verified in GitHub
- Source validation tests and static Cloudflare build passed on 7 October 2026.
- Dedicated audit confirmed **4 public HTML pages, 75 links and 8 images**, including in-site anchors, page targets, image alternatives, local files, duplicate IDs, ARIA references and opener-safety checks.
- Hero Chapter watermark carefully increased to 6.7% opacity.
- Review page includes accessible skip link.
- Final pipeline also generates **revision.txt** from the Git commit, so anyone with the public site can compare the actual deployed version to GitHub.
- Build tests verify public files and the exact Git revision in the generated static assets.
- The existing screenshots provided during development show a functioning earlier deployed website.

## Not yet verified / launch blockers
1. **Active Cloudflare deployment**: external checking couldn't access the workers.dev hostname. A successful GitHub run does **not** establish that the current source is deployed. Open /health.txt and /revision.txt from a normal browser and confirm latest GitHub commit matches.
2. **Manual responsive & accessibility QA**: verify on an actual iPhone, iPad and desktop in Safari/Chrome with keyboard-only navigation and, where possible, VoiceOver.
3. **Content approval**: confirm Chapter history, names, current venue and summons, joining/visiting contact path, privacy statements, external sources and image permissions/consent.
4. **Functionality**: the Members Area is intentionally non-functional. Authentication, storage, documents, role permissions and data protection require separate specification.
5. **Production controls**: permanent domain, final canonical and sitemap, removing the demo notice/noindex **only after approval**, monitoring, incident support, backups where applicable and an ongoing content owner.

## Suggested decision
The recipient is being asked **whether the concept should progress to production planning**, not to approve immediate public launch. Useful answers:
- Proceed to a detailed production scope and content approval.
- Proceed with design/content changes (please identify them).
- Do not proceed at this stage.

## Recommended reviewer checks
- Visit home and review information links, zoom to 200%, and inspect mobile/tablet.
- Confirm the colour identity, chapter logo, headings (including “the finest chapter in the universe”) and group photograph.
- Use the menu, FAQ, meeting calendar download, social links and Members Area placeholder.
- Reply to the person sharing the demo with changes, questions and a go/no-go decision.

## Project tracking
Linear project: https://linear.app/legacy-interactive/project/wolvesey-chapter-no-6818-website-6782538af379

QA issues: LEG-165 (responsive/accessibility) and LEG-166 (Cloudflare/SEO); approval: LEG-167.
