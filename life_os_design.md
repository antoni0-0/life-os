# life.os — UI/UX Standards + Visual Identity + Landing Page Direction

---

# 1. Product Design Philosophy

life.os should feel like:

- A premium digital product
- A personal operating system
- A gamified life companion
- A futuristic but emotionally warm interface
- A product people enjoy opening daily

The experience should communicate:

### Core Feelings

- Progress
- Curiosity
- Momentum
- Achievement
- Calm focus
- Intelligence
- Control

---

# 2. UX Core Principles

## 1. Everything Should Feel Rewarding

Every interaction must provide feedback.

Examples:

- Button press animation
- Glow on completion
- XP reward feedback
- Progress increments
- Animated confirmations

---

## 2. Low Cognitive Load

Do not overload the screen.

Rules:

- One primary CTA per section
- Clear visual hierarchy
- Reduce visual noise
- Important actions always visible

---

## 3. Gamification Without Looking Childish

Avoid:

- Cartoon aesthetics
- Excessive saturation
- Overly playful icons

Prefer:

- Elegant motion
- Progress indicators
- Micro rewards
- Achievement systems

---

## 4. Dark-First Experience

life.os should be designed primarily for dark mode.

Dark interfaces improve:

- Focus
- Dashboard readability
- Premium feel
- Emotional immersion

---

# 3. Core Visual Identity

## Design Keywords

- Futuristic
- Premium
- Smart
- Clean
- Interactive
- Gamified
- Minimalist
- High-tech

---

# 4. Color Palette

## Primary Background

```text
#0B0F19
```

Deep dark navy.

Use for:

- Main app background
- Dashboard base
- Large surfaces

---

## Secondary Background

```text
#111827
```

Use for:

- Cards
- Panels
- Containers

---

## Elevated Surface

```text
#1F2937
```

Use for:

- Floating cards
- Modals
- Elevated widgets

---

## Primary Accent

```text
#7C3AED
```

Purple.

Use for:

- Main CTA
- Progress indicators
- XP systems
- Active states

---

## Secondary Accent

```text
#06B6D4
```

Cyan.

Use for:

- Graphs
- Data
- Analytics
- Highlights

---

## Success Accent

```text
#22C55E
```

Use for:

- Completed habits
- Positive metrics
- Success feedback

---

## Warning Accent

```text
#F59E0B
```

Use for:

- Notifications
- Streak risk
- Alerts

---

## Danger Accent

```text
#EF4444
```

Use for:

- Errors
- Delete actions

---

## Text Primary

```text
#F8FAFC
```

---

## Text Secondary

```text
#94A3B8
```

---

# 5. Gradient Language

life.os should use gradients extensively.

### Primary Gradient

```css
linear-gradient(135deg, #7C3AED, #06B6D4)
```

Used for:

- Hero section
- CTA buttons
- Progress visuals

---

### Glow Gradient

```css
linear-gradient(135deg, rgba(124,58,237,0.5), rgba(6,182,212,0.3))
```

Used for:

- Background effects
- Floating blur elements

---

# 6. Typography Standards

## Recommended Fonts

### Primary Font

# Inter

Excellent for:

- SaaS
- Modern dashboards
- Premium products

---

### Secondary Font

# Space Grotesk

Use for:

- Headlines
- Hero section
- Big stats

---

# 7. Spacing System

Use 8px spacing scale.

```text
4
8
12
16
24
32
40
48
64
80
96
```

Never use random spacing.

---

# 8. Border Radius Standards

## Standard Radius

```text
16px
```

## Cards

```text
24px
```

## Floating Elements

```text
32px
```

---

# 9. Shadow System

Dark shadows with glow.

### Card Shadow

```css
box-shadow:
0 10px 30px rgba(0,0,0,0.4)
```

---

### Glow Shadow

```css
box-shadow:
0 0 40px rgba(124,58,237,0.3)
```

---

# 10. Button Standards

## Primary Button

Background:

```text
Gradient Purple → Cyan
```

States:

- Hover → brightness increase
- Active → scale down
- Loading → pulse

---

## Secondary Button

Background:

```text
Transparent + Border
```

---

## Button Radius

```text
16px
```

---

## Padding

```text
14px 24px
```

---

# 11. Card Design Rules

Cards should feel like premium widgets.

### Requirements

- Glass effect
- Soft borders
- Internal shadows
- Blur background
- Gradient edge highlights

---

# 12. Motion Guidelines

Animation is extremely important.

Recommended:

### Framer Motion

Use for:

- Page transitions
- Hover feedback
- Progress animations
- Stats transitions
- Hero animations

---

## Motion Rules

### Duration

```text
200ms–500ms
```

---

### Easing

```text
Ease-out
```

---

### Hover Motion

```text
Scale: 1 → 1.03
```

---

### Button Tap

```text
Scale: 1 → 0.96
```

---

# 13. Landing Page Goal

The landing page must instantly communicate:

> “This product is premium, futuristic, and addictive.”

---

# 14. Landing Page Layout

## Hero Section

Large statement.

Example:

```text
Your Life. Organized.
Gamified.
Intelligent.
```

Subtext:

```text
A modern operating system designed to help you build habits, understand your progress, and improve your life.
```

CTA:

- Start Now
- Watch Demo

---

## Hero Visual

Must include:

- Floating dashboard cards
- XP counters
- Progress bars
- Graph widgets
- Glowing elements
- Animated particles

---

## Features Section

3–4 cards.

Examples:

- Habits
- Finance
- Personal Growth
- Insights

---

## Social Proof Section

Even fake placeholders initially.

Example:

```text
Trusted by productivity enthusiasts.
```

---

## CTA Footer

Strong final CTA.

---

# 15. Recommended Frontend Libraries

## Motion

- Framer Motion

---

## Icons

- Lucide React

---

## UI

- TailwindCSS
- shadcn/ui

---

## Charts

- Recharts

---

# 16. Design Patterns To Follow

## Progressive Disclosure

Do not overwhelm users.

---

## Dashboard First

Users should immediately understand their status.

---

## High Information Density

Useful but elegant.

---

## Visual Hierarchy

Large → Medium → Small

---

## Reward Loops

Users should constantly feel progression.

---

# 17. Important Rule

life.os should NEVER feel like:

- A generic CRUD app
- A bootstrap dashboard
- A corporate admin panel
- A plain productivity app

It should feel like:

> Apple Health + Duolingo + Notion + Linear + Personal AI

---

# 18. Immediate Next Coding Goal

Your first frontend screen should include:

### Hero Section

### Animated Background

### Floating Stats Cards

### CTA Buttons

### Scroll Animations

### Gradient Effects

### Responsive Layout

### Mobile-first responsiveness

---

# 19. Tailwind Theme Example

Add to:

```text
tailwind.config.ts
```

```ts
extend: {
  colors: {
    background: '#0B0F19',
    surface: '#111827',
    elevated: '#1F2937',
    primary: '#7C3AED',
    secondary: '#06B6D4',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
  borderRadius: {
    xl: '16px',
    card: '24px',
  },
}
```

---

# 20. First Landing MVP Goal

A visually impressive page that communicates:

- Serious product
- Modern engineering
- High design quality
- Product vision
- Gamified UX

This page alone should already feel portfolio-ready.

