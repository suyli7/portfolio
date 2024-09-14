import type { RichTextField, ImageField, LinkField } from '@prismicio/client';
import { BorderColor, TextColor, TextSize, TextVariant } from './namespaces';

export type BorderColorType = `${BorderColor}`;
export type TextColorType = `${TextColor}`;
export type TextSizeType = `${TextSize}`;
export type TextVariantType = `${TextVariant}`;

export interface AboutDataModel {
  intro_primary: RichTextField;
  intro_secondary: RichTextField;
  intro_text: RichTextField;
  profile_pic: ImageField;
  connect_header: string;
  experience: Array<{
    org: string;
    role: string;
    duration: string;
    description: RichTextField
  }>;
  links: Array<{
    link_name: string;
    link: string;
  }>;
  languages: string;
  tools: string;
  frameworks: string;
}

export interface CaseStudyDataModel {
    body: [] //TBD for slices
    context: string;
    cover: ImageField;
    is_case_study: boolean;
    name: string;
    role: string;
    tags: string;
    timeframe: string;
    website: LinkField;
}