# Асуултын сан

- `questions.json`: идэвхтэй 200 асуулт (H001–H200), English/Монгол.
- `archive/v1.json`: хуучин 18 асуулт. Хадгалсан түүхэд хэрэгтэй тул ID, дарааллыг бүү өөрчил.
- `families.json`: 50 decision family-ийн анхны жагсаалт. Үнэн эх нь `questions.json`.
- `COVERAGE.md`: domain, family, ID ба эх сурвалжийн mapping, хамрах хүрээний хязгаар.

Асуулт бүр дөрвөн сонголттой, нэг зөв хариулттай. `answer` нь хоёр хэлэнд ижил option index, `option_explanations` мөн тэр дарааллаар. `sources` нь тайлбарыг дэмжих баримт, `checked` шалгасан огноо, `difficulty` зохиогчийн үнэлгээ.
