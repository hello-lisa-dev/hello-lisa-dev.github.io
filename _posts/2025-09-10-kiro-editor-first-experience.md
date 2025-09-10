---
title: "Kiro 에디터 첫 경험담 - 7월부터 기다린 웨이팅이 드디어!"
date: 2025-09-10
last_modified_at: 2025-09-10 17:40:00 +0900
categories: [바이브코딩, AI도구]
tags: [Kiro, Kiro에디터, AWS, AI개발, 웹개발, 바이브코딩, Spec모드, Cursor, Claude, Codex, Gemini, AI협업, 개발환경]
seo_title: "Kiro 에디터 첫 경험담 - AWS의 새로운 AI 개발 도구 체험 후기"
description: "7월부터 웨이팅 걸어둔 Kiro 에디터를 드디어 사용해봤어요! Vibe와 Spec 두 가지 개발 방식과 체계적인 프로세스를 자세히 공유합니다."

# 다국어 지원 필드
lang: "ko"
translation_key: "kiro-editor-first-experience"
permalink: /ko/vibe-coding/ai-tools/2025/09/10/kiro-editor-first-experience.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/09/10/kiro-editor-first-experience.html"
  # 영어 번역 예정
---

안녕하세요, LISA입니다! 🙂

오늘은 원래 계획했던 Task Master 경험담 대신, **급하게 써보게 된 새로운 AI 개발 도구 이야기**를 해드릴게요!

## 드디어 Kiro 웨이팅이 해제됐어요! 🎉

7월에 신청해둔 **Kiro 에디터**의 활성화 코드를 받았거든요. 너무 기대돼서 바로 써봤는데... **와, 이거 진짜 대박이었어요!**

### Kiro가 뭔가요?

Kiro는 **AWS에서 만든 AI 개발 도구**예요. 보통 다른 AI 도구들과 달리 두 가지 개발 방식을 제공해요:

1. **Vibe 모드**: 자유롭고 즉흥적인 개발 (우리가 아는 바이브 코딩!)
2. **Spec 모드**: 체계적이고 단계적인 개발 (오늘 써본 모드!)

저는 이번에 **Spec 모드**로 블로그의 다국어 처리 기능을 만들어봤어요.

## 첫 경험: 프롬프트 입력

![Kiro 첫 프롬프트](/assets/images/kido/01_fire_prompt.png)

처음에는 단순하게 생각했어요. "Jekyll 블로그에 다국어 지원 추가해줘" 이런 식으로 입력했죠.

그런데 Kiro가 **"잠깐, 정확히 뭘 원하는지 먼저 정리해볼까요?"** 하면서 바로 요구사항 정리 단계로 넘어가더라고요!

## 요구사항을 체계적으로 정리해줌

![요구사항 문서](/assets/images/kido/02_requirements.png)

이게 진짜 놀라웠어요. Kiro가 제 애매한 요청을 받아서:

### **Requirement 1: 언어별 포스트 보기**
- 사용자가 선호하는 언어로 블로그 포스트를 볼 수 있게
- 기본 언어는 한국어, 번역 없으면 한국어 버전 표시
- 같은 포스트/페이지 맥락 유지

### **Requirement 2: 언어 전환 기능**  
- 네비게이션에 언어 선택기 표시
- 언어 클릭하면 전체 사이트 인터페이스 변경
- 현재 페이지 맥락 유지하면서 번역된 버전으로 이동

### **Requirement 3: AI 번역 지원**
- 기존 한국어 포스트에 AI 번역 추가 가능
- 별도 번역 파일로 관리
- 각 언어별 독립적 편집 가능

완전 체계적이죠? 제가 "다국어 해줘" 한 마디로 말한 걸 이렇게 구체적으로 정리해주다니!

## 실시간 피드백도 완벽!

![요구사항 피드백](/assets/images/kido/03_requirements_feedback.png)

요구사항을 보고 "음, 이건 좀 다르게 하고 싶은데?"라고 피드백을 주면 **바로바로 업데이트**해줘요.

Task Master 쓸 때는 이런 실시간 피드백이 좀 아쉬웠는데, Kiro는 대화하면서 자연스럽게 요구사항을 다듬어나갈 수 있어서 좋더라고요.

## 설계 단계가 진짜 상세해요!

![설계 문서 1](/assets/images/kido/04_design_part1.png)

요구사항 확정되면 바로 설계 단계로 넘어가는데, 이게 **진짜 개발자가 설계한 것처럼 상세**해요!

### **Language Support Strategy**
- File-based with URL Parameters 방식
- 한국어 원본: `_posts/2025-09-06-what-is-vibe-coding.md`
- 영어 번역: `_posts/en/2025-09-06-what-is-vibe-coding.md`  
- 스페인어 번역: `_posts/es/2025-09-06-what-is-vibe-coding.md`

### **URL Structure**
- 기본 (한국어): `/바이브코딩/2025/09/06/what-is-vibe-coding/`
- 영어: `/바이브코딩/2025/09/06/what-is-vibe-coding/?lang=en`
- 스페인어: `/바이브코딩/2025/09/06/what-is-vibe-coding/?lang=es`

이런 식으로 **실제 구현 방법까지 구체적으로** 제시해줘요!

## 코드와 모델링도 미리 보여줘요

![설계 문서 코드](/assets/images/kido/04_design_part2_code.png)

설계 문서에 **실제로 구현할 코드**도 미리 보여줘요:

```html
<div class="language-switcher">
  <div class="language-dropdown">
    <button class="language-current" id="languageToggle">
      <span class="flag" id="currentFlag">🇰🇷</span>
      <span class="name" id="currentLang">한국어</span>
      <span class="arrow">▼</span>
    </button>
    <div class="language-options" id="languageOptions">
      <!-- JavaScript로 동적 생성 -->
    </div>
  </div>
</div>
```

![설계 문서 모델](/assets/images/kido/04_design_part3_model.png)

Front Matter 구조도 정확하게 설계해줘요:

```yaml
---
title: "바이브 코딩이란? - AI 시대의 새로운 개발 방식"
date: 2025-09-06
# 다국어 지원 필드
lang: "ko"
translation_key: "what-is-vibe-coding"
translations:
  en: "/posts/en/2025-09-06-what-is-vibe-coding/"
  es: "/posts/es/2025-09-06-what-is-vibe-coding/"
---
```

## Task Master보다 훨씬 체계적인 느낌!

솔직히 말하면, Task Master 쓸 때보다 **훨씬 믿음이 가더라고요**.

### **가장 인상적이었던 점: 유기적인 연결**

Task Master는:
- PRD 받아서 태스크 쭉 만들어주고
- 각 태스크를 Claude Code한테 던져주고  
- 중간에 문제 생기면 "음... 다시 해볼게요" 하는 느낌

Kiro Spec 모드는:
- **Requirements → Design → Tasks가 완전히 연결됨**
- **요구사항이 바뀌면 설계도 자동 업데이트**
- **설계 내용이 그대로 태스크로 변환됨**
- **모든 단계가 일관성 있게 관리됨**

이게 **진짜 큰 차이**더라고요! Task Master는 각 도구가 따로따로 노는 느낌이었는데, Kiro는 하나의 시스템에서 모든 게 연결되어 돌아가는 느낌이에요.

작업 시작 전에 **"아, 이렇게 하는구나"**가 명확하게 보여서 안심이 돼요.

## 다음 글 예고

다음 글에서는:
- **실제 Task 진행 과정** (어떻게 개발이 진행되는지)
- **완성된 결과물과 테스트**
- **Cursor, Claude Code와의 비교**
- **장단점 총정리**

를 자세히 공유해드릴게요!

아직 Task 진행 부분이 남았는데, 그 부분에서 **Requirements-Design-Tasks의 연결성**이 더욱 빛을 발하거든요. 그리고 **자동 테스트**까지!

## 📱 TipSmart도 계속 사랑해주세요!

제가 기존 AI 도구들로 만든 첫 번째 앱도 잊지 마세요! 새로운 도구들을 써보면서도 기존 작품에 대한 피드백은 항상 소중해요 😊

**[App Store에서 TipSmart 다운로드하기](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*이 글이 도움이 되셨다면 SNS로 공유해주세요! Kiro 에디터 궁금하신 분들에게 도움이 될 거예요!*