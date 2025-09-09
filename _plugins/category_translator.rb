module Jekyll
  module CategoryTranslator
    # Translate a category name based on the current language
    def translate_category(category, lang = nil)
      # Get the current language from page context or site default
      current_lang = lang || @context.registers[:page]['lang'] || @context.registers[:site].config['default_language'] || 'ko'
      
      # Get category translations from site config
      category_translations = @context.registers[:site].config['category_translations'] || {}
      
      # Return translated category if available, otherwise return original
      if category_translations[category] && category_translations[category][current_lang]
        category_translations[category][current_lang]
      else
        category
      end
    end
    
    # Translate all categories for a post
    def translate_categories(categories, lang = nil)
      return [] unless categories
      
      current_lang = lang || @context.registers[:page]['lang'] || @context.registers[:site].config['default_language'] || 'ko'
      
      categories.map do |category|
        translate_category(category, current_lang)
      end
    end
    
    # Get category URL with language parameter
    def category_url_with_lang(category, lang = nil)
      current_lang = lang || @context.registers[:page]['lang'] || @context.registers[:site].config['default_language'] || 'ko'
      translated_category = translate_category(category, current_lang)
      
      # Create URL-friendly version of category
      category_slug = translated_category.downcase.gsub(/[^a-z0-9\-_가-힣]/, '-').gsub(/-+/, '-').gsub(/^-|-$/, '')
      
      base_url = "/categories/##{category_slug}"
      
      # Add language parameter if not default language
      if current_lang != (@context.registers[:site].config['default_language'] || 'ko')
        base_url += "?lang=#{current_lang}"
      end
      
      base_url
    end
  end
end

Liquid::Template.register_filter(Jekyll::CategoryTranslator)