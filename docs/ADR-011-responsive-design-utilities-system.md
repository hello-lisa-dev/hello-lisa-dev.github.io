# ADR-011: Responsive Design Utilities System Implementation

## Status
Accepted

## Date
2025-09-16

## Context

모바일 UX 개선을 위해 특정 컴포넌트(사이드바, 언어 선택 영역)를 모바일에서 숨겨야 하는 요구사항이 발생했다. 초기에는 Bootstrap 클래스(`d-none d-lg-block`)를 사용하려 했으나, Minimal Mistakes 테마는 Bootstrap을 사용하지 않고 자체 SCSS 시스템을 사용한다는 것을 확인했다.

### 기술적 조사 결과
1. **Minimal Mistakes 브레이크포인트 시스템**:
   - `$small: 600px`
   - `$medium: 768px`
   - `$medium-wide: 900px`
   - `$large: 1024px`
   - `$x-large: 1280px`

2. **기존 문제점**:
   - 특정 컴포넌트에만 적용되는 임시방편적 CSS
   - 재사용성 부족
   - 반응형 설계 원칙 미준수
   - 유지보수성 저하

### 초기 접근법의 문제점
```css
/* 문제가 있던 초기 접근법 */
@media (max-width: 1023px) {
  .hidden-mobile {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .translation-links,
  .translation-notice {
    display: none !important;
  }
}
```

이는 특정 컴포넌트에 의존적이고 확장성이 떨어지는 구조였다.

## Decision

**체계적인 반응형 유틸리티 시스템**을 구축하여 Mobile-First 접근법과 재사용 가능한 클래스 기반의 반응형 디자인을 구현한다.

### 구현 전략

#### 1. **CSS Custom Properties 활용**
```css
:root {
  --breakpoint-small: 600px;
  --breakpoint-medium: 768px;
  --breakpoint-medium-wide: 900px;
  --breakpoint-large: 1024px;
  --breakpoint-x-large: 1280px;
}
```

#### 2. **유틸리티 클래스 시스템**
- `.hide-sm`: 모바일(767px 이하)에서 숨김
- `.hide-md`: 태블릿까지(899px 이하) 숨김
- `.hide-lg`: 작은 데스크톱까지(1023px 이하) 숨김
- `.show-sm-only`: 모바일에서만 표시
- `.show-md-only`: 태블릿에서만 표시
- `.show-lg-up`: 데스크톱 이상에서만 표시

#### 3. **Progressive Enhancement 방식**
기본적으로 모든 요소를 표시하고, 특정 화면 크기에서 숨기는 방식을 채택하여 접근성과 사용성을 보장한다.

#### 4. **Component-Specific Rules**
개별 컴포넌트의 반응형 동작을 별도로 정의하여 레이아웃 일관성을 유지한다.

```css
/* Sidebar responsive behavior */
@media (max-width: 1023px) {
  .sidebar__right {
    position: static !important;
    width: 100% !important;
    float: none !important;
    margin-bottom: 2rem;
  }
}
```

### 파일 구조
- **CSS 파일**: `/assets/css/mobile-responsive.css`
- **적용 방식**: `_includes/head/custom.html`에서 전역 로드
- **클래스 적용**: HTML 레이아웃과 include 파일에서 유틸리티 클래스 사용

## Consequences

### Positive
- ✅ **재사용성**: 다른 컴포넌트에서 동일한 유틸리티 클래스 재사용 가능
- ✅ **일관성**: 전체 사이트에서 일관된 브레이크포인트와 반응형 동작
- ✅ **유지보수성**: 중앙 집중화된 반응형 규칙 관리
- ✅ **확장성**: 새로운 유틸리티 클래스 쉽게 추가 가능
- ✅ **성능**: 불필요한 JavaScript 없이 순수 CSS로 구현
- ✅ **접근성**: Progressive Enhancement로 기본 접근성 보장

### Neutral
- **파일 증가**: 추가 CSS 파일 생성으로 HTTP 요청 1개 증가
- **학습 곡선**: 팀원들이 새로운 유틸리티 클래스 체계 학습 필요

### Design Patterns Applied
- **Mobile-First Responsive Design**: 작은 화면부터 설계하여 점진적 향상
- **Utility-First CSS**: 재사용 가능한 단일 목적 클래스들
- **Progressive Enhancement**: 기본 기능 우선, 향상된 기능은 선택적 적용
- **Separation of Concerns**: 스타일링과 구조의 분리

### Implementation Details

#### Before (문제가 있던 코드):
```html
<aside class="sidebar__right sticky hidden-mobile">
<div class="translation-links d-none d-md-block">
```

#### After (개선된 코드):
```html
<aside class="sidebar__right sticky hide-lg">
<div class="translation-links hide-sm">
```

### Future Considerations
1. **Dark Mode 지원**: CSS Custom Properties 활용하여 다크 모드 구현 가능
2. **애니메이션**: 반응형 전환 시 부드러운 애니메이션 추가 가능
3. **컨테이너 쿼리**: 향후 CSS Container Queries 지원 시 업그레이드 경로 확보

## References
- [Minimal Mistakes Theme Documentation](https://mmistakes.github.io/minimal-mistakes/)
- [Minimal Mistakes SCSS Variables](https://github.com/mmistakes/minimal-mistakes/blob/master/_sass/minimal-mistakes/_variables.scss)
- [Minimal Mistakes Sidebar SCSS](https://github.com/mmistakes/minimal-mistakes/blob/master/_sass/minimal-mistakes/_sidebar.scss)
- [Responsive Web Design Principles](https://web.dev/responsive-web-design-basics/)