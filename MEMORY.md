# Төслийн санамж

Батлагдсан шийдвэр ба одоогийн төлөв. Түүхийг git-ээс үз.

- Эхэлсэн: 2026-10-15. Үндсэн материал: Microsoft Learn AZ-305T00-A, study guide-ийн дөрвөн бүлэг.
- Fast Lane слайд, LevelUP rubric ирээгүй; онооны шкал баталгаажаагүй. Local quiz-ийн хувь LevelUP оноотой шууд дүйхгүй.
- Хэрэглэгчийн бодит оролдлого, оноо хараахан бүртгэгдээгүй. QA/browser тестийн оноо бодит оролдлого биш.
- Асуултын сан: 200 (H001–H200), English/Монгол, 50 decision family. 112 hard / 88 standard нь зохиогчийн үнэлгээ, calibration хийгдээгүй. Хуучин 18 асуулт `questions/archive/v1.json`-д, Q01–Q18 ID-г өөрчлөхгүй.
- Хадгалалт: PGlite + IndexedDB, Web Worker, backend байхгүй. JSON export бий, import байхгүй. Төлөвлөгөө таб 2026-10-17-нд хасагдсан; түүний ахиц, check-in/settings өгөгдөл баазад болон export-д үлдсэн. "Ахиц татах" товч Sidebar-д.
- UI: 2026-10-17-нд Tailwind CSS v4 + shadcn/ui руу шилжсэн. Асуултын өгөгдөл, ID, storage key, DB schema өөрчлөгдөөгүй (`notes/UI-MIGRATION.md`).
- Сэдвийн хуудас: 16/16 сэдэв бичигдсэн (`content/topics/`).
- Хэрэглэгч хоёр хэлээр (English асуулт, Монгол тайлбар) суралцахыг хүссэн.
- Хэрэглэгч Playwright/browser шалгалтыг хэмнэхийг хүссэн (2026-10-16).
