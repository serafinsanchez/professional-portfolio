# Product Requirements Document (PRD)

**Project:** Developer Portfolio Website
**Platform:** Next.js 15 (App Router) + MDX
**Author:** \[Your Name]
**Date:** \[Today]

---

## 1. Overview

A **premium, minimal, and modern developer portfolio website** designed to impress both **hiring managers** and **freelance clients**. The site showcases personal brand, skills, work history, and projects in a way that feels **design-forward and interactive**, inspired by Awwwards/Framer-level sites.

---

## 2. Goals

* Position \[Your Name] as a **high-level developer** with strong design sensibilities.
* Provide a central hub for **About, Work History, Projects, Skills, and Contact**.
* Create a **memorable digital experience** that feels polished and premium.
* Make content **easy to update** using **MDX** (no CMS needed).

---

## 3. Target Audience

* **Hiring managers & recruiters** → looking for skills, work history, and credibility.
* **Potential freelance clients** → want to see project quality, testimonials, and ways to connect.
* **Peers / dev community** → may explore blog or case studies.

---

## 4. Features & Requirements

### 4.1 Pages & Sections

* **Landing / Hero Section**

  * Name, tagline, call-to-action (scroll or contact).
  * Animated headline (Motion.dev).

* **About Me**

  * Short bio in MDX.
  * Optional personal photo/illustration.

* **Work History**

  * Timeline with company logos, roles, and contributions.
  * MDX-powered entries.

* **Project Showcase**

  * Hero projects with case-study pages (overview, stack, screenshots, links).
  * Secondary projects as hover cards.
  * MDX-powered entries.

* **Skills & Technologies**

  * Categorized grid (Frontend, Backend, Tools, Design).
  * Interactive hover details.
  * MDX-powered.

* **Contact**

  * Contact form (name, email, message) → handled via **Resend API** in Next.js API route.
  * External links (GitHub, LinkedIn, X/Twitter, etc.).

* **(Optional) Blog / Writing**

  * MDX-based posts.
  * Auto-generated index page.

---

### 4.2 Design & UX

* **Look & Feel:** Premium, minimal, dark-first with accent color (electric blue or neon gradient).
* **Typography:** Inter (UI), paired with bold display font for headings.
* **Theme:** Dark mode default, light mode toggle via **next-themes**.
* **Animations:** Smooth page transitions, hover micro-interactions, parallax — via **Motion.dev**.
* **Accessibility:** WCAG AA compliance, alt text for all images.

---

### 4.3 Tech Stack

* **Framework:** Next.js 15 (App Router) + React 19.
* **Language:** TypeScript.
* **Styling:** Tailwind CSS v4 + shadcn/ui (UI components).
* **Content:** Local MDX files compiled with `@next/mdx`.
* **Forms:** Resend API for email delivery.
* **Analytics:** Plausible (via next-plausible or proxy).
* **Hosting:** Vercel.
* **Animations:** Motion.dev.

---

### 4.4 Content Model (MDX)

* `/content/about.mdx` → About Me.
* `/content/work/[company].mdx` → Work History entries.
* `/content/projects/[slug].mdx` → Project case studies.
* `/content/skills.mdx` → Skills list.
* `/content/blog/[slug].mdx` → Blog posts (optional).

---

### 4.5 Technical Constraints

* **Node.js ≥ 18.18** (20/22 LTS recommended).
* **Lighthouse ≥ 90** (Performance, SEO, Accessibility).
* **Avoid deprecated libs**:

  * Use **Motion.dev** instead of framer-motion.
  * Use **@next/mdx** instead of next-mdx-remote (unless remote MDX needed).
  * Skip Contentlayer (deprecated).
* **Ensure ad-block resilience** for analytics (proxy Plausible).

---

### 4.6 Success Metrics

* ✅ Page load time < 2s on 3G.
* ✅ 90+ Lighthouse across Performance, SEO, Accessibility.
* ✅ Recruiters/clients can find core info (skills, work history, projects, contact) in ≤ 2 clicks.
* ✅ Site editable with MDX without touching React components.
* ✅ Contact form sends reliably via Resend.

---

## 5. Future-Proofing

* Extendable to **Testimonials**, **Speaking**, **Newsletter**, or **Shop**.
* Content-first architecture — new sections only require adding MDX files.
* Design system built on shadcn/ui for rapid iteration.

---

## 6. Timeline (suggested)

* Week 1: Setup project (Next.js, Tailwind, shadcn/ui, MDX).
* Week 2: Build sections (About, Work, Projects, Skills).
* Week 3: Add animations, theme toggle, contact form.
* Week 4: Polish, test performance/SEO, deploy to Vercel.

---

## 7. Risks & Mitigation

* **Animation regressions** (React 19 breaking framer-motion) → Use Motion.dev.
* **Analytics blocking** → Plausible proxy setup.
* **Maintainer drift (MDX libs)** → Stick with official @next/mdx plugin.
* **Recruiters needing PDFs** → Optional future feature: “Download Resume” button.

---
