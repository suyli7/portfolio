const SG_TAG_SCF = 'science fiction';
const SG_TAG_FTS = 'fantasy';
const SG_TAG_MSR = 'mystery';
const SG_TAG_THL = 'thriller';
const SG_TAG_CRM = 'crime';
export const TAG_ALL = 'all';

export const TAGS_LIST = new Set([
  SG_TAG_SCF,
  SG_TAG_FTS,
  SG_TAG_MSR,
  SG_TAG_THL,
  SG_TAG_CRM
]);

export const SHELF_TAGS_MAP: Record<string, string> = {
  [TAG_ALL]: TAG_ALL,
  'sci-fi': SG_TAG_SCF,
  [SG_TAG_FTS]: SG_TAG_FTS,
  [SG_TAG_MSR]: SG_TAG_MSR,
  [SG_TAG_THL]: SG_TAG_THL,
  [SG_TAG_CRM]: SG_TAG_CRM
}