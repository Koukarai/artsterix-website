# Artsterix Multi-Page Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Artsterix single-page website into a multi-page site with a global footer, dynamic projects directory, and project detail layouts.

**Architecture:** Centralized TypeScript project data file driving the dynamic generation of static routes in Astro (`src/pages/projects/[slug].astro`), with reusable page templates and layout wrappers.

**Tech Stack:** Astro, Tailwind CSS, TypeScript.

---

## File Structure Map
* `src/data/projects.ts` - Project database file containing structured object definitions.
* `src/components/Footer.astro` - Reusable global footer.
* `src/layouts/Layout.astro` - Base layout, updated to import and display global Footer at the bottom.
* `src/components/Projects.astro` - Featured projects panel displaying top 4 items.
* `src/components/Contact.astro` - Stripped footer coordinate details.
* `src/pages/projects/index.astro` - All projects gallery index.
* `src/pages/projects/[slug].astro` - Dynamic project details pages.
* `public/` - Includes new visual assets (`desert_observatory.png`, `coastal_library.png`).

---

### Task 1: Generate Visual Assets for Mock Projects

**Files:**
* Create: `public/desert_observatory.png`, `public/coastal_library.png`

- [ ] **Step 1: Generate Desert Observatory Image**  
  Use `generate_image` tool.  
  Prompt: "Rammed earth and black weathering steel astronomical observatory pavilion, nestled in Joshua Tree desert rock formations, twilight sky, architectural digest style, premium quality"  
  Save as: `desert_observatory`

- [ ] **Step 2: Copy Desert Observatory Image to Public Folder**  
  Run copy command for generated desert observatory file to `c:\Users\terry\test-website\public\desert_observatory.png`

- [ ] **Step 3: Generate Coastal Library Image**  
  Use `generate_image` tool.  
  Prompt: "Minimalist raw cedar wood and floor-to-ceiling structural glass reading library pavilion, perched on a grassy cliff overlooking the ocean, Oregon coast, architectural photography"  
  Save as: `coastal_library`

- [ ] **Step 4: Copy Coastal Library Image to Public Folder**  
  Run copy command for generated coastal library file to `c:\Users\terry\test-website\public\coastal_library.png`

- [ ] **Step 5: Commit**  
  Run:
  ```bash
  git add public/desert_observatory.png public/coastal_library.png
  git commit -m "asset: add observatory and library mock project images"
  ```

---

### Task 2: Create Centralized Projects Data Store

**Files:**
* Create: `src/data/projects.ts`

- [ ] **Step 1: Create Projects Data File**  
  Create: `src/data/projects.ts`
  ```typescript
  export interface Project {
    slug: string;
    id: string;
    title: string;
    year: string;
    type: string;
    image: string;
    location: string;
    description: string;
    specs: {
      area: string;
      materials: string;
      engineer: string;
    };
  }

  export const projects: Project[] = [
    {
      slug: 'concrete-pavilion',
      id: '01',
      title: 'THE CONCRETE PAVILION',
      year: '2025',
      type: 'RESIDENTIAL',
      image: '/concrete_pavilion.png',
      location: 'Palo Alto, CA (37.4419° N, 122.1430° W)',
      description: 'A brutalist-inspired single-story pavilion designed to disappear into a surrounding pine forest. The construction employs board-formed concrete walls, massive glass panels, and local white oak columns to forge a quiet connection between interior spaces and organic forest light.',
      specs: {
        area: '2,400 sq ft',
        materials: 'Board-formed concrete, tempered glass, white oak',
        engineer: 'Apex Structural Partners'
      }
    },
    {
      slug: 'atrium-house',
      id: '02',
      title: 'ATRIUM HOUSE',
      year: '2025',
      type: 'RESIDENTIAL',
      image: '/atrium_house.png',
      location: 'Napa Valley, CA (38.2975° N, 122.2864° W)',
      description: 'A multi-generational dwelling centered around an open, light-filled interior courtyard. Raw plaster surfaces reflect seasonal atmospheric light, while an organic courtyard oak tree anchors the layout, establishing a quiet focal node.',
      specs: {
        area: '4,200 sq ft',
        materials: 'Earthy plaster walls, cedar framing, steel windows',
        engineer: 'Studio Delta Structures'
      }
    },
    {
      slug: 'stone-monolith',
      id: '03',
      title: 'STONE MONOLITH',
      year: '2024',
      type: 'RESIDENTIAL',
      image: '/stone_monolith.png',
      location: 'Santa Barbara, CA (34.4208° N, 119.6982° W)',
      description: 'Perched on a structural coastal slope, this home utilizes thick horizontal layers of stacked dry stone. The thermal mass blocks high daytime heat, while narrow slot window openings capture framing canyon views.',
      specs: {
        area: '3,800 sq ft',
        materials: 'Stacked local slate, polished basalt, zinc roofing',
        engineer: 'Kari & Associates'
      }
    },
    {
      slug: 'glass-canopy',
      id: '04',
      title: 'GLASS CANOPY',
      year: '2024',
      type: 'WORKPLACE',
      image: '/glass_canopy.png',
      location: 'San Francisco, CA (37.7749° N, 122.4194° W)',
      description: 'An open-air garden workspace shaded by a floating glass and steel roof canopy. Designed to foster natural air currents, this light pavilion blends workspaces with natural elements.',
      specs: {
        area: '5,500 sq ft',
        materials: 'Structural steel girders, high-transmission glass, teak decking',
        engineer: 'Loomis Engineering'
      }
    },
    {
      slug: 'desert-observatory',
      id: '05',
      title: 'DESERT OBSERVATORY',
      year: '2026',
      type: 'CIVIC',
      image: '/desert_observatory.png',
      location: 'Joshua Tree, CA (34.1347° N, 116.3131° W)',
      description: 'Constructed from local rammed earth to blend into desert rock formations, this telescope pavilion serves as a quiet skyward viewing deck. The dark weathering steel structure handles shifting desert temperature peaks.',
      specs: {
        area: '1,800 sq ft',
        materials: 'Rammed earth, weathering steel, concrete panels',
        engineer: 'Apex Structural Partners'
      }
    },
    {
      slug: 'coastal-library',
      id: '06',
      title: 'COASTAL LIBRARY',
      year: '2024',
      type: 'CIVIC',
      image: '/coastal_library.png',
      location: 'Oregon Coast (44.0582° N, 121.3153° W)',
      description: 'A cedar-clad civic reading pavilion set on a grassy seaside cliff. Large floor-to-ceiling glass panel walls present panoramic ocean horizons, allowing visiting readers to feel completely integrated with the ocean breeze.',
      specs: {
        area: '3,100 sq ft',
        materials: 'Cedar wood panels, structural glass columns, stone flooring',
        engineer: 'Studio Delta Structures'
      }
    }
  ];
  ```

- [ ] **Step 2: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/data/projects.ts
  git commit -m "feat: add projects data store module"
  ```

---

### Task 3: Create Global Footer and Update Base Layout

**Files:**
* Create: `src/components/Footer.astro`
* Modify: `src/layouts/Layout.astro`
* Modify: `src/components/Contact.astro`

- [ ] **Step 1: Create Global Footer Component**  
  Create: `src/components/Footer.astro`
  ```astro
  ---
  ---
  <footer class="py-16 px-6 md:px-12 bg-brand-bg border-t border-brand-border">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 font-mono text-[11px] text-brand-muted uppercase tracking-wider">
      <!-- Left Column -->
      <div class="space-y-4">
        <div class="text-brand-text font-bold text-sm tracking-tight font-sans">Artsterix Architects</div>
        <div>
          254 Structural Avenue, Suite A<br />
          Palo Alto, CA 94301
        </div>
        <div>
          37.4419° N, 122.1430° W &middot; Elev. 9 m
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="flex flex-col md:items-end justify-between h-full space-y-8 md:space-y-12">
        <div class="flex space-x-6">
          <a href="#" class="hover:text-brand-accent transition-colors">Instagram</a>
          <a href="#" class="hover:text-brand-accent transition-colors">LinkedIn</a>
          <a href="#" class="hover:text-brand-accent transition-colors">Journal</a>
        </div>
        <div class="text-[10px] text-brand-muted/70 lowercase tracking-normal">
          &copy; {new Date().getFullYear()} Artsterix. all rights reserved.
        </div>
      </div>
    </div>
  </footer>
  ```

- [ ] **Step 2: Integrate Footer inside Layout**  
  Modify: `src/layouts/Layout.astro`
  ```astro
  ---
  import '../styles/global.css';
  import Footer from '../components/Footer.astro';

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
      <Footer />
    </body>
  </html>
  ```

- [ ] **Step 3: Modify Contact component (Remove duplicate footer columns)**  
  Modify: `src/components/Contact.astro`
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
        
        <form class="space-y-6" onsubmit="event.preventDefault(); alert('Inquiry sent successfully.');">
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

      <!-- Right Column: Studio Contact -->
      <div class="flex flex-col justify-start space-y-12">
        <div class="space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold tracking-tighter text-brand-text">The Studio</h2>
          <p class="text-base text-brand-muted leading-relaxed">
            We operate out of our Palo Alto studio, taking on a limited number of commissions per year to ensure design execution remains at premium quality.
          </p>
        </div>

        <div class="space-y-6">
          <div class="font-mono text-xs text-brand-muted uppercase tracking-widest">Inquiries</div>
          <div class="text-base text-brand-text">
            <a href="mailto:studio@artsterix.com" class="hover:text-brand-accent transition-colors">studio@artsterix.com</a><br />
            +1 (650) 492-3840
          </div>
        </div>
      </div>
    </div>
  </section>
  ```

- [ ] **Step 4: Verify Compiles**  
  Run: `npm run build`  
  Expected: Successful compilation.

- [ ] **Step 5: Commit**  
  Run:
  ```bash
  git add src/components/Footer.astro src/layouts/Layout.astro src/components/Contact.astro
  git commit -m "feat: extract global Footer and integrate it with main Layout"
  ```

---

### Task 4: Connect Home Page Portfolio Grid to Projects Data

**Files:**
* Modify: `src/components/Projects.astro`

- [ ] **Step 1: Update Projects grid layout**  
  Modify: `src/components/Projects.astro`
  ```astro
  ---
  import { projects } from '../data/projects';

  // Limit Home Page showcase to first 4 projects
  const featuredProjects = projects.slice(0, 4);
  ---
  <section id="projects" class="py-24 md:py-32 px-6 md:px-12 bg-brand-bg border-t border-brand-border">
    <div class="max-w-6xl mx-auto space-y-16">
      <div class="flex justify-between items-end">
        <div class="space-y-2">
          <span class="font-mono text-[10px] tracking-[0.2em] text-brand-accent uppercase">SELECTED COMMISSIONS</span>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tighter text-brand-text">Building Permanence</h2>
        </div>
        <a href="/projects" class="hidden sm:inline-block font-mono text-xs uppercase text-brand-muted hover:text-brand-accent tracking-widest transition-colors duration-200">
          View All Work &rarr;
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-0">
        {featuredProjects.map((project) => (
          <a href={`/projects/${project.slug}`} class={`flex flex-col space-y-4 group cursor-pointer ${project.id === '02' || project.id === '04' ? 'md:mt-32' : 'md:mb-32'}`}>
            <div class={`w-full overflow-hidden ${project.id === '01' || project.id === '04' ? 'aspect-[3/4]' : 'aspect-[4/3]'} bg-stone-100`}>
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
          </a>
        ))}
      </div>
      
      <div class="sm:hidden text-center pt-8">
        <a href="/projects" class="inline-block px-8 py-3 border border-brand-border text-brand-text font-medium text-sm hover:border-brand-accent transition-colors duration-300 tracking-wide">
          View All Work
        </a>
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
  git commit -m "feat: connect Home page projects grid to centralized data store"
  ```

---

### Task 5: Create Projects Index Gallery Page

**Files:**
* Create: `src/pages/projects/index.astro`
* Modify: `src/components/Header.astro`

- [ ] **Step 1: Create Projects Index Page**  
  Create: `src/pages/projects/index.astro`
  ```astro
  ---
  import Layout from '../../layouts/Layout.astro';
  import Header from '../../components/Header.astro';
  import { projects } from '../../data/projects';
  ---

  <Layout 
    title="Selected Work — Artsterix" 
    description="Explore the complete collection of minimalist, board-formed concrete homes and raw structural designs built by Artsterix."
  >
    <Header />
    <main class="pt-[120px] pb-24 px-6 md:px-12 bg-brand-bg min-h-[100dvh]">
      <div class="max-w-6xl mx-auto space-y-16">
        <div class="space-y-4 max-w-[50ch]">
          <span class="font-mono text-[10px] tracking-[0.2em] text-brand-accent uppercase">PORTFOLIO INDEX</span>
          <h1 class="text-4xl md:text-5xl font-bold tracking-tighter text-brand-text">Curated Commissions</h1>
          <p class="text-base text-brand-muted leading-relaxed">
            Our full index of structures, from light timber pavilions to monolithic concrete residential volumes.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <a href={`/projects/${project.slug}`} class="flex flex-col space-y-4 group cursor-pointer">
              <div class="w-full overflow-hidden aspect-[4/3] bg-stone-100">
                <img 
                  src={project.image} 
                  alt={`Artsterix project: ${project.title}`} 
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div class="flex justify-between items-start font-mono text-[10px] text-brand-muted tracking-wider border-t border-brand-border/40 pt-4">
                <span class="text-brand-text font-medium">{project.id} / {project.title}</span>
                <span>{project.year}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  </Layout>
  ```

- [ ] **Step 2: Update Header component home/projects routing**  
  Modify: `src/components/Header.astro`
  ```astro
  ---
  ---
  <header id="main-header" class="fixed top-0 left-0 w-full h-[72px] flex items-center justify-between px-6 md:px-12 z-50 transition-all duration-300 border-b border-transparent">
    <div class="flex items-center">
      <a href="/" class="text-xl font-bold tracking-tight font-sans text-brand-text">Artsterix</a>
    </div>
    
    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center space-x-8 text-sm font-medium">
      <a href="/#philosophy" class="text-brand-text/80 hover:text-brand-accent transition-colors duration-200">Philosophy</a>
      <a href="/projects" class="text-brand-text/80 hover:text-brand-accent transition-colors duration-200">Projects</a>
      <a href="/#services" class="text-brand-text/80 hover:text-brand-accent transition-colors duration-200">Services</a>
      <a href="/#contact" class="text-brand-text/80 hover:text-brand-accent transition-colors duration-200">Contact</a>
    </nav>

    <!-- Mobile Navigation Menu Toggle Button -->
    <button id="mobile-menu-btn" class="md:hidden flex flex-col justify-between w-6 h-4 text-brand-text focus:outline-none" aria-label="Toggle Menu">
      <span class="w-full h-[1.5px] bg-current transition-transform duration-300"></span>
      <span class="w-full h-[1.5px] bg-current transition-opacity duration-300"></span>
      <span class="w-full h-[1.5px] bg-current transition-transform duration-300"></span>
    </button>

    <!-- Mobile Dropdown Menu -->
    <div id="mobile-menu" class="fixed inset-0 top-[72px] bg-brand-bg hidden flex-col justify-start items-start p-8 space-y-6 text-2xl z-40 border-t border-brand-border">
      <a href="/#philosophy" class="mobile-nav-link text-brand-text hover:text-brand-accent transition-colors">Philosophy</a>
      <a href="/projects" class="mobile-nav-link text-brand-text hover:text-brand-accent transition-colors">Projects</a>
      <a href="/#services" class="mobile-nav-link text-brand-text hover:text-brand-accent transition-colors">Services</a>
      <a href="/#contact" class="mobile-nav-link text-brand-text hover:text-brand-accent transition-colors">Contact</a>
    </div>
  </header>

  <script>
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Header scroll background toggle
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header?.classList.add('backdrop-blur-md', 'bg-brand-bg/75', 'border-brand-border');
        header?.classList.remove('border-transparent');
      } else {
        header?.classList.remove('backdrop-blur-md', 'bg-brand-bg/75', 'border-brand-border');
        header?.classList.add('border-transparent');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger scroll logic on mount in case loaded halfway down
    handleScroll();

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
  Expected: Successful compilation.

- [ ] **Step 4: Commit**  
  Run:
  ```bash
  git add src/pages/projects/index.astro src/components/Header.astro
  git commit -m "feat: add projects index gallery page and update header routing"
  ```

---

### Task 6: Create Dynamic Project Details Page Router

**Files:**
* Create: `src/pages/projects/[slug].astro`

- [ ] **Step 1: Create Dynamic Route File**  
  Create: `src/pages/projects/[slug].astro`
  ```astro
  ---
  import Layout from '../../layouts/Layout.astro';
  import Header from '../../components/Header.astro';
  import { projects } from '../../data/projects';

  export async function getStaticPaths() {
    return projects.map((project) => ({
      params: { slug: project.slug },
      props: { project }
    }));
  }

  const { project } = Astro.props;
  ---

  <Layout 
    title={`${project.title} — Artsterix`} 
    description={project.description}
  >
    <Header />
    <main class="pt-[120px] pb-24 px-6 md:px-12 bg-brand-bg min-h-[100dvh]">
      <div class="max-w-4xl mx-auto space-y-12">
        <!-- Project Title Header -->
        <div class="space-y-4">
          <a href="/projects" class="font-mono text-xs uppercase text-brand-muted hover:text-brand-accent tracking-widest transition-colors duration-200">
            &larr; Back to Projects
          </a>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-brand-text leading-none uppercase">
            {project.title}
          </h1>
          <div class="font-mono text-xs text-brand-muted uppercase tracking-wider">
            {project.location}
          </div>
        </div>

        <!-- Full-width Visual -->
        <div class="w-full overflow-hidden aspect-[16/9] bg-stone-100">
          <img 
            src={project.image} 
            alt={project.title} 
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Project Overview & Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 pt-6">
          <!-- Overview Narrative -->
          <div class="md:col-span-2 space-y-6">
            <h2 class="text-xl font-bold tracking-tight text-brand-text">Overview</h2>
            <p class="text-base text-brand-muted leading-relaxed max-w-[65ch]">
              {project.description}
            </p>
          </div>

          <!-- Specs Panel -->
          <div class="space-y-6 md:border-l md:border-brand-border md:pl-8">
            <h2 class="text-xl font-bold tracking-tight text-brand-text">Specifications</h2>
            <div class="space-y-4 text-xs font-mono uppercase tracking-wider text-brand-muted">
              <div>
                <span class="text-brand-text block font-medium">Year</span>
                {project.year}
              </div>
              <div>
                <span class="text-brand-text block font-medium">Typology</span>
                {project.type}
              </div>
              <div>
                <span class="text-brand-text block font-medium">Area</span>
                {project.specs.area}
              </div>
              <div>
                <span class="text-brand-text block font-medium">Materials</span>
                {project.specs.materials}
              </div>
              <div>
                <span class="text-brand-text block font-medium">Structures</span>
                {project.specs.engineer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Layout>
  ```

- [ ] **Step 2: Verify Dynamic Build Compilation**  
  Run: `npm run build`  
  Expected: Successful compilation, showing all project slugs generated successfully under `dist/projects/[slug]/index.html`.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/pages/projects/\[slug\].astro
  git commit -m "feat: add dynamic projects details route"
  ```
