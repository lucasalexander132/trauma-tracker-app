import { TThemeBackgrounds } from "@/assets/styles/theme";
import { ImageSourcePropType } from "react-native";

export type BaseSlide = {
    id: string;
    className?: string;
}

export type InfoSlide = BaseSlide & {
    type: 'info';
    content: {
        image?: {
            src: ImageSourcePropType;
            color?: TThemeBackgrounds;
        };
        texts: (string | '/d')[];
    };
}

export type QuestionSlide = BaseSlide & {
    type: 'question';
    questionNumber: number;
    title: string;
    subtitle?: string;
    placeholder: string;
    maxLength?: number;
}

type ExerciseType = 'tag_tapper';

export type ExerciseSection = {
    type: ExerciseType;
    label: string;
    dataKey: 'eventTags' | 'emotionTags' | 'responseTags';
};

export type ExerciseSlide = BaseSlide & {
    type: 'exercise';
    title: string;
    description: string;
    sections: ExerciseSection[];
}

export type ModuleSlide = InfoSlide | QuestionSlide | ExerciseSlide;

export type NoticingModuleData = {
    slides: ModuleSlide[];
}
