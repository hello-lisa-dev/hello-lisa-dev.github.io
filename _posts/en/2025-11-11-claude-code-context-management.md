---
title: "Back After a Month and a Half - Claude Code, The Battle Against Context Pollution"
date: 2025-11-11
last_modified_at: 2025-11-11 19:00:36 +0900
categories: [VibeCoding, AITools]
tags: [ClaudeCode, ContextManagement, CLAUDE.md, AICollaboration, DevProductivity, ContextPollution, CompactConversation, Subagents, Skills, 2025AIDevelopment]
seo_title: "Solving Claude Code Context Pollution - Managing AI Collaboration with CLAUDE.md"
description: "Back after a month and a half! What matters more than Subagents and Skills is context management. Sharing insights on context pollution issues and the CLAUDE.md solution."

# Multilingual support fields
lang: "en"
translation_key: "claude-code-context-management"
permalink: /en/vibe-coding/ai-tools/2025/11/11/claude-code-context-management.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/11/11/claude-code-context-management.html"
  en: "/en/vibe-coding/ai-tools/2025/11/11/claude-code-context-management.html"
  es: "/es/vibe-coding/ai-tools/2025/11/11/claude-code-context-management.html"
---

Hello, this is LISA! 🙂

I'm back after a month and a half. My work schedule was really tight, and writing consistently turned out to be harder than I thought. 😅

But during that time, I kept using Claude Code. Actually, I used it **even more**. Not just for development, but across all aspects of my work.

And I realized something important. **What matters more than the latest features was something else...**

## These Days I'm Only Using Claude Code

I used to use multiple tools together - Cursor, Codex CLI, Task Master, etc.

These days I'm using **almost only Claude Code**.

### Why?

- **Cursor**: Still good, but project context management is inconvenient
- **Codex CLI**: Only useful in specific situations
- **Task Master**: Overkill unless it's a big project

In the end, **Claude Code is most convenient for everyday development.**

Especially as I tried to use AI tools better at work, I felt Claude Code's various updates. I naturally tried the new features in that process.

## I Tried the Latest Features

A lot of new features were added to Claude Code, right? I tried them with expectations too.

### Subagents - Token Consumption is Too Much...

**The concept itself was good:**
- Role separation: manager, architect, developer, reviewer
- Each agent focuses on specialized areas
- Context is separated, so it's clean

In theory, it was perfect. "Oh, now I can really use AIs like team collaboration!"

**But reality:**
- 👎 **Token consumption is enormous**
- Context reload for each agent
- Cost-effectiveness is low
- Conclusion: **Stopped using**

It was overkill for simple tasks, and too costly for complex tasks. I thought, "With this cost, it's better to just have multiple conversations with basic Claude Code."

### Skills - Feels Like a Step Backward

This was really disappointing.

**Old method (was perfect):**
1. Work in Claude
2. Generate document as artifact
3. Click PDF download button
4. Perfect PDF completed ✅

It was really simple and perfect. So convenient when making release notes or technical documents.

**After Skills introduction (broken):**
1. Work in Claude Code
2. Try to generate PDF with Skills
3. Fails or output breaks 😤
4. Still unstable when retrying

"Why did they change what was working well and break it?"

This happened not just once or twice, so in the end, **I stopped using Skills**. It was faster to just make it as an artifact in Claude web and copy it.

**Conclusion: Ended up not using both Subagents and Skills in practice**

## The Real Problem Was Something Else

I discovered a much more serious problem than Subagents or Skills.

### Context Pollution

**This happens when conversations get long:**

Me: "Never implement this feature with X method. You must use Y method."

Claude: "Yes, I understand! I'll do it with Y method."

*10 minutes later...*

Claude: *(Submits code implemented with X method)*

Me: "...???"

**Even though I clearly instructed Do's and Don'ts**, when conversations get long, it **handles things however it wants** really often.

At first I thought, "Did I not explain properly?" but similar things kept happening.

**Real case I experienced:**

```
Me: "Core Data updates must only be done in MainContext.
     Doing it in Background will cause crashes."

Claude: "Yes, I'll use MainContext!"

[30 minutes later]

Claude: "Completed code that updates Core Data in Background!"

Me: "...I said MainContext earlier 😤"
```

It was really frustrating.

### Compact Conversation Isn't Perfect Either

You might think, "Then can't you just use Compact Conversation?"

The first couple times were okay. It definitely felt like the conversation was being organized.

**But as I kept using it, problems appeared:**

- First Compact: "Oh, this is organized nicely?"
- Second Compact: "Hmm... seems like something was reduced?"
- Third Compact: "Huh? Where did what I emphasized go?"
- Fourth Compact: "...What did I say again?"

**The black box is the problem:**
- I can't directly see what the AI kept and what it deleted
- Important instructions **gradually get diluted** through multiple compressions
- Results in behavior different from intention

For example:
- Initially includes "Never do X"
- After 2-3 Compacts: This instruction gets deprioritized
- After 4-5 Compacts: Disappears completely
- Only less important example conversations remain

It's like asking multiple people to summarize important meeting notes one after another, and in the end, the core points are gone and only secondary content remains.

Compact Conversation itself isn't bad. **But when repeatedly used in long work sessions, the context gradually gets distorted**.

### Why Was I So Frustrated?

After thinking about it, I realized.

"Oh, **the context was getting polluted**"

As conversations get longer:
- ✅ Initial instructions get diluted
- ✅ Middle conversations act as noise
- ✅ Focus only on recent conversations
- ✅ Result: Inconsistent behavior

This was the biggest problem I felt during the month and a half.

Whether to use or not use the latest features (Subagents, Skills), **context management** was much more important.

## My Solution

Here's what I found after much trial and error.

### Clear + CLAUDE.md Workflow

**This is how I work:**

1. **Before starting work**: `/clear` command (start with clean state)
2. **Load CLAUDE.md**: Load only the context I defined
3. **Proceed with work**: Under clear instructions
4. **After completing work**: `/clear` again
5. **Next task**: Start fresh with CLAUDE.md

Instead of leaving it to Compact Conversation, **I directly reset the context myself**.

### Why CLAUDE.md?

Claude also has a project feature, right? You can define pre-context.

But **CLAUDE.md is much more convenient:**

| | Claude Projects | CLAUDE.md |
|---|---|---|
| Management | Only in web UI | In code editor |
| Version control | Difficult | Possible with Git |
| Team sharing | Cumbersome | Done with file sharing |
| Updates | Manual input each time | Just edit file |
| Persistence | One-time | Throughout project |

Most importantly, **being able to easily structure and update what I think or want to do** is the biggest advantage.

"Oh, I should add this part" → Open file, edit → Save → Done!

### Define Repetitive Work Patterns

I define things like this in CLAUDE.md:
- Diagram creation rules (Mermaid format)
- Release note templates
- Design document structure
- Coding style guide
- Communication rules

**Define once and keep reusing!**

For example, every time you make a sequence diagram with Mermaid, it comes out consistently in the same format. You don't need to explain "draw it like this, draw it like that" every time.

### The Effect?

- ✅ Zero context pollution
- ✅ Consistent output
- ✅ Fast work start
- ✅ Predictable behavior

If I said "Never do X," it really doesn't. Because there's no chance to forget as conversations get long. We start with a clean state based on CLAUDE.md every time.

**Of course, managing CLAUDE.md is also important.**

If it exceeds hundreds of lines, another problem arises. If you go "Let's write everything down!" and reach 300 lines... AI gets confused too.

I'll cover this in detail **in the next post**! How to efficiently manage CLAUDE.md, strategies for keeping it under 100 lines, etc.

## Beyond Development

And there was one more important discovery.

### Previously I Only Thought About "Coding"

"Claude Code = Code writing tool"

I only thought like this.

### Now I Use It Like This

- ✅ Writing design documents
- ✅ Generating release notes
- ✅ State diagrams (Mermaid)
- ✅ Sequence diagrams (Mermaid)
- ✅ Team communication materials

Especially at work, I create a lot of **diagrams for communication**.

### Discovery of Mermaid

I used to have this fixed idea:

"To make diagrams, I need to open PowerPoint or draw.io"

But after making Mermaid diagrams with Claude Code... **the quality is beyond expectations**!

**For example, sequence diagrams:**

"Make a login process sequence diagram"

→ Completed in seconds
→ If modifications needed, just fix the text
→ Version control with Git
→ Easy to share with team members

Would have taken 30 minutes with PowerPoint. Drawing each arrow, aligning, choosing colors...

**Now there's no need for that.**

I'll also cover this in detail in the next series. What diagrams to make with Mermaid and how, including practical tips!

## What I Learned in a Month and a Half

The latest features aren't always the answer.

- **Subagents**: Good but cost issues
- **Skills**: Still unstable
- **Compact Conversation**: Black box

**Context management was really important.**

Just properly using Clear + CLAUDE.md, the quality of AI collaboration dramatically changes.

And now I'm using Claude Code as **a partner for all aspects of work**, not just a "coding tool". From design to documentation and communication.

## Next Post Preview

**"CLAUDE.md Practical Guide - Before It Becomes a Hundreds-of-Lines Monster"**

- Efficient CLAUDE.md structuring
- Strategy for maintaining 100-line goal
- Analysis/design phase-specific templates
- Project-specific management methods
- Real-world template disclosure

CLAUDE.md can also become a hundreds-of-lines monster if used incorrectly. I'll share the results of thinking about how to manage it!

**"Communication Revolution with Mermaid - Practical Diagram Application"**

- Use case, sequence, state diagrams
- Architecture visualization (C4 Model)
- Breaking the fixed idea that "I need to make images"
- 30 minutes → 1 minute with Claude Code

I've prepared a 3-part series like this!

## 📱 Please Keep Loving TipSmart

I took a break from blogging for a month and a half, but kept operating TipSmart!

The first app made with Claude Code, still working well. 😊

I also worked much more efficiently using this CLAUDE.md + Clear workflow when developing.

**[Download TipSmart from App Store](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*Thank you for welcoming LISA back after a month and a half!*
*Are you also experiencing context pollution issues? Please share your experiences in the comments!*
