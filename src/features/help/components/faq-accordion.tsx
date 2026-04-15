import type { FaqItem } from "@/features/help/types/faq.types";

type FaqAccordionProps = {
  items: FaqItem[];
};

export const FaqAccordion = ({ items }: FaqAccordionProps) => {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item) => (
        <details
          key={item.id}
          className="group px-4 py-4 sm:px-6 sm:py-5"
        >
          <summary className="cursor-pointer list-none text-left text-base font-semibold tracking-tight text-ink marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-3">
              <span>{item.question}</span>
              <span
                className="mt-0.5 shrink-0 text-subtle transition-transform group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
};
