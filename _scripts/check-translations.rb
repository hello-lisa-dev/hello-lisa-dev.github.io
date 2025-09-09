#!/usr/bin/env ruby
# Simple Translation Checker
# Usage: ruby _scripts/check-translations.rb

require 'yaml'
require 'find'

puts "🔍 Checking translations..."

translation_groups = {}
issues = []

# Find all posts and pages
['_posts', '_pages'].each do |directory|
  next unless Dir.exist?(directory)
  
  Find.find(directory) do |path|
    next unless File.file?(path) && path.end_with?('.md')
    
    begin
      content = File.read(path)
      next unless content =~ /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
      
      front_matter = YAML.load($1)
      
      # Check for translation template markers
      if front_matter['title']&.include?('[TRANSLATE]')
        issues << "#{path}: Title needs translation"
      end
      
      if front_matter['description']&.include?('[TRANSLATE]')
        issues << "#{path}: Description needs translation"
      end
      
      if content.include?('<!-- TRANSLATE THE CONTENT BELOW -->')
        issues << "#{path}: Content needs translation"
      end
      
      # Collect translation groups
      if front_matter['translation_key']
        key = front_matter['translation_key']
        lang = front_matter['lang'] || 'ko'
        
        translation_groups[key] ||= []
        translation_groups[key] << {
          lang: lang,
          file: path,
          title: front_matter['title']
        }
      end
      
    rescue => e
      issues << "#{path}: Error reading file - #{e.message}"
    end
  end
end

# Show translation groups
puts "\n📋 Translation Groups:"
translation_groups.each do |key, translations|
  puts "  #{key}:"
  translations.each do |t|
    puts "    #{t[:lang]}: #{t[:title]} (#{File.basename(t[:file])})"
  end
  
  # Check for missing languages
  existing_langs = translations.map { |t| t[:lang] }
  missing_langs = ['ko', 'en', 'es'] - existing_langs
  unless missing_langs.empty?
    puts "    Missing: #{missing_langs.join(', ')}"
  end
  puts
end

# Show issues
if issues.any?
  puts "⚠️  Issues found:"
  issues.each { |issue| puts "  #{issue}" }
else
  puts "✅ No issues found!"
end

puts "\n📊 Summary:"
puts "  Translation groups: #{translation_groups.size}"
puts "  Total files: #{translation_groups.values.flatten.size}"
puts "  Issues: #{issues.size}"