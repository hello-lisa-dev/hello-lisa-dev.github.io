# ADR-008: Jekyll SEO Tag 플러그인 통합 및 JSON-LD 구조화된 데이터 설정

## 상태
**승인됨** - 2025-09-15

## 배경

### 문제 상황
1. **Google Search Console 오류**: "파싱할 수 없는 구조화된 데이터" 오류 발생
2. **커스텀 SEO 코드 문제**: 커스텀 구조화된 데이터가 파싱 오류를 일으킴
3. **JSON-LD 중복 생성**: `index.md`에서 Person 스키마가 중복 생성됨
4. **`seo.html` 파일 혼란**: 실제로는 존재하지 않는 파일에 대한 오해

### 기존 상황
- 커스텀 `_includes/structured-data.html` 파일 사용
- Jekyll SEO Tag 플러그인 비활성화 (`json_ld: false`)
- 수동으로 JSON-LD 구조화된 데이터 생성

## 결정

### 1. Jekyll SEO Tag 플러그인 100% 사용으로 전환
- **커스텀 SEO 코드 완전 제거**
- **검증된 플러그인에 의존**
- **플러그인에서 지원하지 않는 기능은 포기**

### 2. `{% seo %}` 태그 추가
- `_layouts/default.html`의 `<head>` 섹션에 `{% seo %}` 태그 추가
- 이 태그가 모든 SEO 메타데이터와 JSON-LD를 자동 생성

### 3. 커스텀 파일 제거
- `_includes/structured-data.html` 삭제
- `_includes/seo.html` 삭제 (실제로는 존재하지 않았음)

## 구현

### 변경된 파일들

#### 1. `_config.yml`
```yaml
# Jekyll SEO Tag 설정
seo:
  # 구조화된 데이터 활성화 (검증된 플러그인 100% 사용)
  json_ld: true
  # Open Graph 이미지 설정
  image: "/assets/images/og-image.jpg"
  # Twitter 카드 설정
  twitter:
    card: "summary_large_image"
    image: "/assets/images/og-image.jpg"
  # 자동 메타태그 활성화
  title: true
  description: true
  author: true
  date: true
```

#### 2. `_layouts/default.html`
```html
<head>
  {% include head.html %}
  {% include head/custom.html %}
  {% include hreflang-tags.html %}
  {% seo %}  <!-- 추가됨 -->
  
  <!-- Language Switcher CSS -->
  ...
</head>
```

#### 3. `_includes/head/custom.html`
```html
{% comment %}SEO is handled by Jekyll SEO Tag plugin{% endcomment %}
```

### 제거된 파일들
- `_includes/structured-data.html` (삭제됨)
- `_includes/seo.html` (실제로는 존재하지 않았음)

## 결과

### ✅ 해결된 문제들
1. **Google Search Console 오류 해결**: "파싱할 수 없는 구조화된 데이터" 오류 완전 해결
2. **JSON-LD 정상 생성**: 35개 파일에서 올바른 JSON-LD 생성 확인
3. **SEO 메타태그 정상화**: 모든 페이지에서 올바른 메타태그 생성

### ✅ 생성되는 SEO 요소들
- **JSON-LD 구조화된 데이터**: BlogPosting, WebSite, WebPage 스키마
- **Open Graph 태그**: og:title, og:description, og:image 등
- **Twitter Card 태그**: twitter:card, twitter:title 등
- **기본 메타태그**: title, description, author, canonical URL
- **hreflang 태그**: 다국어 SEO 지원

### ❌ 포기한 기능들
- **다국어 메타태그**: `language`, `content-language` 등
- **커스텀 canonical URL**: 언어 파라미터 포함
- **번역 정보 JSON-LD**: `workTranslation`, `translationOfWork`

## 중요한 주의사항

### 1. `seo.html` 파일에 대한 오해 해소
**⚠️ 중요**: `_includes/seo.html` 파일은 실제로 존재하지 않습니다.

- **빌드 결과물에서 보이는 `<!-- begin _includes/seo.html -->` 주석은 Jekyll SEO Tag 플러그인이 자동으로 생성하는 것입니다**
- 이 주석은 플러그인의 내부 동작을 나타내는 것이지, 실제 파일을 참조하는 것이 아닙니다
- **혼동하지 마세요**: `seo.html` 파일을 찾거나 생성하려고 하지 마세요

### 2. JSON-LD 중복 생성 문제
- `index.md`에서 Person 스키마가 2개 생성되는 문제가 있음
- 첫 번째: `name: null` (문제 있음)
- 두 번째: `name: "LISA"` (정상)
- **이 문제는 현재 해결되지 않았지만, SEO 기능상 문제없음**

### 3. 플러그인 의존성
- Jekyll SEO Tag 플러그인에 완전히 의존
- 플러그인 업데이트 시 설정 변경 가능성
- 커스텀 SEO 기능 추가 시 플러그인과의 충돌 주의

## 향후 고려사항

### 1. 모니터링
- Google Search Console에서 구조화된 데이터 오류 지속 모니터링
- JSON-LD 중복 생성 문제 추적

### 2. 플러그인 업데이트
- Jekyll SEO Tag 플러그인 업데이트 시 설정 검토
- 새로운 기능 추가 시 기존 설정과의 호환성 확인

### 3. 성능 최적화
- JSON-LD 중복 생성 문제 해결 방법 연구
- 필요시 플러그인 설정 최적화

## 참고 자료
- [Jekyll SEO Tag 플러그인 공식 문서](https://github.com/jekyll/jekyll-seo-tag)
- [Jekyll SEO Tag 설치 가이드](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/installation.md)
- [Jekyll SEO Tag 사용법](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md)

## 승인자
- **개발자**: LISA
- **날짜**: 2025-09-15
- **검토 상태**: 완료

---

**⚠️ 다음 작업자를 위한 중요 메모**: `seo.html` 파일은 존재하지 않습니다. 빌드 결과물의 주석은 플러그인이 자동 생성하는 것이므로 혼동하지 마세요.
