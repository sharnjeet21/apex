// Initialize webhook URLs from configuration
document.addEventListener('DOMContentLoaded', () => {
    // Wait for config to load
    if (typeof window.DISCORD_CONFIG !== 'undefined') {
        initializeWebhooks();
    } else {
        // Wait a bit for config.js to load
        setTimeout(initializeWebhooks, 100);
    }
});

function initializeWebhooks() {
    if (typeof window.DISCORD_CONFIG === 'undefined') {
        console.error('Discord configuration not loaded');
        return;
    }
    
    // Get webhook URLs from configuration
    const webWizardWebhook = window.DISCORD_CONFIG.WEB_WIZARD_WEBHOOK;
    const digitalIdentityWebhook = window.DISCORD_CONFIG.DIGITAL_IDENTITY_WEBHOOK;
    
    // Set webhooks in localStorage if not already saved
    if (!localStorage.getItem('webWizardWebhook')) {
        localStorage.setItem('webWizardWebhook', webWizardWebhook);
    }
    if (!localStorage.getItem('digitalIdentityWebhook')) {
        localStorage.setItem('digitalIdentityWebhook', digitalIdentityWebhook);
    }
}