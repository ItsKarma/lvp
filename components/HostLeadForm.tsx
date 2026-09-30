'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FormspreeProvider, ValidationError, useForm } from '@formspree/react';
import { CheckCircle2 } from 'lucide-react';
import { trackLead } from '@/lib/analytics';

const FORMSPREE_PROJECT = process.env.NEXT_PUBLIC_FORMSPREE_PROJECT;

// Matches the form key in formspree.json.
const FORM_KEY = 'hostLead';

const ATTRIBUTION_PARAMS = [
  'fbclid',
  'gclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

const locationTypes = [
  'Bar / tavern / club',
  'Convenience store / bodega',
  'Laundromat',
  'Barbershop / salon',
  'Pizza shop / deli / restaurant',
  'Smoke / vape shop',
  'Arcade / family entertainment',
  'Gym / martial arts / rec center',
  'Car wash / auto shop',
  'Hotel / bowling / other',
];

const fieldClass =
  'w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-white placeholder:text-white/35 outline-none transition-colors focus:border-bolt focus:ring-2 focus:ring-bolt/25';
const labelClass = 'mb-2 block text-sm font-bold text-white/85';

interface HostLeadFormProps {
  /** Identifies which page or ad produced the lead. */
  source?: string;
  /** Shows the "did you run skill games" question. */
  skillGameContext?: boolean;
  submitLabel?: string;
}

function LeadForm({ source, skillGameContext, submitLabel }: Required<HostLeadFormProps>) {
  const searchParams = useSearchParams();

  const attribution: Record<string, string> = { source };
  for (const key of ATTRIBUTION_PARAMS) {
    const value = searchParams.get(key);
    if (value) attribution[key] = value;
  }

  const [state, handleSubmit] = useForm(FORM_KEY, { data: attribution });

  useEffect(() => {
    if (!state.succeeded) return;
    trackLead({ source, formName: FORM_KEY });
  }, [state.succeeded, source]);

  if (state.succeeded) {
    return (
      <div className="card-surface p-8 text-center">
        <CheckCircle2 size={44} className="mx-auto mb-4 text-mint" />
        <h3 className="display text-2xl text-white">You're on the list.</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-white/70">
          We will look at your location and get back to you within one business day with whether it
          is a fit and what the install would look like.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-6 md:p-8">
      {/* Honeypot: real users never see or fill this. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label className={labelClass} htmlFor="business">
          Business name
        </label>
        <input
          id="business"
          name="business"
          type="text"
          required
          autoComplete="organization"
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="location_type">
          What kind of location is it?
        </label>
        <select
          id="location_type"
          name="location_type"
          required
          defaultValue=""
          className={fieldClass}
        >
          <option value="" disabled>
            Select one
          </option>
          {locationTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {skillGameContext && (
        <div>
          <label className={labelClass} htmlFor="had_skill_games">
            Do you currently have skill games on site?
          </label>
          <select
            id="had_skill_games"
            name="had_skill_games"
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Yes, still running">Yes, still running</option>
            <option value="Yes, planning to remove">Yes, planning to remove them</option>
            <option value="Already removed">Already removed them</option>
            <option value="Never had them">Never had them</option>
          </select>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone <span className="font-normal text-white/45">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
        <ValidationError field="email" errors={state.errors} className="mt-2 text-sm font-bold text-flare" />
      </div>

      <div>
        <label className={labelClass} htmlFor="notes">
          Anything we should know? <span className="font-normal text-white/45">(optional)</span>
        </label>
        <textarea id="notes" name="notes" rows={3} className={fieldClass} />
      </div>

      <ValidationError
        errors={state.errors}
        className="rounded-xl bg-flare/15 px-4 py-3 text-sm font-bold text-flare"
      />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full rounded-xl bg-bolt px-6 py-4 text-sm font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-bolt-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.submitting ? 'Sending...' : submitLabel}
      </button>

      <p className="text-center text-xs text-white/45">
        No cost, no obligation, and no contract to look at your location.
      </p>
    </form>
  );
}

export default function HostLeadForm({
  source = 'site',
  skillGameContext = false,
  submitLabel = 'Check My Location',
}: HostLeadFormProps) {
  if (!FORMSPREE_PROJECT) {
    return (
      <div className="card-surface border-dashed p-8 text-center text-white/70">
        <p className="font-bold text-white">Form not configured.</p>
        <p className="mt-2 text-sm">
          Set <code className="font-mono text-bolt">NEXT_PUBLIC_FORMSPREE_PROJECT</code> to your
          Formspree project ID.
        </p>
      </div>
    );
  }

  return (
    <FormspreeProvider project={FORMSPREE_PROJECT}>
      <Suspense fallback={<div className="min-h-[620px]" />}>
        <LeadForm source={source} skillGameContext={skillGameContext} submitLabel={submitLabel} />
      </Suspense>
    </FormspreeProvider>
  );
}
