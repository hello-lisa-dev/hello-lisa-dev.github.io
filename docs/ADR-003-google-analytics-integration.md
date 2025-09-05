# ADR-003: Google Analytics 4 통합 및 로컬 환경 설정

## Status
- **Date**: 2025-09-05
- **Status**: ✅ Accepted
- **Context**: 웹사이트 방문자 분석 및 사용자 행동 추적을 위한 분석 도구 통합

## Decision

### What
- **Analytics Provider**: Google Analytics 4 (GA4)
- **Measurement ID**: `G-6BGXFPTH8H`
- **Implementation Method**: Direct configuration in _config.yml
- **Local Environment**: 비활성화 (테스트 데이터 오염 방지)
- **Production Environment**: 자동 활성화

### Why
1. **Google Analytics 4 선택 이유**:
   - **무료**: 개인/소규모 사이트에 적합
   - **강력한 분석**: 사용자 행동, 유입 경로, 실시간 데이터
   - **Google 생태계**: Search Console과 자동 연동
   - **미래 지향적**: Universal Analytics 대체

2. **직접 설정 방식 선택**:
   - **간단함**: GitHub Pages 기본 빌드와 호환
   - **안정성**: 환경변수 주입 복잡성 제거
   - **투명성**: 설정이 명확하게 보임
   - **유지보수**: 설정 변경이 쉬움

3. **로컬 환경 비활성화**:
   - **데이터 품질**: 테스트 데이터와 실제 데이터 분리
   - **정확한 분석**: 실제 사용자 데이터만 수집
   - **개발 효율성**: 로컬 개발 시 불필요한 네트워크 요청 방지

### How

#### 1. _config.yml 설정
```yaml
# Google Analytics 설정 (Minimal Mistakes 공식 방법)
analytics:
  provider: "google-gtag"
  google:
    tracking_id: "G-6BGXFPTH8H"  # 직접 설정
    anonymize_ip: false
```

#### 2. GA4 스크립트 구현
```html
<!-- _includes/head/google-analytics.html -->
{% comment %}
Google Analytics (GA4) 스크립트
로컬 환경에서는 비활성화 (JEKYLL_ENV가 development가 아닐 때만)
{% endcomment %}

{% if site.analytics.provider == "google-gtag" and site.analytics.google.tracking_id %}
  {% unless jekyll.environment == "development" %}
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{ site.analytics.google.tracking_id }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ site.analytics.google.tracking_id }}'{% if site.analytics.google.anonymize_ip == true %}, { 'anonymize_ip': true }{% endif %});
</script>
<!-- End Google Analytics -->
  {% endunless %}
{% endif %}
```

#### 3. 스크립트 포함
```html
<!-- _includes/head/custom.html -->
{% include head/google-analytics.html %}
```

## File Structure

### Analytics 관련 파일 구조
```
_includes/
├── head/
│   ├── custom.html              # GA 스크립트 포함
│   └── google-analytics.html    # GA4 추적 스크립트

_config.yml                      # Analytics 설정
```

### Configuration Files
- **`_config.yml`** - Analytics 설정
- **`_includes/head/google-analytics.html`** - GA4 추적 구현
- **`_includes/head/custom.html`** - 스크립트 포함

## Analytics Features

### 자동 추적 기능
- **Page Views**: 모든 페이지 방문 자동 추적
- **User Behavior**: 세션 지속 시간, 이탈률, 사용자 흐름
- **Real-time Data**: 실시간 방문자 추적
- **Traffic Sources**: 직접 방문, 검색, 소셜 미디어, 참조 사이트
- **Device Information**: 데스크톱, 모바일, 태블릿 사용 현황

### 향후 확장 가능 기능
- **Custom Events**: GTM을 통한 커스텀 이벤트 추가
- **E-commerce Tracking**: 상품 구매 추적 (필요시)
- **Conversion Tracking**: 목표 달성 추적
- **Audience Segmentation**: 사용자 세분화

## Environment Configuration

### 로컬 개발 환경
```bash
# 로컬에서 Jekyll 실행 시
JEKYLL_ENV=development bundle exec jekyll serve

# 결과: GA 스크립트 비활성화
```

### 프로덕션 환경
```bash
# GitHub Pages 배포 시
JEKYLL_ENV=production bundle exec jekyll build

# 결과: GA 스크립트 활성화
```

## Google Search Console 연동

### 자동 연결
- **연결 방법**: Google Analytics 설정으로 자동 연결
- **상태**: ✅ 설정 완료
- **분석 기능**:
  - 검색 쿼리 분석
  - 페이지별 성과
  - Core Web Vitals
  - 색인 상태 모니터링

### 다음 단계
1. **Sitemap 제출**: Google Search Console에서
2. **색인 요청**: 중요한 페이지들
3. **성과 모니터링**: 정기적인 데이터 분석

## Deployment Notes

### 배포 후 확인 사항
- **Local Development**: GA 데이터 전송 안함 (테스트 데이터 오염 방지)
- **Production**: GitHub Pages 배포 후 데이터 수집 시작
- **Domain**: `hello-lisa-dev.github.io`로 설정
- **Build Method**: GitHub Pages 기본 Jekyll 빌드 사용

### 데이터 수집 시작
- **배포 완료**: GitHub Pages 배포 후 2-3분
- **첫 데이터**: 실제 방문자 발생 시
- **실시간 데이터**: 즉시 Google Analytics에서 확인 가능

## Troubleshooting

### 일반적인 문제

#### 1. GA 데이터가 나타나지 않음
**원인**: 
- 사이트가 GitHub Pages에 배포되지 않음
- GA 데이터 스트림 URL이 사이트 도메인과 일치하지 않음

**해결**:
1. GitHub Pages 배포 상태 확인
2. GA 데이터 스트림 URL 확인
3. 브라우저 콘솔에서 GA 스크립트 오류 확인

#### 2. 로컬에서도 GA 데이터가 전송됨
**원인**: `JEKYLL_ENV=development` 설정 누락

**해결**:
```bash
# 올바른 로컬 실행 명령어
JEKYLL_ENV=development bundle exec jekyll serve
```

#### 3. GA 스크립트가 HTML에 포함되지 않음
**원인**: 
- `_config.yml`에서 tracking_id 설정 누락
- `_includes/head/custom.html`에서 GA 스크립트 포함 누락

**해결**:
1. `_config.yml`에서 analytics 설정 확인
2. `_includes/head/custom.html`에서 GA 스크립트 포함 확인

## Consequences

### Positive
- ✅ **사용자 분석**: 방문자 행동 패턴 파악
- ✅ **성과 측정**: 페이지별 성과 분석
- ✅ **SEO 최적화**: 검색 유입 분석
- ✅ **실시간 모니터링**: 현재 방문자 확인
- ✅ **무료 사용**: 개인/소규모 사이트에 적합

### Negative
- ⚠️ **개인정보**: 사용자 데이터 수집 (GDPR 고려 필요)
- ⚠️ **성능 영향**: 추가 스크립트 로딩
- ⚠️ **의존성**: Google 서비스 의존

### Neutral
- 📝 **데이터 지연**: 실시간 데이터는 즉시, 집계 데이터는 24-48시간 지연
- 📝 **샘플링**: 대용량 데이터의 경우 샘플링 적용

## Related
- **Links**: 
  - [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
  - [Jekyll SEO Tag Plugin](https://github.com/jekyll/jekyll-seo-tag)
- **Dependencies**: 
  - Google Analytics 계정
  - GitHub Pages 배포
- **Follow-up ADRs**: 
  - ADR-004: SEO 메타태그 설정
  - ADR-006: 문제 해결 가이드
