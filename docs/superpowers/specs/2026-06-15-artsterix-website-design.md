# Design Specification: Artsterix Website

**Date:** 2026-06-15  
**Project:** Single-Page Architecture Portfolio for Artsterix  
**Status:** Approved  
**Aesthetic:** Modern Minimalist & Editorial

---

## 1. Executive Summary
This design specification defines the visual language, layout structure, technology stack, and interactive behaviors for the single-page website of the architecture firm **Artsterix**. The website is designed to serve as an immersive, high-end digital gallery that reflects the firm's architectural philosophy of structural honesty and spatial harmony.

---

## 2. Technical Stack
* **Framework:** Astro (Static Site Generator)
* **Styling:** Tailwind CSS (Integrated via Astro Tailwind plugin)
* **Interactions:** Vanilla JavaScript inside Astro components (using native `<script>` tags)
* **Fonts:** Self-hosted Sans-serif display and body font (Satoshi/Geist) and Monospaced label font (Geist Mono)
* **Icons:** `@phosphor-icons/react` or equivalent SVG icons mapped inline (no lucide-react)

---

## 3. Design Tokens & Visual Language
* **Background Color:** `#FBFBF9` (Warm off-white, resembling stone/plaster)
* **Primary Text:** `#1A1A1A` (Deep charcoal/ink for high contrast)
* **Secondary Text:** `#6E6E6E` (Muted stone grey for sub-labels and metadata)
* **Accent Color:** `#C15C3D` (Burnt Terracotta for interactive highlights)
* **Borders/Lines:** `#E5E5E0` (Soft stone grey for dividing sections)
* **Corner Radius:** `0px` (Sharp, monolithic edges globally)
* **Max Width:** `1400px` centered container (`max-w-7xl mx-auto px-6`)
* **Responsive Breakpoints:** Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

---

## 4. Single-Page Layout & Structure

### 4.1 Header & Navigation
* **Height:** Max `72px` on desktop.
* **Layout:** Flex row with name `Artsterix` on the left (Satoshi, tracking-tight, semi-bold) and primary navigation links on the right (Philosophy, Projects, Services, Contact).
* **Behavior:** Sticky positioning. Smoothly transition from transparent to a blurred translucent background (`backdrop-blur-md bg-white/75`) on scroll.

### 4.2 Hero Section
* **Height:** Viewport stable (`min-h-[100dvh]` on desktop, no `h-screen` to prevent iOS address bar shifts).
* **Layout:** Split-Screen (50vw text, 50vw visual) on desktop, collapsing to vertical on mobile.
  - **Left Column:** Headline (`text-4xl md:text-5xl lg:text-6xl`, max 2 lines), subtext (max 20 words: "Crafting silent spaces, permanent structures, and spatial forms tailored for refined living."), and a single call-to-action button ("Inquire"). Top padding capped at `pt-20` on desktop.
  - **Right Column:** Large editorial photography of a signature architectural house facade with dramatic shadow lines.

### 4.3 Philosophy Section
* **Layout:** Single-column vertical stack with `max-w-[65ch]` to maximize readability.
* **Content:** Statement of architectural ethos: "Structural Honesty, Spatial Harmony." Three short, focused paragraphs detailing the relationship between materials, site, and light. No cards or boundaries.

### 4.4 Selected Projects Section (Portfolio)
* **Layout:** Staggered, asymmetric 2-column grid. Column 2 has an offset top margin (`mt-16`) to create a hand-crafted gallery feel.
* **Details:** 4 key projects showcasing custom generated visual assets:
  1. *The Concrete Pavilion* (Landscape, Left)
  2. *Atrium House* (Portrait, Right, Offset)
  3. *Stone Monolith* (Portrait, Left)
  4. *Glass Canopy* (Landscape, Right)
* **Metadata:** Each project contains small-caps title and Geist Mono technical indicators (e.g., `01 / ATRIUM HOUSE / 2025 / RESIDENTIAL`).

### 4.5 Services & Expertise Section
* **Layout:** 2-column horizontal split.
  - **Left Column:** Section header and small paragraph explaining their phases of service.
  - **Right Column:** Stacked list of core services:
    - *01 / Architectural Design*
    - *02 / Interior Architecture & Custom Millwork*
    - *03 / Landscape Integration*
    - *04 / Project Management & Supervision*
  - **Styling:** Services are separated by thin horizontal rules (`border-t border-stone-200`). Hover states reveal descriptions.

### 4.6 Contact & Footer Section
* **Layout:** Split grid on desktop, vertical collapse on mobile.
  - **Left Side:** Minimal contact form. Name, Email, and Message fields using bottom-border inputs (`border-b border-stone-300 bg-transparent outline-none focus:border-stone-800 transition-colors py-3`). Button styled as solid charcoal block with sharp corners.
  - **Right Side:** Typography block containing office address, email, telephone, coordinates, and social handles in clean monospaced layout.

---

## 5. Visual Assets & Media Strategy
To support the editorial aesthetic, five custom images will be generated using AI:
* `hero_facade.jpg` - Signature minimalist concrete-and-glass villa.
* `concrete_pavilion.jpg` - Brutalist-inspired pavilion in a pine forest.
* `atrium_house.jpg` - Interior courtyard with natural light and oak accents.
* `stone_monolith.jpg` - Detail of stacked stone residential walls.
* `glass_canopy.jpg` - Floating glass/steel commercial canopy.

---

## 6. Interaction & Motion System
* **Image Hover:** Project cards feature overflow hidden. Hovering scales the image to `105%` with a smooth `duration-500 ease-out` transition.
* **Form Inputs:** Input bottom-borders animate from stone grey to burnt terracotta when focused.
* **CTA Button:** Tactile feedback on click (`scale-[0.98]`) and subtle translations (`-translate-y-[2px]`) on hover.
* **Navigation Links:** Hover triggers a clean color transition from primary text to the burnt terracotta accent.
