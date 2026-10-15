import { BookOpen, ChevronRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import sourceData from '../materials/sources.json';
import questions from '../questions/questions.json';
import { topicById } from './content';
import { domainLabels, domainOrder } from './content/schema';
import { syllabus } from './content/syllabus';
import { DomainIcon, TopicIcon } from './icons/Icon';

const sources: Record<string, { title: string; url: string; topic: string }> = sourceData;

// Module (domain) → topic → sources; each source names its topic in materials/sources.json.
const groups = domainOrder
  .map((d) => ({
    domain: d,
    topics: syllabus
      .filter((t) => t.domain === d)
      .map((t) => ({
        ...t,
        title: topicById[t.id]?.title ?? t.title,
        items: Object.entries(sources).filter(([, s]) => s.topic === t.id),
      }))
      .filter((t) => t.items.length),
  }))
  .filter((g) => g.topics.length);
const allTopicIds = groups.flatMap((g) => g.topics.map((t) => t.id));

export function Materials() {
  const [open, setOpen] = useState<Set<string>>(new Set());
  // Native <details> toggling (click, Enter, Space) drives state; `open` prop drives expand/collapse all.
  const sync = (id: string, isOpen: boolean) =>
    setOpen((prev) => {
      if (prev.has(id) === isOpen) return prev;
      const n = new Set(prev);
      if (isOpen) n.add(id);
      else n.delete(id);
      return n;
    });
  return (
    <article>
      <h2>Эх сурвалжийн сан</h2>
      <p>Анхдагч Microsoft Learn баримтууд · шалгасан 2026-10-15</p>
      <a
        href="https://learn.microsoft.com/en-us/training/courses/az-305t00"
        target="_blank"
        rel="noreferrer"
      >
        Үндсэн AZ-305T00-A сургалт ↗
      </a>
      <p>
        <a
          href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-305"
          target="_blank"
          rel="noreferrer"
        >
          AZ-305 study guide ↗
        </a>
      </p>
      <div className="mat-bar">
        <button
          type="button"
          className="outline secondary"
          onClick={() => setOpen(new Set(allTopicIds))}
        >
          Бүгдийг дэлгэх
        </button>
        <button type="button" className="outline secondary" onClick={() => setOpen(new Set())}>
          Бүгдийг хураах
        </button>
      </div>
      {groups.map((g) => (
        <section className="t-domain" key={g.domain} aria-labelledby={`mat-${g.domain}`}>
          <h2 id={`mat-${g.domain}`}>
            <DomainIcon domain={g.domain} /> {domainLabels[g.domain].title}{' '}
            <small>{g.topics.reduce((n, t) => n + t.items.length, 0)}</small>
          </h2>
          {g.topics.map((t) => (
            <details
              className="mat-topic"
              key={t.id}
              open={open.has(t.id)}
              onToggle={(e) => sync(t.id, e.currentTarget.open)}
            >
              <summary>
                <ChevronRight size={16} className="mat-chev" aria-hidden="true" />
                <TopicIcon id={t.id} size={28} />
                <strong>{t.title}</strong>
                <small>{t.items.length}</small>
              </summary>
              <div className="source-grid">
                {t.items.map(([id, s]) => (
                  <a key={id} href={s.url} target="_blank" rel="noreferrer">
                    <BookOpen size={18} />
                    <span>
                      {s.title}
                      <small>
                        {questions
                          .filter((x) => x.source === id)
                          .map((x) => x.id)
                          .join(' · ')}
                      </small>
                    </span>
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </details>
          ))}
        </section>
      ))}
    </article>
  );
}
