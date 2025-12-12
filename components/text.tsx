import PropsWithClassname from '@/utils/types/PropsWithClassname';
import classNames from 'classnames';
import { StyleProp, Text, TextStyle } from 'react-native';

type AppTextProps = PropsWithClassname & {
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
};

export default function AppText(props: AppTextProps) {
  const { children, className, style, numberOfLines, ellipsizeMode, ...restProps } = props;
  return (
    <Text
      className={classNames(className, 'dark:text-white')}
      style={style}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...restProps}
    >
      {children}
    </Text>
  );
}