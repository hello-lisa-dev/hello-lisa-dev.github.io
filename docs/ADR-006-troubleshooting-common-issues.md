# ADR-006: 일반적인 문제들 및 해결 방법

## Status
- **Date**: 2025-09-05
- **Status**: ✅ Accepted
- **Context**: Jekyll + Minimal Mistakes 테마 사용 시 발생하는 일반적인 문제들과 해결 방법

## Decision

### What
- **문제 분류**: 빌드, 레이아웃, 배포, SEO, 성능 문제로 분류
- **해결 방법**: 단계별 문제 해결 가이드
- **예방 방법**: 문제 발생 방지를 위한 모범 사례
- **참조 정보**: 관련 ADR 및 문서 링크

### Why
1. **개발 효율성 향상**:
   - **빠른 문제 해결**: 일반적인 문제의 즉시 해결
   - **시간 절약**: 문제 해결 시간 단축
   - **학습 효과**: 문제 해결 과정을 통한 이해도 향상

2. **팀 협업 개선**:
   - **일관된 해결 방법**: 팀원들이 동일한 방법으로 문제 해결
   - **지식 공유**: 문제 해결 경험 공유
   - **문서화**: 해결 방법의 체계적 정리

3. **사이트 안정성**:
   - **예방적 접근**: 문제 발생 전 예방
   - **모니터링**: 지속적인 상태 확인
   - **최적화**: 성능 및 사용자 경험 개선

### How

## Build Issues

### 1. Ruby 버전 호환성 문제
**문제**: Bundler 버전과 Ruby 버전 불일치
```
ERROR: bundler-2.7.1 requires Ruby version >= 3.2.0. The current ruby version is 3.1.7.
```

**해결 방법**:
1. **GitHub Actions**: Ruby 버전을 3.2로 변경
```yaml
# .github/workflows/jekyll.yml
- name: Setup Ruby
  uses: ruby/setup-ruby@v1
  with:
    ruby-version: '3.2'  # 3.1에서 3.2로 변경
```

2. **로컬 환경**: Ruby 3.2 설치
```bash
# rbenv 사용 시
rbenv install 3.2.0
rbenv local 3.2.0

# rvm 사용 시
rvm install 3.2.0
rvm use 3.2.0
```

### 2. Jekyll 빌드 오류
**문제**: vendor 디렉토리 파일 읽기 오류
```
Error: could not read file vendor/bundle/ruby/3.2.0/gems/jekyll-3.10.0/lib/site_template/_posts/0000-00-00-welcome-to-jekyll.markdown.erb
```

**해결 방법**:
```yaml
# _config.yml에 exclude 설정 추가
exclude:
  - vendor/
  - .bundle/
  - node_modules/
  - .sass-cache/
  - .jekyll-cache/
  - .jekyll-metadata
```

### 3. 플러그인 오류
**문제**: Jekyll 플러그인 로드 실패
```
Liquid Exception: undefined method `[]' for nil:NilClass
```

**해결 방법**:
1. **플러그인 확인**: `_config.yml`에서 플러그인 목록 확인
2. **Gemfile 확인**: 필요한 gem이 설치되어 있는지 확인
3. **버전 호환성**: Jekyll과 플러그인 버전 호환성 확인

## Layout Issues

### 1. CSS가 로드되지 않음
**문제**: `layout: post` 사용으로 인한 스타일 문제
```
Layout 'post' requested in _pages/about.md does not exist
```

**해결 방법**:
```yaml
# 올바른 레이아웃 사용
---
layout: single  # post 대신 single 사용
title: "Page Title"
---
```

**올바른 레이아웃 사용법**:
- **블로그 포스트**: `layout: single`
- **정적 페이지**: `layout: single`
- **홈페이지**: `layout: home`
- **아카이브 페이지**: `layout: archive`

### 2. 포스트가 나타나지 않음
**문제**: 파일명 또는 위치 오류

**해결 방법**:
1. **파일명 형식**: `YYYY-MM-DD-title.md` 형식 준수
2. **파일 위치**: `_posts/` 디렉토리에 위치
3. **Front Matter**: 필수 필드 포함
```yaml
---
layout: single
title: "Post Title"
date: 2025-01-04 10:00:00 +0900
categories: [Development]
tags: [jekyll, blog]
---
```

### 3. 네비게이션 문제
**문제**: 페이지가 네비게이션에 나타나지 않음

**해결 방법**:
1. **`_data/navigation.yml` 확인**:
```yaml
main:
  - title: "About"
    url: /about/
```

2. **Permalink 설정 확인**:
```yaml
---
permalink: /about/
---
```

## Deployment Issues

### 1. GitHub Pages 배포 실패
**문제**: 환경 보호 규칙 위반
```
Branch "feature-branch" is not allowed to deploy to github-pages due to environment protection rules.
```

**해결 방법**:
1. **GitHub Actions 조건 설정**:
```yaml
deploy:
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
```

2. **GitHub Pages 설정**: Source를 "Deploy from a branch"로 설정

### 2. 배포 지연
**문제**: GitHub Pages 빌드 큐 대기

**해결 방법**:
1. **대기**: 5-10분 대기
2. **GitHub Actions 사용**: 수동 배포 옵션
3. **빌드 상태 확인**: GitHub Pages 설정에서 빌드 상태 확인

### 3. 환경변수 주입 실패
**문제**: GitHub Actions에서 환경변수 주입 실패

**해결 방법**:
1. **Secrets 설정 확인**: GitHub Repository → Settings → Secrets
2. **워크플로우 수정**: 환경변수 주입 로직 확인
3. **대안 방법**: 직접 설정 방식 사용

## SEO Issues

### 1. 메타 설명이 표시되지 않음
**문제**: `description` 필드 누락 또는 길이 초과

**해결 방법**:
```yaml
---
title: "Page Title"
description: "160자 이내의 명확한 페이지 설명"  # 160자 이내
---
```

### 2. OG 이미지가 표시되지 않음
**문제**: 이미지 파일 경로 오류 또는 크기 문제

**해결 방법**:
1. **이미지 경로 확인**: `/assets/images/og-image.jpg`
2. **권장 크기 사용**: 1200x630 픽셀
3. **절대 URL 사용**: `{{ site.url }}{{ site.baseurl }}/assets/images/og-image.jpg`

### 3. 검색 결과에 사이트가 나타나지 않음
**문제**: Google Search Console 미설정 또는 색인 지연

**해결 방법**:
1. **Google Search Console 설정**: 사이트 등록
2. **Sitemap 제출**: `/sitemap.xml` 제출
3. **색인 요청**: 중요한 페이지들 수동 색인 요청

## Analytics Issues

### 1. Google Analytics 데이터가 나타나지 않음
**문제**: GA 스크립트가 HTML에 포함되지 않음

**해결 방법**:
1. **`_config.yml` 확인**:
```yaml
analytics:
  provider: "google-gtag"
  google:
    tracking_id: "G-6BGXFPTH8H"
```

2. **스크립트 포함 확인**: `_includes/head/custom.html`에서 GA 스크립트 포함
3. **배포 상태 확인**: GitHub Pages 배포 완료 확인

### 2. 로컬에서도 GA 데이터가 전송됨
**문제**: `JEKYLL_ENV=development` 설정 누락

**해결 방법**:
```bash
# 올바른 로컬 실행 명령어
JEKYLL_ENV=development bundle exec jekyll serve
```

### 3. GA 스크립트 오류
**문제**: 브라우저 콘솔에서 GA 스크립트 오류

**해결 방법**:
1. **Measurement ID 확인**: 올바른 GA4 ID 사용
2. **스크립트 구문 확인**: HTML 구문 오류 확인
3. **네트워크 연결**: `googletagmanager.com` 접근 가능 여부 확인

## Performance Issues

### 1. 페이지 로딩 속도 느림
**문제**: 이미지 최적화 부족 또는 불필요한 스크립트

**해결 방법**:
1. **이미지 최적화**: WebP 형식 사용, 적절한 크기 조정
2. **스크립트 최적화**: 필요한 스크립트만 로드
3. **CSS 최적화**: 사용하지 않는 CSS 제거

### 2. Core Web Vitals 점수 낮음
**문제**: LCP, FID, CLS 점수 개선 필요

**해결 방법**:
1. **LCP 개선**: 이미지 최적화, 중요 CSS 인라인
2. **FID 개선**: JavaScript 최적화, 불필요한 스크립트 제거
3. **CLS 개선**: 이미지 크기 명시, 동적 콘텐츠 최소화

## Content Issues

### 1. Markdown 렌더링 문제
**문제**: Markdown이 HTML로 변환되지 않음

**해결 방법**:
1. **파일 확장자**: `.md` 확장자 사용
2. **Front Matter**: 올바른 YAML 형식 사용
3. **Jekyll 빌드**: `bundle exec jekyll build` 실행

### 2. 이미지가 표시되지 않음
**문제**: 이미지 파일 경로 오류

**해결 방법**:
1. **상대 경로 사용**: `/assets/images/filename.jpg`
2. **파일명 확인**: 대소문자 정확히 확인
3. **파일 위치**: `assets/images/` 디렉토리 확인

### 3. 링크가 작동하지 않음
**문제**: URL 경로 오류

**해결 방법**:
1. **절대 경로 사용**: `{{ site.url }}{{ site.baseurl }}/page/`
2. **Permalink 확인**: Front Matter에서 permalink 설정 확인
3. **파일 존재 확인**: 링크 대상 파일이 존재하는지 확인

## Prevention Best Practices

### 1. 개발 환경 설정
```bash
# 로컬 개발 시
JEKYLL_ENV=development bundle exec jekyll serve

# 빌드 테스트
bundle exec jekyll build
```

### 2. 파일 구조 준수
- **일관된 네이밍**: kebab-case 사용
- **올바른 위치**: 파일을 적절한 디렉토리에 배치
- **Front Matter**: 필수 필드 포함

### 3. 정기적인 확인
- **빌드 테스트**: 변경사항 적용 후 빌드 테스트
- **배포 확인**: GitHub Pages 배포 상태 확인
- **SEO 확인**: 메타태그 및 구조화된 데이터 확인

## Related ADRs
- **[ADR-001](./ADR-001-jekyll-minimal-mistakes-theme.md)**: Jekyll + Minimal Mistakes 테마 선택
- **[ADR-002](./ADR-002-github-pages-deployment.md)**: GitHub Pages 배포 전략
- **[ADR-003](./ADR-003-google-analytics-integration.md)**: Google Analytics 통합
- **[ADR-004](./ADR-004-seo-meta-tags-setup.md)**: SEO 메타태그 설정
- **[ADR-005](./ADR-005-file-structure-organization.md)**: 파일 구조 조직화

## External Resources
- [Jekyll Troubleshooting](https://jekyllrb.com/docs/troubleshooting/)
- [Minimal Mistakes Documentation](https://mmistakes.github.io/minimal-mistakes/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Google Analytics Help](https://support.google.com/analytics/)
- [Google Search Console Help](https://support.google.com/webmasters/)
