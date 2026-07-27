"use client";

import { useState } from "react";
import type { Messages } from "@/i18n/dictionaries";

const FORMSPREE_ACTION = "https://formspree.io/f/mvzebyqy";

export default function SignupForm({
  inputId,
  signup,
  defaultNote,
  buttonLabel,
  large = false,
  center = false,
}: {
  inputId: string;
  signup: Messages["signup"];
  defaultNote: string;
  buttonLabel: string;
  large?: boolean;
  center?: boolean;
}) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const configured = !FORMSPREE_ACTION.includes("YOUR_FORM_ID");
    if (configured) {
      try {
        const res = await fetch(FORMSPREE_ACTION, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error();
      } catch {
        setState("error");
        return;
      }
    }
    form.reset();
    setState("done");
    // the mascot celebrates — see components/Bomb3D.tsx
    window.dispatchEvent(new CustomEvent("digiboom:signup"));
  }

  const pad = large ? "py-4" : "py-3.5";

  return (
    <div className={center ? "mx-auto max-w-lg" : "max-w-md"}>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3" action={FORMSPREE_ACTION} method="POST">
        {/* which form on the page it came from */}
        <input type="hidden" name="source" value={inputId} />
        {/* subject line for the notification email Formspree sends */}
        <input type="hidden" name="_subject" value="New DigiBoom waitlist signup" />
        {/* honeypot: bots fill it, humans never see it */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <label className="sr-only" htmlFor={inputId}>
          {signup.emailLabel}
        </label>
        <input
          id={inputId}
          required
          type="email"
          name="email"
          placeholder={signup.placeholder}
          className={`flex-1 rounded-full bg-white border-[3px] border-ink px-5 ${pad} text-ink placeholder-bomb-500 font-medium focus:outline-none focus:ring-4 focus:ring-ink/30`}
        />
        <button
          type="submit"
          className={`rounded-full bg-ink text-white font-bold px-7 ${pad} border-[3px] border-ink comic-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all whitespace-nowrap`}
        >
          {buttonLabel}
        </button>
      </form>
      <p className="mt-3 text-ink text-sm font-medium" role="status">
        {state === "done" ? (
          <>
            <strong>{signup.successStrong}</strong> {signup.successRest}
          </>
        ) : state === "error" ? (
          signup.error
        ) : (
          defaultNote
        )}
      </p>
    </div>
  );
}
