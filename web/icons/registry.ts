import {
  Archive,
  Bell,
  BookOpen,
  Brain,
  Building2,
  ChefHat,
  ClipboardList,
  Database,
  DoorOpen,
  Drama,
  Factory,
  Fingerprint,
  FlaskConical,
  Globe,
  KeyRound,
  Landmark,
  Languages,
  Library,
  LifeBuoy,
  Lock,
  type LucideIcon,
  Mailbox,
  Network,
  PenLine,
  Pin,
  Scale,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Tag,
  Target,
  Thermometer,
  Ticket,
  Timer,
  TriangleAlert,
  Truck,
  UserRound,
  Users,
  Utensils,
  Video,
  Warehouse,
  Waves,
} from 'lucide-react';
import type { Domain } from '../content/schema';
import availabilitySets from './azure/availability-sets.svg';
import azureMigrate from './azure/azure-migrate.svg';
import conditionalAccess from './azure/conditional-access.svg';
import cosmosDb from './azure/cosmos-db.svg';
import dataFactory from './azure/data-factory.svg';
import firewall from './azure/firewall.svg';
import frontDoor from './azure/front-door.svg';
import keyVault from './azure/key-vault.svg';
import managementGroups from './azure/management-groups.svg';
// Official Azure Architecture Icons, unmodified (see ./azure/SOURCE.md). Vite turns each import into a hashed asset URL.
import monitor from './azure/monitor.svg';
import recoveryVault from './azure/recovery-services-vault.svg';
import serviceBus from './azure/service-bus.svg';
import sqlDatabase from './azure/sql-database.svg';
import storageAccounts from './azure/storage-accounts.svg';
import virtualMachine from './azure/virtual-machine.svg';
import virtualNetworks from './azure/virtual-networks.svg';

/** Topic id → official Azure service icon. Keys must match the syllabus in TopicIndex.tsx. */
export const topicIcons = {
  monitoring: { src: monitor, label: 'Azure Monitor' },
  'authn-entra': { src: conditionalAccess, label: 'Conditional Access' },
  'authz-access': { src: keyVault, label: 'Key Vault' },
  governance: { src: managementGroups, label: 'Management groups' },
  relational: { src: sqlDatabase, label: 'Azure SQL Database' },
  'cosmos-db': { src: cosmosDb, label: 'Azure Cosmos DB' },
  storage: { src: storageAccounts, label: 'Storage accounts' },
  'data-integration': { src: dataFactory, label: 'Data Factory' },
  'backup-dr': { src: recoveryVault, label: 'Recovery Services vault' },
  'high-availability': { src: availabilitySets, label: 'Availability sets' },
  compute: { src: virtualMachine, label: 'Virtual machines' },
  'app-architecture': { src: serviceBus, label: 'Service Bus' },
  'network-connectivity': { src: virtualNetworks, label: 'Virtual networks' },
  'network-security': { src: firewall, label: 'Azure Firewall' },
  'load-balancing': { src: frontDoor, label: 'Front Door' },
  migration: { src: azureMigrate, label: 'Azure Migrate' },
} as const satisfies Record<string, { src: string; label: string }>;
export type TopicId = keyof typeof topicIcons;

/** Domain → Lucide icon + colour token (defined in topics.css). */
export const domainIcons: Record<Domain, { Icon: LucideIcon; tone: string }> = {
  identity: { Icon: ShieldCheck, tone: 'identity' },
  data: { Icon: Database, tone: 'data' },
  continuity: { Icon: LifeBuoy, tone: 'continuity' },
  infrastructure: { Icon: Network, tone: 'infra' },
};

/** Allowlist for illustration scenes. Explicit map (not `import *`) keeps tree-shaking working. Add names here when a scene needs a new Lucide icon. */
export const sceneIcons = {
  KeyRound,
  Archive,
  Building2,
  Mailbox,
  UserRound,
  Video,
  Bell,
  Thermometer,
  ClipboardList,
  DoorOpen,
  Smartphone,
  Fingerprint,
  Users,
  Ticket,
  Timer,
  Landmark,
  Tag,
  Lock,
  ChefHat,
  Utensils,
  Server,
  Database,
  Library,
  Globe,
  BookOpen,
  Truck,
  Factory,
  Warehouse,
  Waves,
  FlaskConical,
} satisfies Record<string, LucideIcon>;
export type SceneIconName = keyof typeof sceneIcons;

/** Detail-page section id → Lucide icon (section headings, mini-TOC, exam phrase). */
export const sectionIcons = {
  analogy: Drama,
  mnemonics: Brain,
  facts: Pin,
  compare: Scale,
  traps: TriangleAlert,
  vocabulary: Languages,
  practice: Target,
  sources: BookOpen,
  notes: PenLine,
  phrase: Search,
} satisfies Record<string, LucideIcon>;
export type SectionIconId = keyof typeof sectionIcons;
