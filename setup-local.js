#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 Local Development Setup');
console.log('This will create a .env.local file with your Discord webhooks');
console.log('⚠️  NEVER commit this file to GitHub!\n');

rl.question('Enter your Web Wizard webhook URL: ', (webWizardWebhook) => {
    rl.question('Enter your Digital Identity webhook URL: ', (digitalIdentityWebhook) => {
        
        const envContent = `# Discord Webhook URLs for local development
# DO NOT COMMIT THIS FILE TO GITHUB!
WEB_WIZARD_WEBHOOK=${webWizardWebhook}
DIGITAL_IDENTITY_WEBHOOK=${digitalIdentityWebhook}
`;

        fs.writeFileSync('.env.local', envContent);
        
        console.log('\n✅ .env.local file created successfully!');
        console.log('🚀 You can now run: npm run dev');
        console.log('⚠️  Remember: NEVER commit .env.local to GitHub');
        
        rl.close();
    });
});