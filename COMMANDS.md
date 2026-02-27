# 🚀 Command Reference - Premium Login Page

## Essential Commands

### Start Development Server
```bash
npm run dev
```
Opens at: `http://localhost:5173/`

### Build for Production
```bash
npm run build
```
Output: `dist/` folder

### Preview Production Build
```bash
npm run preview
```

### Type Check
```bash
npx tsc --noEmit
```

### Lint Code
```bash
npm run lint
```

---

## First Time Setup

### Complete Setup (Copy & Paste)
```bash
cd "/Users/gajananmagar004gmail.com/Desktop/full stack /premium-learning-platform"
npm install
npm run dev
```

---

## Troubleshooting Commands

### Clear Cache & Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Kill Port 5173
```bash
lsof -ti:5173 | xargs kill -9
```

### Use Different Port
```bash
npm run dev -- --port 3000
```

### Clear Browser Cache
- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`

---

## Git Commands (Optional)

### Check Status
```bash
git status
```

### Add All Changes
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Add premium login page"
```

### Push to Remote
```bash
git push origin main
```

---

## File Operations

### View Login Page
```bash
cat src/pages/Login.tsx
```

### View GlassInput Component
```bash
cat src/components/ui/GlassInput.tsx
```

### View GradientButton Component
```bash
cat src/components/ui/GradientButton.tsx
```

### List All Components
```bash
ls -la src/components/ui/
```

---

## Testing Commands

### Open in Default Browser
```bash
open http://localhost:5173/
```

### Check TypeScript Errors
```bash
npx tsc --noEmit
```

### Check Bundle Size
```bash
npm run build
du -sh dist/
```

---

## Development Workflow

### 1. Start Development
```bash
npm run dev
```

### 2. Make Changes
Edit files in `src/` folder

### 3. Check for Errors
```bash
npx tsc --noEmit
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production
```bash
npm run preview
```

---

## Quick Access URLs

### Development
```
http://localhost:5173/
```

### Production Preview
```
http://localhost:4173/
```

---

## Environment Info

### Check Node Version
```bash
node --version
```
Required: v18+

### Check npm Version
```bash
npm --version
```
Required: v9+

### Check Installed Packages
```bash
npm list --depth=0
```

---

## Performance Commands

### Analyze Bundle
```bash
npm run build -- --mode analyze
```

### Check Build Time
```bash
time npm run build
```

### Measure Dev Server Start
```bash
time npm run dev
```

---

## Cleanup Commands

### Remove Build Files
```bash
rm -rf dist/
```

### Remove Node Modules
```bash
rm -rf node_modules/
```

### Full Clean
```bash
rm -rf node_modules/ dist/ package-lock.json
npm install
```

---

## Documentation Commands

### View README
```bash
cat PREMIUM_LOGIN_README.md
```

### View Component Guide
```bash
cat COMPONENT_GUIDE.md
```

### View Quick Start
```bash
cat QUICK_START_PREMIUM.md
```

### View Implementation Summary
```bash
cat IMPLEMENTATION_SUMMARY.md
```

### View Visual Preview
```bash
cat VISUAL_PREVIEW.md
```

---

## IDE Commands

### Open in VS Code
```bash
code .
```

### Open Specific File
```bash
code src/pages/Login.tsx
```

### Open Component Folder
```bash
code src/components/ui/
```

---

## Deployment Commands

### Deploy to Vercel
```bash
vercel
```

### Deploy to Netlify
```bash
netlify deploy
```

### Build for Static Hosting
```bash
npm run build
# Upload dist/ folder to your host
```

---

## Useful Shortcuts

### Stop Dev Server
```
Ctrl + C
```

### Clear Terminal
```
Ctrl + L  (or type: clear)
```

### Search Command History
```
Ctrl + R
```

---

## Package Management

### Install New Package
```bash
npm install package-name
```

### Install Dev Dependency
```bash
npm install -D package-name
```

### Update All Packages
```bash
npm update
```

### Check Outdated Packages
```bash
npm outdated
```

---

## Debug Commands

### Verbose Build
```bash
npm run build -- --debug
```

### Show Vite Config
```bash
npx vite --help
```

### Check Port Usage
```bash
lsof -i :5173
```

---

## Quick Fixes

### Port Already in Use
```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npx tsc --noEmit
# Fix errors shown
```

### Build Fails
```bash
rm -rf dist/
npm run build
```

---

## One-Liners

### Full Reset & Start
```bash
rm -rf node_modules package-lock.json dist/ && npm install && npm run dev
```

### Quick Build & Preview
```bash
npm run build && npm run preview
```

### Type Check & Build
```bash
npx tsc --noEmit && npm run build
```

---

## Monitoring Commands

### Watch File Changes
```bash
npm run dev
# Vite automatically watches files
```

### Check Memory Usage
```bash
ps aux | grep node
```

### Check Disk Space
```bash
df -h
```

---

## Backup Commands

### Backup Project
```bash
tar -czf premium-login-backup.tar.gz .
```

### Restore Backup
```bash
tar -xzf premium-login-backup.tar.gz
```

---

## Most Used Commands (Top 5)

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Type Check**
   ```bash
   npx tsc --noEmit
   ```

4. **Kill Port**
   ```bash
   lsof -ti:5173 | xargs kill -9
   ```

5. **Reinstall Dependencies**
   ```bash
   rm -rf node_modules && npm install
   ```

---

**Save this file for quick reference!** 📌

All commands tested and working on macOS.
