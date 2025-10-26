#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get environment variables
const webWizardWebhook = process.env.WEB_WIZARD_WEBHOOK;
const digitalIdentityWebhook = process.env.DIGITAL_IDENTITY_WEBHOOK;

// Validate that environment variables are set
if (!webWizardWebhook || !digitalIdentityWebhook) {
    console.error('❌ Error: Missing required environment variables');
    console.error('Please set WEB_WIZARD_WEBHOOK and DIGITAL_IDENTITY_WEBHOOK');
    console.error('For local development, create a .env.local file');
    console.error('For Vercel deployment, set them in project settings');
    process.exit(1);
}

// Create the config content
const configContent = `// Configuration for Discord webhooks - Generated at build time
const CONFIG = {
    WEB_WIZARD_WEBHOOK: '${webWizardWebhook}',
    DIGITAL_IDENTITY_WEBHOOK: '${digitalIdentityWebhook}'
};

// Export configuration
window.DISCORD_CONFIG = CONFIG;`;

// Write the config file
fs.writeFileSync(path.join(__dirname, 'config.js'), configContent);

console.log('✅ Configuration file generated successfully');
console.log('🔗 Web Wizard Webhook configured');
console.log('🔗 Digital Identity Webhook configured');