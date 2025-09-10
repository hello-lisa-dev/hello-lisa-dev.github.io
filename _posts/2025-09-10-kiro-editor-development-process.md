---
title: "Kiro 에디터 실제 개발 과정 - Task Master, Cursor와 완전히 다른 경험!"
date: 2025-09-10
last_modified_at: 2025-09-10 20:40:00 +0900
categories: [바이브코딩, AI도구]
tags: [Kiro, AWS, AI개발, 웹개발, 바이브코딩, Spec모드, Cursor, Claude, TaskMaster, AI협업, 개발환경, Jekyll, 다국어]
seo_title: "Kiro 에디터 실제 개발 과정 - Task Master, Cursor 대안으로 완벽한 이유"
description: "Kiro 에디터로 실제 다국어 블로그를 개발하는 전 과정을 공개합니다. Task 진행, 자동 테스트, Cursor/Claude Code와의 차이점까지!"

# 다국어 지원 필드
lang: "ko"
translation_key: "kiro-editor-development-process"
permalink: /ko/vibe-coding/ai-tools/2025/09/10/kiro-editor-development-process.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/09/10/kiro-editor-development-process.html"
  # 영어 번역 예정
---

안녕하세요, LISA입니다! 🙂

[지난 글]({{ site.baseurl }}{% post_url 2025-09-10-kiro-editor-first-experience %})에서 Kiro의 **Requirements → Design** 과정을 보여드렸는데요, 오늘은 **실제 개발이 어떻게 진행되는지** 자세히 공유해드릴게요!

## Task 생성: 설계가 그대로 작업으로!

![Task 목록](/assets/images/kido/05_tasks.png)

설계가 완료되면 Kiro가 자동으로 Task를 생성해줘요. 그런데 이게 **진짜 신기했던 점**이에요!

### **Task Master와의 차이점**
Task Master는 PRD를 받아서 **한 번에 모든 태스크를 생성**해줘요. 물론 각 태스크 안에 설계 내용도 들어있지만:
- **체계적 관리 부족**: 설계와 구현이 태스크 안에 뒤섞여 있음
- **승인 과정 없음**: PRD → 바로 태스크 생성 → 바로 실행
- **예측 어려움**: 전체 그림을 보기 전에 작업 시작

**Kiro Spec 모드는 단계별 확인이 핵심**:
- **요구사항 정리** → **내가 승인** ✅
- **설계 문서 작성** → **내가 승인** ✅  
- **태스크 리스트 생성** → **내가 승인** ✅
- 각 단계에서 **명확히 이해하고 진행**하니까 예측이 훨씬 잘 돼요

### **생성된 Task 목록**
```
✅ Task completed: Extend front matter structure for multilingual support
  - Add 'lang' field to identify post language
  - Add 'translation_key' field to link related translations
  - Add 'translations' hash with available language URLs
  - Update existing posts with new front matter fields

✅ Task completed: Implement category translation system
  - Create Liquid filter for category name translation
  - Update category archive pages to use translated names
  - Modify post display templates to show translated categories
  - Ensure category URLs reflect the selected language

🔵 Task in progress: Create directory structure for translated posts
  - Create '_posts/en/' directory for English translations
  - Create '_posts/es/' directory for Spanish translations
  - Set up proper Jekyll collection configuration for language directories
  - Test post discovery and URL generation for translated content

⭕ Start task: Implement SEO optimization for multilingual content
  - Create '_includes/hreflang-tags.html' for automatic hreflang generation
  - Update '_includes/seo.html' to include language-specific meta tags
  - Add language information to structured data (JSON-LD)
  - Ensure proper HTML lang attribute setting based on content language
```

보세요! **설계에서 나온 내용들이 그대로 태스크로 변환**되었어요!

## Task 진행: Cursor보다 빠른 속도!

![Task 진행 과정](/assets/images/kido/06_tasks.png)

Task를 하나씩 진행하는 과정이 **정말 인상적**이었어요!

### **속도가 빠른 이유**
Cursor 쓸 때는:
- "이거 해줘" → 코드 생성 → 확인 → 수정 요청 → 다시 생성

Kiro는:
- **이미 설계 단계에서 구체적인 방법 확정**
- Task 진행할 때는 설계 내용을 그대로 구현
- 중간에 "어떻게 할까?" 고민하는 시간이 없음

### **실제 작업 과정**
```
Task 7: Set up multilingual configuration structure from tasks.md
Status: In Progress

I'll implement task 1 to set up the multilingual configuration structure. Let me start by examining the current _config.yml file to understand the existing configuration.

📂 Read file(s) _config.yml

Now I need to examine the existing posts to understand the current categories that need translation mappings.

📂 Read file(s) 
  • 2025-09-04-tipsmart-development-story.md 1 → 16
  • 2025-09-05-jekyll-blog-setup-guide.md 1 → 16  
  • 2025-09-06-what-is-vibe-coding.md 1 → 16
  • 2025-09-07-ai-development-tools-comparison.md 1 → 16

Now I have a good understanding of the existing categories. Let me add the multilingual configuration to the _config.yml file. Based on the posts, I can see the following categories that need translation mappings:

• 바이브코딩 (Vibe Coding)
• AI도구 (AI Tools)  
• Mobile
• Development
• Story
• Jekyll

✅ Accepted edits to _config.yml

Now let me verify the configuration was added correctly by reading the updated file:

📂 Read file(s) _config.yml 90 → 131
📂 Read file(s) _config.yml 130 → 171

Perfect! The multilingual configuration has been successfully added to _config.yml.
```

보세요! **체계적으로 하나씩 확인하면서 진행**하죠? Task Master + Claude Code 조합보다 훨씬 자연스러워요.

## Task 완료: 결과 요약까지!

![Task 완료 요약](/assets/images/kido/07_tasks_completed.png)

Task가 완료되면 **뭘 했는지 깔끔하게 요약**해줘요:

### **Task 1 Completed: Set up multilingual configuration structure**

✅ **Added language configuration in _config.yml** with supported languages:
• Korean (ko) - set as default  
• English (en)
• Spanish (es)

✅ **Added category translation mappings** for existing categories:
• 바이브코딩 → vibe-coding (en), codificacion-vibe (es)
• AI도구 → ai-tools (en), herramientas-ia (es)  
• Mobile → mobile (en), movil (es)
• Development → development (en), desarrollo (es)
• Story → story (en), historia (es)
• Jekyll → jekyll (en), jekyll (es)

✅ **Configured language metadata** including:
• Locales (ko-KR, en-US, es-ES)
• Text direction (ltr for all languages)
• Language flags and display names

The configuration has been validated with `jekyll doctor` and everything looks good. The multilingual foundation is now in place for the next tasks in the implementation plan.

**이 정도면 진짜 사람이 작업한 것처럼 체계적이죠?**

## 자동 테스트: 정말 동작하는지 확인!

![자동 테스트 과정](/assets/images/kido/08_tasks_test.png)

가장 인상적이었던 건 **자동으로 테스트까지 해준다는 점**이에요!

```
🔍 Searched workspace
Looking for structured data in the generated HTML

Let me check the translation structured data specifically:
📂 Read file(s) what-is-vibe-coding.html 840 → 861

Perfect! Now let me test the error handling scenarios. Let me create a post without a translation_key to test the fallback behavior:

📝 Created 2025-09-08-test-no-translation-key.md

Let me rebuild the site to test the error handling:
⚡ Command
bundle exec jekyll build --trace

Configuration file: /Users/jongrokkm/XcodeProjects/blogs/_config.yml
To use retry middleware with Faraday v2.0+, install `faraday-retry`
        Source: /Users/jongrokkm/XcodeProjects/blogs
   Destination: /Users/jongrokkm/XcodeProjects/blogs/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
           Remote Theme: Using theme mmistakes/minimal-mistakes
                    done in 2.947 seconds.
 Auto-regeneration: disabled. Use --watch to enable.

Now let me check if the error handling works for the post without translation_key:
📂 Read file(s) test-no-translation-key.html 770 → 811

I notice that the error handling for missing translation_key isn't showing. Let me check if the translation links component is being included. The issue might be that the condition in the layout is checking for page.lang but no translation_key.
```

**진짜 개발자처럼 테스트하죠?** 
- 정상 케이스 확인
- 에러 케이스도 확인  
- 빌드까지 해서 실제 동작 검증
- 문제 발견하면 원인까지 분석

## Cursor, Claude Code와의 확실한 차이점

### **1. 워크플로우의 단계별 승인**
- **Task Master**: PRD → 한 번에 태스크 생성 → 바로 실행
- **Cursor/Claude Code**: 각각 따로 작업 → 중간에 맥락 끊김
- **Kiro**: 요구사항 승인 → 설계 승인 → 태스크 승인 → 단계별 실행

### **2. 작업 예측 가능성**  
- **기존 도구들**: "이번엔 뭘 만들어줄까?" 불안감
- **Kiro**: 설계 단계에서 이미 다 보여줌 → 예측 가능

### **3. 품질 관리**
- **기존**: 제가 직접 테스트하고 확인
- **Kiro**: 자동으로 테스트하고 에러 케이스까지 확인

### **4. 협업 방식**
- **기존**: 저 → AI 도구 (일방향)
- **Kiro**: 저 ↔ Kiro (상호작용하면서 개선)

## 솔직한 총평

### 👍 **진짜 좋았던 점**
- **체계성**: Requirements → Design → Tasks 플로우가 완벽
- **예측 가능성**: 뭘 어떻게 할지 미리 다 알 수 있음
- **품질**: 자동 테스트까지 해서 믿을 수 있음
- **속도**: 중간에 헤매는 시간이 없어서 빠름

### 😅 **아쉬운 점**  
- **학습 곡선**: Spec 모드는 처음에 좀 복잡해 보임
- **유료**: 이미 다른 도구 결제해서 당장 계속 쓰기는...
- **웹 개발 특화**: 모바일 앱 개발에는 어떨지 궁금

## 결론: Task Master 대체재 찾았다!

솔직히 **Task Master + Claude Code 조합을 완전히 대체할 수 있을 것 같아요**.

특히:
- **혼자 개발하는 사람**
- **체계적인 프로세스를 원하는 사람**  
- **웹 개발 프로젝트**

이런 경우라면 Kiro Spec 모드가 **훨씬 더 좋을 것 같아요**!

다른 결제한 도구들 기간 끝나면 **진지하게 Kiro로 갈아탈 생각**이에요. 이 정도 품질이면 충분히 투자할 가치가 있더라고요.

**물론 Task Master가 나쁘다는 의미는 절대 아니에요!** 단지 접근 방식이 다를 뿐이죠. Task Master도 정말 훌륭한 도구고, 제가 TipSmart 앱을 성공적으로 만들 수 있었던 것도 Task Master + Claude Code 조합 덕분이거든요.

**다음 글부터는 원래 계획했던 이야기**로 돌아가서, **Task Master와 Claude Code로 실제 iOS 앱을 개발했던 과정**을 차근차근 소개해드릴게요! PRD 작성부터 50-60개 태스크 관리, 실제 겪었던 문제들까지 상세하게 공유할 예정이에요.

## 📱 TipSmart도 여전히 사랑해주세요!

새로운 도구에 대한 흥미진진한 이야기를 하다 보니, 제 첫 작품을 잊을 뻔했네요! 😅

**[App Store에서 TipSmart 다운로드하기](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*이 글이 도움이 되셨다면 SNS로 공유해주세요! Kiro와 다른 AI 도구들을 비교해보고 계신 분들에게 도움이 될 거예요!*