# ATLAS ONE — Personal Learning Engine

A static, mobile-friendly adaptive-practice MVP. Designed to live at `https://ialatlas.com/atlas-one/` alongside the existing IAL ATLAS site.

## Included
- Responsive landing page and learning dashboard
- Topic-based quiz engine with worked explanations
- Rule-based next-step recommendations
- Topic-level mastery estimates based on latest recorded answer per question
- Local progress saved in the user's browser
- No server, account, API key, or build process required

## Publish under your existing custom domain
1. Download and extract the `atlas-one` folder.
2. Open your existing GitHub Pages repository for IAL ATLAS.
3. Upload the **entire `atlas-one` folder** into the repository root, keeping the four files together:
   - `atlas-one/index.html`
   - `atlas-one/styles.css`
   - `atlas-one/app.js`
   - `atlas-one/favicon.svg`
4. Commit to the branch/folder currently used by GitHub Pages.
5. Wait for the Pages deployment to finish.
6. Open `https://ialatlas.com/atlas-one/`.

Do **not** replace the root `index.html` if you want to keep the existing IAL ATLAS homepage. This folder is intentionally separate. The canonical URL is already set to `https://ialatlas.com/atlas-one/`; if you decide to publish it at a different path, update that canonical URL.

## What is and is not implemented
This is a working static MVP, not a cloud-backed multi-user service:
- Progress is stored only in the current browser on the current device.
- The mastery score is a simple practice-accuracy estimate, not a psychometrically validated ability score.
- The recommendations use transparent rules, not AI.
- There is no user account, cross-device sync, teacher dashboard, payment system, or server-side analytics.
- Question bank is a starter set and needs expert review before high-stakes use.

## Before a wider launch
- Test on mobile and desktop.
- Check every question and explanation with a subject expert.
- Add a privacy notice before adding analytics/accounts.
- If adding AI, put API calls behind a server or serverless function and never expose a secret API key in browser JavaScript.
- Consider adding a separate backend for secure accounts and cross-device progress.
- Ensure all educational content is original or used with appropriate permission.

## Reset progress
The Reset progress button clears local progress after confirmation. Each question's latest answer is used for the topic accuracy estimate; attempts are counted internally but not shown as total answered.
