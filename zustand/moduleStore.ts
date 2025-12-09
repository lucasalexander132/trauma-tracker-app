import { ModuleTypes } from "@/app/(protected)/(tabs)/(home)/journalEntry";
import { ExerciseType } from "@/components/journalComponents/journalModules/noticingModule/types";
import { create } from "zustand";

export type QuestionAnswer = {
    id: string;
    question: string;
    answer: string[];
}

export type Exercise = {
    type: ExerciseType;
    id: string;
    exerciseQuestionAnswer: QuestionAnswer;
}

export type BaseStoreData = {
    moduleType: ModuleTypes;
    questionAnswers: QuestionAnswer[];
    exerciseData: Exercise[];
}

export type ModuleEntryStore = BaseStoreData & {
    setModuleType: (moduleType: ModuleTypes) => void;
    updateQuestionAnswer: (id: string, qna: QuestionAnswer) => void;
    deleteQuestionAnswer: (id: string) => void;
    updateExercise: (id: string, exercise: Exercise) => void;
    deleteExercise: (id: string) => void;
    getCompleteModule: () => BaseStoreData;
    clearModuleData: () => void;
}

const useModuleStore = create<ModuleEntryStore>((set, get) => ({
    moduleType: 'initialEntry',
    questionAnswers: [],
    exerciseData: [],
    setModuleType: (moduleType: ModuleTypes) => set(() => ({
        moduleType
    })),
    updateQuestionAnswer: (id, qna) => set(() => {
        const existing = get().questionAnswers.find((item) => item.id === id);
        if (existing) {
            return { questionAnswers: get().questionAnswers.map((item) => item.id === id ? qna : item) };
        } else {
            return { questionAnswers: [...get().questionAnswers, qna] };
        }
    }),
    deleteQuestionAnswer: (id) => set(() => ({
        questionAnswers: get().questionAnswers.filter((item) => item.id !== id)
    })),
    updateExercise: (id, exercise) => set(() => {
        const existing = get().exerciseData.find((item) => item.id === id);
        if (existing) {
            return { exerciseData: get().exerciseData.map((item) => item.id === id ? exercise : item) };
        } else {
            return { exerciseData: [...get().exerciseData, exercise] };
        }
    }),
    deleteExercise: (id) => set(() => ({
        exerciseData: get().exerciseData.filter((item) => item.id !== id)
    })),
    getCompleteModule: () => ({
        moduleType: get().moduleType,
        questionAnswers: get().questionAnswers,
        exerciseData: get().exerciseData
    }),
    clearModuleData: () => set(() => ({
        moduleType: 'initialEntry',
        questionAnswers: [],
        exerciseData: [],
    }))
}))

export default useModuleStore
