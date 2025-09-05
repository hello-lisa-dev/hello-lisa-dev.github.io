# ADR-005: 파일 구조 및 디렉토리 조직화

## Status
- **Date**: 2025-09-05
- **Status**: ✅ Accepted
- **Context**: Jekyll 사이트의 체계적인 파일 구조 및 디렉토리 조직화

## Decision

### What
- **Content Structure**: 명확한 콘텐츠 분리 및 조직화
- **File Organization**: 논리적인 디렉토리 구조
- **Build Optimization**: Jekyll 빌드에서 제외할 파일 설정
- **Navigation Structure**: 사이트 네비게이션 체계화

### Why
1. **유지보수성 향상**:
   - **명확한 구조**: 파일 위치를 쉽게 파악
   - **확장성**: 새로운 콘텐츠 추가 시 일관된 구조
   - **협업 효율성**: 팀원들이 쉽게 이해할 수 있는 구조

2. **빌드 최적화**:
   - **불필요한 파일 제외**: 빌드 시간 단축
   - **캐시 최적화**: 변경되지 않은 파일 제외
   - **배포 효율성**: 필요한 파일만 배포

3. **SEO 및 사용자 경험**:
   - **명확한 URL 구조**: 사용자 친화적인 URL
   - **네비게이션 체계**: 직관적인 사이트 구조
   - **콘텐츠 분리**: 블로그와 앱 지원 페이지 분리

### How

## Recommended File Structure

```
/
├── index.md                    # 블로그 홈페이지 (layout: home)
├── _posts/                     # 블로그 포스트
│   ├── 2025-01-04-title.md    # YYYY-MM-DD-title.md 형식
│   └── 2025-01-03-title.md
├── _pages/                     # 정적 페이지
│   ├── about.md               # layout: single
│   ├── categories.md          # layout: archive
│   ├── tags.md                # layout: archive
│   ├── portfolio.md           # layout: single
│   └── apps/                  # 앱별 페이지
│       └── tip-smart/
│           ├── index.md       # layout: single
│           └── privacy.md     # layout: single
├── _includes/                  # 재사용 가능한 컴포넌트
│   ├── head/
│   │   ├── custom.html
│   │   ├── google-analytics.html
│   │   ├── og-tags.html
│   │   ├── favicon.html
│   │   └── structured-data.html
│   └── footer/
├── _data/                      # 사이트 데이터
│   └── navigation.yml         # 사이트 네비게이션
├── assets/                     # 정적 에셋
│   ├── css/                   # 커스텀 CSS 파일
│   │   └── tipsmart.css
│   └── images/                # 이미지 파일
│       ├── og-image.jpg
│       ├── logo.png
│       └── bio-photo.jpg
├── docs/                       # 문서 (빌드 제외)
│   ├── ADR-001-jekyll-minimal-mistakes-theme.md
│   ├── ADR-002-github-pages-deployment.md
│   ├── ADR-003-google-analytics-integration.md
│   ├── ADR-004-seo-meta-tags-setup.md
│   ├── ADR-005-file-structure-organization.md
│   └── ADR-006-troubleshooting-common-issues.md
├── _config.yml                 # Jekyll 메인 설정
├── Gemfile                     # Ruby 의존성
├── Gemfile.lock               # 의존성 잠금
├── robots.txt                 # 검색 엔진 크롤링 가이드
├── sitemap.xml                # 사이트맵 (자동 생성)
├── favicon.ico                # 사이트 아이콘
├── apple-touch-icon.png       # iOS 홈 화면 아이콘
├── site.webmanifest           # 웹 앱 매니페스트
├── ARCHITECTURE.md            # ADR 인덱스
└── CLAUDE.md                  # AI 어시스턴트 가이드
```

## Content Structure

### 블로그 콘텐츠
- **`index.md`**: 메인 블로그 홈페이지
- **`_posts/`**: 블로그 포스트 (YYYY-MM-DD-title.md 형식)
- **`_pages/about.md`**: 소개 페이지
- **`_pages/categories.md`**: 카테고리 아카이브
- **`_pages/tags.md`**: 태그 아카이브
- **`_pages/portfolio.md`**: 포트폴리오 페이지

### 앱 지원 페이지
- **`_pages/apps/tip-smart/`**: TipSmart 앱 지원 페이지
  - **`index.md`**: 앱 소개 및 지원 정보
  - **`privacy.md`**: 개인정보처리방침

### 정적 에셋
- **`assets/css/`**: 커스텀 CSS 파일
- **`assets/images/`**: 이미지 파일
- **`favicon.ico`**: 브라우저 탭 아이콘
- **`apple-touch-icon.png`**: iOS 홈 화면 아이콘

## Build Configuration

### Jekyll 빌드에서 제외할 파일들
```yaml
# _config.yml
exclude:
  - CLAUDE.md
  - ARCHITECTURE.md
  - docs/
  - Gemfile
  - Gemfile.lock
  - README.md
  - LICENSE
  - CHANGELOG.md
  - .gitignore
  - vendor/
  - .bundle/
  - node_modules/
  - .sass-cache/
  - .jekyll-cache/
  - .jekyll-metadata
```

### 포함할 디렉토리
```yaml
# _config.yml
include:
  - _pages
```

## Navigation Structure

### 사이트 네비게이션 설정
```yaml
# _data/navigation.yml
main:
  - title: "Home"
    url: /
  - title: "About"
    url: /about/
  - title: "Posts"
    url: /posts/
  - title: "Portfolio"
    url: /portfolio/
```

### URL 구조
- **블로그 홈**: `/`
- **소개**: `/about/`
- **포스트**: `/posts/`
- **포트폴리오**: `/portfolio/`
- **TipSmart**: `/tip-smart/`
- **TipSmart 개인정보처리방침**: `/tip-smart-privacy/`

## File Naming Conventions

### 블로그 포스트
- **형식**: `YYYY-MM-DD-title.md`
- **예시**: `2025-01-04-jekyll-blog-setup-guide.md`
- **위치**: `_posts/` 디렉토리

### 정적 페이지
- **형식**: `page-name.md`
- **예시**: `about.md`, `privacy.md`
- **위치**: `_pages/` 디렉토리

### 이미지 파일
- **형식**: `kebab-case.png/jpg`
- **예시**: `og-image.jpg`, `bio-photo.jpg`
- **위치**: `assets/images/` 디렉토리

### CSS 파일
- **형식**: `kebab-case.css`
- **예시**: `tipsmart.css`, `custom.css`
- **위치**: `assets/css/` 디렉토리

## Content Guidelines

### 블로그 콘텐츠 작성
- **위치**: `_posts/` 디렉토리
- **Front Matter**: `layout: single` 사용
- **날짜 형식**: `YYYY-MM-DD HH:MM:SS +0900`
- **카테고리/태그**: 배열 형식으로 작성

### 정적 페이지 작성
- **위치**: `_pages/` 디렉토리
- **Front Matter**: `layout: single` 사용
- **Permalink**: 명시적 URL 설정
- **SEO**: `seo_title`, `description` 설정

### 앱 지원 페이지
- **위치**: `_pages/apps/{app-name}/`
- **URL 구조**: `/{app-name}/` 또는 `/{app-name}-privacy/`
- **CSS**: 앱별 커스텀 CSS 파일 사용

## Page-Specific CSS

### 커스텀 CSS 지원
```yaml
# 페이지 Front Matter에서
custom_css_file: tipsmart

# 또는 여러 CSS 파일
custom_css:
  - tipsmart
  - custom
```

### CSS 파일 구조
```
assets/css/
├── tipsmart.css      # TipSmart 앱 전용 스타일
├── custom.css        # 일반 커스텀 스타일
└── page-specific.css # 특정 페이지 스타일
```

## Documentation Structure

### ADR (Architecture Decision Record) 구조
```
docs/
├── ADR-001-jekyll-minimal-mistakes-theme.md
├── ADR-002-github-pages-deployment.md
├── ADR-003-google-analytics-integration.md
├── ADR-004-seo-meta-tags-setup.md
├── ADR-005-file-structure-organization.md
└── ADR-006-troubleshooting-common-issues.md
```

### 문서 접근성
- **ARCHITECTURE.md**: ADR 인덱스 및 빠른 참조
- **CLAUDE.md**: AI 어시스턴트 가이드
- **docs/**: 상세 기술 문서 (빌드 제외)

## Consequences

### Positive
- ✅ **명확한 구조**: 파일 위치를 쉽게 파악
- ✅ **확장성**: 새로운 콘텐츠 추가 시 일관된 구조
- ✅ **빌드 최적화**: 불필요한 파일 제외로 빌드 시간 단축
- ✅ **SEO 최적화**: 명확한 URL 구조
- ✅ **유지보수성**: 체계적인 파일 조직화

### Negative
- ⚠️ **초기 설정**: 구조 설계 및 설정 시간 필요
- ⚠️ **학습 곡선**: 새로운 팀원의 구조 이해 필요
- ⚠️ **파일 이동**: 기존 파일 재구성 필요

### Neutral
- 📝 **일관성**: 모든 콘텐츠가 동일한 구조 따름
- 📝 **표준화**: Jekyll 모범 사례 준수

## Troubleshooting

### 일반적인 파일 구조 문제

#### 1. 페이지가 나타나지 않음
**원인**: 
- 파일 위치 오류
- Front Matter 설정 오류
- Permalink 설정 오류

**해결**:
1. 파일 위치 확인 (`_pages/` 또는 `_posts/`)
2. Front Matter 설정 확인
3. Permalink 설정 확인

#### 2. CSS가 적용되지 않음
**원인**: 
- CSS 파일 경로 오류
- `custom_css_file` 설정 누락

**해결**:
1. CSS 파일이 `assets/css/`에 있는지 확인
2. Front Matter에서 `custom_css_file` 설정 확인

#### 3. 이미지가 표시되지 않음
**원인**: 
- 이미지 파일 경로 오류
- 파일명 대소문자 오류

**해결**:
1. 이미지 파일이 `assets/images/`에 있는지 확인
2. 파일명 대소문자 정확히 확인
3. 상대 경로 사용: `/assets/images/filename.jpg`

## Related
- **Links**: 
  - [Jekyll Directory Structure](https://jekyllrb.com/docs/structure/)
  - [Minimal Mistakes Theme Structure](https://mmistakes.github.io/minimal-mistakes/docs/structure/)
- **Dependencies**: 
  - Jekyll 기본 구조
  - Minimal Mistakes 테마 구조
- **Follow-up ADRs**: 
  - ADR-006: 문제 해결 가이드
