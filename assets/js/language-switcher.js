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