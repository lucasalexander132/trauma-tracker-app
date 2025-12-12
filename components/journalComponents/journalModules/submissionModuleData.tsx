import CustomButton from '@/components/customButton';
import Divider from '@/components/divider';
import AppText from '@/components/text';
import config from '@/constants/configConstants';
import { IEntry } from '@/constants/types/Entries';
import useModuleStore, { Exercise, QuestionAnswer } from '@/zustand/moduleStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import ExerciseOverview from './exerciseOverview';

type Props = {
    entry: IEntry;
}

const SubmissionModuleData = ({entry}: Props) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const exerciseData = useModuleStore((state) => state.exerciseData);
    const questionAnswers = useModuleStore((state) => state.questionAnswers);
    const getCompleteModule = useModuleStore((state) => state.getCompleteModule);
    const clearModuleData = useModuleStore((state) => state.clearModuleData);

    const { mutate: submitModuleUpdate, isPending: submissionPending, isSuccess: submissionSuccessful } = useMutation({
        mutationFn: async () => {
            const moduleData = getCompleteModule();
            const response = await fetch(config.api.host + '/user/entries/' + entry.id + '/module', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: moduleData.type,
                    questionAnswers: JSON.stringify(moduleData.questionAnswers),
                    exerciseData: JSON.stringify(moduleData.exerciseData)
                })
            });
            const data = await response.json();
            return data;
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            queryClient.invalidateQueries({
                queryKey: ['entries']
            });
            clearModuleData();
            handleFinish();
        },
        onError: (error) => {
            console.log(JSON.stringify(error), 'Error: Module not sent');
        }
    });
    
    const handleSubmit = () => {
        submitModuleUpdate();
    };

    const handleFinish = () => {
        router.dismiss();
    }

    return (<>{
            exerciseData.length > 0 && <>
                <AppText className='font-bold text-2xl'>Exercise</AppText>
                <Divider />
            </>
        }
        {
            exerciseData.map((exercise: Exercise) => <ExerciseOverview key={exercise.id} exercise={exercise} entry={entry} />)
        }
        {
            questionAnswers.length > 0 && <>
                { exerciseData.length > 0 && <Divider /> }
                <AppText className='font-bold text-2xl'>Q&A</AppText>
                <Divider />
            </>
        }
        {
            questionAnswers.map((qna: QuestionAnswer) => <View key={qna.id}>
                <AppText className='font-bold'>{qna.question}</AppText>
                <AppText className="font-bold bg-[--color-paper-dark] rounded-md px-3 py-3 my-4 w-full">{qna.answer.toString()}</AppText>
            </View>)
        }
        <CustomButton
            buttonClassName={classNames('rounded-full mt-6', submissionPending && 'opacity-80')}
            disabled={submissionPending}
            title={submissionSuccessful ? 'Sent' : 'Submit Entry'}
            onPress={handleSubmit} /></>
    )
}

export default SubmissionModuleData