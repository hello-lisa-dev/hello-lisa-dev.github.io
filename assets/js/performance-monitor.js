/**
 * Performance Monitor for Multilingual Features
 * Measures and reports performance impact of language switching
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoad: {},
      languageSwitch: {},
      translationLoad: {},
      cache: {}
    };
    this.observers = [];
    this.init();
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    this.setupPerformanceObserver();
    this.setupResourceTiming();
    this.setupLanguageSwitchTracking();
    this.setupCacheMetrics();
    this.setupCoreWebVitals();
  }

  /**
   * Set up Performance Observer for navigation and resource timing
   */
  setupPerformanceObserver() {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    // Navigation timing
    try {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordNavigationMetrics(entry);
        }
      });
      navObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navObserver);
    } catch (error) {
      console.warn('Navigation timing observer failed:', error);
    }

    // Resource timing
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordResourceMetrics(entry);
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    } catch (error) {
      console.warn('Resource timing observer failed:', error);
    }

    // Long task detection
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordLongTask(entry);
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.push(longTaskObserver);
    } catch (error) {
      console.warn('Long task observer failed:', error);
    }
  }

  /**
   * Record navigation metrics
   */
  recordNavigationMetrics(entry) {
    this.metrics.pageLoad = {
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      loadComplete: entry.loadEventEnd - entry.loadEventStart,
      firstByte: entry.responseStart - entry.requestStart,
      domInteractive: entry.domInteractive - entry.navigationStart,
      totalTime: entry.loadEventEnd - entry.navigationStart,
      timestamp: Date.now()
    };

    console.log('Page load metrics:', this.metrics.pageLoad);
    this.reportMetrics('page_load', this.metrics.pageLoad);
  }

  /**
   * Record resource metrics
   */
  recordResourceMetrics(entry) {
    const resourceType = this.getResourceType(entry.name);
    
    if (!this.metrics.translationLoad[resourceType]) {
      this.metrics.translationLoad[resourceType] = [];
    }

    const resourceMetrics = {
      name: entry.name,
      duration: entry.duration,
      transferSize: entry.transferSize,
      encodedBodySize: entry.encodedBodySize,
      decodedBodySize: entry.decodedBodySize,
      timestamp: Date.now()
    };

    this.metrics.translationLoad[resourceType].push(resourceMetrics);

    // Keep only last 10 entries per type
    if (this.metrics.translationLoad[resourceType].length > 10) {
      this.metrics.translationLoad[resourceType].shift();
    }

    // Report if it's a translation-related resource
    if (this.isTranslationResource(entry.name)) {
      this.reportMetrics('translation_resource', resourceMetrics);
    }
  }

  /**
   * Get resource type from URL
   */
  getResourceType(url) {
    if (url.includes('/en/') || url.includes('/es/')) return 'translation';
    if (url.includes('.js')) return 'javascript';
    if (url.includes('.css')) return 'stylesheet';
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.svg')) return 'image';
    return 'other';
  }

  /**
   * Check if resource is translation-related
   */
  isTranslationResource(url) {
    return url.includes('/en/') || url.includes('/es/') || url.includes('translation');
  }

  /**
   * Record long task
   */
  recordLongTask(entry) {
    const longTask = {
      duration: entry.duration,
      startTime: entry.startTime,
      timestamp: Date.now()
    };

    console.warn('Long task detected:', longTask);
    this.reportMetrics('long_task', longTask);
  }

  /**
   * Set up language switch tracking
   */
  setupLanguageSwitchTracking() {
    // Listen for language change events
    document.addEventListener('languageChanged', (event) => {
      this.recordLanguageSwitch(event.detail);
    });

    // Track language switcher interactions
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
      languageSwitcher.addEventListener('click', () => {
        this.startLanguageSwitchTimer();
      });
    }
  }

  /**
   * Start timer for language switch
   */
  startLanguageSwitchTimer() {
    this.languageSwitchStartTime = performance.now();
  }

  /**
   * Record language switch metrics
   */
  recordLanguageSwitch(detail) {
    const switchTime = performance.now() - (this.languageSwitchStartTime || 0);
    
    this.metrics.languageSwitch = {
      from: detail.previousLanguage,
      to: detail.newLanguage,
      switchTime: switchTime,
      timestamp: detail.timestamp
    };

    console.log('Language switch metrics:', this.metrics.languageSwitch);
    this.reportMetrics('language_switch', this.metrics.languageSwitch);
  }

  /**
   * Set up cache metrics
   */
  setupCacheMetrics() {
    // Monitor cache performance
    if (window.lazyTranslationLoader) {
      setInterval(() => {
        const cacheStats = window.lazyTranslationLoader.getCacheStats();
        this.metrics.cache = {
          size: cacheStats.size,
          hitRate: this.calculateCacheHitRate(cacheStats),
          timestamp: Date.now()
        };
      }, 30000); // Every 30 seconds
    }
  }

  /**
   * Calculate cache hit rate
   */
  calculateCacheHitRate(cacheStats) {
    // This would need to be implemented based on actual cache usage
    return 0.85; // Placeholder
  }

  /**
   * Set up Core Web Vitals monitoring
   */
  setupCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
  }

  /**
   * Observe Largest Contentful Paint
   */
  observeLCP() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.reportMetrics('lcp', {
          value: lastEntry.startTime,
          element: lastEntry.element?.tagName || 'unknown',
          timestamp: Date.now()
        });
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (error) {
      console.warn('LCP observer failed:', error);
    }
  }

  /**
   * Observe First Input Delay
   */
  observeFID() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.reportMetrics('fid', {
            value: entry.processingStart - entry.startTime,
            eventType: entry.name,
            timestamp: Date.now()
          });
        }
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (error) {
      console.warn('FID observer failed:', error);
    }
  }

  /**
   * Observe Cumulative Layout Shift
   */
  observeCLS() {
    if (!('PerformanceObserver' in window)) return;

    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        
        this.reportMetrics('cls', {
          value: clsValue,
          timestamp: Date.now()
        });
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (error) {
      console.warn('CLS observer failed:', error);
    }
  }

  /**
   * Set up resource timing analysis
   */
  setupResourceTiming() {
    // Analyze existing resources
    setTimeout(() => {
      const resources = performance.getEntriesByType('resource');
      this.analyzeResourceTiming(resources);
    }, 1000);
  }

  /**
   * Analyze resource timing
   */
  analyzeResourceTiming(resources) {
    const analysis = {
      totalResources: resources.length,
      totalSize: 0,
      totalTime: 0,
      byType: {},
      slowResources: []
    };

    resources.forEach(resource => {
      const type = this.getResourceType(resource.name);
      
      if (!analysis.byType[type]) {
        analysis.byType[type] = {
          count: 0,
          totalSize: 0,
          totalTime: 0,
          avgSize: 0,
          avgTime: 0
        };
      }

      analysis.byType[type].count++;
      analysis.byType[type].totalSize += resource.transferSize || 0;
      analysis.byType[type].totalTime += resource.duration || 0;

      analysis.totalSize += resource.transferSize || 0;
      analysis.totalTime += resource.duration || 0;

      // Identify slow resources (>1 second)
      if (resource.duration > 1000) {
        analysis.slowResources.push({
          name: resource.name,
          duration: resource.duration,
          size: resource.transferSize
        });
      }
    });

    // Calculate averages
    Object.keys(analysis.byType).forEach(type => {
      const typeData = analysis.byType[type];
      typeData.avgSize = typeData.totalSize / typeData.count;
      typeData.avgTime = typeData.totalTime / typeData.count;
    });

    console.log('Resource timing analysis:', analysis);
    this.reportMetrics('resource_analysis', analysis);
  }

  /**
   * Report metrics to analytics
   */
  reportMetrics(type, data) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        'metric_type': type,
        'metric_data': JSON.stringify(data),
        'timestamp': Date.now()
      });
    }

    // Custom analytics
    if (typeof window.analytics !== 'undefined') {
      window.analytics.track('Performance Metric', {
        type: type,
        data: data,
        timestamp: new Date().toISOString()
      });
    }

    // Console logging for development
    console.log(`Performance metric [${type}]:`, data);
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    return {
      pageLoad: this.metrics.pageLoad,
      languageSwitch: this.metrics.languageSwitch,
      translationLoad: this.metrics.translationLoad,
      cache: this.metrics.cache,
      timestamp: Date.now()
    };
  }

  /**
   * Generate performance report
   */
  generatePerformanceReport() {
    const summary = this.getPerformanceSummary();
    const report = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      summary: summary,
      recommendations: this.generateRecommendations(summary)
    };

    console.log('Performance Report:', report);
    return report;
  }

  /**
   * Generate performance recommendations
   */
  generateRecommendations(summary) {
    const recommendations = [];

    // Page load recommendations
    if (summary.pageLoad.totalTime > 3000) {
      recommendations.push({
        type: 'page_load',
        issue: 'Slow page load time',
        suggestion: 'Consider optimizing images and reducing JavaScript bundle size'
      });
    }

    // Language switch recommendations
    if (summary.languageSwitch.switchTime > 1000) {
      recommendations.push({
        type: 'language_switch',
        issue: 'Slow language switching',
        suggestion: 'Implement preloading and improve cache strategy'
      });
    }

    // Translation load recommendations
    const translationResources = summary.translationLoad.translation || [];
    if (translationResources.length > 0) {
      const avgLoadTime = translationResources.reduce((sum, r) => sum + r.duration, 0) / translationResources.length;
      if (avgLoadTime > 500) {
        recommendations.push({
          type: 'translation_load',
          issue: 'Slow translation loading',
          suggestion: 'Implement lazy loading and improve caching'
        });
      }
    }

    return recommendations;
  }

  /**
   * Clean up observers
   */
  cleanup() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Failed to disconnect observer:', error);
      }
    });
    this.observers = [];
  }
}

// Initialize performance monitor when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.performanceMonitor = new PerformanceMonitor();
  
  // Expose methods for external use
  window.getPerformanceSummary = function() {
    return window.performanceMonitor.getPerformanceSummary();
  };
  
  window.generatePerformanceReport = function() {
    return window.performanceMonitor.generatePerformanceReport();
  };
  
  // Generate report on page unload
  window.addEventListener('beforeunload', function() {
    const report = window.performanceMonitor.generatePerformanceReport();
    // Store report for analysis
    try {
      localStorage.setItem('performance_report', JSON.stringify(report));
    } catch (error) {
      console.warn('Failed to store performance report:', error);
    }
  });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceMonitor;
}

