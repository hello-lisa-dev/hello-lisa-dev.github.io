# ARCHITECTURE.md

This document serves as an index for all Architecture Decision Records (ADRs) and technical documentation for the LISA Development Team blog site.

## 📚 Architecture Decision Records (ADRs)

### 🎯 Core Decisions
- **[ADR-001-jekyll-minimal-mistakes-theme.md](./docs/ADR-001-jekyll-minimal-mistakes-theme.md)** - Jekyll + Minimal Mistakes 테마 선택 및 레이아웃 구조
- **[ADR-002-github-pages-deployment.md](./docs/ADR-002-github-pages-deployment.md)** - GitHub Pages 배포 전략 및 CI/CD 설정
- **[ADR-003-google-analytics-integration.md](./docs/ADR-003-google-analytics-integration.md)** - Google Analytics 4 통합 및 로컬 환경 설정
- **[ADR-004-seo-meta-tags-setup.md](./docs/ADR-004-seo-meta-tags-setup.md)** - SEO 메타태그, Open Graph, Structured Data 구현
- **[ADR-005-file-structure-organization.md](./docs/ADR-005-file-structure-organization.md)** - 파일 구조 및 디렉토리 조직화
- **[ADR-006-troubleshooting-common-issues.md](./docs/ADR-006-troubleshooting-common-issues.md)** - 일반적인 문제들 및 해결 방법

### 📋 ADR Status Overview
| ADR | Title | Status | Date | Priority |
|-----|-------|--------|------|----------|
| 001 | Jekyll + Minimal Mistakes Theme | ✅ Accepted | 2025-09-05 | High |
| 002 | GitHub Pages Deployment | ✅ Accepted | 2025-09-05 | High |
| 003 | Google Analytics Integration | ✅ Accepted | 2025-09-05 | High |
| 004 | SEO Meta Tags Setup | ✅ Accepted | 2025-09-05 | Medium |
| 005 | File Structure Organization | ✅ Accepted | 2025-09-05 | Medium |
| 006 | Troubleshooting Common Issues | ✅ Accepted | 2025-09-05 | High |

## 🚀 Quick Reference

### Current Status
- ✅ **Google Analytics**: 설정 완료 (G-6BGXFPTH8H)
- ✅ **Google Search Console**: 자동 연결 완료
- ✅ **GitHub Pages**: 배포 최적화 완료
- ✅ **SEO**: 메타태그 및 구조화된 데이터 설정 완료

### Key Files
- `_config.yml` - Jekyll 메인 설정
- `.github/workflows/jekyll.yml` - GitHub Actions 워크플로우
- `_data/navigation.yml` - 사이트 네비게이션

### Key Directories
- `_pages/` - 정적 페이지
- `_posts/` - 블로그 포스트
- `_includes/` - 재사용 가능한 컴포넌트
- `assets/` - 정적 에셋 (CSS, JS, 이미지)

## 📝 Recent Updates (2025-09-05)

### Completed Tasks
1. **Google Analytics 4 통합**
2. **GitHub Pages 배포 최적화**
3. **Ruby 버전 호환성 문제 해결**
4. **SEO 메타태그 구현**
5. **ADR 구조 도입 및 문서 분리**

### Next Steps
1. **Sitemap 제출** (Google Search Console)
2. **이미지 에셋 생성** (favicon, og-image 등)
3. **콘텐츠 최적화** (블로그 포스트 작성)

---

**문서 업데이트**: 2025-09-05  
**버전**: 2.0 (ADR 구조 도입)  
**유지보수**: LISA Development Team

