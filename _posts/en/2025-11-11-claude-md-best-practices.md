---
title: "CLAUDE.md Practical Guide - Before It Becomes a Hundreds-of-Lines Monster"
date: 2025-11-11
last_modified_at: 2025-11-11 19:22:14 +0900
categories: [VibeCoding, AITools]
tags: [CLAUDE.md, ClaudeCode, ContextManagement, ProjectManagement, AICollaboration, DocumentStructuring, DevProductivity, Templates, BestPractices, DesignDocuments]
seo_title: "CLAUDE.md Management Strategy - Efficient Structuring and Practical Templates"
description: "Before CLAUDE.md becomes a hundreds-of-lines monster! Disclosing practical know-how from efficient structuring, project-specific management, to analysis/design deliverable creation."

# Multilingual support fields
lang: "en"
translation_key: "claude-md-best-practices"
permalink: /en/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html"
  en: "/en/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html"
  es: "/es/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html"
---

Hello, this is LISA! 🙂

In [the previous post]({{ site.baseurl }}{% post_url en/2025-11-11-claude-code-context-management %}), I said I solved context pollution with "Clear + CLAUDE.md".

But... **CLAUDE.md itself can become another problem**.

"If it's good, let's put everything in!"
→ Suddenly 300 lines
→ AI gets confused too
→ Eventually becomes unusable file

This time I'll share practical know-how on **how to manage CLAUDE.md**!

## How CLAUDE.md Becomes a Monster

### Week 1: The Innocent Days

```markdown
# CLAUDE.md

This is my project.
Use TypeScript.
Follow ESLint rules.
```

**20 lines, perfect!**

### Week 2: Gradually Adding

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

**50 lines, still okay.**

### Week 4: Full-Scale Growth

- Add rules whenever adding new features
- "I should specify this too", "Let's write that down too"
- Add exception rules because of specific bugs
- Add "Don't do this next time" notes

**150 lines, getting a bit long?**

### Month 2: Monster Complete

- Scrolling never ends
- Don't know where what is
- AI can't properly grasp the whole thing
- Eventually revert to short conversations

**300 lines, it's ruined...** 😅

## Why Long CLAUDE.md Is a Problem?

### 1. AI Can't Read It All Either

- Token limits
- Can't distinguish important parts from less important parts
- Eventually focus only on the beginning

### 2. Maintenance Hell

- Don't know where what is
- Same content duplicated in multiple places
- Miss parts when updating

### 3. Unclear Priorities

- Everything looks the same level
- Really important things get buried

### 4. No Project-Specific Differences

- Project A rules
- Project B rules
- All mixed together

## My Solution

### Principle 1: Keep Only Essentials

**Essential Items (always include):**
- Project Overview (3-5 lines)
- Primary Tech Stack (1 line)
- Critical Rules (3-5 items)

**Optional Items (only when needed):**
- Coding Style Details
- API Guidelines
- Specific Patterns

**Goal: Under 100 lines**

### Principle 2: Hierarchical Structure

```markdown
# CLAUDE.md

## 🎯 Critical (must follow)
- Never do X
- Always use Y method

## ⚡ Important (important but exceptions possible)
- Use Z pattern when possible
- Prefer A library

## 💡 Nice to Have (reference info)
- Code style guide
- Naming conventions
```

**Priorities become clear!**

### Principle 3: Separate

**Single File Structure (X):**
```
CLAUDE.md (300 lines)
```

**Separated Structure (O):**
```
CLAUDE.md (core 50 lines)
.claude/
  ├── coding-style.md
  ├── api-guidelines.md
  ├── testing-rules.md
  └── architecture-decisions.md
```

**Just load additionally when needed!**

### Principle 4: Use Templates

**Templates by Project Type:**
- Web API Server Template
- Mobile App Template
- Library Template
- Microservice Template

**Start from base template → Add only what's needed**

## Practical CLAUDE.md Templates

### Basic Template (50-line version)

```markdown
# PROJECT_NAME

**Last Updated**: YYYY-MM-DD

## 🎯 Critical Rules

1. [Most important rule]
2. [What never to do]
3. [What always to do]

## 📋 Project Info

- **Type**: [Web/Mobile/Library/API]
- **Stack**: [Primary tech stack]
- **Architecture**: [Pattern]

## ⚡ Important Guidelines

### Coding Style
- [Core style 2-3 items]

### Error Handling
- [Error handling method]

### Testing
- [Test strategy briefly]

## 💡 Reference

- More details: `.claude/` folder
- Architecture: `.claude/architecture.md`
- API docs: `.claude/api-spec.md`
```

### Analysis Phase Template (Requirements Analysis)

```markdown
# Requirements Analysis Project

## 🎯 Critical Rules

1. **Use Case Based Analysis** - Always write actor-centered
2. **Mermaid Diagrams Required** - All analysis results must be visualized
3. **Specify Non-functional Requirements** - Must include performance, security, availability

## 📋 Project Info

- **Type**: Requirements Analysis
- **Output**: Requirements specification, use case diagram
- **Format**: Markdown + Mermaid

## ⚡ Important Guidelines

### Document Structure
1. Project overview
2. Stakeholder analysis
3. Functional requirements (by use case)
4. Non-functional requirements
5. Constraints
6. Diagrams

### Use Case Writing Rules
- **Actor**: External subject to system (user, external system)
- **Use Case**: Verb + object form
- **Description**: Preconditions, main flow, alternative flow, postconditions

### Mermaid Use Case Diagram Format
    ```mermaid
    graph LR
        User[User]
        Admin[Administrator]

        User --> UC1[View Products]
        User --> UC2[Add to Cart]
        Admin --> UC3[Manage Products]
    ```

## 💡 Reference
- Detailed template: `.claude/requirements-template.md`
- Mermaid guide: `.claude/mermaid-usecases.md`
```

With the analysis phase CLAUDE.md set up like this, when you tell Claude Code "Write requirements document," it comes out **in a consistent format right away.**

### Design Phase Template (System Design)

```markdown
# System Design Project

## 🎯 Critical Rules

1. **Follow C4 Model** - Context → Container → Component order
2. **Sequence Diagrams Required** - Specify interaction for each major feature
3. **State Diagrams** - Complex state changes must be visualized

## 📋 Project Info

- **Type**: System Design
- **Output**: Architecture document, sequence/state diagrams
- **Format**: Markdown + Mermaid

## ⚡ Important Guidelines

### Architecture Design Order

1. **System Context** (overall system and external relationships)
2. **Container Diagram** (internal system composition)
3. **Component Diagram** (detailed container structure)

### Sequence Diagram Writing Rules

**Write for each major feature:**
- Happy Path (normal flow)
- Error Path (error handling)
- Alternative Path (alternative flow)

**Mermaid Format:**
    ```mermaid
    sequenceDiagram
        participant User
        participant API
        participant DB

        User->>API: Request
        API->>DB: Query
        DB-->>API: Result
        API-->>User: Response
    ```

### State Diagram Writing Rules

**Visualize complex state changes:**
    ```mermaid
    stateDiagram-v2
        [*] --> Waiting
        Waiting --> Processing: Start
        Processing --> Complete: Success
        Processing --> Failed: Error
        Complete --> [*]
    ```

**Specify conditions for each state:**
- State transition conditions
- Allowed actions per state
- Timeout rules

## 💡 Reference
- C4 Model guide: `.claude/c4-model-guide.md`
- Sequence patterns: `.claude/sequence-patterns.md`
- State machine: `.claude/state-machine-guide.md`
```

Now in the design phase, when you say "Make login process sequence diagram," it comes out **consistently in the defined format**.

### iOS App Development Template

Similar to what I actually used when developing TipSmart.

```markdown
# TipSmart iOS App

## 🎯 Critical Rules

1. **Strictly MVVM Pattern** - View absolutely must not contain business logic
2. **SwiftUI Only** - No UIKit usage
3. **Core Data Synchronization** - All changes in MainContext

## 📋 Project Info

- **Type**: iOS Mobile App
- **Stack**: SwiftUI + Core Data + AdMob
- **Min iOS**: 15.0
- **Architecture**: MVVM

## ⚡ Important Guidelines

### Project Structure
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
- **Main Context**: UI updates
- **Background Context**: Bulk data processing
- **Never**: Use Background Context in Main Thread

### Design Document Creation
- Sequence diagram required when adding new features
- Write state diagram for complex state management
- Save in `.claude/design/` folder

## 💡 Reference
- Architecture: `.claude/mvvm-architecture.md`
- Core Data: `.claude/coredata-patterns.md`
- AdMob setup: `.claude/admob-setup.md`
```

With this setup, you don't need to say "Don't use Background Context in Core Data" every time. It's baked into CLAUDE.md!

### API Server Development Template

```markdown
# E-Commerce API Server

## 🎯 Critical Rules

1. **RESTful API Principles** - Resource-centered design, respect HTTP method semantics
2. **Unified Error Response** - RFC 7807 Problem Details format
3. **Auto-generate API Documentation** - Maintain OpenAPI 3.0 spec

## 📋 Project Info

- **Type**: REST API Server
- **Stack**: Node.js + Express + PostgreSQL
- **Architecture**: Layered (Controller → Service → Repository)

## ⚡ Important Guidelines

### API Design Principles

**Resource Naming:**
    ```
    GET    /api/v1/products          # List
    GET    /api/v1/products/:id      # Single item
    POST   /api/v1/products          # Create
    PUT    /api/v1/products/:id      # Full update
    PATCH  /api/v1/products/:id      # Partial update
    DELETE /api/v1/products/:id      # Delete
    ```

**Error Response Format:**
    ```json
    {
      "type": "https://api.example.com/errors/not-found",
      "title": "Resource Not Found",
      "status": 404,
      "detail": "Product with id '123' not found"
    }
    ```

### Design Deliverables

**Sequence Diagram (Order Process):**
    ```mermaid
    sequenceDiagram
        participant Client
        participant API
        participant DB

        Client->>API: POST /orders
        API->>DB: Check inventory
        DB-->>API: Inventory OK
        API->>DB: Save order
        DB-->>API: Saved
        API-->>Client: 201 Created
    ```

### Document Management
- API design: `.claude/api-design/`
- Sequence diagrams: `.claude/sequences/`
- State machines: `.claude/state-machines/`

## 💡 Reference
- API design guide: `.claude/api-design-guide.md`
- Error handling: `.claude/error-handling.md`
- OpenAPI spec: `.claude/openapi-template.yaml`
```

## Managing Multiple Projects

### Method 1: Project-Specific CLAUDE.md

```
project-a/
  └── CLAUDE.md
project-b/
  └── CLAUDE.md
project-c/
  └── CLAUDE.md
```

**Pros**: Complete separation
**Cons**: Common rules duplicated

### Method 2: Common + Individual

```
~/claude-templates/
  ├── common.md
  ├── web-api.md
  ├── mobile-app.md
  ├── analysis-phase.md
  └── design-phase.md

project-a/
  └── CLAUDE.md (common + specialized content)
```

**Pros**: Reusability + customization
**Cons**: More management points

### Method 3: Symbolic Links (Recommended!)

```
~/claude-templates/
  ├── common-rules.md
  ├── analysis-templates.md
  ├── design-templates.md
  ├── ios-patterns.md
  └── api-patterns.md

project-a/
  ├── CLAUDE.md (essentials only)
  └── .claude/ (symlink to ~/claude-templates)
```

**Pros**: Central management + easy updates
**Cons**: Initial setup needed

I use method 3. Manage common templates in one place, just create symbolic links for each project, and all projects automatically update!

### Practical Use: Analysis/Design Projects

```
requirements-analysis/
  ├── CLAUDE.md (analysis phase template)
  └── .claude/
      ├── requirements-template.md
      └── mermaid-usecases.md

system-design/
  ├── CLAUDE.md (design phase template)
  └── .claude/
      ├── c4-model-guide.md
      ├── sequence-patterns.md
      └── state-machine-guide.md
```

**Progress while switching templates by phase!**

Use requirements-focused CLAUDE.md in analysis phase, switch to design-focused CLAUDE.md when moving to design phase. Context is clear and good.

## Using CLAUDE.md in Teams

### Manage with Git

```bash
# Always version control CLAUDE.md
git add CLAUDE.md .claude/
git commit -m "docs: update design guidelines"

# Team members pull and it applies immediately
git pull
```

### Include CLAUDE.md Changes in PRs

```markdown
## Changes
- Added new API pattern
- Updated CLAUDE.md (error handling rules)
- Added sequence diagram template

## Review Checklist
- [ ] Code changes verified
- [ ] CLAUDE.md changes verified
- [ ] Diagram updates verified
```

### Share Analysis/Design Deliverables

**Design Review Process:**

1. **Write Design Documents** (Claude Code + CLAUDE.md)
   - Sequence diagrams
   - State diagrams
   - API specifications

2. **Create PR**
   - Add documents to `.claude/design/` folder
   - Include Mermaid diagrams

3. **Team Review**
   - Review diagrams
   - Verify design patterns
   - Check CLAUDE.md rule compliance

4. **After Merge**
   - Team members share updated CLAUDE.md rules
   - Learn new patterns

### Regular Reviews

- Monthly CLAUDE.md review
- Remove unnecessary content
- Add new patterns
- Keep under 100 lines

## Things Learned in Practice

### ✅ Do This

**1. Diet Regularly**
- Monthly: Delete unused rules
- Consolidate duplicate content
- Keep 100-line goal

**2. Display Version**
```markdown
**Last Updated**: 2025-11-11
**Version**: 2.1
```

**3. Record Change History**
```markdown
## Changelog
- 2025-11-11: Added sequence diagram templates
- 2025-10-15: Updated state machine guidelines
```

**4. Include Examples**

Showing bad and good examples together helps AI understand much better.

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

**5. Prepare Phase-Specific Templates**
- Analysis phase: requirements-template.md
- Design phase: design-template.md
- Implementation phase: development-template.md

### ❌ Don't Do This

**1. Explain Every Diagram Type**
- Template only frequently used ones
- Apply 80/20 rule

**2. Try to Make It Perfect at Once**
- Gradually while progressing project
- Add when actually needed

**3. Fill Content with Copy-Paste**
- General theories grabbed from internet
- Only what fits my project

**4. Not Updating**
- Old rules are actually poison
- Must reflect current state

## Summary

**CLAUDE.md also needs strategy:**

1. **Keep Only Essentials** (100-line goal)
2. **Clear Priorities** (Critical > Important > Nice to Have)
3. **Manage Separately** (utilize .claude/ folder)
4. **Start with Templates** (phase-specific templates)
5. **Regular Diet** (monthly review)

**Conditions of Good CLAUDE.md:**
- ✅ Graspable at a glance
- ✅ Clear priorities
- ✅ Only actually used content
- ✅ Keep up-to-date

**Especially in Analysis/Design Phases:**
- Specify diagram creation rules
- Maintain consistency with template usage
- Improve deliverable quality

## Next Post Preview

**"Communication Revolution with Mermaid - Creating Diagrams with AI"**

- AI auto-generates diagrams
- Instant visualization during meetings
- Streamline team communication
- 15x faster productivity
- Breaking the fixed idea that "I need to make images"

If you've prepared templates with CLAUDE.md,
now I'll show you in detail **how to make actual diagrams** with Mermaid + AI!

## 📱 TipSmart's CLAUDE.md

I also used CLAUDE.md when developing TipSmart.
Created all sequence diagrams and state diagrams with Mermaid in the design phase!

**[Download TipSmart from App Store](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*Were the CLAUDE.md management tips helpful?*
*How do you manage analysis/design deliverables? Please share in the comments!*
