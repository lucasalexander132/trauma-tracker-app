import AppText from '@/components/text';
import { IEntry } from '@/constants/types/Entries';
import { SymptomTag } from '@/zustand/journalStore';
import { Exercise } from '@/zustand/moduleStore';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SmallTag from '../smallTag';

type Props = {
    exercise: Exercise;
    entry: IEntry;
}

const ExerciseOverview = ({exercise, entry}: Props) => {
    const { exerciseQuestionAnswer } = exercise;
    const [tags, setTags] = useState<SymptomTag[]>([]);

    useEffect(() => {
        if (exercise.type === 'tag_tapper' && tags) {
            const set = new Set(exerciseQuestionAnswer.answer);
            setTags(entry.eventTags.filter((tag) => set.has(tag.id)))
        }
    }, [exercise, entry]);

    switch(exercise.type) {
        case 'tag_tapper':
            return <View className='mb-2'>
                <AppText className='font-bold mb-2'>{exerciseQuestionAnswer.question}</AppText>
                <FlashList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName='items-center'
                    renderItem={
                        ({item: tag}) =>
                            <View className='pr-4'>
                                <SmallTag
                                    key={tag.id}
                                    id={tag.id}
                                    name={tag.name}
                                    icon={tag.icon}
                                    color={tag.color} />
                            </View>
                    }
                    data={tags} />
            </View>
        default:
            return <></>
    }
}

export default ExerciseOverview