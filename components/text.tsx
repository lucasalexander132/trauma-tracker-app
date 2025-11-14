import PropsWithClassname from '@/utils/types/PropsWithClassname';
import classNames from 'classnames';
import { Text } from 'react-native';

export default function AppText(props: PropsWithClassname) {
      const { children, className, ...restProps } = props;
      return (<Text className={classNames(className, 'dark:text-white')} { ...restProps }>
        { children }
      </Text>)
}