# ADR-001: Jekyll + Minimal Mistakes 테마 선택 및 레이아웃 구조

## Status
- **Date**: 2025-09-05
- **Status**: ✅ Accepted
- **Context**: 정적 블로그 사이트 구축을 위한 기술 스택 선택

## Decision

### What
- **Jekyll** + **Minimal Mistakes 테마** 선택
- **GitHub Pages** 호스팅
- **Remote Theme** 방식 사용 (`mmistakes/minimal-mistakes@4.27.3`)

### Why
1. **Jekyll의 장점**:
   - GitHub Pages 네이티브 지원
   - Markdown 기반 콘텐츠 작성
   - 정적 사이트 생성으로 빠른 로딩
   - SEO 친화적

2. **Minimal Mistakes 테마 선택 이유**:
   - GitHub에서 가장 인기 있는 Jekyll 테마
   - 반응형 디자인
   - 풍부한 기능 (검색, 댓글, 소셜 공유)
   - 활발한 커뮤니티 지원

3. **Remote Theme 방식**:
   - 테마 업데이트 자동 적용
   - 커스터마이징 용이
   - 버전 관리 간편

### How
```yaml
# _config.yml
remote_theme: "mmistakes/minimal-mistakes@4.27.3"

# 플러그인 설정
plugins:
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-gist
  - jekyll-feed
  - jekyll-include-cache
  - jekyll-seo-tag
```

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

## Consequences

### Positive
- ✅ **빠른 개발**: 테마 기능 활용으로 빠른 사이트 구축
- ✅ **SEO 최적화**: Jekyll SEO Tag 플러그인 자동 적용
- ✅ **반응형 디자인**: 모바일 친화적
- ✅ **커뮤니티 지원**: 활발한 커뮤니티와 문서
- ✅ **GitHub Pages 호환**: 네이티브 지원

### Negative
- ⚠️ **테마 의존성**: 테마 업데이트에 따른 영향
- ⚠️ **학습 곡선**: Jekyll과 Liquid 템플릿 학습 필요
- ⚠️ **커스터마이징 제한**: 테마 구조에 따른 제약

### Neutral
- 📝 **Markdown 작성**: 콘텐츠 작성 방식 변경
- 📝 **정적 사이트**: 동적 기능 제한

## Related
- **Links**: 
  - [Minimal Mistakes Documentation](https://mmistakes.github.io/minimal-mistakes/)
  - [Jekyll Documentation](https://jekyllrb.com/)
- **Dependencies**: 
  - GitHub Pages
  - Ruby/Jekyll 환경
- **Follow-up ADRs**: 
  - ADR-002: GitHub Pages 배포 전략
  - ADR-005: 파일 구조 조직화
