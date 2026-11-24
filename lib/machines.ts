import type { StaticImageData } from 'next/image';
import pedestalCutout from '@/public/machines/pedestal.png';
import towerCutout from '@/public/machines/tower.png';
import wallCutout from '@/public/machines/wall.png';

/**
 * Official VTM measurements, stored as published strings so they are never rounded.
 *
 * Sources:
 * - Wall Mount: https://vtmvending.com/products/slim-wall-tcg-vending
 * - Pedestal stand: https://vtmvending.com/products/pedestal-stand
 * - Tower: https://vtmvending.com/products/slim-tower-2-0-pokemon-card-vending-machine
 *
 * The pedestal is a Slim Wall cabinet on the universal stand. VTM publishes those
 * two pieces separately and does not publish a combined assembled height or weight.
 * Do not add the cabinet and stand together.
 */
export interface PublishedDimensions {
  /** Inches, exactly as published. Example: "23.6". */
  widthIn: string;
  heightIn: string;
  depthIn: string;
  /** Pounds, exactly as published. Example: "121". */
  weightLbs: string;
}

export interface MachinePower {
  /** Customer-facing outlet requirement. */
  outlet: string;
  /** Official electrical rating, when VTM publishes one for this cabinet. */
  rating?: string;
}

export interface MachineSpecs {
  /** Official VTM model name, shown as a small subtitle. */
  modelName: string;
  cabinet: PublishedDimensions;
  /**
   * Pedestal stand only. Its own published size and weight.
   * Never add these figures to the cabinet.
   */
  stand?: PublishedDimensions;
  /** Space the location gives up, for the full specs block. */
  space: string;
  /** One compact line for the host-page cards. */
  sizeNote: string;
  power: MachinePower;
  /** How it is installed, from the official product notes. */
  install: string;
}

export interface MachineModel {
  slug: 'wall' | 'pedestal' | 'tower';
  name: string;
  badge: string;
  placement: string;
  /** One line for compact cards (host page). */
  summary: string;
  description: string;
  specs: MachineSpecs;
  /** Transparent cut-out, trimmed to the machine's edges so models line up on a shared floor. */
  cutout: StaticImageData;
  alt: string;
}

/** Slim Wall cabinet. The pedestal uses this same cabinet, so the numbers live once. */
const slimWallCabinet: PublishedDimensions = {
  widthIn: '23.6',
  heightIn: '40.5',
  depthIn: '10.2',
  weightLbs: '121',
};

/** Slim Wall cabinet draw. The pedestal stand has no separate electrical rating. */
const slimWallPower: MachinePower = {
  outlet: 'Standard 110V outlet',
  rating: '110VAC 60Hz, 50W',
};

const pedestalStand: PublishedDimensions = {
  widthIn: '25.1',
  heightIn: '30.3',
  depthIn: '23.6',
  weightLbs: '35',
};

const towerCabinet: PublishedDimensions = {
  widthIn: '33.5',
  heightIn: '72.8',
  depthIn: '23.2',
  weightLbs: '294',
};

/** Width × depth, the floor or wall span a host actually plans around. */
function footprint(dims: PublishedDimensions): string {
  return `${dims.widthIn}" × ${dims.depthIn}"`;
}

export function formatDimensions(dims: PublishedDimensions): string {
  return `${dims.widthIn}" W × ${dims.heightIn}" H × ${dims.depthIn}" D`;
}

export function formatWeight(dims: PublishedDimensions): string {
  return `${dims.weightLbs} lbs`;
}

export const machineModels: MachineModel[] = [
  {
    slug: 'wall',
    name: 'Wall Mount',
    badge: 'Smallest footprint',
    placement: 'Wall mounted',
    summary: 'Hangs flat on the wall. Zero floor space.',
    description:
      'Hangs flat on the wall and takes zero floor space, which makes it the easy yes for counters, checkout lines, and tight entryways. Available in two sizes depending on how much selection you want.',
    specs: {
      modelName: 'VTM Slim Wall',
      cabinet: slimWallCabinet,
      space: `No floor space. Needs ${slimWallCabinet.widthIn}" of wall.`,
      sizeNote: `${slimWallCabinet.widthIn}" of wall`,
      power: slimWallPower,
      install: 'Hangs on a wall bracket anchored into studs or masonry.',
    },
    cutout: wallCutout,
    alt: 'Wall mounted Pokémon card vending machine with a touchscreen and card reader',
  },
  {
    slug: 'pedestal',
    name: 'Pedestal',
    badge: 'No wall needed',
    placement: 'Freestanding',
    summary: 'The same cabinet on a weighted stand. No drilling.',
    description:
      'The same cabinet on a weighted stand. For glass storefronts, brick, or leased space where drilling into the wall is not an option.',
    specs: {
      modelName: 'VTM Slim Wall on Universal Pedestal Stand',
      cabinet: slimWallCabinet,
      stand: pedestalStand,
      space: `${footprint(pedestalStand)} of floor, the width and depth of the stand.`,
      sizeNote: `About ${footprint(pedestalStand)} of floor`,
      power: slimWallPower,
      install: 'Locking wheels and lockable storage. It can be bolted down.',
    },
    cutout: pedestalCutout,
    alt: 'Pokémon card vending machine on a freestanding pedestal stand',
  },
  {
    slug: 'tower',
    name: 'Tower',
    badge: 'Highest visibility',
    placement: 'Freestanding',
    summary: 'Full height, big screen, up to 24 selections.',
    description:
      'A full-height tower with a large touchscreen and up to 24 selections. Built to be seen from across the room in arcades, lobbies, and open retail floors.',
    specs: {
      modelName: 'VTM Slim Tower 2.0',
      cabinet: towerCabinet,
      space: `About ${footprint(towerCabinet)} of floor.`,
      sizeNote: `About ${footprint(towerCabinet)} of floor`,
      power: {
        outlet: 'Standard 110V outlet',
        rating: '110VAC 60Hz, 80W',
      },
      install: 'Freestanding on locking casters.',
    },
    cutout: towerCutout,
    alt: 'Freestanding slim Pokémon card vending tower with a large touchscreen',
  },
];

function modelBySlug(slug: MachineModel['slug']): MachineModel {
  const model = machineModels.find((item) => item.slug === slug);
  if (!model) throw new Error(`Missing machine model: ${slug}`);
  return model;
}

/** Short lines for the host page "A few square feet" card. */
export function hostSpaceLines(): { name: string; space: string }[] {
  return (['wall', 'pedestal', 'tower'] as const).map((slug) => {
    const model = modelBySlug(slug);
    const space =
      slug === 'wall' ? model.specs.sizeNote : model.specs.sizeNote.replace(/^About /, 'about ');
    return { name: model.name, space };
  });
}

/** FAQ answer for "How much space does it take?" Uses the published figures only. */
export function machineSpaceAnswer(): string {
  const wall = modelBySlug('wall');
  const pedestal = modelBySlug('pedestal');
  const tower = modelBySlug('tower');
  const stand = pedestal.specs.stand;
  if (!stand) throw new Error('Pedestal stand specs are missing.');

  return [
    `It depends on the machine.`,
    `The ${wall.name} needs ${wall.specs.sizeNote} and no floor space (${formatDimensions(wall.specs.cabinet)}, ${formatWeight(wall.specs.cabinet)}).`,
    `The ${pedestal.name} is that same cabinet on a separate stand (${formatDimensions(stand)}, ${formatWeight(stand)}), so plan on ${pedestal.specs.sizeNote.replace(/^About /, 'about ')}.`,
    `The ${tower.name} is freestanding at ${formatDimensions(tower.specs.cabinet)}, ${formatWeight(tower.specs.cabinet)}, and needs ${tower.specs.sizeNote.replace(/^About /, 'about ')}.`,
    `All three plug into a normal 110V outlet.`,
  ].join(' ');
}
