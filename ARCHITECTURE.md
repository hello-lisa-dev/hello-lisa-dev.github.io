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

### 🌐 Feature Enhancements
- **[ADR-007-multilingual-blog-support.md](./docs/ADR-007-multilingual-blog-support.md)** - 다국어 블로그 지원 시스템 구현 (한국어/영어/스페인어)
- **[ADR-008-jekyll-seo-tag-plugin-integration.md](./docs/ADR-008-jekyll-seo-tag-plugin-integration.md)** - Jekyll SEO Tag 플러그인 통합 및 JSON-LD 구조화된 데이터 설정
- **[ADR-009-multilingual-post-navigation.md](./docs/ADR-009-multilingual-post-navigation.md)** - 다국어 포스트 네비게이션 시스템 구현 (언어별 이전/다음, 관련 포스트 분리)
- **[ADR-010-adsense-script-loading-fix.md](./docs/ADR-010-adsense-script-loading-fix.md)** - GitHub Pages AdSense 스크립트 로딩 문제 해결 (개행문자 누락 이슈)

### 📋 ADR Status Overview
| ADR | Title | Status | Date | Priority |
|-----|-------|--------|------|----------|
| 001 | Jekyll + Minimal Mistakes Theme | ✅ Accepted | 2025-09-05 | High |
| 002 | GitHub Pages Deployment | ✅ Accepted | 2025-09-05 | High |
| 003 | Google Analytics Integration | ✅ Accepted | 2025-09-05 | High |
| 004 | SEO Meta Tags Setup | ✅ Accepted | 2025-09-05 | Medium |
| 005 | File Structure Organization | ✅ Accepted | 2025-09-05 | Medium |
| 006 | Troubleshooting Common Issues | ✅ Accepted | 2025-09-05 | High |
| 007 | Multilingual Blog Support | 🚧 In Progress | 2025-09-09 | High |
| 008 | Jekyll SEO Tag Plugin Integration | ✅ Accepted | 2025-09-15 | High |
| 009 | Multilingual Post Navigation | ✅ Accepted | 2025-09-16 | High |
| 010 | AdSense Script Loading Fix | ✅ Accepted | 2025-09-16 | Medium |

## 🚀 Quick Reference

### Current Status
- ✅ **Google Analytics**: 설정 완료 (G-6BGXFPTH8H)
- ✅ **Google Search Console**: 자동 연결 완료
- ✅ **GitHub Pages**: 배포 최적화 완료
- ✅ **SEO**: Jekyll SEO Tag 플러그인 통합 완료 (Google Search Console 오류 해결)
- 🚧 **Multilingual Support**: 다국어 지원 시스템 구현 중 (Tasks 1-6 완료)

### Key Files
- `_config.yml` - Jekyll 메인 설정
- `.github/workflows/jekyll.yml` - GitHub Actions 워크플로우
- `_data/navigation.yml` - 사이트 네비게이션

### Key Directories
- `_pages/` - 정적 페이지
- `_posts/` - 블로그 포스트
- `_includes/` - 재사용 가능한 컴포넌트
- `assets/` - 정적 에셋 (CSS, JS, 이미지)

## 📝 Recent Updates (2025-09-15)

### Completed Tasks (2025-09-06)
1. **Google Analytics 4 통합**
2. **GitHub Pages 배포 최적화**
3. **Ruby 버전 호환성 문제 해결**
4. **SEO 메타태그 구현**
5. **ADR 구조 도입 및 문서 분리**
6. **블로그 페르소나 및 콘텐츠 전략 수립**
7. **첫 번째 블로그 포스트 작성** ("바이브 코딩이란?")
8. **사이트 메타데이터 및 페이지 콘텐츠 업데이트**

### Completed Tasks (2025-09-09)
1. **다국어 지원 시스템 기반 구축** (Tasks 1-6)
   - 언어 설정 및 UI 텍스트 번역
   - 언어 감지 및 전환 로직
   - 언어 선택 UI 컴포넌트
   - 번역 링크 시스템
   - 포스트 Front Matter 구조 확장
2. **첫 번째 영어 번역** ("What is Vibe Coding?")
3. **번역 검증 도구** 개발

### Completed Tasks (2025-09-15)
1. **Jekyll SEO Tag 플러그인 통합**
   - Google Search Console "파싱할 수 없는 구조화된 데이터" 오류 해결
   - 커스텀 SEO 코드 완전 제거
   - `{% seo %}` 태그 추가로 자동 SEO 메타데이터 생성
   - JSON-LD 구조화된 데이터 정상화 (35개 파일에서 확인)
2. **SEO 설정 최적화**
   - Jekyll SEO Tag 플러그인 100% 사용으로 전환
   - Open Graph, Twitter Card, JSON-LD 자동 생성
   - hreflang 태그 유지 (다국어 SEO)
3. **ADR-008 문서화**
   - SEO 설정 변경사항 상세 기록
   - `seo.html` 파일 관련 오해 해소
   - 다음 작업자를 위한 주의사항 정리

### Next Steps
1. **다국어 시스템 완성** (Tasks 7-18)
   - 카테고리 번역 시스템
   - 콘텐츠 전환 기능
   - SEO 최적화
2. **추가 콘텐츠 번역**
3. **성능 최적화 및 테스트**

## 🎯 TipSmart 개발 경험 (블로그 콘텐츠 기반)

### AI 도구 활용 현황
- **Claude Code**: 90% 이상 개발에 사용, 코드 품질 70-80%
- **Cursor**: TipSmart 개발 시 사용하지 않음 (Claude Code 중심 전략)
- **Gemini CLI**: 당시 완성도 부족으로 제한적 사용
- **Codex CLI**: 개발 시점에 존재하지 않았거나 인지하지 못함

### Task Master 활용
- **상위 태스크**: 10개 정도
- **하위 태스크**: 각각 5-6개로 세분화 (총 50-60개)
- **의존성 관리**: Task Master가 자동 처리
- **코드 품질**: 70-80% 만족도
- **주요 문제점**:
  - 존재하지 않는 함수 사용 (빌드 시 발견)
  - 원하는 구조 미준수 (리팩토링 필요)
  - 정해진 태스크 완료 후 추가 작업 필요

### 개발 방식의 특징
- **실제 코딩**: 0% (코드 검토는 100%)
- **AI 협업**: Task Master → Claude Code 순차적 개발
- **체계적 접근**: PRD 기반 태스크 생성 및 순차적 실행
- **비용 고려**: Claude API 비용 부담, 하지만 충분한 가치

### 시행착오 경험
- **LLM 학습 데이터 한계**: 2024-2025년 초 기준 정보 제공
- **복잡도 증가 시 실수 증가**: 범위가 커질수록 품질 저하
- **구조적 문제**: AI가 생성한 코드의 아키텍처 미준수
- **추가 작업 필요**: 예상보다 많은 후속 태스크 생성

---

**문서 업데이트**: 2025-09-15  
**버전**: 2.3 (Jekyll SEO Tag 플러그인 통합)  
**유지보수**: LISA Development Team

