import { BorderColor, TextColor, TextSize, TextVariant } from './namespaces';
import type {
    AboutDataModel,
    CaseStudyDataModel,
    BookShelf,
    LastPlayedGame,
    LastPlayedSong,
    Metadata,
    MsData,
    PersonalDataModel,
    AssetImg,
} from '../../common/api-data';

export interface AppState {
    loadState?: Record<string, boolean>;
    pageReady?: boolean;
    about?: AboutDataModel;
    books?: BookShelf;
    caseStudies?: CaseStudyDataModel[];
    personal?: PersonalDataModel;
    metadata: Metadata;
    msData?: MsData;
    lastPlayedGames?: LastPlayedGame[];
    lastPlayedSong?: LastPlayedSong;
    favImgs?: AssetImg[];
    favImgIndex?: number;
}


export type BorderColorType = `${BorderColor}`;
export type TextColorType = `${TextColor}`;
export type TextSizeType = `${TextSize}`;
export type TextVariantType = `${TextVariant}`;