import { BrandImage } from '../brand-image';
import { Text, TouchableOpacity } from 'react-native';
import type { FC } from 'react';

interface FetchOnScrollItemProps {
  onPress: () => void;
  name: string;
  image?: string;
}

export const FetchOnScrollItem: FC<FetchOnScrollItemProps> = ({ name, image, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={'flex flex-row items-center justify-between p-2'}
      onPress={onPress}
    >
      <Text className={'text-primary font-semibold'}>{name}</Text>
      <BrandImage imageName={image} size={'small'} />
    </TouchableOpacity>
  );
};
