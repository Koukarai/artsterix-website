# Design Specification: Artsterix Website

**Date:** 2026-06-15  
**Project:** Multi-Page Architecture Portfolio for Artsterix  
**Status:** Approved  
**Aesthetic:** Modern Minimalist & Editorial

---

## 1. Executive Summary
This design specification defines the visual language, layout structure, technology stack, and interactive behaviors for the website of the architecture firm **Artsterix**. The website is designed to serve as an immersive, high-end digital gallery that reflects the firm's architectural philosophy of structural honesty and spatial harmony.

---

## 2. Technical Stack
* **Framework:** Astro (Static Site Generator)
* **Styling:** Tailwind CSS (Integrated via Astro Tailwind plugin)
* **Interactions:** Vanilla JavaScript inside Astro components (using native `<script>` tags)
* **Fonts:** Self-hosted Sans-serif display and body font (Satoshi/Geist) and Monospaced label font (Geist Mono)
* **Data Integration:** Centralized TypeScript data mapping for projects, facilitating easy content updates.

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

## 4. Layout & Structures

### 4.1 Header & Navigation
* **Height:** Max `72px` on desktop.
* **Layout:** Flex row with name `Artsterix` on the left and primary navigation links on the right (Philosophy, Projects, Services, Contact).
* **Behavior:** Sticky positioning. Smoothly transition from transparent to a blurred translucent background (`backdrop-blur-md bg-white/75`) on scroll.

### 4.2 Global Footer
* **Layout:** Multi-column grid on desktop, vertical collapse on mobile.
  - Left Side: Office contact details and Site coordinates.
  - Right Side: Legal details, copyright, and social links.
* **Behavior:** Imported into `Layout.astro` and loaded globally at the bottom of every page.

---

## 5. Page Layouts & Schema

### 5.1 Home Page (`/`)
* **Hero Section:** Split-Screen (50vw text, 50vw visual) on desktop, collapsing to vertical on mobile.
  - Left Column: Headline, subtext, and a single call-to-action button ("Inquire").
  - Right Column: Large project visual (`hero_facade.png`).
* **Philosophy Section:** Typography-centric single column (`max-w-[65ch]`) detailing structural ethos.
* **Featured Projects Grid:** Asymmetric grid displaying 4 curated projects.
* **Services/Disciplines:** 2-column horizontal split.
* **Contact Section:** Bottom-line form inputs.

### 5.2 Projects Index (`/projects`)
* **Layout:** A visual index of all projects in the collection.
* **Styling:** Dynamic staggered project card grids. Hovering scales the project thumbnails.

### 5.3 Project Detail View (`/projects/[slug]`)
* **Layout:** Dedicated layout page for single projects:
  - Header with large display project title, location, coordinates, and metadata.
  - Main hero image section showing the physical structure.
  - Architectural narrative (two-column text layout).
  - Specifications table showing details like: Area, Materials, and Engineers.
  - **Staggered Editorial Media Gallery:** A vertical flow of high-resolution images and silent, looping architectural videos (`autoplay loop muted playsinline`) arranged in an asymmetric grid (e.g. 50/50 split and full-bleed rows).

---

## 6. Projects Data System & Schema
To support quick insertions of your projects, all projects are registered in a database file: `src/data/projects.ts` containing the following schema:

```typescript
export interface ProjectMedia {
  type: 'image' | 'video'; // Specifies format
  url: string;             // File path (e.g., '/projects/pavilion-atrium.png')
  caption?: string;        // Optional minimal caption
  aspect?: string;         // Optional aspect ratio for staggered layouts (e.g., 'aspect-[3/4]')
}

export interface Project {
  slug: string;        // URL path (e.g. 'concrete-pavilion')
  id: string;          // Numeric code (e.g. '01')
  title: string;       // Display name
  year: string;        // Year completed
  type: string;        // Category
  image: string;       // Image URL
  location: string;    // City, coordinates
  description: string; // Detail narrative paragraph
  specs: {             // Key parameters
    area: string;
    materials: string;
    engineer: string;
  };
  gallery: ProjectMedia[]; // Array of staggered images and loop videos
}
```

### Mock Project Collection
1. **The Concrete Pavilion** (Residential, 2025)
2. **Atrium House** (Residential, 2025)
3. **Stone Monolith** (Residential, 2024)
4. **Glass Canopy** (Workplace, 2024)
5. **Desert Observatory** (Civic, 2026)
6. **Coastal Library** (Civic, 2024)
