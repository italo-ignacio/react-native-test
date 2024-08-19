import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { useRouter } from 'data/hooks';
import type { FC, ReactNode } from 'react';

interface PublicContainerProps {
  children: ReactNode;
  title: string;
  hideHeader?: boolean;
  headerTitle?: boolean;
  headerSubtitle?: boolean;
}

export const PublicContainer: FC<PublicContainerProps> = ({
  children,
  title,
  hideHeader,
  headerSubtitle,
  headerTitle
}) => {
  const { canGoBack, goBack } = useRouter();

  return (
    <View className={'flex-1 justify-end items-start bg-primary'} {...gap(8)}>
      {hideHeader ? null : (
        <View className={'flex items-start p-5'} {...gap(6)}>
          <Text className={'text-white text-2xl font-semibold'}>{headerTitle ?? 'Olá'}.</Text>

          <Text className={'text-white text-xl'}>
            {headerSubtitle ?? 'Seja bem-vindo de volta!'}
          </Text>
        </View>
      )}

      <View
        className={`${hideHeader ? 'h-[100%]' : 'h-[75%]'} bg-white w-full rounded-t-[36px] px-4`}
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
            {title}
          </Text>

          {canGoBack() && <View style={{ flex: 1 }} />}
        </View>

        {children}
      </View>
    </View>
  );
};
