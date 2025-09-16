/**
 * Language Switcher for Jekyll Multilingual Blog
 * Handles language detection, switching, and preference storage
 */

class LanguageSwitcher {
  constructor() {
    // Supported languages from Jekyll config
    this.supportedLanguages = ['ko', 'en', 'es'];
    this.defaultLanguage = 'ko';
    
    // Storage keys and configuration
    this.storageKeys = {
      language: 'preferred-language',
      fallback: 'language-fallback',
      session: 'session-language',
      cookie: 'lang-pref'
    };
    
    // Storage configuration
    this.storageConfig = {
      cookieExpireDays: 365, // 1 year
      cookiePath: '/',
      cookieSameSite: 'Lax'
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
   * Priority: URL prefix > meta tag > localStorage > browser language > default
   */
  detectLanguage() {
    // 1. Check URL prefix (/ko/, /en/, /es/)
    const urlLanguage = this.getLanguageFromURL();
    if (urlLanguage && this.isValidLanguage(urlLanguage)) {
      console.log(`Language detected from URL prefix: ${urlLanguage}`);
      return urlLanguage;
    }

    // 2. Check meta tag (set by Jekyll)
    const metaLanguage = this.getLanguageFromMeta();
    if (metaLanguage && this.isValidLanguage(metaLanguage)) {
      console.log(`Language detected from meta tag: ${metaLanguage}`);
      return metaLanguage;
    }

    // 3. Check localStorage
    const storedLanguage = this.getStoredLanguage();
    if (storedLanguage && this.isValidLanguage(storedLanguage)) {
      console.log(`Language detected from localStorage: ${storedLanguage}`);
      return storedLanguage;
    }

    // 4. Check browser language
    const browserLanguage = this.getBrowserLanguage();
    if (browserLanguage && this.isValidLanguage(browserLanguage)) {
      console.log(`Language detected from browser: ${browserLanguage}`);
      return browserLanguage;
    }

    // 5. Fallback to default language
    console.log(`Using default language: ${this.defaultLanguage}`);
    return this.defaultLanguage;
  }

  /**
   * Get language from URL prefix (/ko/, /en/, /es/)
   */
  getLanguageFromURL() {
    const path = window.location.pathname;
    const match = path.match(/^\/([a-z]{2})\//);
    return match ? match[1] : null;
  }

  /**
   * Get language from meta tag
   */
  getLanguageFromMeta() {
    const metaTag = document.querySelector('meta[name="current-language"]');
    return metaTag ? metaTag.getAttribute('content') : null;
  }

  /**
   * Get stored language preference from multiple sources
   * Priority: localStorage > sessionStorage > cookie
   */
  getStoredLanguage() {
    // Try localStorage first
    try {
      const localStorageValue = localStorage.getItem(this.storageKeys.language);
      if (localStorageValue) {
        return localStorageValue;
      }
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
    }
    
    // Try sessionStorage as backup
    try {
      const sessionStorageValue = sessionStorage.getItem(this.storageKeys.session);
      if (sessionStorageValue) {
        return sessionStorageValue;
      }
    } catch (error) {
      console.warn('Failed to access sessionStorage:', error);
    }
    
    // Try cookie as final fallback
    try {
      const cookieValue = this.getCookie(this.storageKeys.cookie);
      if (cookieValue) {
        return cookieValue;
      }
    } catch (error) {
      console.warn('Failed to access cookie:', error);
    }
    
    return null;
  }

  /**
   * Get cookie value by name
   */
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  /**
   * Set cookie with expiration and security settings
   */
  setCookie(name, value, days = null) {
    const expireDays = days || this.storageConfig.cookieExpireDays;
    const date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    
    const expires = `expires=${date.toUTCString()}`;
    const path = `path=${this.storageConfig.cookiePath}`;
    const sameSite = `SameSite=${this.storageConfig.cookieSameSite}`;
    
    // Add Secure flag if using HTTPS
    const secure = location.protocol === 'https:' ? 'Secure' : '';
    
    const cookieString = [
      `${name}=${value}`,
      expires,
      path,
      sameSite,
      secure
    ].filter(Boolean).join('; ');
    
    document.cookie = cookieString;
  }

  /**
   * Delete cookie
   */
  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${this.storageConfig.cookiePath};`;
  }

  /**
   * Get browser language preference with enhanced detection
   */
  getBrowserLanguage() {
    // Get all available browser languages
    const languages = navigator.languages || [navigator.language || navigator.userLanguage];
    
    // Try to find a supported language from browser preferences
    for (const lang of languages) {
      if (lang) {
        // Extract language code (e.g., 'ko-KR' -> 'ko')
        const langCode = lang.split('-')[0].toLowerCase();
        
        // Return first supported language
        if (this.isValidLanguage(langCode)) {
          console.log(`Browser language detected: ${langCode} (from ${lang})`);
          return langCode;
        }
      }
    }
    
    // If no supported language found, try regional fallbacks
    for (const lang of languages) {
      if (lang) {
        const langCode = lang.split('-')[0].toLowerCase();
        const fallback = this.getBrowserLanguageFallback(langCode);
        if (fallback) {
          console.log(`Browser language fallback: ${fallback} (from ${lang})`);
          return fallback;
        }
      }
    }
    
    return null;
  }

  /**
   * Get fallback language for unsupported browser languages
   */
  getBrowserLanguageFallback(langCode) {
    const fallbackMap = {
      'zh': 'ko', // Chinese speakers might prefer Korean
      'ja': 'ko', // Japanese speakers might prefer Korean
      'fr': 'en', // French speakers likely prefer English
      'de': 'en', // German speakers likely prefer English
      'it': 'en', // Italian speakers likely prefer English
      'pt': 'en', // Portuguese speakers likely prefer English
      'ru': 'en', // Russian speakers likely prefer English
      'ar': 'en', // Arabic speakers likely prefer English
      'hi': 'en', // Hindi speakers likely prefer English
    };
    
    const fallback = fallbackMap[langCode];
    return fallback && this.isValidLanguage(fallback) ? fallback : null;
  }

  /**
   * Validate if a language code is supported
   */
  isValidLanguage(langCode) {
    return this.supportedLanguages.includes(langCode);
  }

  /**
   * Store language preference in multiple storage mechanisms
   */
  storeLanguagePreference(langCode) {
    if (!this.isValidLanguage(langCode)) {
      console.warn(`Invalid language code: ${langCode}`);
      return false;
    }

    let success = false;
    const errors = [];

    // Store in localStorage (primary)
    try {
      localStorage.setItem(this.storageKeys.language, langCode);
      success = true;
    } catch (error) {
      errors.push(`localStorage: ${error.message}`);
      console.warn('Failed to store language preference in localStorage:', error);
    }

    // Store in sessionStorage (backup)
    try {
      sessionStorage.setItem(this.storageKeys.session, langCode);
      success = true;
    } catch (error) {
      errors.push(`sessionStorage: ${error.message}`);
      console.warn('Failed to store language preference in sessionStorage:', error);
    }

    // Store in cookie (persistent backup)
    try {
      this.setCookie(this.storageKeys.cookie, langCode);
      success = true;
    } catch (error) {
      errors.push(`cookie: ${error.message}`);
      console.warn('Failed to store language preference in cookie:', error);
    }

    // Log storage results
    if (success) {
      console.log(`Language preference stored: ${langCode}`);
    } else {
      console.error('Failed to store language preference in any storage mechanism:', errors);
      
      // Track storage failures
      this.logStorageError('preference_storage_failed', {
        language: langCode,
        errors: errors
      });
    }

    return success;
  }

  /**
   * Clear all stored language preferences
   */
  clearLanguagePreferences() {
    const errors = [];

    // Clear localStorage
    try {
      localStorage.removeItem(this.storageKeys.language);
      localStorage.removeItem(this.storageKeys.fallback);
    } catch (error) {
      errors.push(`localStorage: ${error.message}`);
    }

    // Clear sessionStorage
    try {
      sessionStorage.removeItem(this.storageKeys.session);
    } catch (error) {
      errors.push(`sessionStorage: ${error.message}`);
    }

    // Clear cookie
    try {
      this.deleteCookie(this.storageKeys.cookie);
    } catch (error) {
      errors.push(`cookie: ${error.message}`);
    }

    if (errors.length > 0) {
      console.warn('Some storage mechanisms could not be cleared:', errors);
    } else {
      console.log('All language preferences cleared');
    }
  }

  /**
   * Log storage-related errors
   */
  logStorageError(errorType, details) {
    const errorData = {
      type: errorType,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...details
    };

    console.error('Storage Error:', errorData);

    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'storage_error', {
        'error_type': errorType,
        'storage_errors': details.errors?.join(', ') || 'unknown'
      });
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
    
    // Trigger language change event
    this.triggerLanguageChangeEvent(targetLanguage);
    
    // Reload page to apply language changes
    this.reloadPageWithLanguage(targetLanguage);
    
    return true;
  }



  /**
   * Update URL with language prefix (not used in current implementation)
   */
  updateURLWithLanguage(langCode) {
    // This method is not used in the current language prefix implementation
    // Language switching is handled by direct navigation to prefixed URLs
    console.log(`Language switching to ${langCode} handled by direct navigation`);
  }

  /**
   * Update category hash fragment for language changes
   */
  updateCategoryHash(url, langCode) {
    const hash = url.hash.substring(1); // Remove # prefix
    
    // Category translation mappings (now all URLs use English categories)
    // Only display names are translated, URLs remain consistent
    const categoryTranslations = {
      'vibe-coding': {
        'ko': 'vibe-coding', // URL stays the same
        'en': 'vibe-coding',
        'es': 'vibe-coding'
      },
      'ai-tools': {
        'ko': 'ai-tools', // URL stays the same
        'en': 'ai-tools',
        'es': 'ai-tools'
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
   * Reload page with language prefix (with translation checking)
   */
  reloadPageWithLanguage(langCode) {
    const currentPath = window.location.pathname;
    
    // Always check if translation exists first
    const translationExists = this.checkTranslationExists(langCode);
    
    if (translationExists) {
      // Navigate to translated content
      const targetPath = this.getTranslatedPath(currentPath, langCode);
      console.log(`Navigating to translated content: ${targetPath}`);
      window.location.href = targetPath;
    } else {
      // Show error message and provide smart fallback
      console.warn(`Translation not available for ${langCode}, showing fallback`);
      this.handleMissingTranslation(langCode, currentPath);
      
      // Find a safe fallback page after delay
      setTimeout(() => {
        const fallbackUrl = this.getSafeFallbackUrl(langCode);
        console.log(`Redirecting to safe fallback: ${fallbackUrl}`);
        window.location.href = fallbackUrl;
      }, 3000);
    }
  }



  /**
   * Check if translation exists for current page/post
   */
  checkTranslationExists(targetLang) {
    // Special handling for Posts pages - they always exist
    const currentPath = window.location.pathname;
    if (currentPath === '/posts/' || currentPath.endsWith('/posts/')) {
      const supportedLanguages = ['ko', 'en', 'es'];
      if (supportedLanguages.includes(targetLang)) {
        console.log(`Posts page translation exists for ${targetLang}`);
        return true;
      }
    }
    
    // Look for translation links in current page
    const translationLinks = document.querySelectorAll(`[data-lang="${targetLang}"]`);
    
    if (translationLinks.length > 0) {
      console.log(`Translation link found for ${targetLang}`);
      return true;
    }
    
    // Check if we have translation metadata in page
    const pageTranslations = this.getPageTranslations();
    if (pageTranslations && pageTranslations[targetLang]) {
      console.log(`Translation metadata found for ${targetLang}`);
      return true;
    }
    
    console.log(`No translation found for ${targetLang}`);
    return false;
  }

  /**
   * Get translated path for current page/post
   */
  getTranslatedPath(currentPath, targetLang) {
    // Special handling for Posts pages
    if (currentPath === '/posts/' || currentPath.endsWith('/posts/')) {
      const postsTranslations = {
        'ko': '/posts/',
        'en': '/en/posts/',
        'es': '/es/posts/'
      };
      
      if (postsTranslations[targetLang]) {
        console.log(`Found Posts page translation: ${postsTranslations[targetLang]}`);
        return postsTranslations[targetLang];
      }
    }
    
    // Look for translation link with target language
    const translationLink = document.querySelector(`[data-lang="${targetLang}"]`);
    
    if (translationLink) {
      const href = translationLink.getAttribute('href') || translationLink.getAttribute('data-fallback-url');
      console.log(`Found translation link: ${href}`);
      return href;
    }
    
    // Check page translations metadata
    const pageTranslations = this.getPageTranslations();
    if (pageTranslations && pageTranslations[targetLang]) {
      console.log(`Found translation in metadata: ${pageTranslations[targetLang]}`);
      return pageTranslations[targetLang];
    }
    
    // Fallback: try to construct path (this might lead to 404)
    const languagePrefixRegex = /^\/(ko|en|es)\//;
    let targetPath;
    
    if (languagePrefixRegex.test(currentPath)) {
      targetPath = currentPath.replace(languagePrefixRegex, `/${targetLang}/`);
    } else {
      targetPath = `/${targetLang}${currentPath}`;
    }
    
    console.log(`Constructed fallback path: ${targetPath}`);
    return targetPath;
  }

  /**
   * Get page translations from meta tags or global variable
   */
  getPageTranslations() {
    // Try to get from global variable set by Jekyll
    if (window.pageTranslations) {
      return window.pageTranslations;
    }
    
    // Try to get from meta tag
    const translationMeta = document.querySelector('meta[name="page-translations"]');
    if (translationMeta) {
      try {
        return JSON.parse(translationMeta.getAttribute('content'));
      } catch (error) {
        console.warn('Failed to parse page translations meta:', error);
      }
    }
    
    return null;
  }

  /**
   * Get safe fallback URL that actually exists
   */
  getSafeFallbackUrl(requestedLang) {
    // First, try to find any existing page in the requested language
    const existingLinks = document.querySelectorAll(`[data-lang="${requestedLang}"]`);
    if (existingLinks.length > 0) {
      const firstLink = existingLinks[0];
      const href = firstLink.getAttribute('href') || firstLink.getAttribute('data-fallback-url');
      if (href) {
        console.log(`Found existing ${requestedLang} page: ${href}`);
        return href;
      }
    }

    // If no pages exist in requested language, use fallback chain
    const fallbackLang = this.getFallbackLanguage(requestedLang);
    console.log(`No ${requestedLang} pages found, using fallback language: ${fallbackLang}`);

    // Try to find a page in the fallback language
    if (fallbackLang !== requestedLang) {
      const fallbackLinks = document.querySelectorAll(`[data-lang="${fallbackLang}"]`);
      if (fallbackLinks.length > 0) {
        const firstFallbackLink = fallbackLinks[0];
        const href = firstFallbackLink.getAttribute('href') || firstFallbackLink.getAttribute('data-fallback-url');
        if (href) {
          console.log(`Found ${fallbackLang} page: ${href}`);
          return href;
        }
      }

      // Try fallback language home page only if it's a supported language with content
      if (this.hasLanguageContent(fallbackLang)) {
        const fallbackHomePage = `/${fallbackLang}/`;
        console.log(`Trying fallback home page: ${fallbackHomePage}`);
        return fallbackHomePage;
      }
    }

    // Final fallback: current page (stay where we are)
    console.log('No safe fallback found, staying on current page');
    return window.location.pathname;
  }

  /**
   * Check if a language has any content available
   */
  hasLanguageContent(langCode) {
    // Check if there are any links to pages in this language
    const languageLinks = document.querySelectorAll(`[data-lang="${langCode}"]`);
    return languageLinks.length > 0;
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
   * Implements fallback chain: Spanish → English → Korean
   */
  getFallbackLanguage(unsupportedLang) {
    // Enhanced fallback chain with more comprehensive logic
    const fallbackChain = {
      'es': ['en', 'ko'],
      'en': ['ko'],
      'ko': [],
      'fr': ['en', 'ko'],
      'de': ['en', 'ko'],
      'ja': ['ko', 'en'],
      'zh': ['ko', 'en']
    };
    
    // If we have a specific fallback chain for this language
    if (fallbackChain[unsupportedLang]) {
      for (const fallback of fallbackChain[unsupportedLang]) {
        if (this.isValidLanguage(fallback)) {
          return fallback;
        }
      }
    }
    
    // For unknown languages, try English first, then Korean
    if (this.isValidLanguage('en')) {
      return 'en';
    }
    
    // Final fallback to default language
    return this.defaultLanguage;
  }

  /**
   * Handle unsupported language with enhanced error handling
   */
  handleUnsupportedLanguage(unsupportedLang) {
    console.warn(`Unsupported language requested: ${unsupportedLang}`);
    
    const fallbackLang = this.getFallbackLanguage(unsupportedLang);
    console.log(`Using fallback language: ${fallbackLang}`);
    
    // Log error for analytics
    this.logTranslationError('unsupported_language', {
      requested: unsupportedLang,
      fallback: fallbackLang,
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    
    // Store fallback information
    try {
      localStorage.setItem(this.storageKeys.fallback, JSON.stringify({
        requested: unsupportedLang,
        fallback: fallbackLang,
        timestamp: new Date().toISOString(),
        reason: 'unsupported_language'
      }));
    } catch (error) {
      console.warn('Failed to store fallback information:', error);
    }
    
    // Show user-friendly error message
    this.showLanguageErrorMessage(unsupportedLang, fallbackLang);
    
    // Switch to fallback language
    return this.switchLanguage(fallbackLang);
  }

  /**
   * Handle missing translation with fallback
   */
  handleMissingTranslation(targetLang, currentPath) {
    console.warn(`Translation not available: ${targetLang} for ${currentPath}`);
    
    const fallbackLang = this.getFallbackLanguage(targetLang);
    
    // Log error for analytics
    this.logTranslationError('missing_translation', {
      requested: targetLang,
      fallback: fallbackLang,
      path: currentPath,
      url: window.location.href
    });
    
    // Show user-friendly error message
    this.showTranslationNotAvailableMessage(targetLang, fallbackLang);
    
    // Try fallback language or stay on current page
    if (fallbackLang !== this.currentLanguage) {
      setTimeout(() => {
        this.switchLanguage(fallbackLang);
      }, 3000); // Give user time to read the message
    }
  }

  /**
   * Log translation errors for monitoring
   */
  logTranslationError(errorType, details) {
    const errorData = {
      type: errorType,
      timestamp: new Date().toISOString(),
      currentLanguage: this.currentLanguage,
      ...details
    };
    
    // Log to console for development
    console.error('Translation Error:', errorData);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'translation_error', {
        'error_type': errorType,
        'requested_language': details.requested,
        'fallback_language': details.fallback,
        'current_url': window.location.href
      });
    }
    
    // Store in localStorage for debugging
    try {
      const errors = JSON.parse(localStorage.getItem('translation_errors') || '[]');
      errors.push(errorData);
      
      // Keep only last 10 errors
      if (errors.length > 10) {
        errors.splice(0, errors.length - 10);
      }
      
      localStorage.setItem('translation_errors', JSON.stringify(errors));
    } catch (error) {
      console.warn('Failed to store error log:', error);
    }
  }

  /**
   * Show user-friendly error message for unsupported language
   */
  showLanguageErrorMessage(requestedLang, fallbackLang) {
    const message = this.createErrorMessage({
      title: 'Language Not Supported',
      message: `The requested language "${requestedLang}" is not supported yet.`,
      fallbackMessage: `Switching to ${this.getLanguageDisplayName(fallbackLang)} instead.`,
      type: 'warning'
    });
    
    this.displayErrorMessage(message);
  }

  /**
   * Show user-friendly message for missing translation
   */
  showTranslationNotAvailableMessage(requestedLang, fallbackLang) {
    // Check if we have any content in the requested language
    const hasContent = this.hasLanguageContent(requestedLang);
    
    let fallbackMessage;
    if (hasContent) {
      fallbackMessage = `Redirecting to available ${this.getLanguageDisplayName(requestedLang)} content...`;
    } else if (fallbackLang !== this.currentLanguage) {
      fallbackMessage = `No ${this.getLanguageDisplayName(requestedLang)} content available. Redirecting to ${this.getLanguageDisplayName(fallbackLang)}...`;
    } else {
      fallbackMessage = 'Staying on current page.';
    }

    const message = this.createErrorMessage({
      title: 'Translation Not Available',
      message: `This specific content is not available in ${this.getLanguageDisplayName(requestedLang)}.`,
      fallbackMessage: fallbackMessage,
      type: 'info'
    });
    
    this.displayErrorMessage(message);
  }

  /**
   * Create error message object
   */
  createErrorMessage({ title, message, fallbackMessage, type = 'error' }) {
    return {
      title,
      message,
      fallbackMessage,
      type,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Display error message to user
   */
  displayErrorMessage(errorMessage) {
    // Remove existing error messages
    const existingMessages = document.querySelectorAll('.language-error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create error message element
    const messageElement = document.createElement('div');
    messageElement.className = `language-error-message language-error-${errorMessage.type}`;
    messageElement.innerHTML = `
      <div class="error-content">
        <div class="error-header">
          <strong>${errorMessage.title}</strong>
          <button class="error-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="error-body">
          <p>${errorMessage.message}</p>
          ${errorMessage.fallbackMessage ? `<p class="error-fallback">${errorMessage.fallbackMessage}</p>` : ''}
        </div>
      </div>
    `;
    
    // Add styles
    this.styleErrorMessage(messageElement, errorMessage.type);
    
    // Add to page
    document.body.appendChild(messageElement);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentElement) {
        messageElement.remove();
      }
    }, 5000);
  }

  /**
   * Style error message based on type
   */
  styleErrorMessage(element, type) {
    const baseStyles = `
      position: fixed;
      top: 20px;
      right: 20px;
      max-width: 350px;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    `;
    
    const typeStyles = {
      error: 'background: #fee; border-left: 4px solid #e53e3e; color: #742a2a;',
      warning: 'background: #fffbeb; border-left: 4px solid #f6ad55; color: #744210;',
      info: 'background: #ebf8ff; border-left: 4px solid #4299e1; color: #2a4365;'
    };
    
    element.style.cssText = baseStyles + (typeStyles[type] || typeStyles.error);
    
    // Style close button
    const closeButton = element.querySelector('.error-close');
    if (closeButton) {
      closeButton.style.cssText = `
        float: right;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        margin-left: 10px;
      `;
    }
    
    // Style fallback message
    const fallbackMessage = element.querySelector('.error-fallback');
    if (fallbackMessage) {
      fallbackMessage.style.cssText = `
        margin-top: 0.5rem;
        font-style: italic;
        opacity: 0.8;
      `;
    }
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
          console.log(`Language changed in another tab: ${newLanguage}`);
          this.syncLanguagePreference(newLanguage);
          this.switchLanguage(newLanguage);
        }
      }
    });

    // Listen for beforeunload to ensure preferences are saved
    window.addEventListener('beforeunload', () => {
      this.syncLanguagePreference(this.currentLanguage);
    });

    // Listen for visibility change to sync preferences when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.syncLanguagePreferences();
      }
    });
  }

  /**
   * Synchronize language preference across all storage mechanisms
   */
  syncLanguagePreference(langCode) {
    if (!this.isValidLanguage(langCode)) {
      return;
    }

    // Ensure all storage mechanisms have the same value
    this.storeLanguagePreference(langCode);
  }

  /**
   * Synchronize language preferences from all sources
   */
  syncLanguagePreferences() {
    const storedLanguage = this.getStoredLanguage();
    
    if (storedLanguage && this.isValidLanguage(storedLanguage) && storedLanguage !== this.currentLanguage) {
      console.log(`Syncing language preference: ${storedLanguage}`);
      this.currentLanguage = storedLanguage;
      this.applyLanguageToDocument(storedLanguage);
      
      // Update UI if language switcher is visible
      this.updateLanguageSwitcherUI(storedLanguage);
    }
  }

  /**
   * Update language switcher UI to reflect current language
   */
  updateLanguageSwitcherUI(langCode) {
    const currentFlag = document.getElementById('currentFlag');
    const currentLang = document.getElementById('currentLang');
    
    if (!currentFlag || !currentLang) {
      console.warn('Language switcher UI elements not found');
      return;
    }
    
    const languages = {
      'ko': { name: '한국어', flag: '🇰🇷' },
      'en': { name: 'English', flag: '🇺🇸' },
      'es': { name: 'Español', flag: '🇪🇸' }
    };
    
    const langData = languages[langCode];
    if (langData) {
      currentFlag.textContent = langData.flag;
      currentLang.textContent = langData.name;
      console.log(`Updated language switcher UI to: ${langCode} (${langData.name})`);
    }
  }
  
  /**
   * Get current language from various sources
   */
  getCurrentLanguage() {
    return this.currentLanguage;
    const currentLang = document.getElementById('currentLang');
    
    if (currentFlag && currentLang) {
      const langData = this.getLanguageData(langCode);
      if (langData) {
        currentFlag.textContent = langData.flag || '🌐';
        currentLang.textContent = langData.name || langCode;
      }
    }
  }

  /**
   * Get language data for a given language code
   */
  getLanguageData(langCode) {
    // This would typically come from site configuration
    // For now, return basic data
    const languageData = {
      'ko': { name: '한국어', flag: '🇰🇷' },
      'en': { name: 'English', flag: '🇺🇸' },
      'es': { name: 'Español', flag: '🇪🇸' }
    };
    
    return languageData[langCode] || null;
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
   * Get language preference statistics
   */
  getLanguagePreferenceStats() {
    const stats = {
      localStorage: null,
      sessionStorage: null,
      cookie: null,
      browser: this.getBrowserLanguage(),
      current: this.currentLanguage,
      default: this.defaultLanguage
    };

    // Check localStorage
    try {
      stats.localStorage = localStorage.getItem(this.storageKeys.language);
    } catch (error) {
      stats.localStorage = 'error';
    }

    // Check sessionStorage
    try {
      stats.sessionStorage = sessionStorage.getItem(this.storageKeys.session);
    } catch (error) {
      stats.sessionStorage = 'error';
    }

    // Check cookie
    try {
      stats.cookie = this.getCookie(this.storageKeys.cookie);
    } catch (error) {
      stats.cookie = 'error';
    }

    return stats;
  }

  /**
   * Export language preferences for backup
   */
  exportLanguagePreferences() {
    const preferences = {
      language: this.currentLanguage,
      timestamp: new Date().toISOString(),
      stats: this.getLanguagePreferenceStats(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    return JSON.stringify(preferences, null, 2);
  }

  /**
   * Import language preferences from backup
   */
  importLanguagePreferences(preferencesJson) {
    try {
      const preferences = JSON.parse(preferencesJson);
      
      if (preferences.language && this.isValidLanguage(preferences.language)) {
        this.switchLanguage(preferences.language);
        console.log(`Language preferences imported: ${preferences.language}`);
        return true;
      } else {
        console.warn('Invalid language in preferences:', preferences.language);
        return false;
      }
    } catch (error) {
      console.error('Failed to import language preferences:', error);
      return false;
    }
  }

  /**
   * Reset language preferences to default
   */
  resetLanguagePreferences() {
    console.log('Resetting language preferences to default');
    
    this.clearLanguagePreferences();
    this.switchLanguage(this.defaultLanguage);
    
    // Log reset action
    if (typeof gtag !== 'undefined') {
      gtag('event', 'language_preferences_reset', {
        'previous_language': this.currentLanguage,
        'default_language': this.defaultLanguage
      });
    }
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
      isDefaultLanguage: this.isDefaultLanguage(),
      preferenceStats: this.getLanguagePreferenceStats(),
      storageKeys: this.storageKeys,
      storageConfig: this.storageConfig
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

  // Language preference management utilities
  window.getLanguagePreferenceStats = function() {
    return window.languageSwitcher.getLanguagePreferenceStats();
  };

  window.exportLanguagePreferences = function() {
    return window.languageSwitcher.exportLanguagePreferences();
  };

  window.importLanguagePreferences = function(preferencesJson) {
    return window.languageSwitcher.importLanguagePreferences(preferencesJson);
  };

  window.resetLanguagePreferences = function() {
    return window.languageSwitcher.resetLanguagePreferences();
  };

  window.syncLanguagePreferences = function() {
    return window.languageSwitcher.syncLanguagePreferences();
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
const translationStyleElement = document.createElement('style');
translationStyleElement.textContent = translationPreviewCSS;
document.head.appendChild(translationStyleElement);