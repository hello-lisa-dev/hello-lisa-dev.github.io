---
title: "CLAUDE.md 실전 활용법 - 수백 줄 괴물 되기 전에"
date: 2025-11-11
last_modified_at: 2025-11-11 19:22:14 +0900
categories: [바이브코딩, AI도구]
tags: [CLAUDE.md, ClaudeCode, 컨텍스트관리, 프로젝트관리, AI협업, 문서구조화, 개발생산성, 템플릿, 베스트프랙티스, 설계문서]
seo_title: "CLAUDE.md 관리 전략 - 효율적인 구조화와 실전 템플릿"
description: "CLAUDE.md가 수백 줄 괴물이 되기 전에! 효율적인 구조화, 프로젝트별 관리, 분석/설계 산출물 작성까지 실전 노하우를 공개합니다."

# 다국어 지원 필드
lang: "ko"
translation_key: "claude-md-best-practices"
permalink: /ko/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html"
---

안녕하세요, LISA입니다! 🙂

[지난 글]({{ site.baseurl }}{% post_url 2025-11-11-claude-code-context-management %})에서 "Clear + CLAUDE.md"로 컨텍스트 오염을 해결했다고 했는데요.

그런데... **CLAUDE.md 자체가 또 다른 문제**가 될 수 있어요.

"좋은 게 있으면 다 넣자!"
→ 어느새 300줄
→ AI도 헷갈려함
→ 결국 못 쓰는 파일

이번엔 **CLAUDE.md를 어떻게 관리할지** 실전 노하우를 공유해드릴게요!

## CLAUDE.md가 괴물이 되는 과정

### 1주차: 순수했던 시절

```markdown
# CLAUDE.md

This is my project.
Use TypeScript.
Follow ESLint rules.
```

**20줄, 완벽해요!**

### 2주차: 조금씩 추가

```markdown
# CLAUDE.md

## Project Overview
...

## Coding Style
...

## API Guidelines
...

## Testing Rules
...
```

**50줄, 아직 괜찮아요.**

### 4주차: 본격 성장

- 새로운 기능 추가할 때마다 규칙 추가
- "이것도 명시해야지", "저것도 적어두자"
- 특정 버그 때문에 예외 규칙 추가
- "다음엔 이렇게 하지 마" 메모 추가

**150줄, 좀 길어졌네?**

### 2개월차: 괴물 완성

- 스크롤이 끝나지 않음
- 어디에 뭐가 있는지 모름
- AI도 전체를 제대로 파악 못 함
- 결국 다시 짧은 대화로 회귀

**300줄, 망했어요...** 😅

## 왜 긴 CLAUDE.md가 문제일까?

### 1. AI도 다 못 읽어요

- 토큰 제한
- 중요한 부분과 덜 중요한 부분 구분 못 함
- 결국 앞부분만 집중

### 2. 유지보수 지옥

- 어디에 뭐가 있는지 모름
- 같은 내용 여러 곳에 중복
- 업데이트할 때 놓치는 부분 생김

### 3. 우선순위 불명확

- 모든 게 같은 레벨로 보임
- 진짜 중요한 게 묻혀버림

### 4. 프로젝트별 차이 없음

- 프로젝트 A 규칙
- 프로젝트 B 규칙
- 다 섞여버림

## 내가 찾은 해결책

### 원칙 1: 핵심만 남기기

**필수 항목 (항상 포함):**
- Project Overview (3-5줄)
- Primary Tech Stack (1줄)
- Critical Rules (3-5개)

**선택 항목 (필요시만):**
- Coding Style Details
- API Guidelines
- Specific Patterns

**목표: 100줄 이내**

### 원칙 2: 계층 구조

```markdown
# CLAUDE.md

## 🎯 Critical (반드시 지켜야 함)
- 절대 X 하지 마세요
- 항상 Y 방식을 쓰세요

## ⚡ Important (중요하지만 예외 가능)
- 가능하면 Z 패턴 사용
- A 라이브러리 선호

## 💡 Nice to Have (참고사항)
- 코드 스타일 가이드
- 네이밍 컨벤션
```

**우선순위가 명확해져요!**

### 원칙 3: 분리하기

**단일 파일 구조 (X):**
```
CLAUDE.md (300줄)
```

**분리된 구조 (O):**
```
CLAUDE.md (핵심 50줄)
.claude/
  ├── coding-style.md
  ├── api-guidelines.md
  ├── testing-rules.md
  └── architecture-decisions.md
```

**필요할 때만 추가로 읽혀주면 돼요!**

### 원칙 4: 템플릿 활용

**프로젝트 타입별 템플릿:**
- Web API Server Template
- Mobile App Template
- Library Template
- Microservice Template

**기본 템플릿에서 시작 → 필요한 것만 추가**

## 실전 CLAUDE.md 템플릿

### 기본 템플릿 (50줄 버전)

```markdown
# PROJECT_NAME

**Last Updated**: YYYY-MM-DD

## 🎯 Critical Rules

1. [가장 중요한 규칙]
2. [절대 하면 안 되는 것]
3. [항상 해야 하는 것]

## 📋 Project Info

- **Type**: [Web/Mobile/Library/API]
- **Stack**: [Primary tech stack]
- **Architecture**: [Pattern]

## ⚡ Important Guidelines

### Coding Style
- [핵심 스타일 2-3개]

### Error Handling
- [에러 처리 방식]

### Testing
- [테스트 전략 간단히]

## 💡 Reference

- More details: `.claude/` folder
- Architecture: `.claude/architecture.md`
- API docs: `.claude/api-spec.md`
```

### 분석 단계 템플릿 (요구사항 분석)

```markdown
# 요구사항 분석 프로젝트

## 🎯 Critical Rules

1. **유스케이스 기반 분석** - 항상 Actor 중심으로 작성
2. **Mermaid 다이어그램 필수** - 모든 분석 결과는 시각화
3. **비기능 요구사항 명시** - 성능, 보안, 가용성 반드시 포함

## 📋 Project Info

- **Type**: Requirements Analysis
- **Output**: 요구사항 명세서, 유스케이스 다이어그램
- **Format**: Markdown + Mermaid

## ⚡ Important Guidelines

### 문서 구조
1. 프로젝트 개요
2. 이해관계자 분석
3. 기능 요구사항 (유스케이스별)
4. 비기능 요구사항
5. 제약사항
6. 다이어그램

### 유스케이스 작성 규칙
- **Actor**: 시스템 외부 주체 (사용자, 외부 시스템)
- **Use Case**: 동사 + 목적어 형태
- **Description**: 사전조건, 기본흐름, 대체흐름, 사후조건

### Mermaid 유스케이스 다이어그램 포맷
    ```mermaid
    graph LR
        User[사용자]
        Admin[관리자]

        User --> UC1[상품 조회]
        User --> UC2[장바구니 담기]
        Admin --> UC3[상품 관리]
    ```

## 💡 Reference
- Detailed template: `.claude/requirements-template.md`
- Mermaid guide: `.claude/mermaid-usecases.md`
```

이렇게 분석 단계에서 CLAUDE.md를 설정해두면, Claude Code에게 "요구사항 문서 작성해줘"라고 하면 **일관된 포맷으로 바로 나와요.**

### 설계 단계 템플릿 (시스템 설계)

```markdown
# 시스템 설계 프로젝트

## 🎯 Critical Rules

1. **C4 Model 준수** - Context → Container → Component 순서
2. **시퀀스 다이어그램 필수** - 주요 기능별 상호작용 명시
3. **상태 다이어그램** - 복잡한 상태 변화는 반드시 시각화

## 📋 Project Info

- **Type**: System Design
- **Output**: 아키텍처 문서, 시퀀스/상태 다이어그램
- **Format**: Markdown + Mermaid

## ⚡ Important Guidelines

### 아키텍처 설계 순서

1. **System Context** (전체 시스템과 외부 관계)
2. **Container Diagram** (시스템 내부 구성)
3. **Component Diagram** (컨테이너 세부 구조)

### 시퀀스 다이어그램 작성 규칙

**주요 기능별로 작성:**
- Happy Path (정상 흐름)
- Error Path (에러 처리)
- Alternative Path (대체 흐름)

**Mermaid 포맷:**
    ```mermaid
    sequenceDiagram
        participant User
        participant API
        participant DB

        User->>API: 요청
        API->>DB: 쿼리
        DB-->>API: 결과
        API-->>User: 응답
    ```

### 상태 다이어그램 작성 규칙

**복잡한 상태 변화 시각화:**
    ```mermaid
    stateDiagram-v2
        [*] --> 대기중
        대기중 --> 처리중: 시작
        처리중 --> 완료: 성공
        처리중 --> 실패: 에러
        완료 --> [*]
    ```

**각 상태별 조건 명시:**
- 상태 전이 조건
- 상태별 허용 액션
- 타임아웃 규칙

## 💡 Reference
- C4 Model guide: `.claude/c4-model-guide.md`
- Sequence patterns: `.claude/sequence-patterns.md`
- State machine: `.claude/state-machine-guide.md`
```

이제 설계 단계에서 "로그인 프로세스 시퀀스 다이어그램 만들어줘"라고 하면, **정해진 포맷으로 일관되게** 나와요.

### iOS 앱 개발 템플릿

실제 제가 TipSmart 개발할 때 썼던 것과 비슷한 구조예요.

```markdown
# TipSmart iOS App

## 🎯 Critical Rules

1. **MVVM 패턴 엄수** - View는 절대 비즈니스 로직 포함 금지
2. **SwiftUI Only** - UIKit 사용 금지
3. **Core Data 동기화** - 모든 변경은 MainContext에서

## 📋 Project Info

- **Type**: iOS Mobile App
- **Stack**: SwiftUI + Core Data + AdMob
- **Min iOS**: 15.0
- **Architecture**: MVVM

## ⚡ Important Guidelines

### 프로젝트 구조
    ```
    TipSmart/
    ├── Views/          # SwiftUI Views
    ├── ViewModels/     # Business Logic
    ├── Models/         # Data Models
    ├── Services/       # External Services
    └── Utilities/      # Helper Functions
    ```

### Naming Convention
- ViewModel: `*ViewModel.swift`
- View: `*View.swift`
- Model: `*Model.swift`
- Service: `*Service.swift`

### Core Data Rules
- **Main Context**: UI 업데이트
- **Background Context**: 대량 데이터 처리
- **절대**: Main Thread에서 Background Context 사용 금지

### 설계 문서 작성
- 새 기능 추가 시 시퀀스 다이어그램 필수
- 복잡한 상태 관리는 상태 다이어그램 작성
- `.claude/design/` 폴더에 저장

## 💡 Reference
- Architecture: `.claude/mvvm-architecture.md`
- Core Data: `.claude/coredata-patterns.md`
- AdMob setup: `.claude/admob-setup.md`
```

이렇게 해두니까 "Core Data에서 Background Context 쓰지 마" 같은 걸 매번 말할 필요가 없어요. CLAUDE.md에 박혀있으니까요!

### API 서버 개발 템플릿

```markdown
# E-Commerce API Server

## 🎯 Critical Rules

1. **RESTful API 원칙** - 리소스 중심 설계, HTTP 메서드 의미 준수
2. **에러 응답 통일** - RFC 7807 Problem Details 포맷
3. **API 문서 자동 생성** - OpenAPI 3.0 스펙 유지

## 📋 Project Info

- **Type**: REST API Server
- **Stack**: Node.js + Express + PostgreSQL
- **Architecture**: Layered (Controller → Service → Repository)

## ⚡ Important Guidelines

### API 설계 원칙

**리소스 명명:**
    ```
    GET    /api/v1/products          # 목록 조회
    GET    /api/v1/products/:id      # 단건 조회
    POST   /api/v1/products          # 생성
    PUT    /api/v1/products/:id      # 전체 수정
    PATCH  /api/v1/products/:id      # 부분 수정
    DELETE /api/v1/products/:id      # 삭제
    ```

**에러 응답 포맷:**
    ```json
    {
      "type": "https://api.example.com/errors/not-found",
      "title": "Resource Not Found",
      "status": 404,
      "detail": "Product with id '123' not found"
    }
    ```

### 설계 산출물

**시퀀스 다이어그램 (주문 프로세스):**
    ```mermaid
    sequenceDiagram
        participant Client
        participant API
        participant DB

        Client->>API: POST /orders
        API->>DB: 재고 확인
        DB-->>API: 재고 OK
        API->>DB: 주문 저장
        DB-->>API: 저장 완료
        API-->>Client: 201 Created
    ```

### 문서 관리
- API 설계: `.claude/api-design/`
- 시퀀스 다이어그램: `.claude/sequences/`
- 상태 머신: `.claude/state-machines/`

## 💡 Reference
- API design guide: `.claude/api-design-guide.md`
- Error handling: `.claude/error-handling.md`
- OpenAPI spec: `.claude/openapi-template.yaml`
```

## 여러 프로젝트 관리하기

### 방법 1: 프로젝트별 CLAUDE.md

```
project-a/
  └── CLAUDE.md
project-b/
  └── CLAUDE.md
project-c/
  └── CLAUDE.md
```

**장점**: 완전 분리
**단점**: 공통 규칙 중복

### 방법 2: 공통 + 개별

```
~/claude-templates/
  ├── common.md
  ├── web-api.md
  ├── mobile-app.md
  ├── analysis-phase.md
  └── design-phase.md

project-a/
  └── CLAUDE.md (common + 특화 내용)
```

**장점**: 재사용 + 커스터마이징
**단점**: 관리 포인트 증가

### 방법 3: 심볼릭 링크 (추천!)

```
~/claude-templates/
  ├── common-rules.md
  ├── analysis-templates.md
  ├── design-templates.md
  ├── ios-patterns.md
  └── api-patterns.md

project-a/
  ├── CLAUDE.md (핵심만)
  └── .claude/ (symlink to ~/claude-templates)
```

**장점**: 중앙 관리 + 쉬운 업데이트
**단점**: 초기 설정 필요

저는 3번 방식을 쓰고 있어요. 공통 템플릿은 한곳에서 관리하고, 프로젝트별로 심볼릭 링크만 걸어두면 모든 프로젝트가 자동으로 업데이트되거든요!

### 실전 활용: 분석/설계 프로젝트

```
requirements-analysis/
  ├── CLAUDE.md (분석 단계 템플릿)
  └── .claude/
      ├── requirements-template.md
      └── mermaid-usecases.md

system-design/
  ├── CLAUDE.md (설계 단계 템플릿)
  └── .claude/
      ├── c4-model-guide.md
      ├── sequence-patterns.md
      └── state-machine-guide.md
```

**단계별로 템플릿 교체하면서 진행!**

분석 단계에서는 요구사항 중심 CLAUDE.md 쓰고, 설계 단계 넘어가면 설계 중심 CLAUDE.md로 바꿔요. 컨텍스트도 명확하고 좋아요.

## 팀에서 CLAUDE.md 활용하기

### Git으로 관리

```bash
# CLAUDE.md는 반드시 버전 관리
git add CLAUDE.md .claude/
git commit -m "docs: update design guidelines"

# 팀원들이 pull 받으면 바로 적용
git pull
```

### PR에 CLAUDE.md 변경 포함

```markdown
## Changes
- 새로운 API 패턴 추가
- CLAUDE.md 업데이트 (에러 처리 규칙)
- 시퀀스 다이어그램 템플릿 추가

## Review Checklist
- [ ] 코드 변경 확인
- [ ] CLAUDE.md 변경 확인
- [ ] 다이어그램 업데이트 확인
```

### 분석/설계 산출물 공유

**설계 리뷰 프로세스:**

1. **설계 문서 작성** (Claude Code + CLAUDE.md)
   - 시퀀스 다이어그램
   - 상태 다이어그램
   - API 명세서

2. **PR 생성**
   - `.claude/design/` 폴더에 문서 추가
   - Mermaid 다이어그램 포함

3. **팀 리뷰**
   - 다이어그램 검토
   - 설계 패턴 확인
   - CLAUDE.md 규칙 준수 여부

4. **Merge 후**
   - 팀원들이 CLAUDE.md 업데이트된 규칙 공유
   - 새로운 패턴 학습

### 정기 리뷰

- 월 1회 CLAUDE.md 리뷰
- 불필요한 내용 제거
- 새로운 패턴 추가
- 100줄 이내 유지

## 실전에서 배운 것들

### ✅ 이렇게 하세요

**1. 주기적으로 다이어트**
- 월 1회: 안 쓰는 규칙 삭제
- 중복 내용 통합
- 100줄 목표 유지

**2. 버전 표시**
```markdown
**Last Updated**: 2025-11-11
**Version**: 2.1
```

**3. 변경 이력 기록**
```markdown
## Changelog
- 2025-11-11: Added sequence diagram templates
- 2025-10-15: Updated state machine guidelines
```

**4. 예시 포함**

나쁜 예와 좋은 예를 같이 보여주면 AI가 훨씬 잘 이해해요.

```markdown
❌ Bad:
sequenceDiagram
    A->>B: request

✅ Good:
sequenceDiagram
    participant Client
    participant API

    Client->>API: POST /users
    API-->>Client: 201 Created
```

**5. 단계별 템플릿 준비**
- 분석 단계: requirements-template.md
- 설계 단계: design-template.md
- 구현 단계: development-template.md

### ❌ 이렇게 하지 마세요

**1. 모든 다이어그램 타입 설명하기**
- 자주 쓰는 것만 템플릿화
- 80/20 원칙 적용

**2. 한번에 완벽하게 만들기**
- 프로젝트 진행하면서 조금씩
- 실제 필요할 때 추가

**3. 복붙으로 내용 채우기**
- 인터넷에서 긁어온 일반론
- 내 프로젝트에 맞는 것만

**4. 업데이트 안 하기**
- 오래된 규칙은 오히려 독
- 현재 상태 반영 필수

## 정리하면

**CLAUDE.md도 전략이 필요해요:**

1. **핵심만 남기기** (100줄 목표)
2. **우선순위 명확히** (Critical > Important > Nice to Have)
3. **분리해서 관리** (.claude/ 폴더 활용)
4. **템플릿으로 시작** (단계별 템플릿)
5. **주기적 다이어트** (월 1회 리뷰)

**좋은 CLAUDE.md의 조건:**
- ✅ 한 눈에 파악 가능
- ✅ 우선순위 명확
- ✅ 실제로 쓰이는 내용만
- ✅ 최신 상태 유지

**특히 분석/설계 단계에서:**
- 다이어그램 작성 규칙 명시
- 템플릿 활용으로 일관성 유지
- 산출물 품질 향상

## 다음 글 예고

**"Mermaid로 커뮤니케이션 혁명 - AI로 다이어그램 만들기"**

- AI가 다이어그램 자동 생성
- 회의 중 즉석 시각화
- 팀 커뮤니케이션 효율화
- 15배 빠른 생산성
- "이미지 만들어야 한다"는 고정관념 깨기

CLAUDE.md로 템플릿을 준비했다면,
이제 Mermaid + AI로 **실제 다이어그램을 만드는 방법**을 자세히 알아볼게요!

## 📱 TipSmart의 CLAUDE.md

TipSmart 개발할 때도 CLAUDE.md를 활용했어요.
설계 단계에서 시퀀스 다이어그램, 상태 다이어그램 모두 Mermaid로 작성했고요!

**[App Store에서 TipSmart 다운로드하기](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*CLAUDE.md 관리 팁이 도움이 되셨나요?*
*여러분은 분석/설계 산출물을 어떻게 관리하시나요? 댓글로 공유해주세요!*
