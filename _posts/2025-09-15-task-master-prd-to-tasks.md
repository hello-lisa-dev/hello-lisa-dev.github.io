---
title: "PRD 한 장으로 앱 뼈대 완성하기 - Task Master 실전 사용기"
date: 2025-09-15
last_modified_at: 2025-09-15 16:00:00 +0900
categories: [바이브코딩, AI도구]
tags: [TaskMaster, PRD작성, 자동태스크생성, Claude, AI개발, 프로젝트기획, 바이브코딩, AI협업, 태스크분해, 복잡도분석, 의존성관리]
seo_title: "PRD 작성부터 Task Master 태스크 생성까지 - 실전 가이드"
description: "Claude와 함께 PRD를 작성하고 Task Master로 10개 태스크를 자동 생성하는 전체 과정을 실제 TipSmart 개발 사례로 공개합니다."

# 다국어 지원 필드
lang: "ko"
translation_key: "task-master-prd-to-tasks"
permalink: /ko/vibe-coding/ai-tools/2025/09/15/task-master-prd-to-tasks.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/09/15/task-master-prd-to-tasks.html"
  en: "/en/vibe-coding/ai-tools/2025/09/15/task-master-prd-to-tasks.html"
  es: "/es/codificacion-vibe/herramientas-ia/2025/09/15/task-master-prd-to-tasks.html"
---

안녕하세요, LISA입니다! 🙂

[지난 글](/ko/vibe-coding/ai-tools/2025/09/15/task-master-discovery.html)에서 Task Master를 어떻게 발견하게 되었는지 이야기했는데요, 오늘은 **실제로 어떻게 사용하는지** 자세한 과정을 공유해드릴게요!

특히 **PRD 작성 과정**이 생각보다 중요하더라고요. 이 부분을 대충 하면 나중에 생성되는 태스크 품질이 떨어져요.

## 1단계: 체계적인 PRD 작성 시작

TipSmart 개발할 때는 **체계적으로 접근**했어요.

**Claude에게 이렇게 요청했죠:**
> "서비스 개발을 위한 PRD를 작성하고자 합니다. 샘플 PRD를 기반으로 하여 나에게 필요한 질문을 하고 이를 기반으로 PRD를 작성하도록 해주세요."

그리고 **example_prd.txt 파일을 첨부**했어요.

이렇게 하니까 Claude가 무작정 질문하는 게 아니라, **샘플 포맷에 맞춰서 체계적으로** 질문하더라고요!

## 2단계: Claude의 폭풍 질문 - 여기가 핵심!

그런데 Claude가 **정말 체계적인 질문들**을 던지기 시작했어요.

### **받았던 6개 카테고리 질문들:**

#### **1. 개요 관련 질문:**
- "개발하려는 서비스의 이름과 간략한 설명은 무엇인가요?"
- "이 서비스가 해결하고자 하는 주요 문제는 무엇인가요?"
- "주요 타겟 사용자층은 누구인가요?"
- "경쟁 서비스와 차별화되는 가치 제안은 무엇인가요?"

#### **2. 핵심 기능 관련 질문:**
- "이 서비스의 3-5가지 핵심 기능은 무엇인가요?"
- "각 기능별로 우선순위를 매긴다면 어떻게 되나요? (높음/중간/낮음)"
- "이 기능들이 사용자에게 제공하는 주요 가치는 무엇인가요?"

#### **3. 사용자 경험 관련 질문:**
- "주요 사용자 페르소나(2-3개)는 어떻게 정의할 수 있나요?"
- "서비스 내에서 가장 중요한 사용자 흐름은 무엇인가요?"
- "UI/UX 디자인 시 특별히 고려해야 할 요소가 있나요?"

#### **4. 기술 아키텍처 관련 질문:**
- "서비스 구현에 필요한 기술 스택은 무엇인가요?"
- "필요한 외부 API나 통합해야 할 서비스가 있나요?"
- "데이터 모델의 주요 구성요소는 무엇인가요?"

#### **5. 개발 로드맵 관련 질문:**
- "MVP에 반드시 포함되어야 할 기능은 무엇인가요?"
- "향후 확장 가능한 기능들은 어떤 것들이 있나요?"
- "개발 단계를 어떻게 나눌 계획인가요?"

#### **6. 위험 요소 및 대응책 관련 질문:**
- "서비스 개발 과정에서 예상되는 주요 기술적 도전 과제는 무엇인가요?"
- "서비스 출시 후 발생할 수 있는 잠재적 이슈는 무엇이라고 생각하나요?"
- "이러한 위험 요소에 대한 대응 전략은 무엇인가요?"

### **답변이 PRD 품질을 좌우해요**

이때 **얼마나 성심성의껏 답변하느냐**가 정말 중요했어요!

처음에는 "아, 그냥 적당히..." 이런 식으로 대답했는데, 나중에 생성된 PRD가 너무 애매하더라고요.

**TipSmart 개발할 때 실제 답변 예시:**

#### **1. 개요 관련 답변:**
> **서비스 이름**: "TipSmart - 스마트 팁 계산기"  
> **해결하는 문제**: "음식점에서 팁 계산과 인원 분할이 복잡하고 시간이 오래 걸리는 문제"  
> **타겟 사용자**: "20-40대 직장인, 동료들과 식사 후 빠르게 계산해야 하는 상황"  
> **차별화 요소**: "3초 안에 계산 완료, 직관적 UI, 한국 팁 문화 고려"

#### **2. 핵심 기능 우선순위:**
> **높음**: 기본 팁 계산, 인원 분할  
> **중간**: 계산 히스토리, 설정 기능  
> **낮음**: 위젯, Apple Watch 연동  

#### **3. 기술 스택:**
> **플랫폼**: iOS 15+, SwiftUI  
> **아키텍처**: MVVM 패턴  
> **데이터**: Core Data (로컬 저장)  
> **수익화**: AdMob + In-App Purchase

이런 식으로 **구체적이고 상세하게** 답변할수록 나중에 나오는 PRD와 태스크 품질이 훨씬 좋아졌어요.

## 3단계: 여러 번 수정 작업

첫 번째 PRD가 나왔을 때... **만족스럽지 않았어요**.

- 너무 일반적이고 뻔한 내용들
- 구체적인 구현 방향이 없음
- 기술적 제약사항 누락

그래서 **계속 수정 요청**했어요:

> "사용자 시나리오를 더 구체적으로 써줘"
> "기술 스택과 아키텍처 명시해줘"  
> "각 기능별 우선순위도 정해줘"

**총 3-4번 정도 수정**했던 것 같아요. 이 과정에서 제가 미처 생각하지 못했던 부분들도 많이 발견했고요.

## 4단계: example_prd.txt 포맷 적용

만족스러운 내용이 나왔을 때, **처음에 첨부했던 example_prd.txt 포맷**에 맞춰서 다시 작성 요청했어요.

```
이제 처음에 첨부한 example_prd.txt 포맷에 맞게 
다시 작성해줘. 그리고 전체 길이를 150라인을 
넘지 않도록 해줘.
```

### **150라인 제약을 건 이유**

이 부분이 중요한데요:

✅ **Task Master 처리 성능**: 너무 긴 PRD는 제대로 파싱 못할 수 있음  
✅ **API 비용 절약**: Claude API 토큰 사용량이 늘어남  
✅ **집중도**: 핵심만 담아야 더 명확한 태스크 생성  

실제로 처음에 200라인 넘는 PRD로 시도했다가 이상한 태스크들이 생성된 적이 있어요.

### **실제 완성된 TipSmart PRD (일부 공개)**

example_prd.txt 포맷에 맞춰서 나온 실제 PRD의 일부를 보여드릴게요:

```markdown
TipSmart - Product Requirements Document

Overview
TipSmart is a smart tip calculator for international travelers visiting the US. 
It helps users unfamiliar with local tipping culture calculate appropriate tips 
and learn regional etiquette. Target monthly revenue: $500+ for iOS app.

Core Features
1. Smart Tip Calculator
   Function: Amount input → Tip% selection → Total/tip display
   Value: Fast, accurate calculation prevents social mistakes
   Implementation: Pre/post-tax toggle, 15/18/20/25% buttons, rounding

2. Regional Tip Guide
   Function: 5 major cities × 4 service categories guide
   Value: Local customs learning builds confidence
   Implementation: NYC/LA/Chicago/SF/Miami, restaurant/taxi/hotel/bar

3. Simple Bill Split
   Function: Auto-calculate per-person amount with headcount input
   Value: Quick settlement for group dining
   Implementation: 2-10 people, equal split only
```

보시다시피 **Function → Value → Implementation** 구조로 각 기능이 명확하게 정의되어 있어요. 이런 식으로 **핵심만 간결하게** 정리됐습니다.

## Task Master 실행 - 드디어!

PRD가 준비되니까 이제 **Task Master 실행**이에요.

### **MCP 설정**

처음에는 설정 파일 찾는 것부터 막혔는데, 의외로 간단했어요:

1. **Cursor 설정** → MCP 서버 추가
2. **Claude API 키** 환경변수에 설정
3. **재시작** 후 Task Master 활성화

### **첫 실행의 긴장감**

150라인 PRD를 입력하고... **"Generate tasks" 버튼을 누르는 순간**!

"과연 제대로 된 태스크들이 나올까?"

기다리는 시간이 정말 길게 느껴졌어요. 😅

## 결과 - 10개 태스크 생성!

그리고 나온 결과... **정말 놀라웠어요**!

![생성된 10개 태스크](/assets/images/20250916_02/generated-tasks.png)

### **생성된 태스크들 (TipSmart)**

1. **Project Setup with MVVM Architecture** (high priority)
2. **Core Data Model Implementation** (high priority)  
3. **Tip Calculator UI and Logic** (high priority)
4. **Bill Split Functionality** (medium priority)
5. **History Tracking Implementation** (medium priority)
6. **Regional Tip Guide Content and UI** (medium priority)
7. **Accessibility Implementation** (high priority)
8. **UI Polish and iOS HIG Compliance** (high priority)
9. **AdMob Integration** (low priority)
10. **App Store Preparation and Submission** (medium priority)
11. **UX/UI Improvements for Calculator and History Features** (추가 생성됨)

### **감동받은 부분들**

#### **1. 우선순위까지 자동 배정**
**high priority**: 핵심 기능들 (MVVM 설정, 계산 로직, 접근성)  
**medium priority**: 부가 기능들 (History, Regional Guide, 앱스토어)  
**low priority**: 수익화 기능 (AdMob)

**실제 개발 순서와 똑같더라고요!**

#### **2. 의존성까지 고려**
태스크 표를 보면 각 태스크가 어떤 태스크에 의존하는지까지 표시되어 있었어요. 예를 들어 "Accessibility Implementation"은 3, 4, 5, 6번 태스크 완료 후에 진행하도록 되어 있었고요.

#### **3. 놓칠 뻔한 것들까지**
"Accessibility Implementation", "iOS HIG Compliance" 같은 건 제가 PRD에 명시하지 않았는데도 자동으로 태스크로 만들어줬어요.

#### **4. 개발 중 추가 태스크**
11번째 태스크는 개발 진행하면서 추가로 생성된 것이에요. Task Master가 상황에 맞게 태스크를 확장할 수 있더라고요.

## 개발 시작 - 태스크별 세분화

각 태스크를 실제로 진행할 때는 **4-5개 하위 태스크**로 또 나눴어요.

예를 들어 "AdMob Integration" 태스크:
- AdMob SDK 설치 및 설정
- App ID, Ad Unit ID 등록  
- 배너 광고 UI 구성
- 광고 로드 및 표시 로직
- 에러 처리 및 fallback

이렇게 세분화해서 Claude Code에게 하나씩 요청했죠.

![하위 태스크 생성](/assets/images/20250916_02/subtask-creation.png)


## PRD 품질이 정말 중요해요

경험해보니까 **PRD 작성 단계에서 얼마나 고민하느냐**가 전체 프로젝트를 좌우하더라고요.

### **잘 작성된 PRD의 효과:**
✅ 논리적인 태스크 순서  
✅ 빠뜨릴 수 있는 기능들까지 포함  
✅ 적절한 난이도 분배  
✅ 명확한 완료 기준  

### **대충 작성한 PRD의 문제:**
❌ 애매한 태스크들  
❌ 중요한 기능 누락  
❌ 순서가 뒤죽박죽  
❌ 완료 기준이 모호  

**Claude의 질문에 성심성의껏 답변하는 게 정말 중요해요!**

## 다음 글 예고

다음 글에서는 **실제 개발하면서 어떤 변화를 느꼈는지** 솔직하게 이야기해드릴게요!

- **코더에서 매니저로**: 역할 변화의 실제 느낌
- **개발 속도 vs 코드 품질**: trade-off 분석
- **Task Master 장단점**: 4개월 사용 후기
- **추천 대상**: 어떤 분들에게 유용한지

정말 개발 패턴 자체가 바뀌는 경험이었어요!

## 📱 체계적 계획의 결과물, TipSmart

이렇게 꼼꼼한 PRD 작성과 Task Master 태스크 관리로 만든 TipSmart, 궁금하지 않으세요?

150라인 PRD에서 시작해서 50여 개 세부 태스크로 완성한 앱이에요. **체계적인 계획의 힘**을 직접 경험해보세요!

**[App Store에서 TipSmart 다운로드하기](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*PRD 작성 과정에서 막히는 부분 있으시면 댓글로 질문해주세요! Claude의 질문에 어떻게 답변하면 좋을지 팁도 공유해드릴게요!*