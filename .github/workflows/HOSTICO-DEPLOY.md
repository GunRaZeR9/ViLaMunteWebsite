# Hostico cPanel Deployment via GitHub Actions

Reusable setup for deploying any static/Angular site to Hostico hosting using cPanel's Git Version Control.

---

## How it works

```
push to main
    → GitHub Action builds the app
    → force-pushes built files + .cpanel.yml to hostico-prod branch
        → cPanel pulls hostico-prod
            → rsync copies files to public_html
```

- `main` branch — source code only
- `hostico-prod` branch — built output only (no source), auto-managed by the Action

---

## First-time setup (per project)

### 1. Copy the workflow file

Copy `deploy-hostico.yml` into the new project at `.github/workflows/deploy-hostico.yml` and change these values:

| Placeholder | What to replace it with |
|---|---|
| `dist/vilamunte/browser/` | Your build output folder |
| `/home/vilamunte/public_html/` | Your cPanel username + deploy path |
| `npm run build -- --base-href=/` | Your build command |

### 2. Push to GitHub

```bash
git add .github/workflows/deploy-hostico.yml
git commit -m "ci: add Hostico deployment workflow"
git push
```

The Action runs immediately and creates the `hostico-prod` branch.

### 3. Add the repo to Hostico cPanel

In cPanel → Git Version Control → **Create**:

- **Clone URL**: your GitHub repo HTTPS URL  
  e.g. `https://github.com/GunRaZeR9/ViLaMunteWebsite.git`
- **Repository Path**: leave as suggested  
  e.g. `/home/dblwwjnj/repositories/RepoName`
- **Repository Name**: anything descriptive

Click **Create**. cPanel will clone `main` by default.

### 4. Switch to the hostico-prod branch on the server

Use cPanel Terminal (or SSH):

```bash
cd /home/dblwwjnj/repositories/RepoName
git fetch
git checkout hostico-prod
```

### 5. Deploy

Back in cPanel → Git Version Control → Manage → **Pull or Deploy** tab:

1. Click **Update from Remote** — pulls latest `hostico-prod`
2. Click **Deploy HEAD Commit** — runs the `.cpanel.yml` rsync into `public_html`

---

## Day-to-day usage

```
git push origin main  →  Action builds & updates hostico-prod automatically
```

Then in cPanel, click **Update from Remote** → **Deploy HEAD Commit**.

> You can also trigger a build manually from GitHub → Actions → "Deploy to Hostico" → **Run workflow**.

---

## Adapting the workflow for different project types

### Static HTML / plain PHP

```yaml
- name: Copy files to deploy folder
  run: |
    mkdir -p deploy
    rsync -a --exclude='.git' --exclude='.github' --exclude='deploy' . deploy/

- name: Add .cpanel.yml to deploy folder
  run: |
    cat > deploy/.cpanel.yml << 'EOF'
    ---
    deployment:
      tasks:
        - export DEPLOYPATH=/home/USERNAME/public_html/
        - /usr/bin/rsync -a --delete --exclude='.git' --exclude='.cpanel.yml' . $DEPLOYPATH/
    EOF
```

Then push `deploy/` to `hostico-prod` instead of a dist folder.

### Next.js / Vite / other frameworks

Replace the build step with whatever produces your output folder, then point the push step at that folder.

### Subdirectory deploy (not root domain)

Change the rsync DEPLOYPATH in `.cpanel.yml`:

```yaml
- export DEPLOYPATH=/home/dblwwjnj/public_html/myapp/
```

---

## .cpanel.yml reference

cPanel runs these tasks from the repository root after pulling. Available commands are standard Linux shell.

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/USERNAME/public_html/
    - /usr/bin/rsync -a --delete --exclude='.git' --exclude='.cpanel.yml' . $DEPLOYPATH/
```

- `-a` — archive mode (preserves permissions, symlinks, timestamps)
- `--delete` — removes files from `public_html` that no longer exist in the build (keeps it clean)
- `--exclude='.git'` — never expose git objects to the web
- `--exclude='.cpanel.yml'` — no need to serve the deploy config

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "system cannot deploy" in cPanel | `.cpanel.yml` is missing from `hostico-prod` — check the Action ran successfully |
| cPanel still shows `main` branch | Run `git fetch && git checkout hostico-prod` in the server repo directory |
| rsync not found | Replace `/usr/bin/rsync` with `/bin/cp -R . $DEPLOYPATH/` (won't delete old files) |
| Build fails in Action | Check Node version matches your local (`node -v`) and update `node-version` in the workflow |
| Old hashed JS/CSS files pile up | `--delete` flag on rsync removes them automatically — make sure it's present |
