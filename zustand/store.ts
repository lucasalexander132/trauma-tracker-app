import { TThemeColors } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'moment';
import { create } from 'zustand';

export interface MessageStore {
    message: string;
    count: number;
    otherVar: string;
    setMessage: (newMessage: string) => void;
}

const useMessageState = create<MessageStore>((set) => ({
    message: 'No Message Set',
    count: 0,
    otherVar: 'Hai!',
    setMessage: (newMessage: string) => set(() => ({ message: newMessage }))
}));

export interface SymptomTag {
    id: number;
    name: string;
    icon: keyof typeof Entypo.glyphMap;
    color: TThemeColors;
    category?: 'response';
    isSystem?: boolean;
}

export interface SymptomSection {
    id?: string;
    title: string;
    cantAddTag?: true;
    description?: string;
    tags: SymptomTag[];
    color?: TThemeColors;
}

export interface SymptomStore {
    symptoms: Map<string, SymptomSection>;
    addSymptomTag: (key: string, tag: SymptomTag) => void;
    getSymptomsAsArr: () => [string, SymptomSection][];
    loadInitialTagState: (tags: SymptomTag[]) => void;
}

export interface IJournalEntry {
    timestamp: string;
    intensity: IIntensity,
    eventTags: SymptomTag[]
}
export interface JournalEntryStore {
    eventTags: Map<string, SymptomTag>;
    intensity: IIntensity;
    addEventTag: (tag: SymptomTag) => void;
    deleteEventTag: (tag: SymptomTag) => void;
    setIntensity: (intensity: IIntensity) => void;
    getJournalEntry: () => IJournalEntry;
}

export type TIntensityMethod = 'color_slider' | undefined;

export interface IIntensity {
    intensityMethod: TIntensityMethod;
    intensityValue: number;
    intensityRating: number;
}

const symptomSections: SymptomSection[] = [{
        title: 'Trauma Responses',
        description: 'How are you responding?',
        cantAddTag: true,
        color: '--color-Dark-Garnet',
        tags: [
            {
                id: 1,
                name: 'Fight',
                icon: 'drop',
                color: '--color-Pumpkin',
                category: 'response',
                isSystem: true
            },
            {
                id: 2,
                name: 'Flight',
                icon: 'feather',
                color: '--color-Sunglow',
                category: 'response',
                isSystem: true
            },
            {
                id: 3,
                name: 'Freeze',
                icon: 'magnet',
                color: '--color-Charcoal',
                category: 'response',
                isSystem: true
            },
            {
                id: 4,
                name: 'Fawn',
                icon: 'heart',
                color: '--color-Olivine',
                category: 'response',
                isSystem: true
            }
        ]
    },{
        title: 'Emotions',
        description: 'What emotions are you feeling right now?',
        color: '--color-Olivine',
        tags: [
            {
                id: 5,
                name: 'Anxiety',
                icon: 'controller-fast-forward',
                color: '--color-Olivine',
            },
            {
                id: 6,
                name: 'Fear',
                icon: 'flash',
                color: '--color-Olivine',
            },
            {
                id: 7,
                name: 'Shame',
                icon: 'hand',
                color: '--color-Olivine',
            },
            {
                id: 8,
                name: 'Anger',
                icon: 'new',
                color: '--color-Olivine',
            },
            {
                id: 9,
                name: 'Sadness',
                icon: 'emoji-sad',
                color: '--color-Olivine',
            },
            {
                id: 10,
                name: 'Overwhelm',
                icon: 'tools',
                color: '--color-Olivine',
            },
            {
                id: 11,
                name: 'Numbness',
                icon: 'cloud',
                color: '--color-Olivine',
            },
            {
                id: 12,
                name: 'Confusion',
                icon: 'retweet',
                color: '--color-Olivine',
            }
    ]
    }, {
        title: 'Context',
        description: 'What do you see around you?',
        color: '--color-Sunglow',
        tags: [
            {
                id: 13,
                name: 'Social',
                icon: 'users',
                color: '--color-Sunglow',
            },
            {
                id: 14,
                name: 'Work',
                icon: 'briefcase',
                color: '--color-Sunglow',
            },
            {
                id: 15,
                name: 'Family',
                icon: 'home',
                color: '--color-Sunglow',
            },
            {
                id: 16,
                name: 'Alone',
                icon: 'user',
                color: '--color-Sunglow',
            },
            {
                id: 17,
                name: 'Public',
                icon: 'map',
                color: '--color-Sunglow',
            },
            {
                id: 18,
                name: 'Evening',
                icon: 'moon',
                color: '--color-Sunglow',
            },
            {
                id: 19,
                name: 'Morning',
                icon: 'adjust',
                color: '--color-Sunglow',
            }
        ]
    }, {
        title: 'Body',
        description: 'What do you feel in your body?',
        color: '--color-Charcoal',
        tags: [
            {
                id: 20,
                name: 'Head',
                icon: 'mask',
                color: '--color-Charcoal',
            },
            {
                id: 21,
                name: 'Eyes',
                icon: 'eye',
                color: '--color-Charcoal',
            },
            {
                id: 22,
                name: 'Mouth',
                icon: 'sound',
                color: '--color-Charcoal',
            },
            {
                id: 23,
                name: 'Throat',
                icon: 'scissors',
                color: '--color-Charcoal',
            },
            {
                id: 24,
                name: 'Neck',
                icon: 'user',
                color: '--color-Charcoal',
            },
            {
                id: 25,
                name: 'Shoulders',
                icon: 'remove-user',
                color: '--color-Charcoal',
            },
            {
                id: 26,
                name: 'Chest',
                icon: 'merge',
                color: '--color-Charcoal',
            },
            {
                id: 27,
                name: 'Stomach',
                icon: 'cake',
                color: '--color-Charcoal',
            },
            {
                id: 28,
                name: 'Arms',
                icon: 'flow-parallel',
                color: '--color-Charcoal',
            },
            {
                id: 29,
                name: 'Hands',
                icon: 'hand',
                color: '--color-Charcoal',
            },
            {
                id: 30,
                name: 'Hips',
                icon: 'hour-glass',
                color: '--color-Charcoal',
            },
            {
                id: 31,
                name: 'Legs',
                icon: 'shuffle',
                color: '--color-Charcoal',
            },
            {
                id: 32,
                name: 'Feet',
                icon: 'baidu',
                color: '--color-Charcoal',
            }
        ]
    }];

const useTagState = create<SymptomStore>((set, get) => ({
    symptoms: new Map(symptomSections.map((item: SymptomSection) => [item.title, item])),
    getSymptomsAsArr: () => Array.from(get().symptoms.entries()),
    addSymptomTag: (key: string, tag: SymptomTag) => {
        set((state) => {
            const section = state.symptoms.get(key);
            section?.tags.push(tag);
            if (section) {
                return {
                    symptoms: state.symptoms.set(key, section)
                }
            } else {
                return { }
            }
        })
    },
    loadInitialTagState: (tags: SymptomTag[]) => {
        const map = new Map();
        for (const tag of tags) {
            if (!map.get(tag.category)) {
                map.set(tag.category, [tag])
            } else {
                const mapTags = map.get(tag.category);
                mapTags.push(tag);
                map.set(tag.category, mapTags);
            }
        }
        console.log(map);
    }
}));

const useJournalState = create<JournalEntryStore>((set, get) => ({
    eventTags: new Map(),
    intensity: {
        intensityMethod: undefined,
        intensityValue: 0,
        intensityRating: 0
    },
    getJournalEntry: () => {
        const entry: IJournalEntry = {
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
            eventTags: Array.from(get().eventTags.entries()).map(([key, value]) => value),
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
    }
}));

export { useJournalState, useMessageState, useTagState };

