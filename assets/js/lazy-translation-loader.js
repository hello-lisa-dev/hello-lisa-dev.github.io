/**
 * Lazy Translation Loader - Performance Optimized
 * Implements AJAX-based dynamic content loading for translations
 */
class LazyTranslationLoader {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
    this.observer = null;
    this.init();
  }

  /**
   * Initialize lazy loading
   */
  init() {
    this.setupIntersectionObserver();
    this.setupPreloadLinks();
    this.setupCacheManagement();
  }

  /**
   * Set up Intersection Observer for lazy loading
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported, falling back to immediate loading');
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadTranslationContent(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before element comes into view
      threshold: 0.1
    });

    // Observe all translation placeholders
    this.observeTranslationPlaceholders();
  }

  /**
   * Observe translation placeholders for lazy loading
   */
  observeTranslationPlaceholders() {
    const placeholders = document.querySelectorAll('[data-translation-placeholder]');
    placeholders.forEach(placeholder => {
      this.observer.observe(placeholder);
    });
  }

  /**
   * Set up preload links for critical translations
   */
  setupPreloadLinks() {
    const criticalTranslations = document.querySelectorAll('[data-preload-translation]');
    criticalTranslations.forEach(element => {
      const targetLang = element.getAttribute('data-preload-translation');
      const targetUrl = element.getAttribute('data-translation-url');
      
      if (targetLang && targetUrl) {
        this.preloadTranslation(targetLang, targetUrl);
      }
    });
  }

  /**
   * Preload critical translation content
   */
  async preloadTranslation(langCode, url) {
    try {
      const content = await this.fetchTranslationContent(url);
      this.cache.set(url, {
        content,
        timestamp: Date.now(),
        lang: langCode
      });
      console.log(`Preloaded translation: ${langCode} from ${url}`);
    } catch (error) {
      console.warn(`Failed to preload translation: ${url}`, error);
    }
  }

  /**
   * Load translation content for a placeholder
   */
  async loadTranslationContent(placeholder) {
    const targetLang = placeholder.getAttribute('data-translation-placeholder');
    const targetUrl = placeholder.getAttribute('data-translation-url');
    const fallbackContent = placeholder.getAttribute('data-fallback-content');

    if (!targetLang || !targetUrl) {
      console.warn('Invalid translation placeholder:', placeholder);
      return;
    }

    // Show loading state
    this.showLoadingState(placeholder);

    try {
      const content = await this.fetchTranslationContent(targetUrl);
      this.renderTranslationContent(placeholder, content, targetLang);
      this.cache.set(targetUrl, {
        content,
        timestamp: Date.now(),
        lang: targetLang
      });
    } catch (error) {
      console.error(`Failed to load translation: ${targetUrl}`, error);
      this.showErrorState(placeholder, error, fallbackContent);
    }
  }

  /**
   * Fetch translation content with caching and error handling
   */
  async fetchTranslationContent(url) {
    // Check cache first
    const cached = this.cache.get(url);
    if (cached && this.isCacheValid(cached)) {
      console.log(`Using cached translation: ${url}`);
      return cached.content;
    }

    // Check if already loading
    if (this.loadingPromises.has(url)) {
      console.log(`Translation already loading: ${url}`);
      return this.loadingPromises.get(url);
    }

    // Create loading promise
    const loadingPromise = this.performFetch(url);
    this.loadingPromises.set(url, loadingPromise);

    try {
      const content = await loadingPromise;
      this.loadingPromises.delete(url);
      return content;
    } catch (error) {
      this.loadingPromises.delete(url);
      throw error;
    }
  }

  /**
   * Perform actual fetch request
   */
  async performFetch(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const content = await response.text();
      return this.parseTranslationContent(content);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Translation request timed out');
      }
      throw error;
    }
  }

  /**
   * Parse translation content from HTML response
   */
  parseTranslationContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract main content area
    const mainContent = doc.querySelector('main, .page__content, .post-content, article');
    if (mainContent) {
      return mainContent.innerHTML;
    }

    // Fallback: extract body content
    const body = doc.querySelector('body');
    if (body) {
      return body.innerHTML;
    }

    // Last resort: return the HTML as-is
    return html;
  }

  /**
   * Render translation content into placeholder
   */
  renderTranslationContent(placeholder, content, langCode) {
    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'translation-content';
    contentContainer.setAttribute('data-lang', langCode);
    contentContainer.innerHTML = content;

    // Add fade-in animation
    contentContainer.style.opacity = '0';
    contentContainer.style.transition = 'opacity 0.3s ease-in-out';

    // Replace placeholder
    placeholder.parentNode.replaceChild(contentContainer, placeholder);

    // Animate in
    requestAnimationFrame(() => {
      contentContainer.style.opacity = '1';
    });

    // Track successful load
    this.trackTranslationLoad(langCode, true);
  }

  /**
   * Show loading state
   */
  showLoadingState(placeholder) {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'translation-loading';
    loadingElement.innerHTML = `
      <div class="loading-spinner"></div>
      <span class="loading-text">Loading translation...</span>
    `;
    
    placeholder.innerHTML = '';
    placeholder.appendChild(loadingElement);
  }

  /**
   * Show error state
   */
  showErrorState(placeholder, error, fallbackContent) {
    const errorElement = document.createElement('div');
    errorElement.className = 'translation-error';
    errorElement.innerHTML = `
      <div class="error-content">
        <p class="error-message">Translation not available</p>
        <p class="error-details">${error.message}</p>
        ${fallbackContent ? `<div class="fallback-content">${fallbackContent}</div>` : ''}
      </div>
    `;
    
    placeholder.innerHTML = '';
    placeholder.appendChild(errorElement);

    // Track failed load
    this.trackTranslationLoad(placeholder.getAttribute('data-translation-placeholder'), false);
  }

  /**
   * Check if cached content is still valid
   */
  isCacheValid(cached) {
    const maxAge = 5 * 60 * 1000; // 5 minutes
    return (Date.now() - cached.timestamp) < maxAge;
  }

  /**
   * Set up cache management
   */
  setupCacheManagement() {
    // Clear old cache entries periodically
    setInterval(() => {
      this.cleanupCache();
    }, 10 * 60 * 1000); // Every 10 minutes

    // Clear cache on page unload
    window.addEventListener('beforeunload', () => {
      this.cache.clear();
    });
  }

  /**
   * Clean up expired cache entries
   */
  cleanupCache() {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutes

    for (const [url, cached] of this.cache.entries()) {
      if ((now - cached.timestamp) > maxAge) {
        this.cache.delete(url);
        console.log(`Cleaned up expired cache: ${url}`);
      }
    }
  }

  /**
   * Track translation load events
   */
  trackTranslationLoad(langCode, success) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'translation_load', {
        'language': langCode,
        'success': success,
        'cache_hit': this.cache.has(langCode)
      });
    }

    console.log(`Translation load tracked: ${langCode}, success: ${success}`);
  }

  /**
   * Preload translations for visible elements
   */
  preloadVisibleTranslations() {
    const visiblePlaceholders = document.querySelectorAll('[data-translation-placeholder]');
    
    visiblePlaceholders.forEach(placeholder => {
      const rect = placeholder.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const targetLang = placeholder.getAttribute('data-translation-placeholder');
        const targetUrl = placeholder.getAttribute('data-translation-url');
        
        if (targetLang && targetUrl) {
          this.preloadTranslation(targetLang, targetUrl);
        }
      }
    });
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.entries()).map(([url, cached]) => ({
        url,
        lang: cached.lang,
        age: Date.now() - cached.timestamp
      }))
    };
  }

  /**
   * Clear all cache
   */
  clearCache() {
    this.cache.clear();
    this.loadingPromises.clear();
    console.log('Translation cache cleared');
  }
}

// Initialize lazy translation loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.lazyTranslationLoader = new LazyTranslationLoader();
  
  // Expose methods for external use
  window.preloadVisibleTranslations = function() {
    return window.lazyTranslationLoader.preloadVisibleTranslations();
  };
  
  window.getTranslationCacheStats = function() {
    return window.lazyTranslationLoader.getCacheStats();
  };
  
  window.clearTranslationCache = function() {
    return window.lazyTranslationLoader.clearCache();
  };
});

// CSS for loading states (injected via JavaScript)
const lazyLoadingCSS = `
  .translation-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: #666;
  }
  
  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007acc;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-text {
    font-size: 0.9rem;
  }
  
  .translation-error {
    padding: 1rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.375rem;
    color: #991b1b;
  }
  
  .error-message {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .error-details {
    font-size: 0.875rem;
    opacity: 0.8;
    margin-bottom: 0.5rem;
  }
  
  .fallback-content {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #fecaca;
  }
  
  .translation-content {
    transition: opacity 0.3s ease-in-out;
  }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = lazyLoadingCSS;
document.head.appendChild(style);

