import { SymptomTag } from "@/zustand/journalStore";

export interface IEntry {
    id: string;
    timestamp: string;
    hasFollowUp: boolean;
    intensityMethod: string,
    intensityRating: number,
    intensityValue: number,
    followUpAt: null | string,
    followUpCompleted: boolean,
    eventTags: SymptomTag[];
}