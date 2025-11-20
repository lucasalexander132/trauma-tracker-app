import { TThemeBaseColors } from '@/assets/styles/theme';
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
    name: string;
    icon: keyof typeof Entypo.glyphMap;
    color: TThemeBaseColors;
    category?: 'response';
    isSystem?: boolean;
}

export interface SymptomSection {
    title: string;
    cantAddTag?: true;
    description?: string;
    tags: SymptomTag[];
    color?: TThemeBaseColors;
}

export interface SymptomStore {
    symptoms: Map<string, SymptomSection>;
    addSymptomTag: (key: string, tag: SymptomTag) => void;
    getSymptomsAsArr: () => [string, SymptomSection][];
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
    intensityRating: string;
}

const symptomSections: SymptomSection[] = [{
        title: 'Trauma Responses',
        description: 'How are you responding?',
        cantAddTag: true,
        color: '--color-Dark-Garnet',
        tags: [
            {
                name: 'Fight',
                icon: 'drop',
                color: '--color-Pumpkin',
                category: 'response',
                isSystem: true
            },
            {
                name: 'Flight',
                icon: 'feather',
                color: '--color-Sunglow',
                category: 'response',
                isSystem: true
            },
            {
                name: 'Freeze',
                icon: 'magnet',
                color: '--color-Charcoal',
                category: 'response',
                isSystem: true
            },
            {
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
                name: 'Anxiety',
                icon: 'controller-fast-forward',
                color: '--color-Olivine',
            },
            {
                name: 'Fear',
                icon: 'flash',
                color: '--color-Olivine',
            },
            {
                name: 'Shame',
                icon: 'hand',
                color: '--color-Olivine',
            },
            {
                name: 'Anger',
                icon: 'new',
                color: '--color-Olivine',
            },
            {
                name: 'Sadness',
                icon: 'emoji-sad',
                color: '--color-Olivine',
            },
            {
                name: 'Overwhelm',
                icon: 'tools',
                color: '--color-Olivine',
            },
            {
                name: 'Numbness',
                icon: 'cloud',
                color: '--color-Olivine',
            },
            {
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
                name: 'Social',
                icon: 'users',
                color: '--color-Sunglow',
            },
            {
                name: 'Work',
                icon: 'briefcase',
                color: '--color-Sunglow',
            },
            {
                name: 'Family',
                icon: 'home',
                color: '--color-Sunglow',
            },
            {
                name: 'Alone',
                icon: 'user',
                color: '--color-Sunglow',
            },
            {
                name: 'Public',
                icon: 'map',
                color: '--color-Sunglow',
            },
            {
                name: 'Evening',
                icon: 'moon',
                color: '--color-Sunglow',
            },
            {
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
                name: 'Head',
                icon: 'mask',
                color: '--color-Charcoal',
            },
            {
                name: 'Eyes',
                icon: 'eye',
                color: '--color-Charcoal',
            },
            {
                name: 'Mouth',
                icon: 'sound',
                color: '--color-Charcoal',
            },
            {
                name: 'Throat',
                icon: 'scissors',
                color: '--color-Charcoal',
            },
            {
                name: 'Neck',
                icon: 'user',
                color: '--color-Charcoal',
            },
            {
                name: 'Shoulders',
                icon: 'remove-user',
                color: '--color-Charcoal',
            },
            {
                name: 'Chest',
                icon: 'merge',
                color: '--color-Charcoal',
            },
            {
                name: 'Stomach',
                icon: 'cake',
                color: '--color-Charcoal',
            },
            {
                name: 'Arms',
                icon: 'flow-parallel',
                color: '--color-Charcoal',
            },
            {
                name: 'Hands',
                icon: 'hand',
                color: '--color-Charcoal',
            },
            {
                name: 'Hips',
                icon: 'hour-glass',
                color: '--color-Charcoal',
            },
            {
                name: 'Legs',
                icon: 'shuffle',
                color: '--color-Charcoal',
            },
            {
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
    }
}));

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
        console.log(entry);
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

