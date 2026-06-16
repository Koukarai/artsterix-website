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
  clayImage?: string; // Optional clay render image
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
    slug: '6 bedroom residential development with a pent house',
    id: '03',
    title: '6 bedroom residential development with a pent house',
    year: '2025',
    type: 'RESIDENTIAL',
    image: '/6_bedroom_residential_development_with_a_pent_house.webp',
    location: 'Santa Barbara, CA (34.4208° N, 119.6982° W)',
    description: '6 bedroom residential development with a pent house.',
    specs: {
      area: '3,800 sq ft',
      materials: 'Stacked local slate, polished basalt, zinc roofing',
      engineer: 'Ajiro Akugha'
    },
    gallery: [
      {
        type: 'image',
        url: '/6_bedroom_residential_development_with_a_pent_house.webp',
        caption: 'Bespoke hand-cut stone masonry walls.',
        aspect: 'aspect-[16/9]'
      },
      {
        type: 'image',
        url: '/projects/House/bedroom.webp',
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
