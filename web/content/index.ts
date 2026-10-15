/// <reference types="vite/client" />
import type { Topic } from './schema';

// Eager glob: adding content/topics/<id>.json is enough to publish a topic.
const modules = import.meta.glob<Topic>('../../content/topics/*.json', {
  eager: true,
  import: 'default',
});

export const topics: Topic[] = Object.values(modules).sort((a, b) => a.order - b.order);
export const topicById: Record<string, Topic> = Object.fromEntries(topics.map((t) => [t.id, t]));
