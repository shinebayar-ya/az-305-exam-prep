import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { topicById } from '../content';
import { type Domain, domainLabels, domainOrder } from '../content/schema';
import { syllabus } from '../content/syllabus';
import { DomainIcon, TopicIcon } from '../icons/Icon';
import { NoteEditor } from '../notes/NoteEditor';
import { loadDocument } from '../storage';

export function TopicIndex() {
  // Topic ids with a non-empty note (dot on the card) and legacy domain notes from the old page.
  const [noted, setNoted] = useState<Set<string>>(new Set());
  const [legacy, setLegacy] = useState<Set<Domain>>(new Set());
  useEffect(() => {
    let active = true;
    const has = (id: string) =>
      loadDocument<string>(`topic:${id}`)
        .then((v) => !!v?.trim())
        .catch(() => false);
    void Promise.all(syllabus.map((t) => has(t.id))).then((r) => {
      if (active) setNoted(new Set(syllabus.filter((_, i) => r[i]).map((t) => t.id)));
    });
    void Promise.all(domainOrder.map(async (d) => (await has(d)) || has(`legacy-${d}`))).then(
      (r) => {
        if (active) setLegacy(new Set(domainOrder.filter((_, i) => r[i])));
      },
    );
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="t-index">
      <h1>Сэдэв ба тэмдэглэл</h1>
      <p className="t-lead">Зүйрлэл → цээжлэх түлхүүр → шалгалтын урхи → өөрийн тэмдэглэл.</p>
      {domainOrder.map((d) => (
        <div className="t-domain" key={d}>
          <h2>
            <DomainIcon domain={d} /> {domainLabels[d].title}
          </h2>
          <div className="t-grid">
            {syllabus
              .filter((t) => t.domain === d)
              .map((t) => {
                const topic = topicById[t.id];
                const body = (
                  <>
                    <TopicIcon id={t.id} size={40} />
                    <strong>{topic?.title ?? t.title}</strong>
                    <small>{topic?.tagline ?? 'Удахгүй нэмэгдэнэ'}</small>
                    {noted.has(t.id) && (
                      <span
                        className="t-dot"
                        role="img"
                        title="Тэмдэглэлтэй"
                        aria-label="Тэмдэглэлтэй"
                      />
                    )}
                  </>
                );
                return topic ? (
                  <Link key={t.id} className="t-card" to={`/topics#topic/${t.id}`}>
                    {body}
                  </Link>
                ) : (
                  <div key={t.id} className="t-card soon" aria-disabled="true">
                    {body}
                  </div>
                );
              })}
          </div>
          {legacy.has(d) && (
            <details className="t-legacy">
              <summary>Өмнөх тэмдэглэл</summary>
              <NoteEditor
                docId={`topic:legacy-${d}`}
                legacyFrom={`topic:${d}`}
                label="Өмнөх тэмдэглэл"
              />
            </details>
          )}
        </div>
      ))}
    </section>
  );
}
