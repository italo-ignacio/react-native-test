import { Bar, CircleSnail } from 'react-native-progress';
import { Text, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { useAppSelector } from 'store';
import type { FC } from 'react';

export const SynchronizeModal: FC = () => {
  const { synchronize } = useAppSelector((state) => state.netInfo);

  if (
    synchronize.state === 'isSynchronizing' &&
    typeof synchronize.countOfSynchronized === 'number' &&
    typeof synchronize.totalToSynchronize === 'number'
  )
    return (
      <View
        className={
          'absolute p-5 items-center flex-row z-50 bg-white/90 rounded-md top-5 left-[15%] w-[70%] h-[60px]'
        }
        {...gap(8)}
      >
        <CircleSnail color={colors.primary} direction={'clockwise'} indeterminate size={40} />

        <View className={'w-[80%]'} {...gap(8)}>
          <View className={''}>
            <Bar
              borderColor={colors.primary}
              color={colors.primary}
              progress={Math.min(
                synchronize.countOfSynchronized / synchronize.totalToSynchronize,
                1
              )}
              width={null}
            />
          </View>

          <View className={'flex-row justify-between px-3'}>
            <Text>Sincronizando</Text>

            <Text>
              {synchronize.countOfSynchronized > synchronize.totalToSynchronize
                ? synchronize.totalToSynchronize
                : synchronize.countOfSynchronized}{' '}
              de {synchronize.totalToSynchronize}
            </Text>
          </View>
        </View>
      </View>
    );

  return null;
};
