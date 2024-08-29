import { Image } from 'react-native';
import { brandImages } from 'assets/brands';
import type { FC } from 'react';

interface BrandImageProps {
  imageName?: string;
  size?: 'large' | 'small';
}

export const BrandImage: FC<BrandImageProps> = ({ imageName, size }) => {
  if (imageName && brandImages[imageName])
    return (
      <Image
        className={size === 'small' ? 'w-[60px] h-[40px]' : 'w-[120px] h-[100px]'}
        source={brandImages[imageName]}
        style={{
          objectFit: 'contain'
        }}
      />
    );

  return null;
};
