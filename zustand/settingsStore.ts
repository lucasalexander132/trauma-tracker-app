import { create } from "zustand";

export interface ISetting {
    label: string;
    value: boolean;
}

export interface SettingsStore {
    settings: {
        [K in SettingsKeys]: ISetting;
    };
    getSettingsArr: () => [SettingsKeys, ISetting][];
    setSetting: (key: SettingsKeys, value: boolean) => void;
}

const settings = {
    'stickerMode': {
        label: 'Sticker Mode',
        value: false
    }
};

export type SettingsKeys = keyof typeof settings;

const useSettingsStore = create<SettingsStore>((set, get) => ({
    settings,
    getSettingsArr: () => Object.entries(get().settings).map(
        ([k, v]) => [k as SettingsKeys, v] as [SettingsKeys, ISetting]
    ),
    setSetting: (key: SettingsKeys, value: boolean) => set((state) => {
        return {
            settings: {
                ...state.settings,
                [key]: {
                    ...state.settings[key],
                    value
                }
            }
        }
    })
}));

export default useSettingsStore;