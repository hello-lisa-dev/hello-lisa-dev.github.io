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

## Google Analytics

**📋 For detailed Google Analytics configuration, see [ARCHITECTURE.md](./ARCHITECTURE.md)**

- **Status**: Configured with GA4 (Measurement ID: `G-`)
- **Implementation**: Manual setup via `_includes/head/google-analytics.html`
- **Note**: Data collection starts after GitHub Pages deployment

## Image Assets Creation

### Required Images (Currently Placeholders)

The following image files need to be created to replace current placeholders:

#### 1. Favicon Files
- **`favicon.ico`** (16x16, 32x32, 48x48 pixels)
  - **Purpose**: Browser tab icon, bookmarks
  - **Content**: LISA logo or "L" monogram
  - **Format**: ICO (multi-size)
  - **Prompt**: "Create a favicon.ico with LISA logo or stylized 'L' letter in blue (#007AFF) on white background, 16x16, 32x32, and 48x48 pixel sizes"

- **`apple-touch-icon.png`** (180x180 pixels)
  - **Purpose**: iOS home screen icon
  - **Content**: LISA logo with rounded corners
  - **Format**: PNG with transparency
  - **Prompt**: "Create an Apple touch icon 180x180px with LISA logo in blue (#007AFF) on white background, iOS style with subtle shadow and rounded corners"

#### 2. Open Graph Image
- **`assets/images/og-image.jpg`** (1200x630 pixels)
  - **Purpose**: Social media sharing preview (Facebook, Twitter, LinkedIn)
  - **Content**: LISA blog branding with title
  - **Format**: JPG
  - **Prompt**: "Create a social media sharing image 1200x630px with 'LISA Development Team Blog' title, LISA logo, and tagline 'Development insights, tutorials, and updates' in modern design with blue (#007AFF) and white color scheme"

#### 3. Additional Recommended Images
- **`assets/images/logo.png`** (512x512 pixels)
  - **Purpose**: Site logo for structured data and branding
  - **Content**: LISA logo in high resolution
  - **Format**: PNG with transparency
  - **Prompt**: "Create a high-resolution LISA logo 512x512px in blue (#007AFF) with clean, modern design suitable for web use"

- **`assets/images/bio-photo.jpg`** (400x400 pixels)
  - **Purpose**: Author profile photo
  - **Content**: Professional headshot or avatar
  - **Format**: JPG
  - **Prompt**: "Create a professional author photo 400x400px - either a clean avatar illustration or placeholder for team photo"

### Image Creation Guidelines

#### Design Requirements
- **Primary Color**: Blue (#007AFF) - matches iOS/system blue
- **Secondary Color**: White (#FFFFFF)
- **Typography**: Clean, modern sans-serif fonts
- **Style**: Minimalist, professional, tech-focused

#### Technical Requirements
- **Favicon**: Must work at small sizes (16px)
- **OG Image**: Must be readable when scaled down in social feeds
- **All Images**: Optimized for web (compressed but high quality)
- **Formats**: Use appropriate formats (ICO for favicon, PNG for logos, JPG for photos)

#### Brand Consistency
- **Logo**: Consistent across all image assets
- **Colors**: Maintain blue/white color scheme
- **Typography**: Use consistent font family
- **Style**: Professional, clean, modern aesthetic

### Implementation Priority
1. **High Priority**: `favicon.ico`, `apple-touch-icon.png`, `og-image.jpg`
2. **Medium Priority**: `logo.png`, `bio-photo.jpg`
3. **Future**: Additional social media images, blog post featured images

## Content Guidelines

When working with content:
- **Blog content**: Use Jekyll posts in `_posts/` with proper front matter
- **TipSmart pages**: Keep under `_pages/` with `/tip-smart/` permalinks
- Follow existing Korean/English mixed documentation style
- Maintain consistent front matter: `layout: single` and `author_profile: true`
- Use `custom_css_file` or `custom_css` for page-specific styling