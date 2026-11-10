import type { StaticImageData } from 'next/image';
import pedestalCutout from '@/public/machines/pedestal.png';
import towerCutout from '@/public/machines/tower.png';
import wallCutout from '@/public/machines/wall.png';

export interface MachineModel {
  slug: 'wall' | 'pedestal' | 'tower';
  name: string;
  badge: string;
  placement: string;
  /** One line for compact cards (host page). */
  summary: string;
  description: string;
  /** Transparent cut-out, trimmed to the machine's edges so models line up on a shared floor. */
  cutout: StaticImageData;
  alt: string;
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
    cutout: towerCutout,
    alt: 'Freestanding slim Pokémon card vending tower with a large touchscreen',
  },
];
