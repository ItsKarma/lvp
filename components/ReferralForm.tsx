'use client';

import { FormspreeProvider, ValidationError, useForm } from '@formspree/react';
import { CheckCircle2 } from 'lucide-react';
import { fieldClass, labelClass } from '@/components/HostLeadForm';

const FORMSPREE_PROJECT = process.env.NEXT_PUBLIC_FORMSPREE_PROJECT;

// Matches the form key in formspree.json.
const FORM_KEY = 'referral';

function Form() {
  const [state, handleSubmit] = useForm(FORM_KEY);

  if (state.succeeded) {
    return (
      <div className="card-surface p-8 text-center">
        <CheckCircle2 size={44} className="mx-auto mb-4 text-mint" />
        <h3 className="display text-2xl text-white">Thanks for the referral.</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-white/70">
          We will check whether the location is new to us and get back to you within one business
          day. Next step: introduce us to the owner or manager by name.
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Your phone <span className="font-normal text-white/45">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="email">
          Your email
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
        <label className={labelClass} htmlFor="business">
          Business name
        </label>
        <input id="business" name="business" type="text" required autoComplete="off" className={fieldClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="address">
          Business address
        </label>
        <input id="address" name="address" type="text" required autoComplete="off" className={fieldClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="contact_name">
            Owner or manager name
          </label>
          <input id="contact_name" name="contact_name" type="text" required autoComplete="off" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact_info">
            Their phone or email
          </label>
          <input id="contact_info" name="contact_info" type="text" required autoComplete="off" className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="relationship">
          How do you know them?
        </label>
        <input id="relationship" name="relationship" type="text" required autoComplete="off" className={fieldClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="owner_interested">
          Has the owner said they are interested?
        </label>
        <select
          id="owner_interested"
          name="owner_interested"
          required
          defaultValue=""
          className={fieldClass}
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="Yes">Yes, they are interested</option>
          <option value="Mentioned it">I mentioned it, but they have not decided</option>
          <option value="Not yet">I have not asked yet</option>
        </select>
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
        {state.submitting ? 'Sending...' : 'Send Referral'}
      </button>
    </form>
  );
}

export default function ReferralForm() {
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
      <Form />
    </FormspreeProvider>
  );
}
