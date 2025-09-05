# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based blog site with dual purposes:
1. **Primary**: Personal blog using Minimal Mistakes theme
2. **Secondary**: TipSmart app support pages served as a subdirectory

## Development Commands

### Local Development
- `bundle install` - Install Ruby gems and dependencies
- `bundle exec jekyll serve` - Run development server at http://localhost:4000
- `bundle exec jekyll serve --drafts` - Include draft posts in development
- `bundle exec jekyll build` - Build the site for production

### Dependencies
- Uses GitHub Pages compatible gems via `github-pages` gem
- Theme: `mmistakes/minimal-mistakes@4.27.3` (remote theme)
- Key plugins: jekyll-paginate, jekyll-sitemap, jekyll-gist, jekyll-feed, jekyll-include-cache

## Site Architecture

**📋 For detailed architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md)**

### Quick Reference
- `index.md` - **Main blog landing page** (currently contains TipSmart content but should be blog-focused)
- `_pages/` - Static pages (about, categories, tags, portfolio, year-archive)
- `_posts/` - Blog posts with Jekyll naming convention (YYYY-MM-DD-title.md)
- `_data/navigation.yml` - Site navigation configuration
- `_config.yml` - Jekyll configuration with site metadata and author info
- `assets/` - Static assets (CSS, JS, images)

### Minimal Mistakes Layouts
**✅ IMPORTANT**: Use `layout: single` for blog posts (NOT `layout: post`)

Available layouts:
- `home` - Homepage layout
- `single` - **Posts and pages** (recommended for all content)
- `archive` - Category/tag pages
- `splash` - Landing pages
- `page` - General pages

**See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete layout guide and usage examples.**

## SEO Configuration

### Custom SEO Titles
When you need different titles for SEO vs. page display:

```yaml
---
title: "Display Title"
seo_title: "SEO Optimized Title for Search Engines"
description: "Page description for meta tags"
---

{% seo title=false %}
<title>{{ page.seo_title | default: page.title }} - {{ site.title }}</title>
```

- `title`: Shows on the page itself
- `seo_title`: Used for HTML `<title>` tag and SEO
- `description`: Used for meta description
- `{% seo title=false %}`: Disables Jekyll SEO Tag's default title generation

## Page-Specific CSS

### Setup (Already Configured)
- Custom CSS support via `_includes/head/custom.html`
- Automatically includes CSS files based on front matter

### Usage
Add to page front matter:

```yaml
# Single CSS file
custom_css_file: filename

# Multiple CSS files  
custom_css:
  - file1
  - file2
```

CSS files should be placed in `/assets/css/` directory (e.g., `/assets/css/tipsmart.css`).

## Content Guidelines

When working with content:
- **Blog content**: Use Jekyll posts in `_posts/` with proper front matter
- **TipSmart pages**: Keep under `_pages/` with `/tip-smart/` permalinks
- Follow existing Korean/English mixed documentation style
- Maintain consistent front matter: `layout: single` and `author_profile: true`
- Use `custom_css_file` or `custom_css` for page-specific styling