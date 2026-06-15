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
