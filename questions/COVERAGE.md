# 200 асуултын хамрах хүрээ

Шинэчилсэн: 2026-10-16. Эдгээр нь өөрсдийн дадлагын асуулт; албан ёсны exam асуулт биш.

| Бүлэг | Асуулт | Decision family |
|---|---:|---:|
| identity | 56 | 14 |
| data | 44 | 11 |
| continuity | 36 | 9 |
| infrastructure | 64 | 16 |

## Decision families

| Family | IDs | Эх сурвалж |
|---|---|---|
| access-scope | H001, H002, H003, H004 | [rbac](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview) |
| resource-controls | H005, H006, H007, H008 | [policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview) · [rbac](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview) |
| identity-lifecycle | H009, H010, H011, H012 | [pim](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure) · [reviews](https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview) · [entitlement](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview) · [conditional](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview) |
| hybrid-auth | H013, H014, H015, H016 | [hybrid](https://learn.microsoft.com/en-us/entra/identity/hybrid/choose-ad-authn) |
| workload-credentials | H017, H018, H019, H020 | [identity](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) · [workload](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation) |
| observability-signals | H021, H022, H023, H024 | [monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/data-platform) |
| log-destinations | H025, H026, H027, H028 | [diagnostics](https://learn.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings) |
| alert-choice | H029, H030, H031, H032 | [alerts](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-types) |
| governance-hierarchy | H033, H034, H035, H036 | [policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview) · [rbac](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview) |
| vault-content | H037, H038, H039, H040 | [vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) · [identity](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) · [rbac](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview) |
| review-versus-activation | H041, H042, H043, H044 | [reviews](https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview) · [pim](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure) · [entitlement](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview) · [conditional](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview) |
| policy-effects | H045, H046, H047, H048 | [policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview) |
| access-plane | H049, H050, H051, H052 | [rbacdata](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage) |
| monitoring-tool | H053, H054, H055, H056 | [logs](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview) · [monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/data-platform) · [workbooks](https://learn.microsoft.com/en-us/azure/azure-monitor/visualize/workbooks-overview) · [appinsights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview) |
| sql-platform | H057, H058, H059, H060 | [sqlchoose](https://learn.microsoft.com/en-us/azure/azure-sql/azure-sql-iaas-vs-paas-what-is-overview) · [pool](https://learn.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview) · [mi](https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview) |
| sql-compute | H061, H062, H063, H064 | [serverless](https://learn.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview) · [sqlchoose](https://learn.microsoft.com/en-us/azure/azure-sql/azure-sql-iaas-vs-paas-what-is-overview) |
| consistency-guarantees | H065, H066, H067, H068 | [cosmos](https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels) |
| cosmos-ordering | H069, H070, H071, H072 | [cosmos](https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels) |
| blob-access-tier | H073, H074, H075, H076 | [blobtiers](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview) |
| storage-shape | H077, H078, H079, H080 | [files](https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction) |
| data-model | H081, H082, H083, H084 | [datachoice](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/data-store-overview) |
| integration-pipeline | H085, H086, H087, H088 | [adf](https://learn.microsoft.com/en-us/azure/data-factory/introduction) · [runtime](https://learn.microsoft.com/en-us/azure/data-factory/create-self-hosted-integration-runtime) · [messaging](https://learn.microsoft.com/en-us/azure/service-bus-messaging/compare-messaging-services) · [stream](https://learn.microsoft.com/en-us/azure/stream-analytics/stream-analytics-introduction) |
| partitioning | H089, H090, H091, H092 | [partition](https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning-overview) |
| data-retention | H093, H094, H095, H096 | [blobprotect](https://learn.microsoft.com/en-us/azure/storage/blobs/data-protection-overview) · [redundancy](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) |
| cache-decisions | H097, H098, H099, H100 | [cache](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside) |
| storage-failure-domain | H101, H102, H103, H104 | [redundancy](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) |
| secondary-read | H105, H106, H107, H108 | [redundancy](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) |
| recovery-objectives | H109, H110, H111, H112 | [asr](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview) · [sqlha](https://learn.microsoft.com/en-us/azure/azure-sql/database/business-continuity-high-availability-disaster-recover-hadr-overview) |
| backup-versus-dr | H113, H114, H115, H116 | [backup](https://learn.microsoft.com/en-us/azure/backup/backup-overview) · [asr](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview) · [sqlha](https://learn.microsoft.com/en-us/azure/azure-sql/database/business-continuity-high-availability-disaster-recover-hadr-overview) |
| sql-recovery | H117, H118, H119, H120 | [sqlha](https://learn.microsoft.com/en-us/azure/azure-sql/database/business-continuity-high-availability-disaster-recover-hadr-overview) · [sqlbackup](https://learn.microsoft.com/en-us/azure/azure-sql/database/automated-backups-overview) |
| dr-validation | H121, H122, H123, H124 | [asr](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview) |
| logical-data-protection | H125, H126, H127, H128 | [blobprotect](https://learn.microsoft.com/en-us/azure/storage/blobs/data-protection-overview) · [redundancy](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) |
| redundancy-limits | H129, H130, H131, H132 | [redundancy](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) · [blobprotect](https://learn.microsoft.com/en-us/azure/storage/blobs/data-protection-overview) |
| availability-design | H133, H134, H135, H136 | [sqlha](https://learn.microsoft.com/en-us/azure/azure-sql/database/business-continuity-high-availability-disaster-recover-hadr-overview) |
| traffic-layer | H137, H138, H139, H140 | [routing](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/load-balancing-overview) |
| private-connectivity | H141, H142, H143, H144 | [private](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview) · [endpoints](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview) · [network](https://learn.microsoft.com/en-us/azure/architecture/networking/architecture/hub-spoke) · [vpn](https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways) |
| hybrid-link | H145, H146, H147, H148 | [express](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction) · [vpn](https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways) · [network](https://learn.microsoft.com/en-us/azure/architecture/networking/architecture/hub-spoke) |
| network-topology | H149, H150, H151, H152 | [network](https://learn.microsoft.com/en-us/azure/architecture/networking/architecture/hub-spoke) |
| compute-control | H153, H154, H155, H156 | [compute](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree) |
| compute-workload | H157, H158, H159, H160 | [compute](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree) |
| messaging-choice | H161, H162, H163, H164 | [messaging](https://learn.microsoft.com/en-us/azure/service-bus-messaging/compare-messaging-services) |
| messaging-features | H165, H166, H167, H168 | [sessions](https://learn.microsoft.com/en-us/azure/service-bus-messaging/message-sessions) · [duplicates](https://learn.microsoft.com/en-us/azure/service-bus-messaging/duplicate-detection) · [dlq](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues) · [filters](https://learn.microsoft.com/en-us/azure/service-bus-messaging/topic-filters) |
| application-integration | H169, H170, H171, H172 | [logic](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) · [apim](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts) · [messaging](https://learn.microsoft.com/en-us/azure/service-bus-messaging/compare-messaging-services) |
| migration-path | H173, H174, H175, H176 | [migrationstrategy](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/plan/select-cloud-migration-strategy) |
| migration-assessment | H177, H178, H179, H180 | [migrate](https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview) |
| egress-security | H181, H182, H183, H184 | [firewall](https://learn.microsoft.com/en-us/azure/firewall/overview) · [nat](https://learn.microsoft.com/en-us/azure/nat-gateway/nat-overview) · [nsg](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview) · [waf](https://learn.microsoft.com/en-us/azure/web-application-firewall/overview) |
| dns-routing | H185, H186, H187, H188 | [tm](https://learn.microsoft.com/en-us/azure/traffic-manager/traffic-manager-routing-methods) |
| resilience-patterns | H189, H190, H191, H192 | [patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/) |
| api-gateway-controls | H193, H194, H195, H196 | [apimpolicies](https://learn.microsoft.com/en-us/azure/api-management/api-management-policies) · [apim](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts) |
| scaling-decision | H197, H198, H199, H200 | [autoscale](https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-overview) |

## Үнэлгээний хязгаар

- Hard: 112 асуулт, standard: 88. Энэ нь зохиогчийн үнэлгээ, статистикаар calibration хийсэн хүндрэл биш.
- Бүлэг бүр өөр шаардлагаар өөр зөв сонголттой дөрвөн scenario агуулна. 200 асуулт нь 200 бие даасан skill биш.
- Бүх дөрвөн үндсэн domain хамрагдсан; official study guide-ийн bullet бүрийг exhaustive хамарсан гэж үзэхгүй.
- Дараахийг дараагийн content review-д нягтлах: SQL service tiers, data encryption/access design, on-prem authorization, migration tool selection-ийн нарийвчилсан scenario.
- Шалгах горим шууд feedback нууж, шинэ багц хариулаагүй ID-г түрүүлнэ. Тусдаа битүү holdout dataset болон psychometric calibration байхгүй.
- Техникийн эх сурвалжийн холбоос/огноо, EN/MN, сонголт тус бүрийн тайлбар бий; bilingual агуулгыг хараат бус мэргэжлийн reviewer хянаагүй.
