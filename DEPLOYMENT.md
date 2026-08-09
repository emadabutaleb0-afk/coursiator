# Coursiator Deployment Guide

This guide provides instructions for deploying the Coursiator platform to production.

## Pre-Deployment Checklist

Before deploying, ensure the following:

**Code Quality**
- All TypeScript errors resolved (`pnpm check` passes)
- Code formatted (`pnpm format`)
- No console warnings or errors
- All pages tested in browser

**Performance**
- Images optimized and compressed
- Bundle size acceptable
- Lighthouse score above 80
- Load time under 3 seconds

**Security**
- Environment variables configured
- No sensitive data in code
- HTTPS enabled
- Security headers configured

**Content**
- All text proofread
- Images have alt text
- Links verified
- Metadata complete

**Responsive Design**
- Mobile (320px) - Tested
- Tablet (768px) - Tested
- Desktop (1024px) - Tested
- Large screens (1280px) - Tested

## Building for Production

```bash
# Install dependencies
pnpm install

# Run type checking
pnpm check

# Format code
pnpm format

# Build production bundle
pnpm build

# Preview production build locally
pnpm preview
```

## Deployment Options

### Option 1: Manus Hosting (Recommended)

Coursiator is built with Manus and includes built-in hosting with custom domain support.

**Steps:**
1. Click the "Publish" button in the Management UI
2. Create a checkpoint (if not already created)
3. Configure custom domain in Settings → Domains
4. Publish to production

**Benefits:**
- One-click deployment
- Automatic SSL/TLS
- Custom domains
- Analytics included
- No DevOps required

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add VITE_APP_TITLE
vercel env add VITE_ANALYTICS_ENDPOINT
```

### Option 3: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Configure in netlify.toml
```

### Option 4: Docker

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

```bash
# Build image
docker build -t coursiator:latest .

# Run container
docker run -p 3000:3000 coursiator:latest
```

## Environment Configuration

Create a `.env.production` file with production values:

```env
VITE_APP_TITLE=Coursiator
VITE_APP_LOGO=/logo.svg
VITE_ANALYTICS_ENDPOINT=https://analytics.production.com
VITE_ANALYTICS_WEBSITE_ID=prod_website_id
NODE_ENV=production
```

## Performance Optimization

### Image Optimization

Ensure all images in `client/public/images/` are optimized:

```bash
# Using ImageOptim or similar tools
# Recommended: WebP format with JPEG fallback
```

### CSS Optimization

Tailwind CSS automatically purges unused styles in production.

### JavaScript Optimization

The build process automatically:
- Minifies code
- Tree-shakes unused imports
- Splits code by route
- Generates source maps

## Monitoring

### Analytics

The platform includes built-in analytics tracking via the `VITE_ANALYTICS_ENDPOINT`.

### Error Tracking

Implement error tracking service:

```typescript
// Add to App.tsx
window.addEventListener('error', (event) => {
  // Send to error tracking service
});
```

### Performance Monitoring

Monitor Core Web Vitals:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## Security Headers

Configure these headers in your hosting provider:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## SSL/TLS Certificate

Ensure HTTPS is enabled:
- Manus: Automatic
- Vercel: Automatic
- Netlify: Automatic
- Self-hosted: Use Let's Encrypt

## Backup Strategy

Implement regular backups:
- Database backups (if applicable)
- Code repository backups
- User data backups

## Rollback Procedure

If issues occur after deployment:

1. **Immediate Rollback**
   - Manus: Use checkpoint rollback in Management UI
   - Vercel: Redeploy previous version
   - Netlify: Deploy previous build

2. **Investigate Issues**
   - Check error logs
   - Review recent changes
   - Test in staging environment

3. **Fix and Redeploy**
   - Make necessary fixes
   - Test thoroughly
   - Deploy to production

## Post-Deployment

### Verification

After deployment, verify:
- Homepage loads correctly
- Navigation works
- Forms submit properly
- Images display
- Analytics tracking works
- Mobile responsive

### Monitoring

Set up monitoring for:
- Uptime (99.9% target)
- Response time (< 2 seconds)
- Error rate (< 0.1%)
- User engagement

### Maintenance

Regular maintenance tasks:
- Update dependencies monthly
- Review security advisories
- Monitor performance metrics
- Backup user data
- Review analytics

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf dist node_modules
pnpm install
pnpm build
```

### Deployment Fails

- Check environment variables
- Verify file permissions
- Review deployment logs
- Check disk space

### Performance Issues

- Enable caching headers
- Optimize images
- Minimize CSS/JS
- Use CDN for static assets

## Support

For deployment issues:
- Check deployment provider documentation
- Review error logs
- Contact support team
- Check GitHub issues

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2025 | Initial production release |

---

**Last Updated**: December 2025  
**Status**: Production Ready ✅
