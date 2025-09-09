# Design Document

## Overview

이 설계는 현재 한국어 중심의 Jekyll 블로그에 다국어 지원을 추가하는 것입니다. AI 도구를 활용한 번역 워크플로우를 지원하며, URL 파라미터 기반 언어 전환과 SEO 최적화를 제공합니다. 기존 Minimal Mistakes 테마와 호환되도록 설계되었습니다.

## Architecture

### Language Support Strategy

**Primary Approach: File-based with URL Parameters**
- 한국어 원본: `_posts/2025-09-06-what-is-vibe-coding.md`
- 영어 번역: `_posts/en/2025-09-06-what-is-vibe-coding.md`
- 스페인어 번역: `_posts/es/2025-09-06-what-is-vibe-coding.md`

**URL Structure:**
- 기본 (한국어): `/바이브코딩/2025/09/06/what-is-vibe-coding/`
- 영어: `/vibe-coding/2025/09/06/what-is-vibe-coding/?lang=en`
- 스페인어: `/codificacion-vibe/2025/09/06/what-is-vibe-coding/?lang=es`

### Technical Implementation

**1. Language Detection & Switching**
- JavaScript 기반 클라이언트 사이드 언어 전환
- URL 파라미터 `?lang=ko|en|es` 지원
- 로컬 스토리지에 언어 선택 저장
- 쿠키 기반 언어 기본값 설정

**2. Content Management**
- 언어별 디렉토리 구조: `_posts/{lang}/`
- Front matter에 언어 메타데이터 추가
- 번역 연결을 위한 `translation_key` 필드

**3. SEO Optimization**
- `hreflang` 태그 자동 생성
- 언어별 sitemap 생성
- Open Graph 언어 메타데이터
- 구조화된 데이터에 언어 정보 포함

## Components and Interfaces

### 1. Language Configuration (`_config.yml`)

```yaml
# 다국어 설정
languages:
  ko:
    name: "한국어"
    flag: "🇰🇷"
    default: true
  en:
    name: "English"
    flag: "🇺🇸"
  es:
    name: "Español"
    flag: "🇪🇸"

# 기본 언어
default_language: "ko"

# 언어별 메타데이터
language_metadata:
  ko:
    locale: "ko-KR"
    direction: "ltr"
  en:
    locale: "en-US"
    direction: "ltr"
  es:
    locale: "es-ES"
    direction: "ltr"

# 카테고리 번역
category_translations:
  "바이브코딩":
    en: "vibe-coding"
    es: "codificacion-vibe"
  "모바일":
    en: "mobile"
    es: "movil"
  "개발":
    en: "development"
    es: "desarrollo"
  "스토리":
    en: "story"
    es: "historia"
```

### 2. Language Switcher Component (`_includes/language-switcher.html`)

```html
<div class="language-switcher">
  <div class="language-dropdown">
    <button class="language-current" id="languageToggle">
      <span class="flag" id="currentFlag">🇰🇷</span>
      <span class="name" id="currentLang">한국어</span>
      <span class="arrow">▼</span>
    </button>
    <div class="language-options" id="languageOptions">
      <!-- JavaScript로 동적 생성 -->
    </div>
  </div>
</div>
```

### 3. Translation Link Generator (`_includes/translation-links.html`)

```liquid
{% assign translations = site.posts | where: "translation_key", page.translation_key %}
{% if translations.size > 1 %}
<div class="translation-links">
  <h4>{{ site.data.ui-text[site.locale].translations_available | default: "Available in other languages" }}</h4>
  <ul>
    {% for translation in translations %}
      {% unless translation.url == page.url %}
        <li>
          <a href="{{ translation.url | relative_url }}?lang={{ translation.lang }}">
            {{ site.languages[translation.lang].flag }} {{ site.languages[translation.lang].name }}
          </a>
        </li>
      {% endunless %}
    {% endfor %}
  </ul>
</div>
{% endif %}
```

### 4. Language Detection Script (`assets/js/language-switcher.js`)

```javascript
class LanguageSwitcher {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.init();
  }

  detectLanguage() {
    // URL 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && this.isValidLanguage(langParam)) {
      return langParam;
    }
    
    // 로컬 스토리지 확인
    const storedLang = localStorage.getItem('preferred-language');
    if (storedLang && this.isValidLanguage(storedLang)) {
      return storedLang;
    }
    
    // 기본 언어 반환
    return 'ko';
  }

  switchLanguage(targetLang) {
    // 번역된 콘텐츠 로드 및 표시
    // URL 업데이트
    // 로컬 스토리지 저장
  }
}
```

## Data Models

### Post Front Matter Structure

```yaml
---
title: "바이브 코딩이란? - AI 시대의 새로운 개발 방식"
date: 2025-09-06
last_modified_at: 2025-09-07 17:40:00 +0900
categories: [바이브코딩]
tags: [바이브코딩, AI개발, 개발방식, iOS개발, 앱개발]
seo_title: "바이브 코딩이란? AI 시대의 새로운 개발 방식과 실제 경험담"
description: "AI 도구와 협업하는 새로운 개발 방식인 바이브 코딩에 대해 알아보세요."

# 다국어 지원 필드
lang: "ko"                           # 현재 포스트 언어
translation_key: "what-is-vibe-coding"  # 번역 연결 키
translations:                       # 사용 가능한 번역
  en: "/posts/en/2025-09-06-what-is-vibe-coding/"
  es: "/posts/es/2025-09-06-what-is-vibe-coding/"
---
```

### Translation File Structure

```
_posts/
├── 2025-09-06-what-is-vibe-coding.md          # 한국어 원본
├── en/
│   └── 2025-09-06-what-is-vibe-coding.md      # 영어 번역
└── es/
    └── 2025-09-06-what-is-vibe-coding.md      # 스페인어 번역
```

### Category Translation Logic

```liquid
{% assign current_lang = page.lang | default: site.default_language %}
{% assign translated_categories = "" | split: "," %}

{% for category in page.categories %}
  {% if site.category_translations[category] and site.category_translations[category][current_lang] %}
    {% assign translated_category = site.category_translations[category][current_lang] %}
  {% else %}
    {% assign translated_category = category %}
  {% endif %}
  {% assign translated_categories = translated_categories | push: translated_category %}
{% endfor %}
```

### Language Configuration Data

```yaml
# _data/languages.yml
ko:
  name: "한국어"
  native_name: "한국어"
  flag: "🇰🇷"
  locale: "ko-KR"
  direction: "ltr"
  
en:
  name: "English"
  native_name: "English"
  flag: "🇺🇸"
  locale: "en-US"
  direction: "ltr"
  
es:
  name: "Español"
  native_name: "Español"
  flag: "🇪🇸"
  locale: "es-ES"
  direction: "ltr"
```

## Error Handling

### Missing Translation Scenarios

1. **번역이 없는 포스트**
   - 원본 한국어 콘텐츠 표시
   - 번역 부재 알림 메시지 표시
   - 다른 언어로 전환 옵션 제공

2. **잘못된 언어 파라미터**
   - 기본 언어(한국어)로 리다이렉트
   - 에러 로그 기록
   - 사용자에게 알림 표시

3. **부분 번역**
   - 번역된 부분만 표시
   - 미번역 섹션은 원본 언어로 표시
   - 번역 상태 표시기 제공

### Fallback Strategy

```javascript
const fallbackChain = {
  'es': ['en', 'ko'],  // 스페인어 → 영어 → 한국어
  'en': ['ko'],        // 영어 → 한국어
  'ko': []             // 한국어 (기본)
};
```

## Testing Strategy

### Unit Tests

1. **Language Detection Logic**
   - URL 파라미터 파싱 테스트
   - 로컬 스토리지 처리 테스트
   - 기본값 설정 테스트

2. **Translation Linking**
   - `translation_key` 매칭 테스트
   - 번역 파일 존재 확인 테스트
   - Front matter 파싱 테스트

### Integration Tests

1. **End-to-End Language Switching**
   - 언어 선택기 동작 테스트
   - URL 업데이트 확인 테스트
   - 콘텐츠 전환 테스트

2. **SEO Validation**
   - `hreflang` 태그 생성 테스트
   - Sitemap 언어 어노테이션 테스트
   - 구조화된 데이터 검증 테스트

### Performance Tests

1. **Loading Speed**
   - 언어 전환 속도 측정
   - 번역 파일 로딩 시간 측정
   - JavaScript 번들 크기 최적화

2. **SEO Performance**
   - Google Search Console 언어별 인덱싱 확인
   - 페이지 속도 점수 유지
   - Core Web Vitals 영향 측정

## Implementation Phases

### Phase 1: Core Infrastructure
- 언어 설정 및 데이터 구조 구축
- 기본 언어 전환 JavaScript 구현
- Front matter 확장

### Phase 2: UI Components
- 언어 선택기 컴포넌트 개발
- 번역 링크 생성기 구현
- 기본 스타일링

### Phase 3: SEO Optimization
- `hreflang` 태그 자동 생성
- 언어별 sitemap 구현
- 구조화된 데이터 확장

### Phase 4: Content Migration
- 기존 포스트에 번역 키 추가
- AI 번역 워크플로우 구축
- 첫 번째 영어 번역 생성

### Phase 5: Testing & Optimization
- 크로스 브라우저 테스트
- SEO 검증 및 최적화
- 성능 튜닝