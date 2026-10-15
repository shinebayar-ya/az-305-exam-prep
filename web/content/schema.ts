// Topic content schema. One JSON file per topic lives in content/topics/<id>.json.
// Every fact must cite a key from materials/sources.json (see tests/topics.test.mjs).
import type { SceneIconName } from '../icons/registry';
export type Domain = 'identity' | 'data' | 'continuity' | 'infrastructure';

export interface Topic {
  id: string;
  domain: Domain;
  order: number;
  title: string;
  tagline: string;
  /** ISO date the facts were checked against Microsoft Learn. */
  checked: string;
  /** Keys in materials/sources.json; also selects related practice questions. */
  sources: string[];
  analogy: { title: string; story: string; mapping: { real: string; azure: string }[] };
  illustration: { scene: SceneIconName[]; caption: string; image?: string | null };
  mnemonics: { device: string; parts: { key: string; meaning: string }[]; why: string }[];
  keyFacts: { text: string; source: string }[];
  compare?: { caption?: string; columns: string[]; rows: string[][] };
  examTraps: { trap: string; truth: string; phrase_en: string }[];
  vocabulary?: { en: string; mn: string }[];
}

export const domainLabels: Record<Domain, { title: string }> = {
  identity: { title: 'Identity, governance & monitoring' },
  data: { title: 'Data storage' },
  continuity: { title: 'Business continuity' },
  infrastructure: { title: 'Infrastructure' },
};
export const domainOrder = Object.keys(domainLabels) as Domain[];
