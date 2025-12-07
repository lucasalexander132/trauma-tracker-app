import { NoticingModuleData } from "./types";

export const noticingModuleData: NoticingModuleData = {
    slides: [
        {
            id: 'intro-brain',
            type: 'info',
            className: 'mt-4',
            content: {
                image: {
                    src: require('@/assets/images/safety-brain.png'),
                    color: '--color-Sunglow'
                },
                texts: [
                    'Our brains are magnificent structures. They are composed of many different parts, but we tend to perceive them as one.'
                ]
            }
        },
        {
            id: 'reptilian-brain',
            type: 'info',
            className: 'mt-6',
            content: {
                image: {
                    src: require('@/assets/images/iguana.png'),
                    color: '--color-Olivine'
                },
                texts: [
                    'We have the reptilian brain.',
                    '/d',
                    'This is our instinctual brain. It controls our autonomous systems, like breathing and our beating hearts.',
                    'I call my reptilian brain lizzo because I feel it\'s most fitting and he doesn\'t care.'
                ]
            }
        },
        {
            id: 'mammalian-brain',
            type: 'info',
            className: 'mt-10',
            content: {
                image: {
                    src: require('@/assets/images/mammal.png'),
                    color: '--color-Pumpkin'
                },
                texts: [
                    'We have the mammalian brain. The limbic system.',
                    '/d',
                    'This is our emotional brain. It lacks words but allows us to feel strongly and deeply, and stores those feelings as emotional memories.',
                    'It\'s why you can see a picture of a sad cat and go "Yo, that\'s me" even though you can use your sad cat words to describe your sad cat self.'
                ]
            }
        },
        {
            id: 'prefrontal-cortex',
            type: 'info',
            content: {
                image: {
                    src: require('@/assets/images/frontal-lobe.png'),
                    color: '--color-Vintage-Grape'
                },
                texts: [
                    'And we have the thinking brain. The prefrontal cortex.',
                    '/d',
                    'This is our rational brain. It can use language and logic and interprets the lizard and mammalian brain.',
                    'You can\'t think your heart into stopping, and some emotions you can\'t put into words.'
                ]
            }
        },
        {
            id: 'brain-harmony',
            type: 'info',
            content: {
                texts: [
                    'When we:',
                    '- Act first without thinking',
                    '- Feel strongly without words',
                    '- Become so numb we can only detach',
                    'We are experiencing a disharmony between these three brains.',
                    '/d',
                    'The follow-up questions in this module will help you understand how your three brains contributed in the attached journal entry.'
                ]
            }
        },
        {
            id: 'question-1',
            type: 'question',
            questionNumber: 1,
            title: 'What does your prefrontal cortex (thinking) brain remember from the event?',
            subtitle: 'Do you remember everything in detail, or only small pieces?',
            placeholder: 'My thinking brain remembers...'
        },
        {
            id: 'question-2',
            type: 'question',
            questionNumber: 2,
            title: 'What does your mammalian (emotional) brain remember from the event?',
            subtitle: 'Do you remember feeling nauseous, or angry? How did your body feel?',
            placeholder: 'My mammalian brain remembers...'
        },
        {
            id: 'question-3',
            type: 'question',
            questionNumber: 3,
            title: 'What does your reptilian (instinctual) brain remember from the event?',
            subtitle: 'Was your heart racing? Did you feel flushed? Hot, cold?',
            placeholder: 'My reptilian brain remembers...'
        },
        {
            id: 'noticing-exercise',
            type: 'exercise',
            title: 'Noticing Exercise',
            description: 'Tap the symptoms important to that part of your brain',
            sections: [
                {
                    type: 'tag_tapper',
                    label: 'Prefrontal Cortex',
                    dataKey: 'eventTags'
                },
                {
                    type: 'tag_tapper',
                    label: 'Mammalian Brain',
                    dataKey: 'eventTags'
                },
                {
                    type: 'tag_tapper',
                    label: 'Lizard Brain',
                    dataKey: 'eventTags'
                }
            ]
        }
    ]
};
