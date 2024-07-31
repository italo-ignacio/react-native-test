import { ScrollView, View } from 'react-native';
import type { FC, ReactNode } from 'react';
import type { ViewProps } from 'react-native';

interface ContainerProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <ScrollView>
      <View {...props} className={`p-3 mt-8 ${className ?? ''}`}>
        {children}
      </View>
    </ScrollView>
  );
};
