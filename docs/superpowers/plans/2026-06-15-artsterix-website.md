# Artsterix Project Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a staggered media gallery (images and loops) within individual project detail pages, matching the premium minimal design.

**Architecture:** Update the projects database with structured gallery assets, and modify the dynamic slug route (`src/pages/projects/[slug].astro`) to render an asymmetric layout of visual slides and silent loops.

**Tech Stack:** Astro, Tailwind CSS.

---

## File Structure Map
* `src/data/projects.ts` - Central database updated with `gallery` items.
* `src/pages/projects/[slug].astro` - Project detail template modified to render the visual columns.

---

### Task 1: Update Projects Data Store with Gallery Assets

**Files:**
* Modify: `src/data/projects.ts`

- [ ] **Step 1: Update Data File with Gallery Data**  
  Overwrite: `src/data/projects.ts`
  ```typescript
  export interface ProjectMedia {
    type: 'image' | 'video';
    url: string;
    caption?: string;
    aspect?: string;
  }

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
    gallery: ProjectMedia[];
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
      },
      gallery: [
        {
          type: 'image',
          url: '/concrete_pavilion.png',
          caption: 'External raw concrete wall framing and tree canopy.',
          aspect: 'aspect-[16/9]'
        },
        {
          type: 'video',
          url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-facade-42250-large.mp4',
          caption: 'Light shadow play moving across concrete volumes.',
          aspect: 'aspect-[3/4]'
        },
        {
          type: 'image',
          url: '/hero_facade.png',
          caption: 'Detail of structural columns and roof lines.',
          aspect: 'aspect-[4/3]'
        }
      ]
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
      },
      gallery: [
        {
          type: 'image',
          url: '/atrium_house.png',
          caption: 'Central garden atrium under midday light.',
          aspect: 'aspect-[16/9]'
        },
        {
          type: 'image',
          url: '/stone_monolith.png',
          caption: 'Living room entry framing the central courtyard.',
          aspect: 'aspect-[4/3]'
        }
      ]
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
      },
      gallery: [
        {
          type: 'image',
          url: '/stone_monolith.png',
          caption: 'Bespoke hand-cut stone masonry walls.',
          aspect: 'aspect-[16/9]'
        },
        {
          type: 'image',
          url: '/concrete_pavilion.png',
          caption: 'External boundary retaining stone walls.',
          aspect: 'aspect-[4/3]'
        }
      ]
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
      },
      gallery: [
        {
          type: 'image',
          url: '/glass_canopy.png',
          caption: 'Cantilevered steel roof details.',
          aspect: 'aspect-[16/9]'
        },
        {
          type: 'image',
          url: '/hero_facade.png',
          caption: 'Office garden structural boundary lines.',
          aspect: 'aspect-[4/3]'
        }
      ]
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
      },
      gallery: [
        {
          type: 'image',
          url: '/desert_observatory.png',
          caption: 'Observatory facade looking toward the sunset horizon.',
          aspect: 'aspect-[16/9]'
        },
        {
          type: 'image',
          url: '/stone_monolith.png',
          caption: 'Detail of rammed earth layering texture.',
          aspect: 'aspect-[4/3]'
        }
      ]
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
      },
      gallery: [
        {
          type: 'image',
          url: '/coastal_library.png',
          caption: 'Cliffside entry overlooking the ocean.',
          aspect: 'aspect-[16/9]'
        },
        {
          type: 'image',
          url: '/concrete_pavilion.png',
          caption: 'Cedar ceiling panels blending with organic skylights.',
          aspect: 'aspect-[4/3]'
        }
      ]
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
  git commit -m "feat: configure projects gallery data model"
  ```

---

### Task 2: Implement Staggered Gallery inside Details Page

**Files:**
* Modify: `src/pages/projects/[slug].astro`

- [ ] **Step 1: Update dynamic details page router**  
  Modify: `src/pages/projects/[slug].astro`
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
    <main class="pt-[120px] pb-24 bg-brand-bg min-h-[100dvh]">
      <div class="max-w-4xl mx-auto px-6 space-y-16">
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

        <!-- Staggered Media Gallery -->
        {project.gallery && project.gallery.length > 0 && (
          <div class="space-y-12 pt-12 border-t border-brand-border/60">
            <h2 class="text-2xl font-bold tracking-tight text-brand-text font-sans uppercase">Project Gallery</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {project.gallery.map((media, idx) => {
                // If it's the first element, span full screen column on desktop (asymmetrical flow)
                const isFullBleed = idx === 0 || media.aspect === 'aspect-[16/9]';
                const gridClass = isFullBleed ? 'md:col-span-2' : '';
                const aspectClass = media.aspect || 'aspect-[4/3]';
                
                return (
                  <div class={`flex flex-col space-y-3 ${gridClass}`}>
                    <div class={`w-full overflow-hidden ${aspectClass} bg-stone-100`}>
                      {media.type === 'video' ? (
                        <video 
                          src={media.url}
                          autoplay 
                          loop 
                          muted 
                          playsinline 
                          class="w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={media.url} 
                          alt={media.caption || project.title} 
                          class="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {media.caption && (
                      <span class="font-mono text-[10px] tracking-wide text-brand-muted">
                        &mdash; {media.caption}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  </Layout>
  ```

- [ ] **Step 2: Verify Production Build Compilation**  
  Run: `npm run build`  
  Expected: Successful compilation, generating all pages cleanly.

- [ ] **Step 3: Commit**  
  Run:
  ```bash
  git add src/pages/projects/\[slug\].astro
  git commit -m "feat: implement staggered project media gallery"
  ```
