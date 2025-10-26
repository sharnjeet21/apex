# 🚀 GNE's APEX 2025 - Deployment Guide

## 📋 Environment Variables Setup

### For Vercel Deployment:

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings > Environment Variables**
3. **Add the following environment variables:**

```
WEB_WIZARD_WEBHOOK=https://discord.com/api/webhooks/1431683271741276230/cxhBVMTrCP9jm9MuN4C8dfilBbigXD-ufJH1XOrSixuAgNqmXckzIaR3ZMdBcSy_wSS6

DIGITAL_IDENTITY_WEBHOOK=https://discord.com/api/webhooks/1431683490985803908/RVkQyunR8S5Opmk0zMQ4uT0Zj6u2o-P7xwjMCKkqaMkcQPLSOl6vzC2-tvPvD-wwfMZF
```

## 🔒 Security Notes

### ⚠️ IMPORTANT SECURITY WARNINGS:

1. **NEVER commit .env files to GitHub** - They contain sensitive webhook URLs
2. **The .env files are gitignored** - They won't be pushed to your repository
3. **Use Vercel environment variables** for production deployment
4. **Regenerate webhooks if compromised** - Create new ones in Discord if exposed

## 🌐 Deployment Steps

### 1. GitHub Repository Setup:
```bash
git add .
git commit -m "Final deployment - GNE's APEX 2025"
git push origin main
```

### 2. Vercel Deployment:
- Import your GitHub repository to Vercel
- Add environment variables in Vercel dashboard
- Deploy automatically

### 3. Domain Configuration (Optional):
- Add custom domain in Vercel settings
- Configure DNS records if using custom domain

## 🎯 Competition Channels

### Web Wizards Channel:
- **Purpose:** Team website development submissions
- **Webhook ID:** 1431683271741276230
- **File Types:** ZIP, HTML, CSS, JS files

### Digital Identity Channel:
- **Purpose:** Individual logo design submissions  
- **Webhook ID:** 1431683490985803908
- **File Types:** PNG, JPG, SVG, PSD, AI files

## 🔧 Local Development

### Setup:
```bash
# Copy environment template
cp .env.example .env.local

# Add your webhook URLs to .env.local
# Run development server
npm run dev
```

## 📱 Features Deployed

- ✅ Liquid glass UI with animations
- ✅ Mobile-responsive design
- ✅ Secure file upload to Discord
- ✅ Competition rules and topics
- ✅ Real-time status feedback
- ✅ Professional state-level design

## 🆘 Troubleshooting

### If webhooks stop working:
1. Check Discord server permissions
2. Regenerate webhook URLs in Discord
3. Update environment variables in Vercel
4. Redeploy the application

### If uploads fail:
1. Check file size limits (25MB max)
2. Verify webhook URLs are correct
3. Check Discord server status
4. Ensure proper file formats

---

**🏆 GNE's APEX 2025 - State Level Technical Competition**
*Secure • Professional • Ready for Production*