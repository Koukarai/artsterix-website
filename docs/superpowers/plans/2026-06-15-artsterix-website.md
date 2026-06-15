# Artsterix Inquiry Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a dedicated inquiry page `/inquire` featuring a high-end conversational multi-step wizard containing 20 questions, and update homepage references to route there.

**Architecture:** A standalone page template `src/pages/inquire.astro` utilizing client-side vanilla JavaScript to transition between the 5 thematic wizard steps with progress states.

**Tech Stack:** Astro, Tailwind CSS.

---

## File Structure Map
* `src/pages/inquire.astro` - Multi-step inquiry wizard containing the 20-question form.
* `src/components/Hero.astro` - Updated CTA to point to `/inquire`.
* `src/components/Contact.astro` - Replaced inline form with a curated routing section linking to `/inquire`.
* `src/components/Header.astro` - Header updated to route "Contact" navigation links directly to `/inquire`.

---

### Task 1: Create Dedicated Inquiry Page (/inquire)

**Files:**
* Create: `src/pages/inquire.astro`

- [ ] **Step 1: Write the Inquiry Page Component**  
  Create: `src/pages/inquire.astro` with the 20-question multi-step wizard, custom form inputs, progress indicators, slide transition logics, and fallback controls. Let's make sure all questions from the user prompt are mapped to inputs precisely.

- [ ] **Step 2: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/pages/inquire.astro
  git commit -m "feat: add dedicated /inquire page with 20-question wizard"
  ```

---

### Task 2: Route Home Hero to Inquiry Page

**Files:**
* Modify: `src/components/Hero.astro`

- [ ] **Step 1: Update Hero CTA Link**  
  Modify: `src/components/Hero.astro` to point the "Inquire Project" button to `/inquire`.

- [ ] **Step 2: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/components/Hero.astro
  git commit -m "feat: route Hero CTA to /inquire page"
  ```

---

### Task 3: Refactor Homepage Contact Section

**Files:**
* Modify: `src/components/Contact.astro`

- [ ] **Step 1: Replace Inline Form with a Dedicated Call-to-Action Link**  
  Modify: `src/components/Contact.astro` to swap the complex form inputs out, replacing them with a spacious minimal banner directing prospective clients to start the digital consultation on the `/inquire` page.

- [ ] **Step 2: Update Header Navigation Routing**  
  Modify: `src/components/Header.astro` to point the "Contact" link directly to `/inquire`.

- [ ] **Step 3: Verify Final Compilation**  
  Run: `npm run build`  
  Expected: All pages build successfully, creating `/inquire/index.html` static target.

- [ ] **Step 4: Commit**  
  Run:
  ```bash
  git add src/components/Contact.astro src/components/Header.astro
  git commit -m "feat: update Contact section and Header links to route to /inquire"
  ```
