export interface MachineLocation {
  /** URL path segment: /locations/<slug>. Give Google this full URL. */
  slug: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  /** Short line about where the machine sits inside the business. */
  placement?: string;
  /** Photo of the machine at this location. Drop the file in public/location-photos/ and update the path. */
  photo: string;
  photoAlt: string;
}

const placeholderPhoto = '/location-photos/placeholder.svg';

export const machineLocations: MachineLocation[] = [
  {
    slug: 'northampton-exxon',
    name: 'Northampton Exxon',
    street: '2428 Main St',
    city: 'Northampton',
    state: 'PA',
    postalCode: '18067',
    photo: '/location-photos/LVPNorthamptonExxon.jpeg',
    photoAlt: 'Pokémon card vending machine at Northampton Exxon',
  },
  {
    slug: 'hamilton-sunoco',
    name: 'Hamilton Sunoco',
    street: '2138 Hamilton St',
    city: 'Allentown',
    state: 'PA',
    postalCode: '18104',
    photo: '/location-photos/LVPHamiltonSunoco.jpeg',
    photoAlt: 'Pokémon card vending machine at Hamilton Sunoco',
  },
  {
    slug: 'lehigh-valley-barbershop-east',
    name: 'Lehigh Valley Barbershop East',
    street: '1320 Hanover Ave',
    city: 'Allentown',
    state: 'PA',
    postalCode: '18109',
    photo: '/location-photos/LVPBarbershopEast.jpeg',
    photoAlt: 'Pokémon card vending machine at Lehigh Valley Barbershop East',
  },
  {
    slug: 'here-and-gone',
    name: 'Here & Gone Cards and Collectibles',
    street: '14 E 21st St',
    city: 'Northampton',
    state: 'PA',
    postalCode: '18067',
    photo: placeholderPhoto,
    photoAlt: 'Pokémon card vending machine at Here & Gone Cards and Collectibles',
  },
  {
    slug: 'lehigh-valley-international-airport',
    name: 'Lehigh Valley International Airport (ABE)',
    street: '3311 Airport Rd',
    city: 'Allentown',
    state: 'PA',
    postalCode: '18109',
    placement: 'Inside the terminal.',
    photo: placeholderPhoto,
    photoAlt: 'Pokémon card vending machine at Lehigh Valley International Airport',
  },
];

export function getMachineLocation(slug: string) {
  return machineLocations.find((location) => location.slug === slug);
}

export function formatAddress(location: MachineLocation) {
  return `${location.street}, ${location.city}, ${location.state} ${location.postalCode}`;
}

/** Name plus address, so Google Maps pins the business rather than just the street address. */
function mapsQuery(location: MachineLocation) {
  return encodeURIComponent(`${location.name}, ${formatAddress(location)}`);
}

/** Keyless Google Maps embed URL for an iframe. */
export function mapEmbedUrl(location: MachineLocation) {
  return `https://maps.google.com/maps?q=${mapsQuery(location)}&z=15&output=embed`;
}

export function directionsUrl(location: MachineLocation) {
  return `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery(location)}`;
}
