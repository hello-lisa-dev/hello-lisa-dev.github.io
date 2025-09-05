# ARCHITECTURE.md

This document describes the technical architecture and structure of the LISA Development Team blog site.

## Site Architecture

### Content Structure
- `index.md` - **Main blog landing page** (currently contains TipSmart content but should be blog-focused)
- `_pages/` - Static pages (about, categories, tags, portfolio, year-archive)
- `_posts/` - Blog posts with Jekyll naming convention (YYYY-MM-DD-title.md)
- `_data/navigation.yml` - Site navigation configuration
- `_config.yml` - Jekyll configuration with site metadata and author info
- `assets/` - Static assets (CSS, JS, images)

### Current Issue
The current `index.md` contains TipSmart app support content, but this should be moved to a dedicated `tip-smart/` subdirectory. The main `index.md` should serve as the blog's homepage.

### TipSmart Integration
- TipSmart support pages should be organized under `/tip-smart/` URL path
- Move current TipSmart content from `index.md` to `tip-smart/index.md`
- Move `privacy-policy.html` to `tip-smart/privacy-policy.html`
- Create proper blog homepage for main `index.md`

## Minimal Mistakes Theme Layouts

### Available Layouts
Minimal Mistakes theme provides the following standard layouts:

#### Core Layouts
- **`default`** - Base layout that all other layouts extend from
  - Includes header, footer, sidebar, and common elements
  - Not typically used directly in front matter

- **`home`** - Homepage layout
  - Displays recent posts list
  - Used for main blog landing page
  - Example: `index.md` with `layout: home`

- **`single`** - Single post/page layout ✅ **RECOMMENDED FOR POSTS**
  - Optimized for individual posts and pages
  - Includes author profile, reading time, comments, sharing
  - **This is the correct layout for blog posts** (not `layout: post`)

- **`archive`** - Archive pages layout
  - Used for category, tag, and year archive pages
  - Displays filtered post lists

- **`splash`** - Landing page layout
  - Full-screen splash pages
  - Minimal navigation, maximum visual impact

- **`page`** - General page layout
  - Standard pages like About, Contact
  - Clean, content-focused design

### Layout Usage Guidelines

#### For Blog Posts
```yaml
---
layout: single  # ✅ CORRECT - Minimal Mistakes standard
title: "Post Title"
date: 2025-01-04 10:00:00 +0900
categories: [Development, Jekyll]
tags: [jekyll, blog, github-pages]
author: LISA
author_profile: true
read_time: true
comments: true
share: true
related: true
---
```

#### For Static Pages
```yaml
---
layout: single  # ✅ RECOMMENDED
permalink: /about/
title: "About"
author_profile: true
---
```

#### For Homepage
```yaml
---
layout: home  # ✅ FOR BLOG HOMEPAGE
author_profile: true
---
```

#### For Archive Pages
```yaml
---
layout: archive  # ✅ FOR CATEGORY/TAG PAGES
permalink: /categories/
title: "Categories"
---
```

### Important Notes

#### ❌ Common Mistakes
- **`layout: post`** - This layout does NOT exist in Minimal Mistakes theme
- Using non-existent layouts will cause CSS/styling issues
- Always use `layout: single` for blog posts

#### ✅ Best Practices
- Use `layout: single` for all blog posts
- Use `layout: home` for the main blog homepage
- Use `layout: archive` for category/tag pages
- Use `layout: page` for simple static pages

## Theme Configuration

### Current Setup
- Uses Minimal Mistakes remote theme (`mmistakes/minimal-mistakes@4.27.3`)
- Author profile enabled on all pages
- Post defaults include reading time, comments, sharing, and related posts
- Site identity: "LISA" (hello.lisa.dev@gmail.com)

### Post Defaults (from _config.yml)
```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: true
      share: true
      related: true
```

## File Organization

### Recommended Structure
```
/
├── index.md                    # Blog homepage (layout: home)
├── _posts/                     # Blog posts
│   ├── 2025-01-04-title.md    # YYYY-MM-DD-title.md format
│   └── 2025-01-03-title.md
├── _pages/                     # Static pages
│   ├── about.md               # layout: single
│   ├── categories.md          # layout: archive
│   ├── tags.md                # layout: archive
│   ├── portfolio.md           # layout: single
│   └── apps/                  # App-specific pages
│       └── tip-smart/
│           ├── index.md       # layout: single
│           └── privacy.md     # layout: single
├── assets/                    # Static assets
│   ├── css/                   # Custom CSS files
│   └── images/                # Images
└── _data/
    └── navigation.yml         # Site navigation
```

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

## Troubleshooting

### Common Issues

#### CSS Not Loading on Posts
- **Problem**: `layout: post` used (doesn't exist in Minimal Mistakes)
- **Solution**: Change to `layout: single`

#### Posts Not Appearing
- **Problem**: Incorrect file naming or location
- **Solution**: Use `_posts/YYYY-MM-DD-title.md` format

#### Navigation Issues
- **Problem**: Pages not showing in navigation
- **Solution**: Update `_data/navigation.yml` and ensure correct permalinks
