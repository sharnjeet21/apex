# Discord File Uploader

A web application for uploading files to Discord channels via webhooks, designed for Web Wizard and Digital Identity competitions.

## Features

- **Two Competition Channels**: Web Wizard and Digital Identity
- **Dedicated Upload Pages**: Separate pages for each competition with specific rules
- **File Upload**: Support for multiple file uploads with size validation
- **Discord Integration**: Direct upload to Discord channels via webhooks
- **Responsive Design**: Works on desktop and mobile devices
- **Competition Rules**: Displays relevant rules on each upload page

## Competition Details

### Web Wizard
- Team-based website development competition
- 2 participants per team
- 90-minute time limit
- HTML, CSS, and optional JavaScript

### Digital Identity
- Individual logo design competition
- 60-minute time limit
- Various design tools supported
- 800x800 pixel logo requirement

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy automatically

## Local Development

To run locally:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## File Structure

```
├── index.html              # Home page with channel selection
├── web-wizard.html         # Web Wizard upload page
├── digital-identity.html   # Digital Identity upload page
├── style.css              # Shared styles
├── home.js                # Home page functionality
├── upload.js              # Upload page functionality
├── vercel.json            # Vercel configuration
└── package.json           # Project configuration
```

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Discord Webhooks API
- Vercel (deployment)