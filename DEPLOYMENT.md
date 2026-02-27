<div align="center">

# 🚀 Production Deployment Guide
## Deploying Smith CRM to Vercel

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
<img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas"/>
<img src="https://img.shields.io/badge/Production_Ready-00C853?style=for-the-badge" alt="Production Ready"/>

**Complete step-by-step guide to deploy your CRM system to production**

---

</div>

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Step 1: Setup MongoDB Atlas](#-step-1-setup-mongodb-atlas)
- [Step 2: Prepare Your Repository](#-step-2-prepare-your-repository)
- [Step 3: Deploy to Vercel](#-step-3-deploy-to-vercel)
- [Step 4: Configure Environment Variables](#-step-4-configure-environment-variables)
- [Step 5: Post-Deployment Setup](#-step-5-post-deployment-setup)
- [Step 6: Custom Domain (Optional)](#-step-6-custom-domain-optional)
- [Troubleshooting](#-troubleshooting)
- [Production Checklist](#-production-checklist)

---

## ✅ Prerequisites

Before you begin, ensure you have:

- [ ] GitHub account with your code pushed
- [ ] Vercel account (free tier works fine) - [Sign up here](https://vercel.com/signup)
- [ ] MongoDB Atlas account (free tier available) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- [ ] Git installed locally
- [ ] Code committed and pushed to GitHub

---

## 🗄️ Step 1: Setup MongoDB Atlas

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email

### 1.2 Create a New Cluster

<details>
<summary><b>Click for detailed instructions</b> 👇</summary>

<br>

**1. Create New Project**
```
Dashboard → New Project → "Smith CRM Production"
```

**2. Build a Database**
- Click **"Build a Database"**
- Choose **FREE** tier (M0 Sandbox)
- Cloud Provider: **AWS** (recommended)
- Region: Choose closest to your users
- Cluster Name: `smiths-crm-prod`
- Click **"Create Cluster"**

**3. Create Database User**
```
Security → Database Access → Add New Database User

Username: smithcrm_admin
Password: [Generate a strong password - SAVE THIS!]
Database User Privileges: Read and write to any database
```

> 💡 **Important**: Save your username and password securely!

**4. Configure Network Access**
```
Security → Network Access → Add IP Address

Option 1 (Recommended for Vercel):
- Click "Allow Access from Anywhere"
- IP Address: 0.0.0.0/0
- Description: "Vercel Deployment"

⚠️ Note: This is safe with strong authentication
```

**5. Get Connection String**
```
Database → Connect → Connect your application

Driver: Node.js
Version: 4.1 or later

Copy the connection string:
mongodb+srv://<username>:<password>@smiths-crm-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Replace:**
- `<username>` with your database username
- `<password>` with your database password
- Add database name: `/smiths-crm` before the `?`

**Final format:**
```
mongodb+srv://smithcrm_admin:YourPassword@smiths-crm-prod.xxxxx.mongodb.net/smiths-crm?retryWrites=true&w=majority
```

</details>

---

## 📦 Step 2: Prepare Your Repository

### 2.1 Ensure Code is on GitHub

```bash
# Navigate to your project
cd "C:\idgaf\CRM system\smiths-crm"

# Check current status
git status

# Add all files
git add .

# Commit changes
git commit -m "Prepare for production deployment"

# Push to GitHub
git push origin master
```

### 2.2 Verify Required Files

Make sure these files exist:

- [x] `package.json` - Has all dependencies
- [x] `next.config.js` - Next.js configuration
- [x] `.gitignore` - Excludes `.env.local`, `node_modules`
- [x] `pnpm-lock.yaml` - Lock file present

### 2.3 Create `vercel.json` (Optional but Recommended)

Create this file in your project root:

```bash
New-Item -ItemType File -Path "vercel.json"
```

Add the following content:

```json
{
  "buildCommand": "pnpm install && pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "NEXTAUTH_URL": "@nextauth_url",
    "NEXTAUTH_SECRET": "@nextauth_secret"
  }
}
```

---

## 🚀 Step 3: Deploy to Vercel

### 3.1 Import Your Repository

<details open>
<summary><b>Deployment Steps</b> 👇</summary>

<br>

**1. Go to Vercel Dashboard**
- Visit [vercel.com](https://vercel.com)
- Click **"Add New..."** → **"Project"**

**2. Import Git Repository**
- Select **GitHub**
- Authorize Vercel to access your repositories
- Find and select your `smiths-crm` repository
- Click **"Import"**

**3. Configure Project**

```
Project Name: smiths-crm-production
Framework Preset: Next.js (auto-detected)
Root Directory: ./
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
```

**4. Add Environment Variables** (see Step 4 for details)

**5. Click "Deploy"**

⏳ **Deployment will take 2-3 minutes**

</details>

---

## 🔐 Step 4: Configure Environment Variables

### 4.1 In Vercel Dashboard

```
Project Settings → Environment Variables
```

Add the following variables:

<table>
<tr>
<th>Variable Name</th>
<th>Value</th>
<th>Environment</th>
</tr>
<tr>
<td><code>MONGODB_URI</code></td>
<td>Your MongoDB Atlas connection string</td>
<td>Production, Preview, Development</td>
</tr>
<tr>
<td><code>NEXTAUTH_URL</code></td>
<td><code>https://your-app.vercel.app</code></td>
<td>Production, Preview</td>
</tr>
<tr>
<td><code>NEXTAUTH_SECRET</code></td>
<td>Generate secure secret (see below)</td>
<td>Production, Preview, Development</td>
</tr>
<tr>
<td><code>NODE_ENV</code></td>
<td><code>production</code></td>
<td>Production</td>
</tr>
</table>

### 4.2 Generate NEXTAUTH_SECRET

**Option 1: Using OpenSSL (Git Bash on Windows)**
```bash
openssl rand -base64 32
```

**Option 2: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3: Using PowerShell**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Copy the output and use it as your `NEXTAUTH_SECRET`**

### 4.3 Environment Variables Example

```env
# MongoDB Database
MONGODB_URI=mongodb+srv://smithcrm_admin:YourSecurePassword@smiths-crm-prod.xxxxx.mongodb.net/smiths-crm?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=https://smiths-crm-production.vercel.app
NEXTAUTH_SECRET=your-generated-secret-key-here-32-chars-minimum

# Environment
NODE_ENV=production
```

> ⚠️ **Security Note**: Never commit these values to Git!

---

## 🎯 Step 5: Post-Deployment Setup

### 5.1 Verify Deployment

1. **Check Deployment Status**
   - Go to your Vercel dashboard
   - Verify deployment is **"Ready"**
   - Click **"Visit"** to open your app

2. **Test the Application**
   - Visit: `https://your-app.vercel.app`
   - You should see the login page

### 5.2 Seed Admin User

Since your app is deployed, seed the admin user:

**Option 1: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Run seed script
vercel env pull .env.local
node utils/seedAdmin.js
```

**Option 2: Create Admin via API (Recommended)**

Create a temporary API route or use MongoDB Compass:

1. **Connect to MongoDB Atlas with Compass**
   - Download [MongoDB Compass](https://www.mongodb.com/products/compass)
   - Use your connection string
   - Navigate to `smiths-crm` database → `users` collection

2. **Insert Admin User Document**

```javascript
// Hash password first using bcrypt
// Password: admin123
// Hashed: $2a$10$YourHashedPasswordHere

{
  "name": "Admin User",
  "email": "admin@smithsagency.com",
  "password": "$2a$10$rXXXXXXXXXXXXXXXXXXXX", // Use bcrypt to hash "admin123"
  "role": "admin",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

**Generate Hashed Password:**
```bash
# Create a quick script
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 10, (err, hash) => console.log(hash));"
```

**Option 3: Create a One-Time Setup Route**

Create `pages/api/setup.js`:

```javascript
import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  // IMPORTANT: Delete this file after first use!
  if (process.env.NODE_ENV !== "production" || req.method !== "POST") {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    await connectDB();
    
    const existingAdmin = await User.findOne({ email: "admin@smithsagency.com" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin User",
      email: "admin@smithsagency.com",
      password: hashedPassword,
      role: "admin",
    });

    res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

Access it once: `https://your-app.vercel.app/api/setup`  
**Then DELETE the file immediately!**

### 5.3 First Login

1. Visit your app: `https://your-app.vercel.app`
2. Login with:
   - **Email**: `admin@smithsagency.com`
   - **Password**: `admin123`
3. **Immediately change your password!**

### 5.4 Load Sample Data (Optional)

After logging in with admin:
1. Navigate to the home page
2. Click "Load Sample Data"
3. Verify clients, leads, projects appear

---

## 🌐 Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain

<details>
<summary><b>Setup Custom Domain</b> 👇</summary>

<br>

**1. In Vercel Dashboard**
```
Project → Settings → Domains
```

**2. Add Your Domain**
```
Enter domain: yourdomain.com
Click "Add"
```

**3. Configure DNS**

Vercel will show you DNS records to add:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**4. Update NEXTAUTH_URL**

After domain is verified:
```
NEXTAUTH_URL=https://yourdomain.com
```

Redeploy the application.

</details>

---

## 🔧 Troubleshooting

### Common Issues & Solutions

<details>
<summary><b>❌ Build Failed</b></summary>

**Symptoms**: Deployment fails during build

**Solutions**:
```bash
# 1. Check build locally first
pnpm build

# 2. Verify all dependencies are in package.json
pnpm install

# 3. Check Vercel build logs for specific errors

# 4. Ensure pnpm-lock.yaml is committed
git add pnpm-lock.yaml
git commit -m "Add lock file"
git push
```

</details>

<details>
<summary><b>❌ Database Connection Failed</b></summary>

**Symptoms**: "Cannot connect to database"

**Solutions**:
1. ✅ Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. ✅ Check connection string format is correct
3. ✅ Ensure database user has correct permissions
4. ✅ Verify password doesn't have special characters (URL encode if needed)
5. ✅ Test connection string locally:
   ```bash
   node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_CONNECTION_STRING').then(() => console.log('Connected!')).catch(err => console.error(err));"
   ```

</details>

<details>
<summary><b>❌ NextAuth Error</b></summary>

**Symptoms**: "NextAuth configuration error"

**Solutions**:
1. ✅ Verify `NEXTAUTH_URL` matches your deployment URL exactly
2. ✅ Ensure `NEXTAUTH_SECRET` is set and at least 32 characters
3. ✅ Check that environment variables are set for "Production"
4. ✅ After changing env vars, redeploy the application

</details>

<details>
<summary><b>❌ 404 on API Routes</b></summary>

**Symptoms**: API routes return 404

**Solutions**:
1. ✅ Verify file structure matches Next.js `pages/api/` convention
2. ✅ Check that files are properly exported
3. ✅ Ensure no build errors in Vercel logs
4. ✅ Test routes locally first: `pnpm dev`

</details>

<details>
<summary><b>❌ Environment Variables Not Working</b></summary>

**Symptoms**: App behaves differently than local

**Solutions**:
1. ✅ Verify all env vars are added in Vercel dashboard
2. ✅ Check correct environment is selected (Production/Preview/Development)
3. ✅ Redeploy after adding/changing environment variables
4. ✅ Check variable names match exactly (case-sensitive)

</details>

---

## ✅ Production Checklist

Before going live, ensure:

### Security
- [ ] Changed default admin password
- [ ] `NEXTAUTH_SECRET` is strong and unique
- [ ] Database password is strong
- [ ] Environment variables are not committed to Git
- [ ] Removed any test/debug API routes
- [ ] Deleted `pages/api/setup.js` if created

### Performance
- [ ] Tested application on multiple devices
- [ ] Verified all pages load correctly
- [ ] Checked database queries are optimized
- [ ] Tested with sample data

### Configuration
- [ ] All environment variables set correctly
- [ ] MongoDB Atlas cluster is running
- [ ] IP whitelist configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (Vercel provides automatically)

### Functionality
- [ ] Login/logout works
- [ ] All CRUD operations tested
- [ ] Dashboard displays correctly
- [ ] User permissions work as expected
- [ ] Forms submit properly

### Monitoring
- [ ] Set up Vercel notifications
- [ ] Monitor MongoDB Atlas metrics
- [ ] Check application logs regularly

---

## 📊 Monitoring Your Application

### Vercel Analytics

```
Project → Analytics
```
Monitor:
- Page views
- Performance metrics
- Error rates
- Traffic sources

### MongoDB Atlas Monitoring

```
Atlas Dashboard → Metrics
```
Monitor:
- Database connections
- Query performance
- Storage usage
- Network traffic

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin master

# Vercel automatically:
# 1. Detects the push
# 2. Runs build
# 3. Deploys to production
# 4. Sends notification
```

**Preview Deployments**: Every branch gets its own preview URL!

---

## 🚨 Emergency Rollback

If something goes wrong:

1. **Go to Vercel Dashboard**
2. **Deployments tab**
3. **Find last working deployment**
4. **Click "..." → "Promote to Production"**

Your app will instantly rollback! 🎉

---

## 📞 Getting Help

<table>
<tr>
<td align="center">

**Vercel Support**  
[vercel.com/support](https://vercel.com/support)

</td>
<td align="center">

**MongoDB Atlas**  
[mongodb.com/support](https://www.mongodb.com/support)

</td>
<td align="center">

**Next.js Docs**  
[nextjs.org/docs](https://nextjs.org/docs)

</td>
</tr>
</table>

---

## 🎉 Congratulations!

Your Smith CRM system is now live in production! 🚀

**Next Steps:**
1. Share the URL with your team
2. Monitor performance in Vercel + Atlas dashboards
3. Set up regular backups of your MongoDB data
4. Plan future features and improvements

<div align="center">

---

**Made with ❤️ by Smith Marketing Agency**

<sub>© 2026 Smith Marketing Agency. Production Deployment Guide v1.0</sub>

</div>
