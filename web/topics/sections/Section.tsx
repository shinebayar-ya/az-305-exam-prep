import type { ReactNode } from 'react';
import { SectionIcon } from '../../icons/Icon';
import type { SectionIconId } from '../../icons/registry';

/** Shared shell for detail-page sections; `id` doubles as the mini-TOC anchor. */
export function Section({
  id,
  title,
  tone,
  children,
}: {
  id: SectionIconId;
  title: string;
  tone?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`t-section${tone ? ` tone-${tone}` : ''}`}>
      <h2>
        <SectionIcon id={id} /> {title}
      </h2>
      {children}
    </section>
  );
}
