# ADR-007: 다국어 블로그 지원 시스템 구현

## Status
- **Date**: 2025-09-09
- **Status**: ✅ Accepted
- **Completion**: 2025-09-16
- **Context**: Jekyll 기반 블로그에 한국어, 영어, 스페인어 다국어 지원 추가

## Decision

### What
- **Jekyll 다국어 지원 시스템** 구현
- **언어별 포스트 관리** 및 **자동 번역 링크** 생성
- **언어 선택 UI** 및 **콘텐츠 전환** 기능
- **SEO 최적화** 및 **구조화된 데이터** 지원

### Why
1. **글로벌 독자층 확대**:
   - 한국어 중심 콘텐츠의 해외 접근성 향상
   - AI 개발 경험을 영어권 개발자들과 공유
   - 스페인어권 시장 진출 준비

2. **콘텐츠 가치 극대화**:
   - 동일한 콘텐츠를 여러 언어로 제공하여 도달 범위 확장
   - SEO 관점에서 다국어 검색 최적화
   - 번역을 통한 콘텐츠 품질 개선 기회

3. **기술적 도전과 학습**:
   - Jekyll 고급 기능 활용 경험
   - 다국어 웹사이트 구축 노하우 습득
   - 바이브 코딩 방식으로 복잡한 기능 구현

### How
#### 1. 언어 설정 및 구조
```yaml
# _config.yml
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

default_language: "ko"
```

#### 2. 포스트 Front Matter 구조
```yaml
---
title: "포스트 제목"
categories: [vibe-coding]  # 모든 언어에서 영어 카테고리 사용
lang: "ko"
translation_key: "unique-post-identifier"
permalink: /ko/vibe-coding/2025/09/06/what-is-vibe-coding.html  # 언어 prefix
translations:
  ko: "/ko/vibe-coding/2025/09/06/what-is-vibe-coding.html"
  en: "/en/vibe-coding/2025/09/06/what-is-vibe-coding.html"
  es: "/es/vibe-coding/2025/09/06/what-is-vibe-coding.html"
---
```

#### 3. URL 구조 (언어 prefix 방식)
```
# URL 구조
/ko/vibe-coding/2025/09/06/what-is-vibe-coding.html    # 한국어
/en/vibe-coding/2025/09/06/what-is-vibe-coding.html    # 영어
/es/vibe-coding/2025/09/06/what-is-vibe-coding.html    # 스페인어 (향후)

# 디렉토리 구조
_posts/
├── 2025-09-06-korean-post.md          # 한국어 (permalink: /ko/...)
├── en/
│   └── 2025-09-06-english-post.md     # 영어 번역 (permalink: /en/...)
└── es/
    └── 2025-09-06-spanish-post.md     # 스페인어 번역 (permalink: /es/...)
```

## Implementation Progress

### ✅ Completed (Tasks 1-6)

#### Task 1: 다국어 설정 구조 설정
- `_config.yml`에 지원 언어 설정 (한국어, 영어, 스페인어)
- 카테고리 번역 매핑 추가
- 언어별 메타데이터 (locale, direction) 설정

#### Task 2: 언어 데이터 파일 및 UI 텍스트 번역
- `_data/ui-text.yml` 생성 (인터페이스 텍스트 번역)
- 언어별 네비게이션 텍스트 및 공통 UI 요소 번역
- 번역 관련 메시지 및 알림 텍스트 추가

#### Task 3: 핵심 언어 감지 및 전환 로직
- `assets/js/language-switcher.js` 생성
- URL 파라미터 기반 언어 감지 (`?lang=en`)
- localStorage 기반 언어 선호도 저장
- 지원하지 않는 언어에 대한 폴백 로직

#### Task 4: 언어 선택 UI 컴포넌트
- `_includes/language-switcher.html` 드롭다운 인터페이스
- 언어 플래그 및 네이티브 이름 표시
- Minimal Mistakes 테마와 일치하는 스타일링
- 클릭 핸들러 및 접근성 지원

#### Task 5: 번역 링크 시스템
- `_includes/translation-links.html` 크로스 언어 네비게이션
- `translation_key` 매칭 로직 (Liquid 템플릿)
- "다른 언어로 보기" 섹션 포스트에 추가
- 누락된 번역 시나리오 우아한 처리
- 구조화된 데이터 (JSON-LD) 자동 생성

#### Task 6: 포스트 Front Matter 구조 확장
- 모든 포스트에 `lang`, `translation_key`, `translations` 필드 추가
- 언어별 디렉토리 기본값 설정 (`_posts/en/`, `_posts/es/`)
- 번역 검증 스크립트 생성 (`_scripts/check-translations.rb`)

### ✅ Recently Completed (Tasks 7-9 + SEO Improvements)

#### Task 7: 카테고리 번역 시스템 ✅
- **Liquid 필터 구현**: `_plugins/category_translator.rb`로 카테고리 번역 필터 생성
  - `translate_category`: 개별 카테고리 번역
  - `translate_categories`: 카테고리 배열 번역
  - `category_url_with_lang`: 언어별 카테고리 URL 생성
- **카테고리 아카이브 페이지**: `_layouts/categories.html`에서 번역된 카테고리명 표시
- **포스트 템플릿 업데이트**: 
  - `_includes/page__taxonomy.html`: 포스트 하단 카테고리 번역 표시
  - `_includes/archive-single.html`: 포스트 미리보기에서 번역된 카테고리 표시
- **JavaScript 연동**: 언어 변경 시 카테고리 해시 URL 자동 업데이트

#### Task 8: URL 구조 개선 (언어 prefix 방식) ✅
- **언어 prefix 도입**: `/ko/`, `/en/`, `/es/` 방식으로 URL 구조 통일
- **카테고리 통일**: 모든 언어에서 영어 카테고리 사용 (`vibe-coding`, `ai-tools`)
- **확장성 개선**: 새로운 언어 추가 시 일관된 구조 유지
- **SEO 최적화**: 언어별 독립적인 URL로 검색엔진 최적화

#### Task 9: SEO 최적화 및 다국어 메타데이터 ✅
- **hreflang 태그 시스템**: `_includes/hreflang-tags.html` 생성
  - 언어 prefix 방식에 맞는 자동 hreflang 태그 생성
  - x-default 태그로 기본 언어 지정
- **HTML lang 속성 개선**: 커스텀 `_layouts/default.html`에서 서버사이드 lang 속성 설정
- **언어별 메타 태그 강화**: `content-language`, `dc.language`, `locale` 메타 태그 추가
- **JSON-LD 구조화 데이터**: `inLanguage` 속성 및 `workTranslation` 배열로 번역 정보 포함

#### SEO 시스템 통합 및 개선 ✅
- **통합 SEO 관리**: `_includes/seo.html` 생성으로 모든 SEO 메타데이터 통합
  - 다국어 페이지 제목, 설명, Open Graph 태그
  - Twitter Card, JSON-LD 구조화된 데이터
  - 언어별 canonical URL 및 hreflang 태그
- **언어별 사이트 메타데이터**: `_config.yml`에 언어별 사이트 제목/설명 추가
  - 한국어: "LISA의 바이브 코딩 일기"
  - 영어: "LISA's Vibe Coding Journey"  
  - 스페인어: "El Viaje de Codificación Vibe de LISA"
- **파일 구조 정리**: 중복 파일 제거 및 역할 명확화
  - `_includes/head/og-tags.html` 제거 (seo.html에 통합)
  - `_includes/structured-data.html` 제거 (seo.html에 통합)
  - `_includes/head/custom.html` 간소화 (핵심 기능만 유지)
- **언어 선택기 개선**: 드롭다운 메뉴 동적 업데이트 기능 추가

### ✅ System Complete (2025-09-16)

**다국어 블로그 지원 시스템이 성공적으로 구현 완료되었습니다.**

#### 완료된 핵심 기능들:
- **언어별 포스트 네비게이션 분리** (ADR-009): 언어별로 이전/다음 포스트 및 관련 포스트 필터링
- **번역 링크 시스템**: 포스트 간 크로스 언어 네비게이션
- **SEO 최적화**: hreflang 태그, 구조화된 데이터, 언어별 메타데이터
- **카테고리 번역**: 언어별 카테고리명 번역 및 URL 관리
- **언어 선택 UI**: 드롭다운 기반 언어 전환 인터페이스

#### 추후 확장 가능 기능 (Tasks 10-18):
- 콘텐츠 전환 기능 (언어 prefix 기반 리다이렉션)
- 다국어 사이트맵 생성
- AI 기반 자동 번역 통합
- 실시간 번역 상태 대시보드

## Technical Architecture

### Core Components

#### 1. Language Detection & Switching
```javascript
// 언어 감지 우선순위
// 1. URL 파라미터 (?lang=en)
// 2. localStorage 저장값
// 3. 브라우저 언어 설정
// 4. 기본 언어 (한국어)

class LanguageSwitcher {
  detectLanguage() {
    return this.getLanguageFromURL() || 
           this.getStoredLanguage() || 
           this.getBrowserLanguage() || 
           this.defaultLanguage;
  }
}
```

#### 2. Translation Linking
```liquid
{% comment %}번역 링크 생성 로직{% endcomment %}
{% assign current_translation_key = page.translation_key %}
{% if current_translation_key %}
  {% assign translations = site.posts | where: "translation_key", current_translation_key %}
  {% for translation in translations %}
    {% unless translation.url == page.url %}
      <!-- 번역 링크 표시 -->
    {% endunless %}
  {% endfor %}
{% endif %}
```

#### 3. Category Translation
```yaml
# _config.yml
category_translations:
  "바이브코딩":
    en: "vibe-coding"
    es: "codificacion-vibe"
  "AI도구":
    en: "ai-tools"
    es: "herramientas-ia"
```

### File Structure
```
├── _config.yml                    # 다국어 설정 + 언어별 메타데이터
├── _data/
│   └── ui-text.yml               # UI 텍스트 번역
├── _includes/
│   ├── seo.html                  # 🆕 통합 SEO 메타데이터 (다국어 지원)
│   ├── language-switcher.html    # 언어 선택 UI (개선된 드롭다운)
│   ├── translation-links.html    # 번역 링크 컴포넌트
│   ├── page__taxonomy.html       # 🆕 카테고리/태그 (번역 지원)
│   ├── archive-single.html       # 🆕 포스트 미리보기 (번역 지원)
│   └── head/
│       ├── custom.html           # 🔄 간소화 (핵심 기능만)
│       ├── favicon.html          # Favicon 설정
│       └── google-analytics.html # Google Analytics
├── _layouts/
│   ├── single.html              # 번역 링크 통합 레이아웃
│   └── categories.html          # 🆕 다국어 카테고리 아카이브
├── _plugins/
│   └── category_translator.rb   # 🆕 카테고리 번역 Liquid 필터
├── _posts/
│   ├── *.md                     # 한국어 포스트 (기본)
│   ├── en/                      # 영어 번역
│   └── es/                      # 스페인어 번역
├── _scripts/
│   └── check-translations.rb    # 번역 검증 도구
└── assets/
    ├── css/language-switcher.css # 다국어 UI + 카테고리 스타일
    └── js/language-switcher.js   # 언어 전환 + 카테고리 URL 로직
```

## Current Translation Status

### Available Translations
- **what-is-vibe-coding**: 
  - 한국어 ✅ (`/ko/vibe-coding/2025/09/06/what-is-vibe-coding.html`)
  - 영어 ✅ (`/en/vibe-coding/2025/09/06/what-is-vibe-coding.html`)
  - 스페인어 ❌
- **ai-development-tools-comparison**: 
  - 한국어 ✅ (`/ko/vibe-coding/ai-tools/2025/09/07/ai-development-tools-comparison.html`)
  - 영어 ❌
  - 스페인어 ❌

### Translation Workflow
1. **원본 작성**: 한국어로 포스트 작성
2. **번역 키 설정**: `translation_key` 필드 추가
3. **번역 생성**: 언어별 디렉토리에 번역 파일 생성
4. **링크 설정**: `translations` 해시에 URL 정보 추가
5. **검증**: `ruby _scripts/check-translations.rb`로 일관성 확인

## Consequences

### Positive
- ✅ **글로벌 접근성**: 다국어 독자층 확보
- ✅ **SEO 향상**: 다국어 검색 최적화
- ✅ **사용자 경험**: 직관적인 언어 전환 UI
- ✅ **콘텐츠 관리**: 체계적인 번역 관리 시스템
- ✅ **확장성**: 새로운 언어 추가 용이

### Negative
- ⚠️ **복잡성 증가**: 사이트 구조 및 관리 복잡도 상승
- ⚠️ **번역 부담**: 모든 콘텐츠의 다국어 번역 필요
- ⚠️ **일관성 유지**: 번역 간 내용 동기화 필요
- ⚠️ **성능 영향**: JavaScript 기반 언어 전환으로 인한 로딩 시간

### Neutral
- 📝 **학습 곡선**: Jekyll 고급 기능 및 Liquid 템플릿 학습
- 📝 **유지보수**: 번역 상태 모니터링 및 업데이트 필요

## Implementation Challenges & Solutions

### Challenge 1: Jekyll 다국어 지원 한계
- **문제**: Jekyll은 기본적으로 다국어를 지원하지 않음
- **해결**: Liquid 템플릿과 front matter를 활용한 커스텀 구현

### Challenge 2: URL 구조 설계
- **문제**: 언어별 URL 구조 결정 (서브도메인 vs 경로 vs 파라미터)
- **초기 시도**: URL 파라미터 방식 (`?lang=en`) - Jekyll 정적 사이트 특성상 불가능
- **최종 해결**: 언어 prefix 방식 (`/ko/`, `/en/`, `/es/`) 채택으로 확장성과 SEO 최적화

### Challenge 3: 번역 일관성 관리
- **문제**: 번역 간 내용 동기화 및 누락 방지
- **해결**: `translation_key` 기반 연결 및 검증 스크립트 개발

### Challenge 4: SEO 최적화
- **문제**: 다국어 콘텐츠의 검색엔진 최적화
- **해결**: hreflang 태그, 구조화된 데이터, 언어별 메타태그 구현

### Challenge 5: 카테고리 번역 및 URL 관리
- **문제**: 카테고리명의 다국어 번역 및 일관된 URL 구조 유지
- **해결**: Liquid 필터 기반 번역 시스템 및 JavaScript URL 동기화

### Challenge 6: SEO 메타데이터 중복 및 복잡성
- **문제**: 여러 include 파일에 분산된 SEO 관련 코드로 인한 중복 및 관리 복잡성
- **해결**: 통합 SEO 시스템 구현으로 모든 메타데이터를 단일 파일에서 관리

## Future Enhancements

### Phase 2 (Tasks 7-12)
- 카테고리 번역 시스템
- 콘텐츠 전환 기능
- 다국어 사이트맵 생성
- 오류 처리 및 폴백 메커니즘

### Phase 3 (Tasks 13-18)
- 언어 선호도 지속성
- 번역 워크플로우 헬퍼
- 다국어 컴포넌트 스타일링
- 성능 최적화

### Long-term Vision
- AI 기반 자동 번역 통합
- 실시간 번역 상태 대시보드
- 커뮤니티 기반 번역 기여 시스템

## Related
- **Links**: 
  - [Jekyll Internationalization](https://jekyllrb.com/docs/step-by-step/10-deployment/)
  - [Google Search Console - International Targeting](https://developers.google.com/search/docs/specialty/international)
- **Dependencies**: 
  - ADR-001: Jekyll + Minimal Mistakes 테마
  - ADR-004: SEO 메타태그 설정
- **Follow-up ADRs**: 
  - ADR-008: 다국어 SEO 최적화 (예정)
  - ADR-009: 번역 워크플로우 자동화 (예정)

## Lessons Learned

### 바이브 코딩 방식 적용
- **AI 협업**: Claude를 활용한 복잡한 Liquid 템플릿 로직 구현
- **점진적 개발**: 18개 태스크로 세분화하여 단계별 구현
- **검증 중심**: 각 단계마다 빌드 테스트 및 기능 검증

### Jekyll 고급 기능 활용
- **Liquid 템플릿**: 복잡한 조건부 로직 및 데이터 필터링
- **Front Matter**: 구조화된 메타데이터 관리
- **Include 시스템**: 재사용 가능한 컴포넌트 개발

### 다국어 웹사이트 설계 원칙
- **사용자 중심**: 직관적인 언어 전환 경험
- **SEO 친화적**: 검색엔진 최적화 고려
- **확장 가능**: 새로운 언어 추가 용이성
- **일관성**: 번역 간 구조 및 스타일 통일

---

**문서 작성**: 2025-09-09
**작성자**: LISA Development Team
**구현 상태**: ✅ **핵심 시스템 완료** (2025-09-16)
**확장 기능**: Tasks 10-18 향후 구현 예정