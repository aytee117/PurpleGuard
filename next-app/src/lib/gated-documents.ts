import { egyptThreatIntelH1_2026 } from "./reports/egypt-threat-intel-h1-2026";

export interface GatedDocument {
  filename: string;
  displayName: string;
}

export const GATED_DOCUMENTS: Record<string, GatedDocument> = {
  "purplesoc-datasheet": {
    filename: "PurpleSOC Datasheet.pdf",
    displayName: "PurpleSOC Datasheet",
  },
  // Filenames sourced from src/lib/reports/egypt-threat-intel-h1-2026.ts — still placeholders
  // until a real PDF is supplied (see "project deliverables.md" #3). The download route will
  // 404 until matching files exist in private-documents/.
  "egypt-threat-intel-report-h1-2026-en": {
    filename: egyptThreatIntelH1_2026.documentFilename.en,
    displayName: "Egypt Threat Intelligence Report — H1 2026",
  },
  "egypt-threat-intel-report-h1-2026-ar": {
    filename: egyptThreatIntelH1_2026.documentFilename.ar,
    displayName: "تقرير استخبارات التهديدات - مصر - النصف الأول 2026",
  },
};
