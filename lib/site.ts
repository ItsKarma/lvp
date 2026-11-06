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
  skillGameDeadlineLabel: 'October 13, 2026',
} as const;

/** Referral program numbers. Change them here and /referral updates everywhere. */
export const referralConfig = {
  /** Paid once a location passes the trial (siteConfig.trialDays) and both sides keep the machine. */
  trialPayout: 200,
  /** Paid if the location is still active retentionDays after install. */
  retentionBonus: 100,
  retentionDays: 60,
  /** Paid if the location grosses over salesBonusThreshold in its first salesBonusDays. */
  salesBonus: 200,
  salesBonusThreshold: 5000,
  salesBonusDays: 90,
} as const;
