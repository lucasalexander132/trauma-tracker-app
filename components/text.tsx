import PropsWithClassname from '@/utils/types/PropsWithClassname';
import classNames from 'classnames';
import { StyleProp, Text, TextStyle } from 'react-native';

type AppTextProps = PropsWithClassname & {
  style?: StyleProp<TextStyle>;
};

export default function AppText(props: AppTextProps) {
  const { children, className, style, ...restProps } = props;
  return (
    <Text
      className={classNames(className, 'dark:text-white')}
      style={style}
      {...restProps}
    >
      {children}
    </Text>
  );
}