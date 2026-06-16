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
    slug: 'master-bedroom',
    id: '01',
    title: 'MASTER BEDROOM',
    year: '2025',
    type: 'RESIDENTIAL',
    image: '/projects/House/bedroom.webp',
    location: 'Palo Alto, CA (37.4419° N, 122.1430° W)',
    description: 'Master bedroom showcases a modern, luxury design defined by a refined, earthy color palette and a harmonious blend of textures. The master bedroom’s large windows frame views of the surrounding greenery, bringing the outdoors in and creating a tranquil sanctuary. The room is designed to feel spacious and airy with clean lines and minimal clutter.',
    specs: {
      area: '2,400 sq ft',
      materials: 'Wallpaper, glass, white oak',
      engineer: 'Artsterix'
    },
    gallery: [
      {
        type: 'image',
        url: '/projects/House/bedroom.webp',
        caption: 'Master bedroom with an ensuite bathroom and walk-in closet.',
        aspect: 'aspect-[4/3]'
      },
      {
        type: 'image',
        url: '/projects/House/dining_set1.webp',
        caption: 'A minimalist dining area with earthy tones and a tranquil atmosphere.',
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
