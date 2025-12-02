import { IconNameType, TThemeColors } from '@/assets/styles/theme';
import moment from 'moment';
import { create } from 'zustand';

export interface SymptomTag {
    id: string;
    name: string;
    icon: IconNameType;
    color: TThemeColors;
    category?: 'response';
    isSystem?: boolean;
}

export interface SymptomSection {
    id: string;
    title: string;
    taggable: boolean;
    description?: string;
    tags: SymptomTag[];
    color?: TThemeColors;
}

// You can make these two journal entry types better with & or extends
export interface IJournalEntry {
    timestamp: string;
    intensity: IIntensity,
    eventTags: SymptomTag[]
}

export interface ICondensedJournalEntry {
    timestamp: string;
    intensity: IIntensity,
    eventTags: { id: string }[]
}
export interface JournalEntryStore {
    eventTags: Map<string, SymptomTag>;
    intensity: IIntensity;
    addEventTag: (tag: SymptomTag) => void;
    deleteEventTag: (tag: SymptomTag) => void;
    setIntensity: (intensity: IIntensity) => void;
    getJournalEntry: () => IJournalEntry;
    getCondensedJournalEntry: () => ICondensedJournalEntry;
    clearJournalEntry: () => void;
}

export type TIntensityMethod = 'color_slider' | undefined;

export interface IIntensity {
    intensityMethod: TIntensityMethod;
    intensityValue: number;
    intensityRating: string;
}


const useJournalState = create<JournalEntryStore>((set, get) => ({
    eventTags: new Map(),
    intensity: {
        intensityMethod: undefined,
        intensityValue: 0,
        intensityRating: ''
    },
    getJournalEntry: () => {
        const entry: IJournalEntry = {
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
            eventTags: Array.from(get().eventTags.entries()).map(([key, value]) => value),
            intensity: get().intensity
        };
        return entry;
    },
    getCondensedJournalEntry: () => {
        const entry: ICondensedJournalEntry = {
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
            eventTags: Array.from(get().eventTags.entries()).map(([key, value]) => ({id: value.id})),
            intensity: get().intensity
        };
        return entry;
    },
    addEventTag: (tag: SymptomTag) => {
        set((state) => ({
            eventTags: state.eventTags.set(JSON.stringify(tag), tag)
        }));
    },
    deleteEventTag: (tag: SymptomTag) => {
        set((state) => {
            const eventTags = state.eventTags;
            eventTags.delete(JSON.stringify(tag));
            return {
                eventTags
            };
        });
    },
    setIntensity: (intensity: IIntensity) => {
        set(() => ({
            intensity
        }))
    },
    clearJournalEntry: () => {
        set(() => ({
            eventTags: new Map(),
            intensity: {
                intensityMethod: undefined,
                intensityValue: 0,
                intensityRating: ''
            }
        }))
    }
}));

export { useJournalState };

