import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { useRouterTab } from 'data/hooks';
import type { FC, ReactNode } from 'react';

interface PrivateContainerProps {
  children: ReactNode;
  hideHeader?: boolean;
  headerTitle: string;
  headerSubtitle?: string;
}

export const PrivateContainer: FC<PrivateContainerProps> = ({
  children,
  hideHeader,
  headerSubtitle,
  headerTitle
}) => {
  const { canGoBack, goBack } = useRouterTab();

  return (
    <View className={'flex-1 justify-end items-start'} {...gap(8)}>
      <View
        className={`${
          canGoBack() ? 'h-[100px]' : 'h-[190px]'
        } bg-primary w-full rounded-b-[36px] px-4`}
        {...gap(28)}
      >
        <View className={'flex flex-row items-center justify-between p-4 pb-0 pt-4'}>
          {canGoBack() && (
            <TouchableOpacity onPress={goBack}>
              <MaterialIcons color={colors.primary} name={'arrow-back'} size={26} />
            </TouchableOpacity>
          )}

          <Text
            className={
              'text-primary font-bold text-xl justify-center items-center text-center flex-[8]'
            }
          >
            {headerTitle}
          </Text>

          {canGoBack() && <View style={{ flex: 1 }} />}
        </View>

        {hideHeader ? null : (
          <View className={'flex items-start p-5'} {...gap(6)}>
            <Text className={'text-white text-2xl font-semibold'}>{headerTitle ?? 'Olá'}.</Text>

            <Text className={'text-white text-xl'}>
              {headerSubtitle ?? 'Seja bem-vindo de volta!'}
            </Text>
          </View>
        )}
      </View>

      <View
        className={`${hideHeader ? 'h-[100%]' : 'h-[75%]'} bg-white w-full rounded-t-[36px] px-4`}
        {...gap(28)}
      >
        {children}
      </View>
    </View>
  );
};
