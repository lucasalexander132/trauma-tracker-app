import { ModuleTypes } from "@/app/(protected)/(tabs)/(home)/journalEntry";
import { ExerciseType } from "@/components/journalComponents/journalModules/noticingModule/types";
import { create } from "zustand";

type QuestionAnswer = {
    id: string;
    question: string;
    answer: string;
}

type Exercise = {
    type: ExerciseType;
    id: string;
    exercise: QuestionAnswer[];
}

export type ModuleEntryStore = {
    moduleType: ModuleTypes;
    questionAnswers: QuestionAnswer[];
    exerciseData: Exercise[];
    updateQuestionAnswer: (id: string, qna: QuestionAnswer) => void;
    deleteQuestionAnswer: (id: string) => void;
    updateExercise: (id: string, exercise: Exercise) => void;
    deleteExercise: (id: string) => void;
}

const useModuleState = create<ModuleEntryStore>((set, get) => ({
    moduleType: 'initialEntry',
    questionAnswers: [],
    exerciseData: [],
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
    }))
}))

export default useModuleState
