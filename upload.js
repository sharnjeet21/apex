class DiscordUploader {
    constructor() {
        this.fileInput = document.getElementById('fileInput');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.status = document.getElementById('status');
        this.fileList = document.getElementById('fileList');
        this.messageText = document.getElementById('messageText');
        
        // Get channel type from window variable set in HTML
        this.channelType = window.channelType;
        this.channelName = window.channelName;
        
        this.initEventListeners();
        this.checkWebhookConfiguration();
    }

    initEventListeners() {
        this.fileInput.addEventListener('change', () => this.displaySelectedFiles());
        this.uploadBtn.addEventListener('click', () => this.uploadFiles());
    }

    checkWebhookConfiguration() {
        const webhookUrl = this.getWebhookUrl();
        if (!webhookUrl) {
            this.showStatus(`Please configure the ${this.channelName} webhook URL on the home page first.`, 'error');
            this.uploadBtn.disabled = true;
        }
    }

    getWebhookUrl() {
        const storageKey = this.channelType === 'webWizard' ? 'webWizardWebhook' : 'digitalIdentityWebhook';
        return localStorage.getItem(storageKey);
    }

    displaySelectedFiles() {
        const files = Array.from(this.fileInput.files);
        
        if (files.length === 0) {
            this.fileList.innerHTML = '';
            return;
        }

        const fileListHTML = files.map(file => `
            <div class="file-item">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${this.formatFileSize(file.size)}</span>
            </div>
        `).join('');

        this.fileList.innerHTML = `
            <h3>Selected Files (${files.length}):</h3>
            ${fileListHTML}
        `;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getSelectedWebhookUrl() {
        return this.getWebhookUrl();
    }

    showStatus(message, type) {
        this.status.textContent = message;
        this.status.className = `status ${type}`;
    }

    async uploadFiles() {
        const files = Array.from(this.fileInput.files);
        const webhookUrl = this.getSelectedWebhookUrl();
        const message = this.messageText.value.trim();

        // Validation
        if (files.length === 0) {
            this.showStatus('Please select at least one file to upload.', 'error');
            return;
        }

        // File type validation
        const invalidFiles = this.validateFileTypes(files);
        if (invalidFiles.length > 0) {
            this.showStatus(`Invalid file types detected: ${invalidFiles.join(', ')}. Please check accepted formats.`, 'error');
            return;
        }

        if (!webhookUrl) {
            this.showStatus(`Please configure the ${this.channelName} webhook URL on the home page first.`, 'error');
            return;
        }

        if (!this.isValidWebhookUrl(webhookUrl)) {
            this.showStatus(`Please enter a valid Discord webhook URL for ${this.channelName}.`, 'error');
            return;
        }

        // Check file size limits (Discord limit is 25MB for webhooks)
        const maxSize = 25 * 1024 * 1024; // 25MB in bytes
        const oversizedFiles = files.filter(file => file.size > maxSize);
        
        if (oversizedFiles.length > 0) {
            this.showStatus(`Some files are too large. Discord webhook limit is 25MB per file.`, 'error');
            return;
        }

        this.uploadBtn.disabled = true;
        this.showStatus(`Uploading files to ${this.channelName}...`, 'loading');

        try {
            // Upload files in batches (Discord allows up to 10 files per message)
            const batchSize = 10;
            const batches = [];
            
            for (let i = 0; i < files.length; i += batchSize) {
                batches.push(files.slice(i, i + batchSize));
            }

            for (let i = 0; i < batches.length; i++) {
                const batch = batches[i];
                await this.uploadBatch(batch, webhookUrl, i === 0 ? message : '');
                
                if (i < batches.length - 1) {
                    // Small delay between batches to avoid rate limiting
                    await this.delay(1000);
                }
            }

            this.showStatus(`Successfully uploaded ${files.length} file(s) to ${this.channelName} channel!`, 'success');
            this.fileInput.value = '';
            this.messageText.value = '';
            this.fileList.innerHTML = '';
            
        } catch (error) {
            console.error('Upload error:', error);
            this.showStatus(`Upload failed: ${error.message}`, 'error');
        } finally {
            this.uploadBtn.disabled = false;
        }
    }

    async uploadBatch(files, webhookUrl, message) {
        const formData = new FormData();
        
        // Add message content if provided
        if (message) {
            formData.append('content', message);
        }
        
        // Add files to form data
        files.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });

        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return response;
    }

    isValidWebhookUrl(url) {
        try {
            const urlObj = new URL(url);
            return (urlObj.hostname === 'discord.com' || urlObj.hostname === 'discordapp.com')
                   && urlObj.pathname.includes('/api/webhooks/');
        } catch {
            return false;
        }
    }

    validateFileTypes(files) {
        const invalidFiles = [];
        
        // Define allowed file types based on channel
        let allowedTypes = [];
        
        if (this.channelType === 'webWizard') {
            // Web Wizard: Only ZIP files
            allowedTypes = ['.zip'];
        } else if (this.channelType === 'digitalIdentity') {
            // Digital Identity: Only image files
            allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.tiff', '.ico', '.psd', '.ai'];
        }
        
        files.forEach(file => {
            const fileName = file.name.toLowerCase();
            const isValidType = allowedTypes.some(type => fileName.endsWith(type));
            
            if (!isValidType) {
                invalidFiles.push(file.name);
            }
        });
        
        return invalidFiles;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the uploader when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DiscordUploader();
});