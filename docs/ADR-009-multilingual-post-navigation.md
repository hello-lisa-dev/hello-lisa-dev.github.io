# ADR-009: 다국어 포스트 네비게이션 시스템

**상태**: ✅ Accepted
**날짜**: 2025-09-16
**우선순위**: High

## 문제 상황

다국어 블로그에서 언어별 포스트 분리가 되지 않아 사용자 경험에 문제가 발생했습니다:

1. **이전/다음 포스트 네비게이션**: 언어 상관없이 모든 포스트가 섞여서 표시
2. **"You May Also Enjoy" 관련 포스트**: 다른 언어의 포스트들이 혼재되어 표시
3. **사용자 혼란**: 한국어 포스트를 읽던 사용자가 영어/스페인어 포스트로 이동하는 문제

## 의사결정

Jekyll의 Minimal Mistakes 테마 템플릿을 오버라이드하여 언어별 포스트 네비게이션을 구현합니다.

### 핵심 구현 사항

1. **언어 기반 필터링**: `lang` 필드를 기준으로 같은 언어 포스트만 표시
2. **템플릿 오버라이드**: 테마의 기본 include 파일들을 커스터마이징
3. **후방 호환성**: 언어 필드가 없는 포스트는 기존 동작 유지

## 구현 상세

### 1. 포스트 페이지네이션 (`_includes/post_pagination.html`)

이전/다음 포스트 네비게이션을 언어별로 필터링합니다.

```liquid
{% if page.lang %}
  {% assign same_lang_posts = site.posts | where: "lang", page.lang %}
  {% comment %}현재 포스트 위치 찾기 및 이전/다음 포스트 설정{% endcomment %}
{% else %}
  {% comment %}언어 필드가 없으면 기본 Jekyll 동작{% endcomment %}
{% endif %}
```

**주요 특징:**
- 언어별로 포스트를 필터링
- 같은 언어 내에서만 이전/다음 포스트 탐색
- `forloop.index0`를 사용한 정확한 인덱스 계산

### 2. 관련 포스트 (`_layouts/single.html` 직접 구현)

Jekyll 템플릿 우선순위 문제로 인해 `_includes/page__related.html` 오버라이드가 작동하지 않아, `single.html` 레이아웃에서 직접 구현했습니다.

```liquid
{% if page.id and page.related %}
  {% if page.lang %}
    {% assign lang_related_posts = site.related_posts | where: "lang", page.lang %}
    {% if lang_related_posts.size == 0 %}
      {% assign lang_related_posts = site.posts | where: "lang", page.lang %}
    {% endif %}
  {% else %}
    {% assign lang_related_posts = site.related_posts %}
  {% endif %}
{% endif %}
```

**주요 특징:**
- 같은 언어의 관련 포스트만 표시
- 관련 포스트가 없으면 같은 언어의 최근 포스트로 대체
- 현재 포스트 제외 및 숨겨진 포스트 필터링 유지

### 3. 포스트 Front Matter 구조

```yaml
---
title: "포스트 제목"
lang: "ko"  # 필수: ko, en, es
translation_key: "unique-key"  # 번역 연결용
---
```

## 영향도 분석

### 긍정적 영향
- **사용자 경험 개선**: 언어별 일관된 포스트 탐색
- **콘텐츠 구조화**: 언어별 명확한 그룹핑
- **SEO 최적화**: 언어별 내부 링크 구조

### 고려사항
- **추가 복잡성**: 템플릿 로직 복잡도 증가
- **유지보수**: 테마 업데이트 시 충돌 가능성
- **성능**: 언어별 필터링으로 인한 미미한 성능 영향

## 대안 검토

### 1. URL 기반 언어 분리
- **장점**: 완전한 언어별 사이트 분리
- **단점**: 복잡한 설정, 중복 관리 필요
- **결정**: 현재 규모에서 과도함

### 2. Include 파일 오버라이드
- **장점**: 테마 구조를 따르는 깔끔한 방식
- **단점**: Jekyll 템플릿 우선순위로 인해 적용되지 않음
- **결정**: 실제 테스트에서 작동하지 않아 포기

### 3. Jekyll Collections 활용
- **장점**: 언어별 컬렉션 분리
- **단점**: 기존 포스트 구조 변경 필요
- **결정**: 마이그레이션 비용 과다

### 4. 플러그인 개발
- **장점**: 재사용 가능한 솔루션
- **단점**: GitHub Pages 호환성 문제
- **결정**: 배포 제약으로 부적합

## 구현 결과

### 테스트 시나리오
1. **한국어 포스트**: 한국어 포스트들만 네비게이션에 표시 ✅
2. **영어 포스트**: 영어 포스트들만 네비게이션에 표시 ✅
3. **언어 미지정**: 기존 Jekyll 동작 유지 ✅
4. **관련 포스트**: 같은 언어만 "You May Also Enjoy"에 표시 ✅

### 성능 측정
- 빌드 시간: 기존 대비 무시할 수준의 증가
- 페이지 로드: 영향 없음
- 메모리 사용: 필터링 로직으로 인한 미미한 증가

## 향후 개선사항

1. **언어 전환 UI**: 포스트 간 번역 링크 추가
2. **언어별 아카이브**: 카테고리/태그 페이지 언어 분리
3. **자동화**: 번역 상태 추적 시스템
4. **SEO 개선**: hreflang 태그 자동 생성

## 관련 문서

- **ADR-007**: [Multilingual Blog Support](./ADR-007-multilingual-blog-support.md)
- **ADR-008**: [Jekyll SEO Tag Plugin Integration](./ADR-008-jekyll-seo-tag-plugin-integration.md)

## 의사결정 근거

이 결정은 다음과 같은 원칙에 기반합니다:

1. **사용자 중심**: 언어별 일관된 경험 제공
2. **점진적 개선**: 기존 시스템에 최소한의 변경
3. **유지보수성**: 테마 구조를 따르는 확장
4. **확장성**: 추가 언어 지원 용이성

---

**작성자**: LISA Development Team
**검토자**: N/A
**승인자**: LISA Development Team
**다음 검토일**: 2025-12-16