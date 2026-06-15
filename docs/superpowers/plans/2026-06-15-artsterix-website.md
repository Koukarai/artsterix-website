# Artsterix Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a stunning, high-performance single-page portfolio website for the architecture firm Artsterix using Astro and Tailwind CSS.

**Architecture:** A static single-page website built with modular Astro components (Header, Hero, Philosophy, Projects, Services, Contact), styled using a strict minimalist palette and layout rules.

**Tech Stack:** Astro, Tailwind CSS, JavaScript (Vanilla in `<script>` tags for lightweight UI controls), Phosphor Icons (mapped to direct SVG paths).

---

## File Structure Map
* `astro.config.mjs` - Astro configuration file
* `package.json` - Node dependencies and scripts
* `src/styles/global.css` - Custom styles, Tailwind imports, custom font pairings, custom base layout rules
* `src/layouts/Layout.astro` - Core layout template containing standard metadata, SEO properties, and body skeleton
* `src/components/Header.astro` - Sticky glassmorphic header/navbar
* `src/components/Hero.astro` - Split-screen entry section with a large image and CTA
* `src/components/Philosophy.astro` - Elegant vertical typography-centric block
* `src/components/Projects.astro` - Asymmetric staggered project grid with hover micro-motion
* `src/components/Services.astro` - Technical grid with border dividers and service listings
* `src/components/Contact.astro` - Bottom-line form inputs + office coordinates block
* `src/pages/index.astro` - Page assembler bringing together all components
* `public/` - Directory for generated image assets (`hero_facade.jpg`, `concrete_pavilion.jpg`, `atrium_house.jpg`, `stone_monolith.jpg`, `glass_canopy.jpg`)

---

### Task 1: Scaffold Astro and Add Tailwind CSS

**Files:**
* Create/Modify: `package.json`, `astro.config.mjs`

- [ ] **Step 1: Scaffold Astro**  
  Run: `npx -y create-astro@latest ./ --template minimal --install --no-git --yes --skip-houston`  
  Expected: Successful installation of Astro dependencies and minimal directory setup.

- [ ] **Step 2: Add Tailwind Integration**  
  Run: `npx astro add tailwind --yes`  
  Expected: Automatic configuration of Tailwind CSS integration in `astro.config.mjs` and addition to `package.json`.

- [ ] **Step 3: Verify Setup**  
  Run: `npm run build`  
  Expected: Successfully compiles the empty Astro layout without errors.

- [ ] **Step 4: Commit**  
  Run:
  ```bash
  git add astro.config.mjs package.json package-lock.json
  git commit -m "chore: scaffold Astro project and add Tailwind integration"
  ```

---

### Task 2: Design Tokens & Custom CSS Setup

**Files:**
* Modify: `src/styles/global.css`
* Create/Modify: `tailwind.config.mjs` (or edit `src/styles/global.css` depending on tailwind integration type)

- [ ] **Step 1: Configure Custom Theme Tokens**  
  Create/Overwrite: `tailwind.config.mjs`
  ```javascript
  /** @type {import('tailwindcss').Config} */
  export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          brand: {
            bg: '#FBFBF9',
            text: '#1A1A1A',
            muted: '#6E6E6E',
            accent: '#C15C3D',
            border: '#E5E5E0'
          }
        },
        fontFamily: {
          sans: ['Satoshi', 'sans-serif'],
          mono: ['Geist Mono', 'monospace']
        }
      },
    },
    plugins: [],
  }
  ```

- [ ] **Step 2: Set global fonts and imports**  
  Overwrite: `src/styles/global.css`
  ```css
  @import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&f[]=geist-mono@300,400,500&display=swap');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    body {
      background-color: #FBFBF9;
      color: #1A1A1A;
      font-family: 'Satoshi', sans-serif;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  /* Custom scrollbar matching the minimal palette */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #FBFBF9;
  }
  ::-webkit-scrollbar-thumb {
    background: #E5E5E0;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #C15C3D;
  }
  ```

- [ ] **Step 3: Verify Setup**  
  Run: `npm run build`  
  Expected: Successful compilation without CSS errors.

- [ ] **Step 4: Commit**  
  Run:
  ```bash
  git add src/styles/global.css tailwind.config.mjs
  git commit -m "style: configure Tailwind design tokens and global fonts"
  ```

---

### Task 3: Base Layout and Navigation Header

**Files:**
* Create: `src/layouts/Layout.astro`
* Create: `src/components/Header.astro`

- [ ] **Step 1: Create Layout Component**  
  Create: `src/layouts/Layout.astro`
  ```astro
  ---
  import '../styles/global.css';

  interface Props {
    title: string;
    description: string;
  }

  const { title, description } = Astro.props;
  ---

  <!DOCTYPE html>
  <html lang="en" class="scroll-smooth">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="generator" content={Astro.generator} />
      <title>{title}</title>
      <meta name="description" content={description} />
    </head>
    <body class="bg-brand-bg text-brand-text font-sans antialiased selection:bg-brand-accent selection:text-white">
      <slot />
    </body>
  </html>
  ```

- [ ] **Step 2: Create Header Component**  
  Create: `src/components/Header.astro`
  ```astro
  ---
  ---
  <header id="main-header" class="fixed top-0 left-0 w-full h-[72px] flex items-center justify-between px-6 md:px-12 z-50 transition-all duration-300 border-b border-transparent">
    <div class="flex items-center">
      <a href="#" class="text-xl font-bold tracking-tight font-sans text-brand-text">Artsterix</a>
    </div>
    
    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center space-x-8 text-sm font-medium">
      <a href="#philosophy" class="text-brand-text/80 hover:text-brand-accent transition-colors duration-200">Philosophy</a>
      <a href="#projects" class="text-brand-text/80 hover:text-brand-accent transition-colors duration-200">Projects</a>
      <a href="#services" class="text-brand-text/80 hover:text-brand-accent transition-colors duration-200">Services</a>
      <a href="#contact" class="text-brand-text/80 hover:text-brand-accent transition-colors duration-200">Contact</a>
    </nav>

    <!-- Mobile Navigation Menu Toggle Button -->
    <button id="mobile-menu-btn" class="md:hidden flex flex-col justify-between w-6 h-4 text-brand-text focus:outline-none" aria-label="Toggle Menu">
      <span class="w-full h-[1.5px] bg-current transition-transform duration-300"></span>
      <span class="w-full h-[1.5px] bg-current transition-opacity duration-300"></span>
      <span class="w-full h-[1.5px] bg-current transition-transform duration-300"></span>
    </button>

    <!-- Mobile Dropdown Menu -->
    <div id="mobile-menu" class="fixed inset-0 top-[72px] bg-brand-bg hidden flex-col justify-start items-start p-8 space-y-6 text-2xl z-40 border-t border-brand-border">
      <a href="#philosophy" class="mobile-nav-link text-brand-text hover:text-brand-accent transition-colors">Philosophy</a>
      <a href="#projects" class="mobile-nav-link text-brand-text hover:text-brand-accent transition-colors">Projects</a>
      <a href="#services" class="mobile-nav-link text-brand-text hover:text-brand-accent transition-colors">Services</a>
      <a href="#contact" class="mobile-nav-link text-brand-text hover:text-brand-accent transition-colors">Contact</a>
    </div>
  </header>

  <script>
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Header scroll background toggle
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header?.classList.add('backdrop-blur-md', 'bg-brand-bg/75', 'border-brand-border');
        header?.classList.remove('border-transparent');
      } else {
        header?.classList.remove('backdrop-blur-md', 'bg-brand-bg/75', 'border-brand-border');
        header?.classList.add('border-transparent');
      }
    });

    // Mobile menu toggle
    mobileMenuBtn?.addEventListener('click', () => {
      mobileMenu?.classList.toggle('hidden');
      mobileMenu?.classList.toggle('flex');
      
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans[0].classList.toggle('rotate-45');
      spans[0].classList.toggle('translate-y-[7.5px]');
      spans[1].classList.toggle('opacity-0');
      spans[2].classList.toggle('-rotate-45');
      spans[2].classList.toggle('-translate-y-[7.5px]');
    });

    // Close menu on link click
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu?.classList.add('hidden');
        mobileMenu?.classList.remove('flex');
        
        const spans = mobileMenuBtn?.querySelectorAll('span');
        if (spans) {
          spans[0].classList.remove('rotate-45', 'translate-y-[7.5px]');
          spans[1].classList.remove('opacity-0');
          spans[2].classList.remove('-rotate-45', '-translate-y-[7.5px]');
        }
      });
    });
  </script>
  ```

- [ ] **Step 3: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation without errors.

- [ ] **Step 4: Commit**  
  Run:
  ```bash
  git add src/layouts/Layout.astro src/components/Header.astro
  git commit -m "feat: add base layout and sticky header component"
  ```

---

### Task 4: Generate Premium Visual Assets

**Files:**
* Create: `public/hero_facade.jpg`, `public/concrete_pavilion.jpg`, `public/atrium_house.jpg`, `public/stone_monolith.jpg`, `public/glass_canopy.jpg`

- [ ] **Step 1: Generate Hero Image**  
  Use `generate_image` tool.
  Prompt: "Premium architectural photography of a modern minimalist villa facade, geometric concrete and large floor-to-ceiling glass windows, dramatic shadows at sunset, luxury residence, editorial style, high resolution"
  Save as: `hero_facade`

- [ ] **Step 2: Generate Project 1 Image (Concrete Pavilion)**  
  Use `generate_image` tool.
  Prompt: "Modern brutalist concrete pavilion, single-story, sharp lines, surrounded by tall pine trees, high contrast, architecture magazine style, daytime"
  Save as: `concrete_pavilion`

- [ ] **Step 3: Generate Project 2 Image (Atrium House)**  
  Use `generate_image` tool.
  Prompt: "Minimalist house interior courtyard atrium, raw light-colored plaster walls, natural oak tree, warm sunlight casting shadow lines, architectural digest photography"
  Save as: `atrium_house`

- [ ] **Step 4: Generate Project 3 Image (Stone Monolith)**  
  Use `generate_image` tool.
  Prompt: "Contemporary house exterior wall detail, horizontal lines of stacked natural raw grey stone, slate stone panels, raw organic texture, high-end architectural detail"
  Save as: `stone_monolith`

- [ ] **Step 5: Generate Project 4 Image (Glass Canopy)**  
  Use `generate_image` tool.
  Prompt: "Minimalist steel and glass roof canopy of a modern office building garden workspace, thin black metal frames, floating structure, professional design magazine look"
  Save as: `glass_canopy`

- [ ] **Step 6: Commit**  
  Run:
  ```bash
  git add public/hero_facade.jpg public/concrete_pavilion.jpg public/atrium_house.jpg public/stone_monolith.jpg public/glass_canopy.jpg
  git commit -m "asset: add generated high-res architectural images"
  ```

---

### Task 5: Hero Component

**Files:**
* Create: `src/components/Hero.astro`

- [ ] **Step 1: Create Hero Component**  
  Create: `src/components/Hero.astro`
  ```astro
  ---
  ---
  <section class="min-h-[100dvh] flex flex-col md:flex-row items-stretch pt-[72px] overflow-hidden">
    <!-- Left Column: Content -->
    <div class="flex-1 flex flex-col justify-center px-6 md:px-12 py-12 md:py-0 bg-brand-bg max-w-[100vw] md:max-w-[50vw]">
      <div class="max-w-[45ch] space-y-6">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] text-brand-text">
          Form, Light, and Silent Spaces.
        </h1>
        <p class="text-base text-brand-muted leading-relaxed">
          Crafting silent spaces, permanent structures, and spatial forms tailored for refined living.
        </p>
        <div>
          <a href="#contact" class="inline-block px-8 py-3 bg-brand-text text-brand-bg font-medium text-sm hover:bg-brand-accent transition-colors duration-300 tracking-wide select-none active:scale-[0.98]">
            Inquire Project
          </a>
        </div>
      </div>
    </div>
    
    <!-- Right Column: Visual -->
    <div class="flex-1 relative overflow-hidden min-h-[400px] md:min-h-0 bg-stone-100">
      <img 
        src="/hero_facade.jpg" 
        alt="Artsterix minimalist concrete and glass villa facade" 
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </section>
  ```

- [ ] **Step 2: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/components/Hero.astro
  git commit -m "feat: add split-screen Hero component"
  ```

---

### Task 6: Philosophy Section

**Files:**
* Create: `src/components/Philosophy.astro`

- [ ] **Step 1: Create Philosophy Component**  
  Create: `src/components/Philosophy.astro`
  ```astro
  ---
  ---
  <section id="philosophy" class="py-24 md:py-32 px-6 md:px-12 bg-brand-bg border-t border-brand-border">
    <div class="max-w-4xl mx-auto space-y-12">
      <h2 class="text-3xl md:text-4xl font-bold tracking-tighter text-brand-text">
        Structural Honesty, Spatial Harmony.
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-brand-muted leading-relaxed">
        <p class="max-w-[65ch]">
          Artsterix was founded on the belief that good architecture does not scream; it frames. By stripping away transient ornamentation, we focus on the raw elements of structure: light, material, and spatial volume. Our projects respond to the unique landscape they inhabit, seeking to establish a dialogues between interior life and the natural world.
        </p>
        <p class="max-w-[65ch]">
          We combine advanced structural engineering with local craftsmanship. Every concrete surface, timber joint, and glass panel is detailed to maximize physical presence and ensure longevity. We design spaces to be lived in, aged with, and felt in silence.
        </p>
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/components/Philosophy.astro
  git commit -m "feat: add Typography-focused Philosophy section"
  ```

---

### Task 7: Selected Projects Component

**Files:**
* Create: `src/components/Projects.astro`

- [ ] **Step 1: Create Projects Component**  
  Create: `src/components/Projects.astro`
  ```astro
  ---
  const projects = [
    {
      id: '01',
      title: 'THE CONCRETE PAVILION',
      year: '2025',
      type: 'RESIDENTIAL',
      image: '/concrete_pavilion.jpg',
      aspect: 'aspect-[4/3] md:aspect-[3/4]'
    },
    {
      id: '02',
      title: 'ATRIUM HOUSE',
      year: '2025',
      type: 'RESIDENTIAL',
      image: '/atrium_house.jpg',
      aspect: 'aspect-[4/3]',
      offset: true
    },
    {
      id: '03',
      title: 'STONE MONOLITH',
      year: '2024',
      type: 'RESIDENTIAL',
      image: '/stone_monolith.jpg',
      aspect: 'aspect-[3/4]'
    },
    {
      id: '04',
      title: 'GLASS CANOPY',
      year: '2024',
      type: 'WORKPLACE',
      image: '/glass_canopy.jpg',
      aspect: 'aspect-[4/3]'
    }
  ];
  ---
  <section id="projects" class="py-24 md:py-32 px-6 md:px-12 bg-brand-bg border-t border-brand-border">
    <div class="max-w-6xl mx-auto space-y-16">
      <div class="space-y-2">
        <span class="font-mono text-[10px] tracking-[0.2em] text-brand-accent uppercase">SELECTED COMMISSIONS</span>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tighter text-brand-text">Building Permanence</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
        {projects.map((project) => (
          <div class={`flex flex-col space-y-4 group cursor-pointer ${project.offset ? 'md:mt-24' : ''}`}>
            <div class={`w-full overflow-hidden ${project.aspect} bg-stone-100`}>
              <img 
                src={project.image} 
                alt={`Artsterix project: ${project.title}`} 
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div class="flex justify-between items-start font-mono text-[11px] text-brand-muted tracking-wider border-t border-brand-border/40 pt-4">
              <span class="text-brand-text font-medium">{project.id} / {project.title}</span>
              <span>{project.type} &middot; {project.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/components/Projects.astro
  git commit -m "feat: add asymmetric projects portfolio section with image scale hovers"
  ```

---

### Task 8: Services Component

**Files:**
* Create: `src/components/Services.astro`

- [ ] **Step 1: Create Services Component**  
  Create: `src/components/Services.astro`
  ```astro
  ---
  const services = [
    {
      num: '01',
      title: 'Architectural Design',
      desc: 'Formulation of initial structural layouts, environmental response systems, and structural logic from massing studies to architectural drafts.'
    },
    {
      num: '02',
      title: 'Interior & Custom Millwork',
      desc: 'Creation of seamless interior environments, selecting natural textures, plaster finishes, and drawing bespoke integrated wood millwork.'
    },
    {
      num: '03',
      title: 'Landscape Integration',
      desc: 'Developing transitional outdoor spaces, custom pools, structural stone pathways, and choosing native flora that complements the built forms.'
    },
    {
      num: '04',
      title: 'Project Supervision',
      desc: 'Regular direct site inspection, structural quality check, and close dialogue with execution engineers to verify spatial details.'
    }
  ];
  ---
  <section id="services" class="py-24 md:py-32 px-6 md:px-12 bg-brand-bg border-t border-brand-border">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
      <!-- Left Column -->
      <div class="w-full md:w-1/3 space-y-4">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tighter text-brand-text">Disciplines</h2>
        <p class="text-base text-brand-muted leading-relaxed">
          Our practice operates as a unified spatial studio, handling projects from initial environmental study through construction oversight.
        </p>
      </div>
      
      <!-- Right Column -->
      <div class="w-full md:w-2/3 divide-y divide-brand-border">
        {services.map((svc) => (
          <div class="py-6 first:pt-0 last:pb-0 group">
            <div class="flex justify-between items-center cursor-pointer py-2">
              <div class="flex items-center space-x-6">
                <span class="font-mono text-xs text-brand-muted">{svc.num}</span>
                <h3 class="text-lg font-medium text-brand-text group-hover:text-brand-accent transition-colors duration-200">{svc.title}</h3>
              </div>
            </div>
            <p class="mt-2 text-sm text-brand-muted leading-relaxed pl-10 max-w-[55ch] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {svc.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/components/Services.astro
  git commit -m "feat: add Services & Disciplines section with subtle line dividers"
  ```

---

### Task 9: Contact & Footer Component

**Files:**
* Create: `src/components/Contact.astro`

- [ ] **Step 1: Create Contact Component**  
  Create: `src/components/Contact.astro`
  ```astro
  ---
  ---
  <section id="contact" class="py-24 md:py-32 px-6 md:px-12 bg-brand-bg border-t border-brand-border">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
      <!-- Left Column: Inquiry Form -->
      <div class="space-y-8">
        <div class="space-y-2">
          <h2 class="text-3xl md:text-4xl font-bold tracking-tighter text-brand-text">Start a Project</h2>
          <p class="text-base text-brand-muted">Describe your spatial objectives and property parameters.</p>
        </div>
        
        <form class="space-y-6">
          <div class="flex flex-col space-y-1">
            <label for="name" class="text-xs uppercase font-mono tracking-wider text-brand-muted">Name</label>
            <input 
              type="text" 
              id="name" 
              required 
              placeholder="e.g. Terry Miller"
              class="border-b border-brand-border focus:border-brand-accent bg-transparent outline-none transition-colors duration-300 py-3 text-brand-text font-sans placeholder:text-stone-300"
            />
          </div>
          
          <div class="flex flex-col space-y-1">
            <label for="email" class="text-xs uppercase font-mono tracking-wider text-brand-muted">Email</label>
            <input 
              type="email" 
              id="email" 
              required 
              placeholder="e.g. terry@example.com"
              class="border-b border-brand-border focus:border-brand-accent bg-transparent outline-none transition-colors duration-300 py-3 text-brand-text font-sans placeholder:text-stone-300"
            />
          </div>

          <div class="flex flex-col space-y-1">
            <label for="message" class="text-xs uppercase font-mono tracking-wider text-brand-muted">Message</label>
            <textarea 
              id="message" 
              rows="4" 
              required 
              placeholder="Share details about the site, timing, or project scope..."
              class="border-b border-brand-border focus:border-brand-accent bg-transparent outline-none transition-colors duration-300 py-3 text-brand-text font-sans resize-none placeholder:text-stone-300"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="px-8 py-3 bg-brand-text text-brand-bg font-medium text-sm hover:bg-brand-accent transition-colors duration-300 tracking-wide select-none active:scale-[0.98] w-full md:w-auto"
          >
            Submit Inquiry
          </button>
        </form>
      </div>

      <!-- Right Column: Coordinates & Studio Info -->
      <div class="flex flex-col justify-between space-y-12">
        <div class="space-y-6">
          <div class="font-mono text-xs text-brand-muted uppercase tracking-widest">Studio Address</div>
          <div class="text-base text-brand-text leading-relaxed">
            ARTSTERIX ARCHITECTS<br />
            254 Structural Avenue, Suite A<br />
            Palo Alto, CA 94301
          </div>
        </div>

        <div class="space-y-6">
          <div class="font-mono text-xs text-brand-muted uppercase tracking-widest">Inquiries</div>
          <div class="text-base text-brand-text">
            <a href="mailto:studio@artsterix.com" class="hover:text-brand-accent transition-colors">studio@artsterix.com</a><br />
            +1 (650) 492-3840
          </div>
        </div>

        <div class="space-y-6">
          <div class="font-mono text-xs text-brand-muted uppercase tracking-widest">Site Coordinates</div>
          <div class="font-mono text-sm text-brand-text tracking-wide">
            37.4419&deg; N, 122.1430&deg; W &middot; elev. 9 m
          </div>
        </div>

        <div class="flex items-center space-x-6 pt-6 border-t border-brand-border/40 font-mono text-xs text-brand-muted">
          <a href="#" class="hover:text-brand-accent transition-colors">Instagram</a>
          <a href="#" class="hover:text-brand-accent transition-colors">LinkedIn</a>
          <a href="#" class="hover:text-brand-accent transition-colors">Journal</a>
        </div>
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/components/Contact.astro
  git commit -m "feat: add Contact & Footer section with technical monospaced coordinate layout"
  ```

---

### Task 10: Page Assembly & Build

**Files:**
* Modify: `src/pages/index.astro`

- [ ] **Step 1: Assemble all components**  
  Overwrite: `src/pages/index.astro`
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  import Header from '../components/Header.astro';
  import Hero from '../components/Hero.astro';
  import Philosophy from '../components/Philosophy.astro';
  import Projects from '../components/Projects.astro';
  import Services from '../components/Services.astro';
  import Contact from '../components/Contact.astro';
  ---

  <Layout 
    title="Artsterix — Structural Honesty, Spatial Harmony" 
    description="A minimalist, gallery-focused architectural design portfolio showcasing curated modern homes and pavilions built with permanent materials."
  >
    <Header />
    <main>
      <Hero />
      <Philosophy />
      <Projects />
      <Services />
      <Contact />
    </main>
  </Layout>
  ```

- [ ] **Step 2: Clean default unused templates**  
  Run: `rm -Recurse -Force src/components/Card.astro` (if it exists) or check standard Astro scaffold.

- [ ] **Step 3: Perform production build verification**  
  Run: `npm run build`  
  Expected: Production bundle is successfully built and optimized without warnings or errors.

- [ ] **Step 4: Commit all changes**  
  Run:
  ```bash
  git add src/pages/index.astro
  git commit -m "feat: assemble final single-page layout structure"
  ```
