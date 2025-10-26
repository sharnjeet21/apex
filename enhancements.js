// Enhanced Interactions and Animations for GNE's APEX 2025
class EnhancedUI {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.setupScrollAnimations();
        this.setupProgressBar();
        this.setupDragAndDrop();
        this.setupKeyboardNavigation();
        this.setupLoadingStates();
        this.setupMicroInteractions();
    }

    // Particle System
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 20) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Add scroll reveal to elements
        document.querySelectorAll('.rule-card, .topic-card, .channel-card').forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }

    // Progress Bar
    setupProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Enhanced Drag and Drop
    setupDragAndDrop() {
        const fileLabels = document.querySelectorAll('.file-label');
        
        fileLabels.forEach(label => {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                label.addEventListener(eventName, this.preventDefaults, false);
            });

            ['dragenter', 'dragover'].forEach(eventName => {
                label.addEventListener(eventName, () => label.classList.add('drag-over'), false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                label.addEventListener(eventName, () => label.classList.remove('drag-over'), false);
            });

            label.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                const fileInput = label.querySelector('input[type="file"]');
                if (fileInput) {
                    fileInput.files = files;
                    this.handleFileSelect(files, label);
                }
            });
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFileSelect(files, label) {
        if (files.length > 0) {
            // Validate file types based on page
            const isValid = this.validateDroppedFiles(files);
            
            if (isValid) {
                label.classList.add('upload-success');
                setTimeout(() => {
                    label.classList.remove('upload-success');
                }, 1000);
            } else {
                label.classList.add('upload-error');
                setTimeout(() => {
                    label.classList.remove('upload-error');
                }, 2000);
            }
        }
    }

    validateDroppedFiles(files) {
        const currentPage = window.location.pathname;
        let allowedTypes = [];
        
        if (currentPage.includes('web-wizard')) {
            allowedTypes = ['.zip'];
        } else if (currentPage.includes('digital-identity')) {
            allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.tiff', '.ico', '.psd', '.ai'];
        } else {
            return true; // Allow all files on other pages
        }
        
        return Array.from(files).every(file => {
            const fileName = file.name.toLowerCase();
            const fileType = file.type.toLowerCase();
            
            // Check file extension
            const hasValidExtension = allowedTypes.some(type => fileName.endsWith(type));
            
            // Additional MIME type validation
            let hasValidMimeType = true;
            if (currentPage.includes('digital-identity')) {
                hasValidMimeType = fileType.startsWith('image/') || 
                                 fileName.endsWith('.psd') || 
                                 fileName.endsWith('.ai');
            } else if (currentPage.includes('web-wizard')) {
                hasValidMimeType = fileType === 'application/zip' || 
                                 fileType === 'application/x-zip-compressed' ||
                                 fileName.endsWith('.zip');
            }
            
            return hasValidExtension && hasValidMimeType;
        });
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // Loading States
    setupLoadingStates() {
        const uploadButtons = document.querySelectorAll('.upload-btn');
        
        uploadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (!button.disabled) {
                    this.showLoadingOverlay();
                    
                    // Simulate upload process
                    setTimeout(() => {
                        this.hideLoadingOverlay();
                    }, 2000);
                }
            });
        });
    }

    showLoadingOverlay() {
        let overlay = document.querySelector('.loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.innerHTML = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p style="color: white; margin-top: 20px; font-weight: 500;">Uploading files...</p>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        overlay.classList.add('active');
    }

    hideLoadingOverlay() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    // Micro Interactions
    setupMicroInteractions() {
        // Add fade-in-up class to elements
        document.querySelectorAll('h1, h2, p, .channel-card, .rule-card').forEach((el, index) => {
            el.classList.add('fade-in-up');
            el.style.animationDelay = (index * 0.1) + 's';
        });

        // Enhanced button interactions
        document.querySelectorAll('button, .channel-card, .nav-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = el.style.transform + ' scale(1.02)';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = el.style.transform.replace(' scale(1.02)', '');
            });
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize enhanced UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedUI();
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Additional non-critical enhancements
        console.log('🚀 GNE\'s APEX 2025 - Enhanced UI Loaded');
    });
}