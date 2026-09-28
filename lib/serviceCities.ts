export interface ServiceCity {
  name: string;
  slug: string;
  county: string;
  nearby: string[];
}

export const serviceCities: ServiceCity[] = [
  { name: 'Lehigh Valley', slug: 'lehigh-valley-pa', county: 'Lehigh and Northampton Counties', nearby: ['Allentown', 'Bethlehem', 'Easton'] },
  { name: 'Allentown', slug: 'allentown-pa', county: 'Lehigh County', nearby: ['Whitehall', 'Emmaus', 'South Whitehall'] },
  { name: 'Bethlehem', slug: 'bethlehem-pa', county: 'Lehigh and Northampton County', nearby: ['Fountain Hill', 'Hellertown', 'Bethlehem Township'] },
  { name: 'Easton', slug: 'easton-pa', county: 'Northampton County', nearby: ['Palmer Township', 'Forks Township', 'Wilson'] },
  { name: 'Whitehall', slug: 'whitehall-pa', county: 'Lehigh County', nearby: ['Allentown', 'Catasauqua', 'Coplay'] },
  { name: 'Northampton', slug: 'northampton-pa', county: 'Northampton County', nearby: ['Coplay', 'Bath', 'Catasauqua'] },
  { name: 'Schnecksville', slug: 'schnecksville-pa', county: 'Lehigh County', nearby: ['North Whitehall', 'Orefield', 'South Whitehall'] },
  { name: 'Emmaus', slug: 'emmaus-pa', county: 'Lehigh County', nearby: ['Allentown', 'Macungie', 'Salisbury Township'] },
  { name: 'Macungie', slug: 'macungie-pa', county: 'Lehigh County', nearby: ['Lower Macungie', 'Emmaus', 'Trexlertown'] },
  { name: 'Trexlertown', slug: 'trexlertown-pa', county: 'Lehigh County', nearby: ['Upper Macungie', 'Breinigsville', 'Fogelsville'] },
  { name: 'Center Valley', slug: 'center-valley-pa', county: 'Lehigh County', nearby: ['Coopersburg', 'Bethlehem', 'Hellertown'] },
  { name: 'Coopersburg', slug: 'coopersburg-pa', county: 'Lehigh County', nearby: ['Center Valley', 'Emmaus', 'Hellertown'] },
  { name: 'Catasauqua', slug: 'catasauqua-pa', county: 'Lehigh County', nearby: ['Whitehall', 'Northampton', 'Hanover Township'] },
  { name: 'Coplay', slug: 'coplay-pa', county: 'Lehigh County', nearby: ['Whitehall', 'Northampton', 'Catasauqua'] },
  { name: 'Fountain Hill', slug: 'fountain-hill-pa', county: 'Lehigh County', nearby: ['Bethlehem', 'Salisbury Township', 'Hellertown'] },
  { name: 'Hellertown', slug: 'hellertown-pa', county: 'Northampton County', nearby: ['Bethlehem', 'Lower Saucon', 'Center Valley'] },
  { name: 'Nazareth', slug: 'nazareth-pa', county: 'Northampton County', nearby: ['Bath', 'Palmer Township', 'Bethlehem Township'] },
  { name: 'Bath', slug: 'bath-pa', county: 'Northampton County', nearby: ['Northampton', 'Nazareth', 'Catasauqua'] },
  { name: 'Palmer Township', slug: 'palmer-township-pa', county: 'Northampton County', nearby: ['Easton', 'Bethlehem Township', 'Forks Township'] },
  { name: 'Forks Township', slug: 'forks-township-pa', county: 'Northampton County', nearby: ['Easton', 'Palmer Township', 'Wilson'] },
  { name: 'Wilson', slug: 'wilson-pa', county: 'Northampton County', nearby: ['Easton', 'Palmer Township', 'Forks Township'] },
  { name: 'Hanover Township', slug: 'hanover-township-pa', county: 'Lehigh and Northampton County', nearby: ['Allentown', 'Bethlehem', 'Catasauqua'] },
  { name: 'Lower Macungie', slug: 'lower-macungie-pa', county: 'Lehigh County', nearby: ['Macungie', 'Emmaus', 'Trexlertown'] },
  { name: 'Upper Macungie', slug: 'upper-macungie-pa', county: 'Lehigh County', nearby: ['Trexlertown', 'Breinigsville', 'Fogelsville'] },
  { name: 'South Whitehall', slug: 'south-whitehall-pa', county: 'Lehigh County', nearby: ['Allentown', 'Whitehall', 'Schnecksville'] },
  { name: 'Salisbury Township', slug: 'salisbury-township-pa', county: 'Lehigh County', nearby: ['Allentown', 'Emmaus', 'Fountain Hill'] },
  { name: 'Bethlehem Township', slug: 'bethlehem-township-pa', county: 'Northampton County', nearby: ['Bethlehem', 'Palmer Township', 'Nazareth'] },
  { name: 'Lower Saucon', slug: 'lower-saucon-pa', county: 'Northampton County', nearby: ['Hellertown', 'Bethlehem', 'Center Valley'] },
  { name: 'Breinigsville', slug: 'breinigsville-pa', county: 'Lehigh County', nearby: ['Upper Macungie', 'Trexlertown', 'Fogelsville'] },
  { name: 'Fogelsville', slug: 'fogelsville-pa', county: 'Lehigh County', nearby: ['Upper Macungie', 'Trexlertown', 'Breinigsville'] },
];

export function getServiceCity(slug: string) {
  return serviceCities.find((city) => city.slug === slug);
}
