import { domainLabels, type Topic } from '../../content/schema';
import { DomainIcon, TopicIcon } from '../../icons/Icon';

export function Hero({ topic }: { topic: Topic }) {
  const domain = domainLabels[topic.domain];
  return (
    <header className="t-hero">
      <TopicIcon id={topic.id} size={64} />
      <div>
        <span className="t-chip">
          <DomainIcon domain={topic.domain} size={14} bare /> {domain.title}
        </span>
        <h1>{topic.title}</h1>
        <p className="t-tagline">{topic.tagline}</p>
        <small className="muted">Microsoft Learn-ээр шалгасан: {topic.checked}</small>
      </div>
    </header>
  );
}
