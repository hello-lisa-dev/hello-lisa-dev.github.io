# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Last Updated**: 2025-09-16 17:27:11 +0900

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

- **Status**: Configured with GA4 (Measurement ID: `G-6BGXFPTH8H`)
- **Implementation**: Manual setup via `_includes/head/google-analytics.html`
- **Note**: Data collection starts after GitHub Pages deployment

## Google AdSense

### Setup (Configured)
- AdSense integration implemented via custom includes
- Publisher ID: Set in `_config.yml` under `adsense.publisher_id`
- Responsive ad units for mobile compatibility

### Implementation
- **Head Script**: Auto-loaded via `_includes/head/custom.html`
- **Ad Placements**:
  - Article Top: Beginning of post content
  - Article Middle: Automatically inserted at content midpoint
  - Article Bottom: End of post content before related posts
  - Sidebar: In table of contents sidebar (when enabled)

### Ad Include Files
- `_includes/adsense-article-top.html` - Top of article
- `_includes/adsense-article-middle.html` - Middle of article
- `_includes/adsense-article-bottom.html` - Bottom of article
- `_includes/adsense-sidebar.html` - Sidebar placement

### Configuration
Replace `YOUR_PUBLISHER_ID` and `YOUR_AD_SLOT_ID` with actual AdSense values:
```yaml
# _config.yml
adsense:
  publisher_id: "ca-pub-YOUR_PUBLISHER_ID"
  enabled: true
```

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

## Post Date Management

### Front Matter Date Fields
Jekyll supports comprehensive date management through front matter:

```yaml
---
title: "Post Title"
date: 2025-09-06                    # Publication date
last_modified_at: 2025-09-07 13:40:00 +0900  # Last modification timestamp
---
```

### Date Management Guidelines
- **`date`**: Required field for post publication date
- **`last_modified_at`**: **REQUIRED** field for tracking content updates
- **Format**: Use `YYYY-MM-DD HH:MM:SS ±TTTT` for precise timestamps
- **Timezone**: Use `+0900` for Korean Standard Time (KST)
- **⚠️ CRITICAL**: **ALWAYS update `last_modified_at` when modifying any content**

### Last Modified At Update Rules
**MANDATORY**: Every time you modify post content or documentation, you MUST:

1. **Check current time FIRST**: Use `date '+%Y-%m-%d %H:%M:%S +0900'` command
2. **Update `last_modified_at` field**: Use the exact timestamp from step 1
3. **Never skip this step**: This affects sitemap.xml and SEO indexing

**Examples of when to update**:
- ✅ Content changes (text, code, images)
- ✅ Front matter updates (title, tags, categories)
- ✅ Formatting or structure changes
- ✅ Adding/removing sections
- ❌ Only formatting/whitespace changes (use judgment)

### Automatic Date Management (Advanced)
For automatic modification tracking, consider using `jekyll-last-modified-at` plugin:

```ruby
# Gemfile
gem 'jekyll-last-modified-at'
```

```yaml
# _config.yml
plugins:
  - jekyll-last-modified-at
```

This plugin uses Git commit history to automatically track file modifications.

## SEO/AEO Optimization Guidelines

### Critical Importance
**SEO/AEO optimization is ESSENTIAL for blog post success**. Proper keyword strategy directly impacts search visibility and organic traffic growth.

### Front Matter SEO Fields
**ALWAYS include these fields in every blog post:**

```yaml
---
title: "Display Title (under 60 characters)"
date: YYYY-MM-DD
last_modified_at: YYYY-MM-DD HH:MM:SS +0900  # Update when content changes
categories: [primary_category, secondary_category]
tags: [keyword1, keyword2, keyword3, ...]  # 8-15 targeted keywords
seo_title: "SEO Optimized Title - Under 60 chars with main keyword"
description: "Meta description under 160 characters including target keywords and value proposition"
---
```

### Keyword Strategy

#### Primary Keywords (Must Include)
- **Year Keywords**: "2025년", "최신" - for freshness signals
- **Topic Keywords**: Main subject (e.g., "바이브코딩", "AI개발도구")
- **Intent Keywords**: "가이드", "비교", "방법", "후기"
- **Geo Keywords**: "한국", "국내" - for local relevance
- **Audience Keywords**: "개발자", "초보자", "입문자"

#### Secondary Keywords (Expand Coverage)  
- **Long-tail**: "2025년 AI 개발 도구 비교"
- **Related Terms**: Synonyms and variations
- **Brand Names**: Specific tools/technologies mentioned
- **Problem-solving**: "문제해결", "오류", "팁"

#### Tag Optimization Guidelines
- **Quantity**: 8-15 tags per post (optimal range)
- **Mix Types**: Brand names, topics, intents, geo terms
- **Consistency**: Use consistent tag format across posts
- **Relevance**: Every tag must be directly relevant to content

### AEO (Answer Engine Optimization)

#### Content Structure
- **Clear Q&A Format**: Use question headings ("~란?", "어떻게?", "왜?")
- **Step-by-step Instructions**: Numbered lists for processes
- **Comparison Tables**: For tool/method comparisons  
- **Concrete Examples**: Real use cases and code snippets
- **Summary Sections**: Key takeaways and conclusions

#### Featured Snippet Optimization
- **Definition Boxes**: Start with clear definitions
- **How-to Lists**: Structured step-by-step guides
- **Comparison Charts**: Side-by-side feature comparisons
- **FAQ Sections**: Common questions with direct answers

### Search Intent Matching

#### Informational Queries
- "바이브 코딩이란"
- "AI 개발 도구 종류"
- "개발 방법 설명"

#### Comparison Queries  
- "Cursor vs Claude Code"
- "AI 도구 비교"
- "장단점 분석"

#### Problem-solving Queries
- "AI 코딩 오류 해결"
- "개발 도구 선택 방법"
- "설정 문제 해결"

### Content Optimization Checklist

#### Pre-Publishing
- [ ] Target keyword in title (within first 60 characters)
- [ ] Target keyword in first paragraph
- [ ] LSI keywords distributed throughout content
- [ ] Headings include question-based keywords
- [ ] Meta description includes target keyword + value proposition
- [ ] Tags cover primary + secondary keywords
- [ ] Internal links to related posts
- [ ] External links to authoritative sources

#### Post-Publishing
- [ ] Monitor search performance in GA4
- [ ] Update `last_modified_at` when content changes  
- [ ] Add new relevant tags as content evolves
- [ ] Link from new posts to boost older content

### Performance Tracking
- **Google Analytics 4**: Monitor organic traffic and keyword rankings
- **Search Console**: Track click-through rates and impressions
- **Tag Performance**: Analyze which tags drive most traffic
- **Content Updates**: Refresh underperforming posts with new keywords

## ADR (Architecture Decision Record) Workflow

### When to Create ADRs
Create ADRs for:
- **Technical decisions** with long-term impact
- **Problem-solving** that required investigation or debugging
- **Feature implementations** that affect site architecture
- **Configuration changes** that might need future reference

### ADR Creation Process
1. **Create ADR**: Write detailed ADR in `/docs/ADR-XXX-title.md`
2. **Update ARCHITECTURE.md**: Add reference to new ADR in appropriate section
3. **Update Status Table**: Add entry to ADR Status Overview table
4. **Cross-reference**: Link from CLAUDE.md if relevant to future development

### ADR Template Structure
```markdown
# ADR-XXX: Title

## Status
[Accepted/Rejected/Superseded]

## Date
YYYY-MM-DD

## Context
[Problem description and background]

## Decision
[What was decided and how it was implemented]

## Consequences
[Positive/Negative outcomes and lessons learned]
```

## Content Guidelines

When working with content:
- **Blog content**: Use Jekyll posts in `_posts/` with proper front matter
- **TipSmart pages**: Keep under `_pages/` with `/tip-smart/` permalinks
- Follow existing Korean/English mixed documentation style
- Maintain consistent front matter: `layout: single` and `author_profile: true`
- Use `custom_css_file` or `custom_css` for page-specific styling
- **Date Management**: Always include `date` field, **MANDATORY `last_modified_at` for ALL content updates**
- **Multilingual Support**: Add `lang: "ko"` (or "en", "es") for language-aware navigation
- **⭐ SEO/AEO CRITICAL**: Follow SEO optimization guidelines above for every post
- **📋 ADR Documentation**: Follow ADR workflow above for technical decisions

**📋 For multilingual post navigation details, see [ADR-009](./docs/ADR-009-multilingual-post-navigation.md)**