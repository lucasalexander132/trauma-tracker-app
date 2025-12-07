import AppText from "@/components/text";
import { IEntry } from "@/constants/types/Entries";
import { FlatList, TextInput, View } from "react-native";
import SmallTag from "../smallTag";
import ModuleCard from "./moduleCard";
import { ExerciseSection, ExerciseSlide, InfoSlide, ModuleSlide, QuestionSlide } from "./noticingModule/types";

type SlideRendererProps = {
    slide: ModuleSlide;
    entry?: IEntry;
}

const InfoSlideComponent = ({ slide }: { slide: InfoSlide }) => {
    const { content, className } = slide;

    return (
        <ModuleCard className={className}>
            <ModuleCard.Content pt={content.image ? false : true}>
                {content.image && (
                    <ModuleCard.Img
                        src={content.image.src}
                        color={content.image.color}
                    />
                )}
                {content.texts.map((text, index) => (
                    text === '/d' ?
                        <ModuleCard.Dvdr key={`${slide.id}-text-${index}`} /> :
                        <ModuleCard.Txt className={
                            index !== content.texts.length - 1 && content.texts[index+1] !== '/d' ?
                                "pb-2" : ''
                            } key={`${slide.id}-text-${index}`}>
                            {text}
                        </ModuleCard.Txt>
                ))}
            </ModuleCard.Content>
        </ModuleCard>
    );
}

const QuestionSlideComponent = ({ slide }: { slide: QuestionSlide }) => {
    const { questionNumber, title, subtitle, placeholder, maxLength = 2000 } = slide;

    return (
        <View>
            <AppText
                style={{ fontFamily: 'TypoGraphica' }}
                className='font-bold text-4xl color-[--color-text] p-2'>
                Question {questionNumber}
            </AppText>
            <ModuleCard>
                <ModuleCard.Content>
                    <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>
                        {title}
                    </AppText>
                    {subtitle && (
                        <AppText className='font-bold color-[--color-text-subtle] px-2 pb-2'>
                            {subtitle}
                        </AppText>
                    )}
                    <ModuleCard.Dvdr />
                    <TextInput
                        editable
                        multiline
                        maxLength={maxLength}
                        placeholder={placeholder}
                        className="bg-[--color-paper-dark] font-bold rounded-md p-2 mb-4 w-full h-28"
                    />
                </ModuleCard.Content>
            </ModuleCard>
        </View>
    );
}

const TagTapperExercise = ({ eventTags, section }: {eventTags?: IEntry['eventTags']; section: ExerciseSection; }) => 
    (
        <>
            <ModuleCard.Txt>{section.label}</ModuleCard.Txt>
            <View className='h-[60px]'>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName='items-center'
                    className="px-4"
                    renderItem={({ item: tag }) => (
                        <View key={`${tag.id}-${section.dataKey}`} className="mr-2">
                            <SmallTag
                                asButton
                                key={`${tag.id}-small-tag`}
                                name={tag.name}
                                icon={tag.icon}
                                color={tag.color}
                            />
                        </View>
                    )}
                    data={eventTags}
                />
            </View>
        </>)

const ExerciseSlideComponent = ({ slide, entry }: { slide: ExerciseSlide; entry?: IEntry }) => {
    const { title, description, sections } = slide;

    return (
        <View>
            <AppText
                style={{ fontFamily: 'TypoGraphica' }}
                className='font-bold text-4xl color-[--color-text] p-2'>
                {title}
            </AppText>
            <ModuleCard>
                <ModuleCard.Content>
                    <ModuleCard.Txt>{description}</ModuleCard.Txt>
                    <ModuleCard.Dvdr />
                    {sections.map((section, sectionIndex) => {
                        switch (section.type) {
                            case 'tag_tapper':
                                return <TagTapperExercise key={`${sectionIndex}-tag-tapper`} section={section} eventTags={entry?.eventTags} />
                        }
                    })}
                </ModuleCard.Content>
            </ModuleCard>
        </View>
    );
}

export const SlideRenderer = ({ slide, entry }: SlideRendererProps) => {
    switch (slide.type) {
        case 'info':
            return <InfoSlideComponent slide={slide} />;
        case 'question':
            return <QuestionSlideComponent slide={slide} />;
        case 'exercise':
            return <ExerciseSlideComponent slide={slide} entry={entry} />;
        default:
            return null;
    }
}
