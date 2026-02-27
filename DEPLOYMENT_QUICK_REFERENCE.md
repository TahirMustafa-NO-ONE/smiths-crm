# 🚀 Quick Deployment Reference Card

## Essential URLs
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Repository**: [Your GitHub Repo URL]

## Environment Variables Template

```env
# Copy this to Vercel Environment Variables
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.xxxxx.mongodb.net/smiths-crm?retryWrites=true&w=majority
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=[Generate with: openssl rand -base64 32]
NODE_ENV=production
```

## Deployment Steps (5 Minutes)

### 1️⃣ MongoDB Atlas (2 min)
- [ ] Create free cluster
- [ ] Create database user
- [ ] Whitelist IP: 0.0.0.0/0
- [ ] Copy connection string

### 2️⃣ GitHub (1 min)
- [ ] Push code to repository
- [ ] Verify all files committed

### 3️⃣ Vercel (2 min)
- [ ] Import GitHub repository
- [ ] Add environment variables
- [ ] Click Deploy
- [ ] Wait for build to complete

### 4️⃣ Post-Deploy
- [ ] Seed admin user
- [ ] Test login
- [ ] Change default password

## Generate Secrets

**NEXTAUTH_SECRET (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**NEXTAUTH_SECRET (Git Bash):**
```bash
openssl rand -base64 32
```

**Bcrypt Password Hash (Node):**
```bash
node -e "require('bcryptjs').hash('admin123', 10, (e,h) => console.log(h))"
```

## Default Admin Credentials
```
Email: admin@smithsagency.com
Password: admin123
```
⚠️ CHANGE IMMEDIATELY AFTER FIRST LOGIN!

## Common Issues Quick Fix

| Issue | Solution |
|-------|----------|
| Build failed | Check `pnpm build` locally first |
| DB connection error | Verify IP whitelist = 0.0.0.0/0 |
| NextAuth error | Ensure NEXTAUTH_URL matches deployment URL |
| 404 on routes | Redeploy after adding env vars |

## Quick Commands

```bash
# Test build locally
pnpm build

# Generate secret
openssl rand -base64 32

# Check MongoDB connection
node -e "require('mongoose').connect('YOUR_URI').then(() => console.log('OK'))"
```

## MongoDB Connection String Format

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

**Replace:**
- `USERNAME` → Your database username
- `PASSWORD` → Your database password
- `CLUSTER` → Your cluster address
- `DATABASE` → smiths-crm

## Vercel CLI (Optional)

```bash
# Install
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Emergency Rollback

1. Vercel Dashboard → Deployments
2. Find last working version
3. Click "..." → "Promote to Production"

---

**Full Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions

**Support**: 
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Next.js Docs: https://nextjs.org/docs
