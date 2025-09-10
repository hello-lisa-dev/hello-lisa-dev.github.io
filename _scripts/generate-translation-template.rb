#!/usr/bin/env ruby
# Simple Translation Template Generator
# Usage: ruby _scripts/generate-translation-template.rb <source_file> <target_language>

require 'yaml'
require 'fileutils'

if ARGV.length != 2
  puts "Usage: ruby #{$0} <source_file> <target_language>"
  puts "Example: ruby #{$0} _posts/2025-09-06-my-post.md en"
  puts "Supported languages: ko, en, es"
  exit 1
end

source_file = ARGV[0]
target_language = ARGV[1]
supported_languages = ['ko', 'en', 'es']

unless File.exist?(source_file)
  puts "❌ Source file not found: #{source_file}"
  exit 1
end

unless supported_languages.include?(target_language)
  puts "❌ Unsupported target language: #{target_language}"
  puts "   Supported languages: #{supported_languages.join(', ')}"
  exit 1
end

# Read source file
content = File.read(source_file)

unless content =~ /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
  puts "❌ No front matter found in source file"
  exit 1
end

front_matter = YAML.load($1)
body_content = content[($1 + $2).length..-1]

# Generate target file path
if source_file.start_with?('_posts/')
  filename = File.basename(source_file)
  target_file = "_posts/#{target_language}/#{filename}"
elsif source_file.start_with?('_pages/')
  relative_path = source_file.sub('_pages/', '')
  target_file = "_pages/#{target_language}/#{relative_path}"
else
  puts "❌ Unsupported file location: #{source_file}"
  exit 1
end

# Create target directory
target_dir = File.dirname(target_file)
FileUtils.mkdir_p(target_dir) unless Dir.exist?(target_dir)

# Check if target file already exists
if File.exist?(target_file)
  puts "⚠️  Target file already exists: #{target_file}"
  print "   Overwrite? (y/N): "
  response = STDIN.gets.chomp.downcase
  exit 1 unless response == 'y' || response == 'yes'
end

# Update front matter
front_matter['lang'] = target_language

if front_matter['permalink']
  front_matter['permalink'] = "/#{target_language}#{front_matter['permalink']}"
end

# Add translation template markers
front_matter['title'] = "[TRANSLATE] #{front_matter['title']}" if front_matter['title']
front_matter['description'] = "[TRANSLATE] #{front_matter['description']}" if front_matter['description']

# Write target file
File.open(target_file, 'w') do |file|
  file.write("---\n")
  file.write(front_matter.to_yaml.sub(/^---\n/, ''))
  file.write("---\n\n")
  file.write("<!-- TRANSLATE THE CONTENT BELOW -->\n\n")
  file.write(body_content)
end

puts "✅ Translation template generated: #{target_file}"
puts "📝 Next steps:"
puts "   1. Translate the content in #{target_file}"
puts "   2. Remove [TRANSLATE] markers from front matter"
puts "   3. Remove translation instruction comments"