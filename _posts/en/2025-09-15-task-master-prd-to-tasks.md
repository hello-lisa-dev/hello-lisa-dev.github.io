---
title: "Building App Foundation with One PRD - Task Master Practical Usage Guide"
date: 2025-09-15
last_modified_at: 2025-09-15 16:00:00 +0900
categories: [vibe-coding, ai-tools]
tags: [TaskMaster, PRD-writing, automatic-task-generation, Claude, AI-development, project-planning, vibe-coding, AI-collaboration, task-decomposition, complexity-analysis, dependency-management]
seo_title: "From PRD Writing to Task Master Task Generation - Practical Guide"
description: "Revealing the complete process of writing PRDs with Claude and automatically generating 10 tasks with Task Master using actual TipSmart development case."

# Multilingual support fields
lang: "en"
translation_key: "task-master-prd-to-tasks"
permalink: /en/vibe-coding/ai-tools/2025/09/15/task-master-prd-to-tasks.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/09/15/task-master-prd-to-tasks.html"
  en: "/en/vibe-coding/ai-tools/2025/09/15/task-master-prd-to-tasks.html"
  # Spanish translation coming soon
---

Hey there, I'm LISA! 🙂

In [my last post](/en/vibe-coding/ai-tools/2025/09/15/task-master-discovery.html), I talked about how I discovered Task Master. Today I'll share **how to actually use it** in detail!

The **PRD writing process** turned out to be more important than I thought. If you do this part carelessly, the quality of generated tasks suffers later.

## Step 1: Starting Systematic PRD Writing

When developing TipSmart, I took a **systematic approach**.

**I requested Claude like this:**
> "I want to create a PRD for service development. Please ask me necessary questions based on the sample PRD and write a PRD based on that."

And I **attached the example_prd.txt file**.

This way, instead of Claude asking random questions, it asked **systematically based on the sample format**!

## Step 2: Claude's Storm of Questions - This is Key!

Then Claude started throwing **really systematic questions** at me.

### **6 Categories of Questions I Received:**

#### **1. Overview Questions:**
- "What is the name and brief description of the service you want to develop?"
- "What is the main problem this service aims to solve?"
- "Who are the main target users?"
- "What is the value proposition that differentiates it from competing services?"

#### **2. Core Features Questions:**
- "What are the 3-5 core features of this service?"
- "How would you prioritize each feature? (high/medium/low)"
- "What is the main value these features provide to users?"

#### **3. User Experience Questions:**
- "How would you define the main user personas (2-3)?"
- "What is the most important user flow within the service?"
- "Are there any special considerations for UI/UX design?"

#### **4. Technical Architecture Questions:**
- "What technology stack is needed to implement the service?"
- "Are there any external APIs or services that need integration?"
- "What are the main components of the data model?"

#### **5. Development Roadmap Questions:**
- "What features must be included in the MVP?"
- "What are some future expandable features?"
- "How do you plan to divide the development phases?"

#### **6. Risk Factors and Response Questions:**
- "What are the main technical challenges expected during service development?"
- "What potential issues do you think could arise after service launch?"
- "What are your response strategies for these risk factors?"

### **Answers Determine PRD Quality**

**How thoroughly you answer** was really important here!

At first I answered casually like "Oh, just whatever..." but the resulting PRD was too vague.

**Actual Answer Examples from TipSmart Development:**

#### **1. Overview Answers:**
> **Service Name**: "TipSmart - Smart Tip Calculator"  
> **Problem Solved**: "Complex and time-consuming tip calculation and person splitting at restaurants"  
> **Target Users**: "20-40 year old office workers who need quick calculations after dining with colleagues"  
> **Differentiation**: "Calculation completed in 3 seconds, intuitive UI, consideration for Korean tipping culture"

#### **2. Core Feature Priorities:**
> **High**: Basic tip calculation, person splitting  
> **Medium**: Calculation history, settings features  
> **Low**: Widgets, Apple Watch integration  

#### **3. Tech Stack:**
> **Platform**: iOS 15+, SwiftUI  
> **Architecture**: MVVM pattern  
> **Data**: Core Data (local storage)  
> **Monetization**: AdMob + In-App Purchase

The more **specific and detailed** I answered, the better the quality of the resulting PRD and tasks became.

## Step 3: Multiple Revision Rounds

When the first PRD came out... **I wasn't satisfied**.

- Too generic and obvious content
- No specific implementation direction
- Missing technical constraints

So I **kept requesting revisions**:

> "Write user scenarios more specifically"
> "Specify tech stack and architecture"  
> "Set priorities for each feature too"

I revised it **about 3-4 times**. During this process, I discovered many parts I hadn't thought of.

## Step 4: Applying example_prd.txt Format

When satisfactory content emerged, I requested rewriting to match **the example_prd.txt format I initially attached**.

```
Now rewrite this to match the example_prd.txt format I attached initially. 
And keep the total length under 150 lines.
```

### **Why I Set the 150-Line Constraint**

This part is important:

✅ **Task Master Processing Performance**: PRDs that are too long might not parse properly  
✅ **API Cost Savings**: Increases Claude API token usage  
✅ **Focus**: Containing only essentials creates clearer task generation  

I actually tried with a PRD over 200 lines initially and got strange tasks generated.

### **Actual Completed TipSmart PRD (Partial Disclosure)**

Here's part of the actual PRD that came out in example_prd.txt format:

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

As you can see, each feature is clearly defined with **Function → Value → Implementation** structure. This is how it was **concisely organized with just the essentials**.

## Task Master Execution - Finally!

With the PRD ready, now it's time for **Task Master execution**.

### **MCP Setup**

Initially I was stuck just finding the config file, but it was surprisingly simple:

1. **Cursor Settings** → Add MCP server
2. **Claude API Key** set in environment variables
3. **Restart** then activate Task Master

### **First Execution Tension**

The moment I input the 150-line PRD and **hit the "Generate tasks" button**!

"Will proper tasks actually come out?"

The waiting time felt really long. 😅

## Results - 10 Tasks Generated!

And the result... **I was really amazed**!

![Generated 10 Tasks](/assets/images/20250916_02/generated-tasks.png)

### **Generated Tasks (TipSmart)**

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
11. **UX/UI Improvements for Calculator and History Features** (additionally generated)

### **Amazing Parts**

#### **1. Automatic Priority Assignment**
**high priority**: Core features (MVVM setup, calculation logic, accessibility)  
**medium priority**: Additional features (History, Regional Guide, app store)  
**low priority**: Monetization features (AdMob)

**It was exactly the same as actual development order!**

#### **2. Dependency Consideration**
Looking at the task table, it even showed which tasks each task depends on. For example, "Accessibility Implementation" was set to proceed after completing tasks 3, 4, 5, 6.

#### **3. Things I Almost Missed**
"Accessibility Implementation", "iOS HIG Compliance" - I didn't specify these in the PRD but it automatically created them as tasks.

#### **4. Tasks Added During Development**
The 11th task was additionally generated during development progress. Task Master can expand tasks according to situations.

## Development Start - Task Subdivision

When actually proceeding with each task, I divided them into **4-5 subtasks** again.

For example, the "AdMob Integration" task:
- Install and configure AdMob SDK
- Register App ID, Ad Unit ID  
- Compose banner ad UI
- Ad loading and display logic
- Error handling and fallback

I subdivided like this and requested them one by one to Claude Code.

![Subtask Creation](/assets/images/20250916_02/subtask-creation.png)

## PRD Quality is Really Important

From experience, **how much you think during PRD writing stage** determines the entire project.

### **Effects of Well-Written PRD:**
✅ Logical task sequence  
✅ Includes features that might be missed  
✅ Appropriate difficulty distribution  
✅ Clear completion criteria  

### **Problems with Carelessly Written PRD:**
❌ Vague tasks  
❌ Missing important features  
❌ Random sequence  
❌ Ambiguous completion criteria  

**Answering Claude's questions thoroughly is really important!**

## Next Article Preview

In the next article, I'll honestly talk about **what changes I felt during actual development**!

- **From Coder to Manager**: Actual feeling of role change
- **Development Speed vs Code Quality**: Trade-off analysis
- **Task Master Pros and Cons**: 4-month usage review
- **Recommendation Targets**: Who would find it useful

It was really an experience that changed the development pattern itself!

## 📱 TipSmart - Result of Systematic Planning

Aren't you curious about TipSmart, made with such meticulous PRD writing and Task Master task management?

It's an app completed with about 50 detailed tasks starting from a 150-line PRD. **Experience the power of systematic planning** firsthand!

**[Download TipSmart from App Store](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*If you get stuck during PRD writing, please ask in the comments! I'll also share tips on how to answer Claude's questions!*