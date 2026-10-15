import type { Domain } from './schema';

// Full AZ-305 syllabus map. Topics without a content/topics/<id>.json file show as "coming soon".
export const syllabus: { id: string; domain: Domain; title: string }[] = [
  { id: 'monitoring', domain: 'identity', title: 'Logging & monitoring' },
  { id: 'authn-entra', domain: 'identity', title: 'Authentication (Entra ID)' },
  { id: 'authz-access', domain: 'identity', title: 'Authorization & secrets' },
  { id: 'governance', domain: 'identity', title: 'Governance' },
  { id: 'relational', domain: 'data', title: 'Relational data' },
  { id: 'cosmos-db', domain: 'data', title: 'Cosmos DB' },
  { id: 'storage', domain: 'data', title: 'Storage accounts' },
  { id: 'data-integration', domain: 'data', title: 'Data integration' },
  { id: 'backup-dr', domain: 'continuity', title: 'Backup & disaster recovery' },
  { id: 'high-availability', domain: 'continuity', title: 'High availability' },
  { id: 'compute', domain: 'infrastructure', title: 'Compute' },
  { id: 'app-architecture', domain: 'infrastructure', title: 'Application architecture' },
  { id: 'network-connectivity', domain: 'infrastructure', title: 'Network connectivity' },
  { id: 'network-security', domain: 'infrastructure', title: 'Network security' },
  { id: 'load-balancing', domain: 'infrastructure', title: 'Load balancing' },
  { id: 'migration', domain: 'infrastructure', title: 'Migration' },
];
