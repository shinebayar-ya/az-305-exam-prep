import type { Topic } from '../../content/schema';
import { SceneIcon } from '../../icons/Icon';

/** Lucide icon-tile scene; set `image` in the topic JSON to swap in a real illustration. */
export function Illustration({ illustration }: { illustration: Topic['illustration'] }) {
  return (
    <figure className="t-illustration">
      {illustration.image ? (
        <img src={illustration.image} alt={illustration.caption} />
      ) : (
        <div className="t-scene" role="img" aria-label={illustration.caption}>
          {illustration.scene.map((n, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static scene; the same icon may appear twice.
            <SceneIcon key={i} name={n} />
          ))}
        </div>
      )}
      <figcaption>{illustration.caption}</figcaption>
    </figure>
  );
}
