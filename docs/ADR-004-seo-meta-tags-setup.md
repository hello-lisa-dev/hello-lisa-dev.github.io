# ADR-004: SEO 메타태그, Open Graph, Structured Data 구현

## Status
- **Date**: 2025-09-05
- **Status**: ✅ Accepted
- **Context**: 검색 엔진 최적화 및 소셜 미디어 공유 최적화를 위한 메타태그 구현

## Decision

### What
- **SEO Plugin**: Jekyll SEO Tag 플러그인 활용
- **Open Graph**: Facebook, LinkedIn 공유 최적화
- **Twitter Cards**: Twitter 공유 최적화
- **Structured Data**: JSON-LD 스키마 구현
- **Sitemap**: 자동 생성 (`/sitemap.xml`)
- **Robots.txt**: 검색 엔진 크롤링 최적화

### Why
1. **SEO 최적화 필요성**:
   - **검색 노출**: Google 검색 결과에서 상위 노출
   - **클릭률 향상**: 매력적인 제목과 설명으로 CTR 개선
   - **사용자 경험**: 정확한 정보 제공

2. **소셜 미디어 공유 최적화**:
   - **Open Graph**: Facebook, LinkedIn에서 미리보기 표시
   - **Twitter Cards**: Twitter에서 카드 형태로 표시
   - **브랜딩**: 일관된 이미지와 설명으로 브랜드 인지도 향상

3. **구조화된 데이터**:
   - **리치 스니펫**: 검색 결과에서 추가 정보 표시
   - **검색 엔진 이해**: 콘텐츠 구조를 명확히 전달
   - **로컬 SEO**: 조직 정보 제공

### How

#### 1. Jekyll SEO Tag 플러그인 설정
```yaml
# _config.yml
plugins:
  - jekyll-seo-tag

# SEO 기본 설정
title: "LISA"
description: "LISA Development Team"
url: "https://hello-lisa-dev.github.io"
baseurl: ""

# Open Graph 설정
og_image: "/assets/images/og-image.jpg"
twitter:
  username: "@lisa_dev"
```

#### 2. Open Graph 태그 구현
```html
<!-- _includes/head/og-tags.html -->
{% comment %}
Open Graph 및 Twitter Card 메타태그
페이지별로 동적 생성
{% endcomment %}

{% if page.og_image %}
  <meta property="og:image" content="{{ page.og_image | absolute_url }}">
{% elsif site.og_image %}
  <meta property="og:image" content="{{ site.og_image | absolute_url }}">
{% endif %}

{% if page.og_image_alt %}
  <meta property="og:image:alt" content="{{ page.og_image_alt }}">
{% endif %}

{% if page.excerpt %}
  <meta property="og:description" content="{{ page.excerpt | strip_html | truncate: 160 }}">
{% elsif page.description %}
  <meta property="og:description" content="{{ page.description }}">
{% elsif site.description %}
  <meta property="og:description" content="{{ site.description }}">
{% endif %}

<!-- Twitter Card 설정 -->
{% if site.twitter.username %}
  <meta name="twitter:site" content="@{{ site.twitter.username | remove: '@' }}">
  <meta name="twitter:creator" content="@{{ site.twitter.username | remove: '@' }}">
{% endif %}

<meta name="twitter:card" content="summary_large_image">
{% if page.og_image or site.og_image %}
  <meta name="twitter:image" content="{% if page.og_image %}{{ page.og_image | absolute_url }}{% else %}{{ site.og_image | absolute_url }}{% endif %}">
{% endif %}
```

#### 3. Structured Data (JSON-LD) 구현
```html
<!-- _includes/structured-data.html -->
{% comment %}
구조화된 데이터 (JSON-LD) 스키마
검색 엔진이 사이트 정보를 이해할 수 있도록 도움
{% endcomment %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{ site.title }}",
  "url": "{{ site.url }}{{ site.baseurl }}",
  "description": "{{ site.description }}",
  "publisher": {
    "@type": "Organization",
    "name": "{{ site.title }}",
    "url": "{{ site.url }}{{ site.baseurl }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ site.url }}{{ site.baseurl }}/assets/images/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "{{ site.url }}{{ site.baseurl }}/search/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>

{% if page.layout == 'single' and page.author %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ page.title }}",
  "description": "{{ page.excerpt | strip_html | truncate: 160 }}",
  "author": {
    "@type": "Person",
    "name": "{{ page.author }}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{ site.title }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ site.url }}{{ site.baseurl }}/assets/images/logo.png"
    }
  },
  "datePublished": "{{ page.date | date: '%Y-%m-%d' }}",
  "dateModified": "{{ page.last_modified_at | date: '%Y-%m-%d' | default: page.date | date: '%Y-%m-%d' }}",
  "url": "{{ page.url | absolute_url }}"
}
</script>
{% endif %}
```

#### 4. Robots.txt 최적화
```
# Robots.txt for LISA Development Team Blog
# https://hello-lisa-dev.github.io

User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /_site/
Disallow: /_includes/
Disallow: /_layouts/
Disallow: /_data/

# Allow important files
Allow: /assets/
Allow: /images/
Allow: /css/
Allow: /js/

# Crawl delay (optional - be respectful to server)
Crawl-delay: 1

# Sitemap location
Sitemap: https://hello-lisa-dev.github.io/sitemap.xml
```

#### 5. Favicon 및 Apple Touch Icon 설정
```html
<!-- _includes/head/favicon.html -->
<link rel="icon" type="image/x-icon" href="{{ '/favicon.ico' | absolute_url }}">
<link rel="apple-touch-icon" sizes="180x180" href="{{ '/apple-touch-icon.png' | absolute_url }}">
<link rel="icon" type="image/png" sizes="32x32" href="{{ '/favicon-32x32.png' | absolute_url }}">
<link rel="icon" type="image/png" sizes="16x16" href="{{ '/favicon-16x16.png' | absolute_url }}">
<link rel="manifest" href="{{ '/site.webmanifest' | absolute_url }}">
```

## SEO Configuration

### 페이지별 SEO 설정
```yaml
---
layout: single
title: "페이지 제목"
seo_title: "SEO 최적화된 제목"  # 선택사항
description: "페이지 설명"
og_image: "/assets/images/page-specific-image.jpg"  # 선택사항
og_image_alt: "이미지 설명"  # 선택사항
---
```

### SEO 제목 분리 (필요시)
```yaml
---
title: "표시용 제목"
seo_title: "SEO 최적화된 제목"
description: "페이지 설명"
---

{% seo title=false %}
<title>{{ page.seo_title | default: page.title }} - {{ site.title }}</title>
```

## Image Assets

### 필요한 이미지 파일들
- **`favicon.ico`** (16x16, 32x32, 48x48) - 브라우저 탭 아이콘
- **`apple-touch-icon.png`** (180x180) - iOS 홈 화면 아이콘
- **`assets/images/og-image.jpg`** (1200x630) - 소셜 미디어 공유 이미지
- **`assets/images/logo.png`** (512x512) - 사이트 로고
- **`assets/images/bio-photo.jpg`** (400x400) - 작성자 프로필 사진

### 디자인 가이드라인
- **Primary Color**: Blue (#007AFF)
- **Secondary Color**: White (#FFFFFF)
- **Style**: Minimalist, professional, tech-focused
- **Brand**: LISA Development Team

## Google Search Console 연동

### 자동 연결
- **연결 방법**: Google Analytics 설정으로 자동 연결
- **상태**: ✅ 설정 완료
- **분석 기능**:
  - 검색 쿼리 분석
  - 페이지별 성과
  - Core Web Vitals
  - 색인 상태 모니터링

### Sitemap 제출
```
URL: https://hello-lisa-dev.github.io/sitemap.xml
```

## Page-Specific CSS

### 커스텀 CSS 지원
```yaml
# 페이지별 CSS 파일 지정
custom_css_file: filename

# 여러 CSS 파일 지정
custom_css:
  - file1
  - file2
```

### CSS 파일 위치
```
/assets/css/
├── tipsmart.css
├── custom.css
└── page-specific.css
```

## Consequences

### Positive
- ✅ **검색 노출 향상**: Google 검색 결과에서 상위 노출
- ✅ **소셜 공유 최적화**: Facebook, Twitter에서 매력적인 미리보기
- ✅ **브랜드 일관성**: 일관된 이미지와 설명
- ✅ **사용자 경험**: 정확한 정보 제공
- ✅ **리치 스니펫**: 검색 결과에서 추가 정보 표시

### Negative
- ⚠️ **이미지 생성 필요**: OG 이미지, favicon 등 생성 필요
- ⚠️ **메타태그 관리**: 페이지별 메타태그 설정 필요
- ⚠️ **파일 크기**: 추가 메타태그로 HTML 크기 증가

### Neutral
- 📝 **SEO 효과**: 장기적으로 검색 노출 개선
- 📝 **소셜 공유**: 소셜 미디어에서 일관된 표시

## Troubleshooting

### 일반적인 SEO 문제

#### 1. 메타 설명이 표시되지 않음
**원인**: `description` 필드 누락 또는 너무 긴 설명
**해결**: 160자 이내의 명확한 설명 작성

#### 2. OG 이미지가 표시되지 않음
**원인**: 이미지 파일 경로 오류 또는 크기 문제
**해결**: 
- 이미지 경로 확인
- 권장 크기 (1200x630) 사용
- 절대 URL 사용

#### 3. 검색 결과에 사이트가 나타나지 않음
**원인**: Google Search Console 미설정 또는 색인 지연
**해결**:
1. Google Search Console에서 사이트 등록
2. Sitemap 제출
3. 색인 요청

## Related
- **Links**: 
  - [Jekyll SEO Tag Plugin](https://github.com/jekyll/jekyll-seo-tag)
  - [Open Graph Protocol](https://ogp.me/)
  - [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview)
  - [Schema.org](https://schema.org/)
- **Dependencies**: 
  - Jekyll SEO Tag 플러그인
  - 이미지 에셋 파일들
- **Follow-up ADRs**: 
  - ADR-005: 파일 구조 조직화
  - ADR-006: 문제 해결 가이드
