/**
 * Language Switcher for Jekyll Multilingual Blog
 * Handles language detection, switching, and preference storage
 */

class LanguageSwitcher {
  constructor() {
    // Supported languages from Jekyll config
    this.supportedLanguages = ['ko', 'en', 'es'];
    this.defaultLanguage = 'ko';
    
    // Storage keys
    this.storageKeys = {
      language: 'preferred-language',
      fallback: 'language-fallback'
    };
    
    // Initialize language detection and setup
    this.currentLanguage = this.detectLanguage();
    this.init();
  }

  /**
   * Initialize the language switcher
   */
  init() {
    // Store current language preference
    this.storeLanguagePreference(this.currentLanguage);
    
    // Apply language to document
    this.applyLanguageToDocument(this.currentLanguage);
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Log initialization
    console.log(`Language switcher initialized with language: ${this.currentLanguage}`);
  }

  /**
   * Detect the current language from various sources
   * Priority: URL parameter > localStorage > browser language > default
   */
  detectLanguage() {
    // 1. Check URL parameter (?lang=xx or ?tl=xx)
    const urlLanguage = this.getLanguageFromURL();
    if (urlLanguage && this.isValidLanguage(urlLanguage)) {
      console.log(`Language detected from URL: ${urlLanguage}`);
      return urlLanguage;
    }

    // 2. Check localStorage
    const storedLanguage = this.getStoredLanguage();
    if (storedLanguage && this.isValidLanguage(storedLanguage)) {
      console.log(`Language detected from localStorage: ${storedLanguage}`);
      return storedLanguage;
    }

    // 3. Check browser language
    const browserLanguage = this.getBrowserLanguage();
    if (browserLanguage && this.isValidLanguage(browserLanguage)) {
      console.log(`Language detected from browser: ${browserLanguage}`);
      return browserLanguage;
    }

    // 4. Fallback to default language
    console.log(`Using default language: ${this.defaultLanguage}`);
    return this.defaultLanguage;
  }

  /**
   * Get language from URL parameters
   * Supports both ?lang=xx and ?tl=xx formats
   */
  getLanguageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('lang') || urlParams.get('tl');
  }

  /**
   * Get stored language preference from localStorage
   */
  getStoredLanguage() {
    try {
      return localStorage.getItem(this.storageKeys.language);
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
      return null;
    }
  }

  /**
   * Get browser language preference
   */
  getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang) {
      // Extract language code (e.g., 'ko-KR' -> 'ko')
      return browserLang.split('-')[0].toLowerCase();
    }
    return null;
  }

  /**
   * Validate if a language code is supported
   */
  isValidLanguage(langCode) {
    return this.supportedLanguages.includes(langCode);
  }

  /**
   * Store language preference in localStorage
   */
  storeLanguagePreference(langCode) {
    if (!this.isValidLanguage(langCode)) {
      console.warn(`Invalid language code: ${langCode}`);
      return false;
    }

    try {
      localStorage.setItem(this.storageKeys.language, langCode);
      return true;
    } catch (error) {
      console.warn('Failed to store language preference:', error);
      return false;
    }
  }

  /**
   * Apply language to document (set lang attribute)
   */
  applyLanguageToDocument(langCode) {
    if (document.documentElement) {
      document.documentElement.lang = langCode;
    }
  }

  /**
   * Switch to a new language
   */
  switchLanguage(targetLanguage) {
    // Validate target language
    if (!this.isValidLanguage(targetLanguage)) {
      console.error(`Invalid target language: ${targetLanguage}`);
      return false;
    }

    // Don't switch if already current language
    if (targetLanguage === this.currentLanguage) {
      console.log(`Already using language: ${targetLanguage}`);
      return true;
    }

    console.log(`Switching language from ${this.currentLanguage} to ${targetLanguage}`);

    // Store new preference
    this.storeLanguagePreference(targetLanguage);
    
    // Update current language
    this.currentLanguage = targetLanguage;
    
    // Apply to document
    this.applyLanguageToDocument(targetLanguage);
    
    // Update URL with language parameter
    this.updateURLWithLanguage(targetLanguage);
    
    // Trigger language change event
    this.triggerLanguageChangeEvent(targetLanguage);
    
    // Reload page to apply language changes
    this.reloadPageWithLanguage(targetLanguage);
    
    return true;
  }

  /**
   * Update URL with language parameter
   */
  updateURLWithLanguage(langCode) {
    const url = new URL(window.location);
    
    // Handle category page URLs with hash fragments
    if (url.pathname.includes('/categories/') && url.hash) {
      // For category pages, we need to update the hash fragment for translated categories
      this.updateCategoryHash(url, langCode);
    }
    
    if (langCode === this.defaultLanguage) {
      // Remove language parameter for default language
      url.searchParams.delete('lang');
      url.searchParams.delete('tl');
    } else {
      // Set language parameter
      url.searchParams.set('lang', langCode);
      url.searchParams.delete('tl'); // Remove old tl parameter if exists
    }
    
    // Update URL without reloading
    window.history.replaceState({}, '', url);
  }

  /**
   * Update category hash fragment for language changes
   */
  updateCategoryHash(url, langCode) {
    const hash = url.hash.substring(1); // Remove # prefix
    
    // Category translation mappings (should match Jekyll config)
    const categoryTranslations = {
      '바이브코딩': {
        'en': 'vibe-coding',
        'es': 'codificacion-vibe'
      },
      'ai도구': {
        'en': 'ai-tools', 
        'es': 'herramientas-ia'
      },
      'vibe-coding': {
        'ko': '바이브코딩',
        'es': 'codificacion-vibe'
      },
      'ai-tools': {
        'ko': 'ai도구',
        'es': 'herramientas-ia'
      },
      'codificacion-vibe': {
        'ko': '바이브코딩',
        'en': 'vibe-coding'
      },
      'herramientas-ia': {
        'ko': 'ai도구',
        'en': 'ai-tools'
      }
    };
    
    // Find translation for current hash
    if (categoryTranslations[hash] && categoryTranslations[hash][langCode]) {
      const translatedCategory = categoryTranslations[hash][langCode];
      url.hash = '#' + this.slugify(translatedCategory);
    }
  }

  /**
   * Create URL-friendly slug from text
   */
  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Reload page with language parameter
   */
  reloadPageWithLanguage(langCode) {
    const url = new URL(window.location);
    
    if (langCode === this.defaultLanguage) {
      url.searchParams.delete('lang');
      url.searchParams.delete('tl');
    } else {
      url.searchParams.set('lang', langCode);
      url.searchParams.delete('tl');
    }
    
    window.location.href = url.toString();
  }

  /**
   * Trigger custom language change event
   */
  triggerLanguageChangeEvent(langCode) {
    const event = new CustomEvent('languageChanged', {
      detail: {
        previousLanguage: this.currentLanguage,
        newLanguage: langCode,
        timestamp: new Date().toISOString()
      }
    });
    
    document.dispatchEvent(event);
  }

  /**
   * Get fallback language for unsupported language
   */
  getFallbackLanguage(unsupportedLang) {
    // Fallback chain: unsupported -> English -> Korean
    const fallbackChain = {
      'es': ['en', 'ko'],
      'en': ['ko'],
      'ko': []
    };
    
    // If we have a specific fallback chain for this language
    if (fallbackChain[unsupportedLang]) {
      for (const fallback of fallbackChain[unsupportedLang]) {
        if (this.isValidLanguage(fallback)) {
          return fallback;
        }
      }
    }
    
    // Default fallback to Korean
    return this.defaultLanguage;
  }

  /**
   * Handle unsupported language with fallback
   */
  handleUnsupportedLanguage(unsupportedLang) {
    console.warn(`Unsupported language: ${unsupportedLang}`);
    
    const fallbackLang = this.getFallbackLanguage(unsupportedLang);
    console.log(`Using fallback language: ${fallbackLang}`);
    
    // Store fallback information
    try {
      localStorage.setItem(this.storageKeys.fallback, JSON.stringify({
        requested: unsupportedLang,
        fallback: fallbackLang,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.warn('Failed to store fallback information:', error);
    }
    
    // Switch to fallback language
    return this.switchLanguage(fallbackLang);
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', () => {
      const urlLanguage = this.getLanguageFromURL();
      if (urlLanguage && urlLanguage !== this.currentLanguage) {
        if (this.isValidLanguage(urlLanguage)) {
          this.switchLanguage(urlLanguage);
        } else {
          this.handleUnsupportedLanguage(urlLanguage);
        }
      }
    });

    // Listen for storage events (language changed in another tab)
    window.addEventListener('storage', (event) => {
      if (event.key === this.storageKeys.language && event.newValue) {
        const newLanguage = event.newValue;
        if (this.isValidLanguage(newLanguage) && newLanguage !== this.currentLanguage) {
          this.switchLanguage(newLanguage);
        }
      }
    });
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages() {
    return [...this.supportedLanguages];
  }

  /**
   * Check if current language is default
   */
  isDefaultLanguage() {
    return this.currentLanguage === this.defaultLanguage;
  }

  /**
   * Get language display name (for UI)
   */
  getLanguageDisplayName(langCode) {
    const languageNames = {
      'ko': '한국어',
      'en': 'English',
      'es': 'Español'
    };
    
    return languageNames[langCode] || langCode;
  }

  /**
   * Get language flag emoji
   */
  getLanguageFlag(langCode) {
    const languageFlags = {
      'ko': '🇰🇷',
      'en': '🇺🇸',
      'es': '🇪🇸'
    };
    
    return languageFlags[langCode] || '🌐';
  }

  /**
   * Debug method to get current state
   */
  getDebugInfo() {
    return {
      currentLanguage: this.currentLanguage,
      supportedLanguages: this.supportedLanguages,
      defaultLanguage: this.defaultLanguage,
      urlLanguage: this.getLanguageFromURL(),
      storedLanguage: this.getStoredLanguage(),
      browserLanguage: this.getBrowserLanguage(),
      isDefaultLanguage: this.isDefaultLanguage()
    };
  }
}

// Initialize language switcher when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Create global instance
  window.languageSwitcher = new LanguageSwitcher();
  
  // Expose methods for external use
  window.switchLanguage = function(langCode) {
    return window.languageSwitcher.switchLanguage(langCode);
  };
  
  window.getCurrentLanguage = function() {
    return window.languageSwitcher.getCurrentLanguage();
  };
  
  window.getSupportedLanguages = function() {
    return window.languageSwitcher.getSupportedLanguages();
  };
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageSwitcher;
}

/**
 * Translation Links Enhancement
 * Adds interactive functionality to translation links
 */
class TranslationLinksManager {
  constructor(languageSwitcher) {
    this.languageSwitcher = languageSwitcher;
    this.init();
  }

  /**
   * Initialize translation links functionality
   */
  init() {
    this.setupTranslationLinks();
    this.setupKeyboardNavigation();
    this.setupAnalytics();
  }

  /**
   * Set up translation links click handlers
   */
  setupTranslationLinks() {
    const translationLinks = document.querySelectorAll('.translation-link');
    
    translationLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        
        const targetLang = link.getAttribute('data-lang');
        const targetUrl = link.getAttribute('href');
        
        if (targetLang && targetUrl) {
          this.handleTranslationLinkClick(targetLang, targetUrl, link);
        }
      });

      // Add hover effects
      link.addEventListener('mouseenter', () => {
        this.showTranslationPreview(link);
      });

      link.addEventListener('mouseleave', () => {
        this.hideTranslationPreview();
      });
    });
  }

  /**
   * Handle translation link click
   */
  handleTranslationLinkClick(targetLang, targetUrl, linkElement) {
    // Track analytics
    this.trackTranslationClick(targetLang, targetUrl);
    
    // Show loading state
    this.showLoadingState(linkElement);
    
    // Update language preference
    this.languageSwitcher.storeLanguagePreference(targetLang);
    
    // Navigate to translation
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 100); // Small delay for visual feedback
  }

  /**
   * Show loading state on clicked link
   */
  showLoadingState(linkElement) {
    const originalContent = linkElement.innerHTML;
    linkElement.setAttribute('data-original-content', originalContent);
    
    const flag = linkElement.querySelector('.translation-flag');
    const name = linkElement.querySelector('.translation-name');
    
    if (flag && name) {
      name.textContent = 'Loading...';
      linkElement.style.opacity = '0.7';
      linkElement.style.pointerEvents = 'none';
    }
  }

  /**
   * Show translation preview on hover
   */
  showTranslationPreview(linkElement) {
    const targetLang = linkElement.getAttribute('data-lang');
    
    // Create preview tooltip
    const preview = document.createElement('div');
    preview.className = 'translation-preview';
    preview.innerHTML = `
      <div class="preview-content">
        <strong>Switch to ${this.languageSwitcher.getLanguageDisplayName(targetLang)}</strong>
        <small>View this content in ${targetLang.toUpperCase()}</small>
      </div>
    `;
    
    // Position and show preview
    document.body.appendChild(preview);
    this.positionPreview(preview, linkElement);
    
    // Store reference for cleanup
    this.currentPreview = preview;
  }

  /**
   * Hide translation preview
   */
  hideTranslationPreview() {
    if (this.currentPreview) {
      this.currentPreview.remove();
      this.currentPreview = null;
    }
  }

  /**
   * Position preview tooltip
   */
  positionPreview(preview, linkElement) {
    const rect = linkElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    preview.style.position = 'absolute';
    preview.style.top = `${rect.bottom + scrollTop + 5}px`;
    preview.style.left = `${rect.left}px`;
    preview.style.zIndex = '1000';
    preview.style.background = '#333';
    preview.style.color = '#fff';
    preview.style.padding = '0.5rem';
    preview.style.borderRadius = '0.25rem';
    preview.style.fontSize = '0.8rem';
    preview.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    preview.style.opacity = '0';
    preview.style.transform = 'translateY(-5px)';
    preview.style.transition = 'all 0.2s ease';
    
    // Animate in
    setTimeout(() => {
      preview.style.opacity = '1';
      preview.style.transform = 'translateY(0)';
    }, 10);
  }

  /**
   * Set up keyboard navigation for translation links
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      // Alt + number keys for quick language switching
      if (event.altKey && !event.ctrlKey && !event.shiftKey) {
        const keyMap = {
          '1': 'ko', // Alt+1 for Korean
          '2': 'en', // Alt+2 for English
          '3': 'es'  // Alt+3 for Spanish
        };
        
        const targetLang = keyMap[event.key];
        if (targetLang && this.languageSwitcher.isValidLanguage(targetLang)) {
          event.preventDefault();
          
          // Find corresponding translation link
          const translationLink = document.querySelector(`[data-lang="${targetLang}"]`);
          if (translationLink) {
            translationLink.click();
          } else {
            // If no translation link, switch language anyway
            this.languageSwitcher.switchLanguage(targetLang);
          }
        }
      }
    });
  }

  /**
   * Set up analytics tracking
   */
  setupAnalytics() {
    // Track when translation links are visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.trackTranslationLinksVisible();
        }
      });
    });

    const translationContainer = document.querySelector('.translation-links');
    if (translationContainer) {
      observer.observe(translationContainer);
    }
  }

  /**
   * Track translation link click
   */
  trackTranslationClick(targetLang, targetUrl) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'translation_click', {
        'target_language': targetLang,
        'target_url': targetUrl,
        'source_language': this.languageSwitcher.getCurrentLanguage()
      });
    }

    // Custom analytics
    if (typeof window.analytics !== 'undefined') {
      window.analytics.track('Translation Link Clicked', {
        targetLanguage: targetLang,
        sourceLanguage: this.languageSwitcher.getCurrentLanguage(),
        targetUrl: targetUrl,
        timestamp: new Date().toISOString()
      });
    }

    console.log(`Translation click tracked: ${this.languageSwitcher.getCurrentLanguage()} -> ${targetLang}`);
  }

  /**
   * Track when translation links are visible
   */
  trackTranslationLinksVisible() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'translation_links_viewed', {
        'current_language': this.languageSwitcher.getCurrentLanguage(),
        'page_url': window.location.href
      });
    }
  }

  /**
   * Add visual indicators for available translations
   */
  enhanceTranslationIndicators() {
    const translationLinks = document.querySelectorAll('.translation-link');
    
    translationLinks.forEach(link => {
      const targetLang = link.getAttribute('data-lang');
      
      // Add language-specific styling
      link.classList.add(`translation-link--${targetLang}`);
      
      // Add accessibility attributes
      link.setAttribute('aria-label', 
        `Read this content in ${this.languageSwitcher.getLanguageDisplayName(targetLang)}`);
      
      // Add keyboard shortcut hint
      const shortcutMap = { 'ko': '1', 'en': '2', 'es': '3' };
      const shortcut = shortcutMap[targetLang];
      if (shortcut) {
        link.setAttribute('title', 
          `${link.getAttribute('title')} (Alt+${shortcut})`);
      }
    });
  }

  /**
   * Handle missing translations gracefully
   */
  handleMissingTranslations() {
    const currentLang = this.languageSwitcher.getCurrentLanguage();
    const translationNotice = document.querySelector('.translation-notice');
    
    if (translationNotice && currentLang !== this.languageSwitcher.defaultLanguage) {
      // Add suggestion to view original
      const suggestion = document.createElement('div');
      suggestion.className = 'translation-suggestion';
      suggestion.innerHTML = `
        <p>
          <a href="?lang=${this.languageSwitcher.defaultLanguage}" class="original-link">
            ${this.languageSwitcher.getLanguageFlag(this.languageSwitcher.defaultLanguage)}
            View original in ${this.languageSwitcher.getLanguageDisplayName(this.languageSwitcher.defaultLanguage)}
          </a>
        </p>
      `;
      
      translationNotice.appendChild(suggestion);
    }
  }
}

// Initialize translation links manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for language switcher to be ready
  if (window.languageSwitcher) {
    window.translationLinksManager = new TranslationLinksManager(window.languageSwitcher);
    
    // Enhance translation indicators
    window.translationLinksManager.enhanceTranslationIndicators();
    
    // Handle missing translations
    window.translationLinksManager.handleMissingTranslations();
  }
});

// CSS for translation preview (injected via JavaScript)
const translationPreviewCSS = `
  .translation-preview {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    max-width: 200px;
    white-space: nowrap;
  }
  
  .translation-preview .preview-content strong {
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .translation-preview .preview-content small {
    opacity: 0.8;
    font-size: 0.7rem;
  }
  
  .translation-link--ko:hover {
    border-color: #cd212a;
    background-color: #cd212a;
  }
  
  .translation-link--en:hover {
    border-color: #0052cc;
    background-color: #0052cc;
  }
  
  .translation-link--es:hover {
    border-color: #c60b1e;
    background-color: #c60b1e;
  }
  
  .translation-suggestion {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
  }
  
  .translation-suggestion .original-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #007acc;
    text-decoration: none;
    font-weight: 500;
  }
  
  .translation-suggestion .original-link:hover {
    text-decoration: underline;
  }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = translationPreviewCSS;
document.head.appendChild(style);