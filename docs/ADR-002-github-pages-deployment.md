# ADR-002: GitHub Pages 배포 전략 및 CI/CD 설정

## Status
- **Date**: 2025-09-05
- **Status**: ✅ Accepted
- **Context**: Jekyll 사이트의 안정적이고 효율적인 배포 전략 수립

## Decision

### What
- **Primary Method**: GitHub Pages 기본 Jekyll 빌드 사용
- **Backup Method**: GitHub Actions 워크플로우 (PR 테스트용)
- **Ruby Version**: 3.2 (Bundler 2.7.1 호환성)
- **Deployment Condition**: main 브랜치 push에서만 배포

### Why
1. **GitHub Pages 기본 빌드 선택 이유**:
   - **간단함**: 복잡한 설정 불필요
   - **안정성**: GitHub에서 공식 지원
   - **자동화**: push 시 자동 빌드 및 배포
   - **호환성**: Ruby 버전 자동 관리

2. **GitHub Actions를 백업으로 사용**:
   - **PR 테스트**: Pull Request에서 빌드 테스트
   - **수동 배포**: 필요시 수동 배포 옵션
   - **환경변수**: 향후 환경변수 주입 가능

3. **Ruby 3.2 선택**:
   - **Bundler 호환성**: Bundler 2.7.1 요구사항 충족
   - **Jekyll 지원**: Jekyll 3.10.0 완전 지원
   - **GitHub Pages 호환**: GitHub Pages 지원 버전

### How

#### GitHub Pages 기본 설정
```
Repository → Settings → Pages → Source: "Deploy from a branch"
Branch: main / / (root)
```

#### GitHub Actions 워크플로우 (Backup)
```yaml
# .github/workflows/jekyll.yml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2' # Bundler 2.7.1 호환성
          bundler-cache: true
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Build Configuration

### Jekyll 빌드 최적화
```yaml
# _config.yml
# Jekyll 빌드에서 제외할 파일들
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

### 배포 전략 비교

| 방법 | 장점 | 단점 | 사용 시기 |
|------|------|------|-----------|
| **GitHub Pages 기본** | 간단, 안정적, 자동 | 커스터마이징 제한 | 일반적인 배포 |
| **GitHub Actions** | 유연함, 환경변수 지원 | 복잡함, 설정 필요 | PR 테스트, 특수 요구사항 |

## Deployment Workflow

### 일반적인 배포 프로세스
1. **코드 작성** → 로컬에서 Jekyll 빌드 테스트
2. **Git Push** → main 브랜치에 푸시
3. **자동 빌드** → GitHub Pages에서 Jekyll 빌드
4. **자동 배포** → 사이트 업데이트 (2-3분 소요)

### PR 테스트 프로세스
1. **Feature Branch** → 새 기능 개발
2. **Pull Request** → main 브랜치로 PR 생성
3. **자동 테스트** → GitHub Actions에서 빌드 테스트
4. **리뷰** → 빌드 성공 확인 후 머지
5. **배포** → 머지 후 자동 배포

## Ruby Version Management

### 버전 호환성 문제 해결
- **문제**: Bundler 2.7.1이 Ruby 3.2.0 이상 요구
- **해결**: Ruby 3.2 사용으로 호환성 보장
- **확인**: `bundle exec jekyll build` 성공

### Gemfile.lock 관리
```ruby
# Gemfile.lock에서 확인 가능
BUNDLED WITH
   2.7.1
```

## Consequences

### Positive
- ✅ **간단한 배포**: push만으로 자동 배포
- ✅ **안정성**: GitHub 공식 지원
- ✅ **빠른 배포**: 2-3분 내 배포 완료
- ✅ **PR 테스트**: 빌드 오류 사전 방지
- ✅ **버전 호환성**: Ruby 3.2로 안정성 확보

### Negative
- ⚠️ **빌드 제한**: GitHub Pages Jekyll 버전 제한
- ⚠️ **플러그인 제한**: 일부 플러그인 사용 불가
- ⚠️ **환경변수**: 기본 빌드에서는 환경변수 주입 어려움

### Neutral
- 📝 **빌드 시간**: 2-3분 소요
- 📝 **캐시**: GitHub Pages 자동 캐싱

## Troubleshooting

### 일반적인 배포 문제

#### 1. Ruby 버전 호환성 오류
```
ERROR: bundler-2.7.1 requires Ruby version >= 3.2.0
```
**해결**: Ruby 3.2 사용 (GitHub Actions에서 설정)

#### 2. Jekyll 빌드 오류
```
Error: could not read file vendor/bundle/...
```
**해결**: `exclude` 설정에 `vendor/` 추가

#### 3. 배포 지연
**원인**: GitHub Pages 빌드 큐 대기
**해결**: 5-10분 대기 또는 GitHub Actions 사용

## Related
- **Links**: 
  - [GitHub Pages Documentation](https://docs.github.com/en/pages)
  - [Jekyll on GitHub Pages](https://jekyllrb.com/docs/github-pages/)
- **Dependencies**: 
  - Ruby 3.2
  - Bundler 2.7.1
  - Jekyll 3.10.0
- **Follow-up ADRs**: 
  - ADR-003: Google Analytics 통합
  - ADR-005: 파일 구조 조직화
