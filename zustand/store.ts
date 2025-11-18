import { IThemeBaseColors } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
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
    color: IThemeBaseColors;
    category?: 'response';
    isSystem?: boolean;
}

export interface SymptomSection {
    title: string;
    description?: string;
    tags: SymptomTag[];
}

export interface SymptomStore {
    symptoms: Map<string, SymptomSection>;
    addSymptomTag: (key: string, tag: SymptomTag) => void
}

const symptomSections: SymptomSection[] = [{
        title: 'Trauma Responses',
        description: 'How are you responding?',
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
        tags: [
            {
                name: 'Anxiety',
                icon: 'link',
                color: '--color-Olivine',
            },
            {
                name: 'Fear',
                icon: 'email',
                color: '--color-Olivine',
            },
            {
                name: 'Shame',
                icon: 'image',
                color: '--color-Olivine',
            },
            {
                name: 'Anger',
                icon: 'text',
                color: '--color-Olivine',
            },
            {
                name: 'Sadness',
                icon: 'menu',
                color: '--color-Olivine',
            },
            {
                name: 'Overwhelm',
                icon: 'radio',
                color: '--color-Olivine',
            },
            {
                name: 'Numbness',
                icon: 'cloud',
                color: '--color-Olivine',
            },
            {
                name: 'Confusion',
                icon: 'switch',
                color: '--color-Olivine',
            }
        ]
    }, {
        title: 'Context',
        description: 'What do you see around you?',
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
        tags: [
            {
                name: 'Head',
                icon: 'users',
                color: '--color-Charcoal',
            },
            {
                name: 'Eyes',
                icon: 'users',
                color: '--color-Charcoal',
            },
            {
                name: 'Mouth',
                icon: 'briefcase',
                color: '--color-Charcoal',
            },
            {
                name: 'Throat',
                icon: 'home',
                color: '--color-Charcoal',
            },
            {
                name: 'Neck',
                icon: 'user',
                color: '--color-Charcoal',
            },
            {
                name: 'Shoulders',
                icon: 'map',
                color: '--color-Charcoal',
            },
            {
                name: 'Chest',
                icon: 'moon',
                color: '--color-Charcoal',
            },
            {
                name: 'Stomach',
                icon: 'adjust',
                color: '--color-Charcoal',
            },
            {
                name: 'Arms',
                icon: 'adjust',
                color: '--color-Charcoal',
            },
            {
                name: 'Hands',
                icon: 'adjust',
                color: '--color-Charcoal',
            },
            {
                name: 'Hips',
                icon: 'adjust',
                color: '--color-Charcoal',
            },
            {
                name: 'Legs',
                icon: 'adjust',
                color: '--color-Charcoal',
            },
            {
                name: 'Feet',
                icon: 'adjust',
                color: '--color-Charcoal',
            }
        ]
    }];

const useTagState = create<SymptomStore>((set) => ({
    symptoms: new Map(symptomSections.map((item: SymptomSection) => [item.title, item])),
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
export { useMessageState, useTagState };
