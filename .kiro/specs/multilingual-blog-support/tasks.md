# Implementation Plan

**Note:** `_Implements Requirements: X.Y_` 표시는 해당 작업이 구현하는 요구사항 번호를 의미합니다. 작업은 1번부터 순차적으로 진행하면 됩니다.

- [x] 1. Set up multilingual configuration structure
  - Create language configuration in `_config.yml` with supported languages (Korean, English, Spanish)
  - Add category translation mappings for existing categories
  - Configure language metadata including locales and text direction
  - _Implements Requirements: 6.1, 6.2_

- [x] 2. Create language data files and UI text translations
  - Create `_data/languages.yml` with language definitions and native names
  - Create `_data/ui-text.yml` with interface text translations for each language
  - Add language-specific navigation text and common UI elements
  - _Implements Requirements: 2.2, 6.1_

- [x] 3. Implement core language detection and switching logic
  - Create `assets/js/language-switcher.js` with URL parameter detection
  - Implement localStorage-based language preference storage
  - Add fallback logic for unsupported languages
  - Create language validation functions
  - _Implements Requirements: 1.2, 4.1, 4.2_

- [x] 4. Build language switcher UI component
  - Create `_includes/language-switcher.html` with dropdown interface
  - Add language flags and native names display
  - Implement click handlers for language selection
  - Style the component to match Minimal Mistakes theme
  - _Implements Requirements: 2.1, 2.2_

- [x] 5. Create translation linking system
  - Create `_includes/translation-links.html` for cross-language navigation
  - Implement `translation_key` matching logic using Liquid templates
  - Add "Available in other languages" section to posts
  - Handle missing translation scenarios gracefully
  - _Implements Requirements: 1.3, 3.2_

- [ ] 6. Extend post front matter structure for multilingual support
  - Add `lang` field to identify post language
  - Add `translation_key` field to link related translations
  - Add `translations` hash with available language URLs
  - Update existing posts with new front matter fields
  - _Implements Requirements: 3.1, 3.2, 3.3_

- [ ] 7. Implement category translation system
  - Create Liquid filter for category name translation
  - Update category archive pages to use translated names
  - Modify post display templates to show translated categories
  - Ensure category URLs reflect the selected language
  - _Implements Requirements: 4.3, 4.4_

- [ ] 8. Create directory structure for translated posts
  - Create `_posts/en/` directory for English translations
  - Create `_posts/es/` directory for Spanish translations
  - Set up proper Jekyll collection configuration for language directories
  - Test post discovery and URL generation for translated content
  - _Implements Requirements: 3.1, 4.1_

- [ ] 9. Implement SEO optimization for multilingual content
  - Create `_includes/hreflang-tags.html` for automatic hreflang generation
  - Update `_includes/seo.html` to include language-specific meta tags
  - Add language information to structured data (JSON-LD)
  - Ensure proper HTML lang attribute setting based on content language
  - _Implements Requirements: 5.1, 5.2, 5.4_

- [ ] 10. Build content switching functionality
  - Implement JavaScript function to switch content based on language parameter
  - Add AJAX loading for translated content when available
  - Show fallback content with translation notice when translation missing
  - Update browser URL and history when language changes
  - _Implements Requirements: 1.1, 1.2, 1.4_

- [ ] 11. Create multilingual sitemap generation
  - Extend Jekyll sitemap plugin to include language annotations
  - Generate separate sitemaps for each language
  - Add proper `xhtml:link` elements for alternate language versions
  - Test sitemap validation with Google Search Console format
  - _Implements Requirements: 5.3_

- [ ] 12. Implement error handling and fallback mechanisms
  - Create fallback chain logic (Spanish → English → Korean)
  - Add user-friendly error messages for missing translations
  - Implement graceful degradation when JavaScript is disabled
  - Add logging for translation errors and missing content
  - _Implements Requirements: 1.3, 2.3_

- [ ] 13. Add language preference persistence
  - Implement cookie-based language preference storage
  - Add session storage backup for language selection
  - Create user preference detection from browser language
  - Ensure language preference survives page navigation
  - _Implements Requirements: 2.4, 4.2_

- [ ] 14. Create translation workflow helpers
  - Create Jekyll plugin or script to generate translation templates
  - Add front matter validation for translation consistency
  - Create helper script to identify posts missing translations
  - Add translation status tracking in post metadata
  - _Implements Requirements: 3.4, 3.5_

- [ ] 15. Style multilingual components
  - Create CSS for language switcher dropdown styling
  - Add responsive design for language selector on mobile
  - Style translation availability notices and links
  - Ensure consistent styling with Minimal Mistakes theme
  - _Implements Requirements: 2.1, 2.2_

- [ ] 16. Test multilingual functionality end-to-end
  - Create test posts in multiple languages with proper linking
  - Test language switching across different post types and pages
  - Validate SEO tags and hreflang implementation
  - Test fallback behavior for missing translations
  - _Implements Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 17. Create first English translation of existing post
  - Select "바이브 코딩이란?" post for initial English translation
  - Create properly structured English markdown file in `_posts/en/`
  - Add proper front matter with translation linking
  - Test cross-language navigation and SEO tags
  - _Implements Requirements: 3.1, 3.2_

- [ ] 18. Optimize performance and loading
  - Minimize JavaScript bundle size for language switching
  - Implement lazy loading for translation content
  - Optimize CSS for language-specific styling
  - Test page load performance impact of multilingual features
  - _Implements Requirements: 1.2, 2.2_