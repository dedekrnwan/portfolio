"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Send } from "lucide-react";

type ContactFormProps = {
  email: string;
};

export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = name.trim() && sender.trim() && message.trim();
  const clampedMessage = useMemo(() => message.slice(0, 500), [message]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${sender}\n\n${clampedMessage}`,
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form className="relative flex w-full flex-col" onSubmit={handleSubmit}>
      <div className="block items-center justify-center gap-4 text-left md:flex">
        <label className="w-full text-left text-sm font-bold tracking-wide text-neutral-700 dark:text-neutral-300">
          Name<span className="cursor-help text-red-500">*</span>
          <input
            className="my-2 w-full rounded-lg border border-neutral-300 p-2 font-normal text-neutral-800 outline-0 duration-200 focus:border-blue-600 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:focus:border-neutral-700"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="w-full text-left text-sm font-bold tracking-wide text-neutral-700 dark:text-neutral-300">
          Email<span className="cursor-help text-red-500">*</span>
          <input
            className="my-2 w-full rounded-lg border border-neutral-300 p-2 font-normal text-neutral-800 outline-0 duration-200 focus:border-blue-600 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:focus:border-neutral-700"
            type="email"
            placeholder="john@doe.com"
            value={sender}
            onChange={(event) => setSender(event.target.value)}
          />
        </label>
      </div>

      <div className="mt-2 flex w-full flex-col items-center justify-center gap-1.5">
        <label className="w-full text-left text-sm font-bold tracking-wide text-neutral-700 dark:text-neutral-300">
          Message<span className="cursor-help text-red-500">*</span>
          <textarea
            className="mt-2 min-h-24 w-full rounded-lg border border-neutral-300 p-2 font-normal text-neutral-800 outline-0 duration-200 focus:border-blue-600 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:focus:border-neutral-700"
            placeholder="Hello there, I would like to ask you about..."
            value={clampedMessage}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>
        <span className="ml-auto text-xs text-neutral-700 opacity-50 dark:text-neutral-300">
          {clampedMessage.length}/500 characters
        </span>
      </div>

      <button
        className="group ml-auto mt-4 flex w-fit items-center rounded-md bg-neutral-200 px-4 py-2 font-medium text-neutral-700 duration-200 hover:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
        type="submit"
        disabled={!canSubmit}
      >
        <Send className="mr-2 size-4" />
        Send
      </button>

      {sent ? (
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
          Your email client should open now. If it does not, write to{" "}
          <a className="font-semibold underline" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-4 rounded-2xl border border-black/5 bg-black/[0.03] p-4 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300">
        Replies usually cover architecture reviews, contract roles, product builds, and technical leadership support.
        <ArrowRight className="ml-2 inline size-4" />
      </div>
    </form>
  );
}
