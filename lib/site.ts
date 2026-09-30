export const siteConfig = {
  name: 'Lehigh Valley Pokémon',
  shortName: 'LV Pokémon',
  url: 'https://www.lehighvalleypokemon.com',
  domain: 'www.lehighvalleypokemon.com',
  parentCompany: 'LVP Vending',
  email: 'info@lvpvending.com',
  supportEmail: 'support@lvpvending.com',
  tagline: 'Pokémon card vending machines for Lehigh Valley businesses.',
  /** Share of gross sales paid to the location host. */
  revenueSharePercent: 10,
  trialDays: 30,
  averagePackPrice: 13,
  /** Final day of the Pennsylvania skill game grace period. */
  skillGameDeadline: '2026-10-13T23:59:59-04:00',
  skillGameDeadlineLabel: 'October 13, 2026',
} as const;
