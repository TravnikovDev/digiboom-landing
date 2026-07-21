"use client";

import { useState } from "react";

const FORMSPREE_ACTION = "https://formspree.io/f/YOUR_FORM_ID";

export default function SignupForm({
  inputId,
  defaultNote,
  large = false,
  center = false,
}: {
  inputId: string;
  defaultNote: string;
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
  }

  const pad = large ? "py-4" : "py-3.5";

  return (
    <div className={center ? "mx-auto max-w-lg" : "max-w-md"}>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3" action={FORMSPREE_ACTION} method="POST">
        <label className="sr-only" htmlFor={inputId}>
          Email
        </label>
        <input
          id={inputId}
          required
          type="email"
          name="email"
          placeholder="you@yourstore.com"
          className={`flex-1 rounded-full bg-white border-[3px] border-ink px-5 ${pad} text-ink placeholder-bomb-500 font-medium focus:outline-none focus:ring-4 focus:ring-ink/30`}
        />
        <button
          type="submit"
          className={`rounded-full bg-ink text-white font-bold px-7 ${pad} border-[3px] border-ink comic-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all whitespace-nowrap`}
        >
          Get early access
        </button>
      </form>
      <p className="mt-3 text-white/90 text-sm">
        {state === "done" ? (
          <>
            <strong>You&apos;re on the list.</strong> We&apos;ll email you when the beta opens.
          </>
        ) : state === "error" ? (
          "That didn't go through — try again in a minute."
        ) : (
          defaultNote
        )}
      </p>
    </div>
  );
}
