/* eslint-disable no-extra-parens */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
import { Text, View } from 'react-native';
import { gap } from 'main/utils';
import type { FC, ReactNode } from 'react';

interface DefaultCardProps {
  items: {
    rightElement?: ReactNode;
    title: string;
    subtitle: ReactNode | string;
    leftElement?: ReactNode;
  }[];
}

export const DefaultCard: FC<DefaultCardProps> = ({ items }) => {
  const getWidth = (rightElement?: ReactNode, leftElement?: ReactNode): number => {
    let value = 0;

    if (rightElement) value += 13;
    if (leftElement) value += 13;

    const final = 100 - value;

    return final;
  };

  return (
    <View
      className={
        'flex flex-col w-full divide-y px-3 rounded-md divide-gray-350 bg-white border border-gray-350'
      }
      {...gap(12)}
    >
      {items.map(({ rightElement, subtitle, title, leftElement }, index) => (
        <View
          key={`${title}-${index}`}
          className={`flex flex-row items-center px-3 w-full ${
            index + 1 === items.length ? 'py-2' : 'pt-2'
          }`}
        >
          {leftElement ? (
            <View className={''} style={{ width: 40 }}>
              {leftElement}
            </View>
          ) : null}

          <View style={{ width: `${getWidth(rightElement, leftElement)}%` }}>
            <Text className={`text-primary text-sm ${typeof subtitle === 'string' ? '' : 'mb-2'}`}>
              {title}
            </Text>

            {typeof subtitle === 'string' ? (
              <Text className={'text-primary text-base font-medium'}>{subtitle}</Text>
            ) : (
              subtitle
            )}
          </View>

          {rightElement ? (
            <View className={'items-end'} style={{ width: 40 }}>
              {rightElement}
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};
