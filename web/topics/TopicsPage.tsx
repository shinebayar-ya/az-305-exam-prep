import { useLocation } from 'react-router-dom';
import { topicById } from '../content';
import { TopicDetail } from './TopicDetail';
import { TopicIndex } from './TopicIndex';
import './topics.css';

/** Route lives in the URL hash (#topic/<id>) so reload and back/forward keep the open topic. */
export function TopicsPage() {
  const { hash } = useLocation();
  const id = /^#topic\/([\w-]+)$/.exec(hash)?.[1];
  const topic = id ? topicById[id] : undefined;
  return topic ? <TopicDetail topic={topic} /> : <TopicIndex />;
}
