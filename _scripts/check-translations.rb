#!/usr/bin/env ruby
# Simple Translation Checker

require 'yaml'
require 'find'

puts "🔍 Checking translation status..."

posts_by_key = {}
errors = []
warnings = []

# Find all posts
Find.find('_posts') do |path|
  next unless path.end_with?('.md')
  
  begin
    content = File.read(path)
    next unless content.start_with?('---')
    
    parts = content.split('---', 3)
    next if parts.length < 3
    
    front_matter = YAML.safe_load(parts[1], permitted_classes: [Date, Time])
    next unless front_matter
    
    translation_key = front_matter['translation_key']
    lang = front_matter['lang']
    
    if translation_key
      posts_by_key[translation_key] ||= []
      posts_by_key[translation_key] << {
        path: path,
        lang: lang,
        title: front_matter['title']
      }
    else
      warnings << "⚠️  No translation_key in #{path}"
    end
    
  rescue => e
    errors << "❌ Error reading #{path}: #{e.message}"
  end
end

puts "\n📊 Translation Status:"
puts "=" * 50

posts_by_key.each do |key, posts|
  puts "\n🔗 #{key}:"
  posts.each do |post|
    puts "   #{post[:lang]}: #{post[:title]} (#{post[:path]})"
  end
  
  languages = posts.map { |p| p[:lang] }.compact
  missing = ['ko', 'en', 'es'] - languages
  if missing.any?
    puts "   ⚠️  Missing: #{missing.join(', ')}"
  end
end

if warnings.any?
  puts "\n⚠️  Warnings:"
  warnings.each { |w| puts "   #{w}" }
end

if errors.any?
  puts "\n❌ Errors:"
  errors.each { |e| puts "   #{e}" }
end

puts "\n📈 Summary:"
puts "   Translation groups: #{posts_by_key.length}"
puts "   Total posts: #{posts_by_key.values.flatten.length}"
puts "   Errors: #{errors.length}"
puts "   Warnings: #{warnings.length}"