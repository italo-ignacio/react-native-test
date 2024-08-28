import { Image } from 'react-native';
import { brandImages } from 'assets/brands';
import type { FC } from 'react';

interface BrandImageProps {
  imageName?: string;
}

export const BrandImage: FC<BrandImageProps> = ({ imageName }) => {
  if (imageName && brandImages[imageName])
    return (
      <Image
        className={'w-[60px] h-[40px]'}
        source={brandImages[imageName]}
        style={{
          objectFit: 'contain'
        }}
      />
    );

  return null;
};
