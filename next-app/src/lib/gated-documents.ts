export interface GatedDocument {
  filename: string;
  displayName: string;
}

export const GATED_DOCUMENTS: Record<string, GatedDocument> = {
  "purplesoc-datasheet": {
    filename: "PurpleSOC Datasheet.pdf",
    displayName: "PurpleSOC Datasheet",
  },
};
