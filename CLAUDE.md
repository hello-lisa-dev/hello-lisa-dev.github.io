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

### Content Structure
- `index.md` - **Main blog landing page** (currently contains TipSmart content but should be blog-focused)
- `_pages/` - Static pages (about, categories, tags, portfolio, year-archive)
- `_data/navigation.yml` - Site navigation configuration
- `_config.yml` - Jekyll configuration with site metadata and author info
- `assets/` - Static assets (CSS, JS, images)
- **Planned**: `tip-smart/` directory for TipSmart app support pages

### Current Issue
The current `index.md` contains TipSmart app support content, but this should be moved to a dedicated `tip-smart/` subdirectory. The main `index.md` should serve as the blog's homepage.

### TipSmart Integration
- TipSmart support pages should be organized under `/tip-smart/` URL path
- Move current TipSmart content from `index.md` to `tip-smart/index.md`
- Move `privacy-policy.html` to `tip-smart/privacy-policy.html`
- Create proper blog homepage for main `index.md`

### Theme Configuration
- Uses Minimal Mistakes remote theme
- Author profile enabled on all pages
- Post defaults include reading time, comments, sharing, and related posts
- Site identity: "LISA" (hello.lisa.dev@gmail.com)

## Content Guidelines

When working with content:
- **Blog content**: Use Jekyll posts in `_posts/` with proper front matter
- **TipSmart pages**: Keep under `tip-smart/` directory with appropriate layouts
- Follow existing Korean/English mixed documentation style
- Maintain consistent front matter: `layout: single` and `author_profile: true`