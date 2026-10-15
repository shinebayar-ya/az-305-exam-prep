import type { Domain } from '../content/schema';
import {
  domainIcons,
  type SceneIconName,
  type SectionIconId,
  sceneIcons,
  sectionIcons,
  topicIcons,
} from './registry';

/** Official Azure service icon inside a neutral tile. Decorative: the title already names the topic. Rendered as <img> so gradient ids never collide and the SVG stays unmodified. */
export function TopicIcon({ id, size = 40 }: { id: string; size?: number }) {
  const entry = (topicIcons as Record<string, { src: string }>)[id];
  if (!entry) return null;
  return (
    <span
      className="t-icon-tile t-icon-neutral"
      style={{ inlineSize: size + 16, blockSize: size + 16 }}
    >
      <img src={entry.src} width={size} height={size} alt="" aria-hidden="true" draggable={false} />
    </span>
  );
}

/** Lucide domain icon on a tinted tile. `bare` drops the tile for inline use (chips). */
export function DomainIcon({
  domain,
  size = 20,
  bare = false,
}: {
  domain: Domain;
  size?: number;
  bare?: boolean;
}) {
  const { Icon, tone } = domainIcons[domain];
  const icon = <Icon size={size} strokeWidth={1.75} aria-hidden="true" />;
  return bare ? (
    <span className={`t-icon-bare t-tone-${tone}`}>{icon}</span>
  ) : (
    <span className={`t-icon-tile t-tone-${tone}`}>{icon}</span>
  );
}

export function SceneIcon({ name }: { name: SceneIconName }) {
  const Icon = sceneIcons[name];
  return (
    <span className="t-icon-tile t-tone-identity t-scene-tile">
      <Icon size={32} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

export function SectionIcon({ id, size = 20 }: { id: SectionIconId; size?: number }) {
  const Icon = sectionIcons[id];
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" />;
}
