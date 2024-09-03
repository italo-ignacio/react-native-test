import { ItemDefaultCard } from './item';
import { View } from 'react-native';
import { gap } from 'main/utils';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

interface DefaultCardProps {
  items: {
    rightElement?: ReactNode;
    title: string;
    subtitle: ReactNode | string;
    isEdit?: {
      value: string;
      setValue: Dispatch<SetStateAction<string>>;
      setEdit: Dispatch<SetStateAction<boolean>>;
      edit: boolean;
      isRequired?: boolean;
    };
    leftElement?: ReactNode;
  }[];
}

export const DefaultCard: FC<DefaultCardProps> = ({ items }) => {
  return (
    <View
      className={
        'flex flex-col w-full px-3 rounded-md divide-y divide-gray-350 bg-white border border-gray-350'
      }
      {...gap(12)}
    >
      {items.map((props, index) => (
        // eslint-disable-next-line react/prop-types
        <View key={props.title}>
          <ItemDefaultCard {...props} isLast={index + 1 === items.length} />
        </View>
      ))}
    </View>
  );
};
