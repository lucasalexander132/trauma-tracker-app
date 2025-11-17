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
    isSystem?: true;
}

export interface SymptomStore {
    symptoms: {
        title: string;
        tags: SymptomTag[];
    }[]
}

const useTagState = create<SymptomStore>(() => ({
    symptoms: [{
        title: 'Trauma Responses',
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
    }]
}));
export { useMessageState, useTagState };
