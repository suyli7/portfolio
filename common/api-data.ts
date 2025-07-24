import type { RichTextField, ImageField, LinkField } from '@prismicio/client';

export interface AboutDataModel {
  intro_primary: RichTextField;
  intro_secondary: RichTextField;
  intro_text: RichTextField;
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
  bulletin: RichTextField;
}

export interface PersonalDataModel {
  picture: ImageField,
  description: RichTextField
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

export interface MsData {
  attributes: Array<{ name: string, value: string }>;
  charImg: string;
  level: string;
  jobIcon: string;
  jobName: string;
}

export interface LastPlayedSong {
  artist: string;
  imgUrl: string;
  song: string;
  time: string;
  url: string;
}

export interface LastPlayedGame {
  name: string;
  imgUrl: string;
  lastPlayed: string;
  totalPlaytime: string;
  env: string;
}

export interface AssetImg {
  url: string;
  description: string;
}

export interface Book {
  name: string;
  author: string;
  imgUrl: string;
  bookUrl: string;
}

export type BookShelf = {
  current: Book[];
  recent: Book[];
  favorites: Book[];
}