---
title: "My First Experience with Kiro Editor - Finally Got Off the Waitlist!"
date: 2025-09-09
last_modified_at: 2025-09-09 17:40:00 +0900
categories: [vibe-coding, ai-tools]
tags: [Kiro, KiroEditor, AWS, AIDevelopment, WebDevelopment, VibeCoding, SpecMode, Cursor, Claude, Codex, Gemini, AICollaboration, DevEnvironment]
seo_title: "My First Experience with Kiro Editor - AWS's New AI Development Tool Review"
description: "I finally got to try Kiro Editor after being on the waitlist since July! Sharing my detailed experience with both Vibe and Spec development modes and their systematic process."

# 다국어 지원 필드
lang: "en"
translation_key: "kiro-editor-first-experience"
permalink: /en/vibe-coding/ai-tools/2025/09/09/kiro-editor-first-experience.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/09/09/kiro-editor-first-experience.html"
  en: "/en/vibe-coding/ai-tools/2025/09/09/kiro-editor-first-experience.html"
---

Hey there, LISA here! 🙂

Today, instead of the Task Master experience I originally planned to share, I'm bringing you **an exciting story about a new AI development tool I just tried**!

## Finally Off the Kiro Waitlist! 🎉

I got my activation code for **Kiro Editor** that I applied for back in July! I was so excited that I jumped right in and... **wow, this thing is absolutely amazing!**

### What's Kiro?

Kiro is **an AI development tool made by AWS**. Unlike other AI tools, it offers two different development approaches:

1. **Vibe Mode**: Free-flowing and improvisational development (the vibe coding we know and love!)
2. **Spec Mode**: Systematic and step-by-step development (the mode I tried today!)

I used **Spec Mode** this time to build multilingual support for my blog.

## First Experience: Entering the Prompt

![Kiro First Prompt](/assets/images/kido/01_fire_prompt.png)

Initially, I kept it simple. I typed something like "Add multilingual support to Jekyll blog."

But then Kiro was like **"Hold on, let's first clarify exactly what you want, shall we?"** and immediately moved to the requirements gathering phase!

## Systematically Organizing Requirements

![Requirements Document](/assets/images/kido/02_requirements.png)

This was genuinely surprising. Kiro took my vague request and turned it into:

### **Requirement 1: Language-specific Post Viewing**
- Users can view blog posts in their preferred language
- Default language is Korean, fallback to Korean version if no translation exists
- Maintain the same post/page context

### **Requirement 2: Language Switching Functionality**  
- Display language selector in navigation
- Clicking a language switches the entire site interface
- Navigate to translated version while maintaining current page context

### **Requirement 3: AI Translation Support**
- Add AI translations to existing Korean posts
- Manage as separate translation files
- Independent editing for each language

Pretty systematic, right? I said "add multilingual support" in one sentence, and it broke it down this comprehensively!

## Real-time Feedback is Perfect Too!

![Requirements Feedback](/assets/images/kido/03_requirements_feedback.png)

When I looked at the requirements and thought "hmm, I'd like to do this differently," I gave feedback and it **updated everything immediately**.

When I used Task Master, this kind of real-time feedback was somewhat lacking, but with Kiro, you can naturally refine requirements through conversation, which was great.

## The Design Phase is Super Detailed!

![Design Document 1](/assets/images/kido/04_design_part1.png)

Once requirements are finalized, it immediately moves to the design phase, and this is **as detailed as if a real developer designed it**!

### **Language Support Strategy**
- File-based with URL Parameters approach
- Korean original: `_posts/2025-09-06-what-is-vibe-coding.md`
- English translation: `_posts/en/2025-09-06-what-is-vibe-coding.md`  
- Spanish translation: `_posts/es/2025-09-06-what-is-vibe-coding.md`

### **URL Structure**
- Default (Korean): `/바이브코딩/2025/09/06/what-is-vibe-coding/`
- English: `/바이브코딩/2025/09/06/what-is-vibe-coding/?lang=en`
- Spanish: `/바이브코딩/2025/09/06/what-is-vibe-coding/?lang=es`

It presents **concrete implementation methods** like this!

## Shows Code and Modeling in Advance

![Design Document Code](/assets/images/kido/04_design_part2_code.png)

The design document even shows **the actual code to be implemented**:

```html
<div class="language-switcher">
  <div class="language-dropdown">
    <button class="language-current" id="languageToggle">
      <span class="flag" id="currentFlag">🇰🇷</span>
      <span class="name" id="currentLang">한국어</span>
      <span class="arrow">▼</span>
    </button>
    <div class="language-options" id="languageOptions">
      <!-- Dynamically generated with JavaScript -->
    </div>
  </div>
</div>
```

![Design Document Model](/assets/images/kido/04_design_part3_model.png)

It also precisely designs the Front Matter structure:

```yaml
---
title: "What is Vibe Coding? - A New Development Approach in the AI Era"
date: 2025-09-06
# Multilingual support fields
lang: "ko"
translation_key: "what-is-vibe-coding"
translations:
  en: "/posts/en/2025-09-06-what-is-vibe-coding/"
  es: "/posts/es/2025-09-06-what-is-vibe-coding/"
---
```

## Much More Systematic Than Task Master!

Honestly, I felt **much more confident than when using Task Master**.

### **Most Impressive Aspect: Organic Integration**

Task Master:
- Takes PRD and creates a bunch of tasks
- Throws each task to Claude Code  
- When problems arise, it's like "hmm... let me try again"

Kiro Spec Mode:
- **Requirements → Design → Tasks are completely connected**
- **When requirements change, design updates automatically**
- **Design content converts directly to tasks**
- **All phases are managed consistently**

This is **really a huge difference**! Task Master felt like each tool was working separately, but Kiro feels like everything is connected and running within one system.

Before starting work, you can clearly see **"ah, this is how it's going to be done"** which is reassuring.

## Preview of Next Post

In the next post, I'll share:
- **Actual Task execution process** (how development proceeds)
- **Completed results and testing**
- **Comparison with Cursor, Claude Code**
- **Complete pros and cons summary**

The Task execution part is still coming, and that's where **the connectivity of Requirements-Design-Tasks** really shines. Plus **automatic testing**!

## 📱 Keep Loving TipSmart Too!

Don't forget about my first app made with existing AI tools! While exploring new tools, feedback on existing work is always precious 😊

**[Download TipSmart from App Store](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*If this post was helpful, please share it on social media! It'll help others who are curious about Kiro Editor!*