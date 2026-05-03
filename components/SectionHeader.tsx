"use client";

import Reveal from "./Reveal";

export default function SectionHeader({
  index,
  kicker,
  title,
  description,
}: {
  index: string;
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-16 md:mb-24">
      <Reveal variant="fade">
        <div className="flex items-center gap-4 mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
          <span>{index}</span>
          <span className="h-px flex-1 max-w-[80px] bg-ink/15" />
          <span>{kicker}</span>
        </div>
      </Reveal>
      <Reveal variant="rise">
        <h2 className="font-display text-[clamp(2.2rem,5.6vw,4.8rem)] font-light leading-[0.95] tracking-[-0.03em] text-ink max-w-4xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal variant="rise" delay={0.1}>
          <p className="mt-6 max-w-2xl text-[15px] md:text-base text-ink-soft leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
