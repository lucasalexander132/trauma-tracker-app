import { TThemeBackgrounds, themeBackgrounds } from "@/assets/styles/theme";
import AppText from "@/components/text";
import PropsWithClassname from "@/utils/types/PropsWithClassname";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import { Image, ImageSourcePropType, View } from "react-native";


type ModuleCardType = {
    className?: string;
}

const ModuleCard = ({ children, className }: PropsWithChildren & ModuleCardType) => {
    return(
        <View className={classNames(className, 'bg-[--color-paper-dark] border-[--color-text] border-2 rounded-bl-2xl rounded-tr-2xl mb-4 shadow-[3px_3px_0px_rgba(0,0,0,1)]')}>
            { children }
        </View>
    )
}

type ModuleImgProps = {
    src: ImageSourcePropType;
    color?: TThemeBackgrounds;
}

const Img = ({ src, color }: ModuleImgProps) => {
    return (
        <>
            <View className={classNames('rounded-tr-xl py-2 h-[150px]', color && themeBackgrounds[color])}>
                <Image
                    source={src}
                    style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain',
                        top: -70
                    }} />
            </View>
            <View className='h-[2px] bg-[--color-text] w-full' />
        </>
    );
}

const Dvdr = ({className}: PropsWithClassname) => (<View className={classNames('h-[2px] bg-[--color-text] w-full my-2', className)} />)

const Txt = ({children, className}: PropsWithClassname) => {
    return (
        <AppText className={classNames('font-bold color-[--color-text] px-2', className)}>{children}</AppText>);
}

const Content = ({children}: PropsWithChildren) => (<View className='py-2'>{children}</View>)

ModuleCard.Img = Img;
ModuleCard.Dvdr = Dvdr;
ModuleCard.Txt = Txt;
ModuleCard.Content = Content;

export default ModuleCard;