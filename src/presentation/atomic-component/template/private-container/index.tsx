import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import { setInternetConnection } from 'store/net-info/slice';
import { useAppSelector } from 'store';
import { useBluetooth, useRouter } from 'data/hooks';
import { useDispatch } from 'react-redux';
import type { FC, ReactNode } from 'react';

interface PrivateContainerProps {
  children: ReactNode;
  headerTitle: string;
  headerSubtitle?: string;
}

export const PrivateContainer: FC<PrivateContainerProps> = ({
  children,
  headerSubtitle,
  headerTitle
}) => {
  const { canGoBack, goBack, navigate } = useRouter();
  const dispatch = useDispatch();

  const { bluetoothState } = useBluetooth();
  const { hasInternetConnection } = useAppSelector((state) => state.netInfo);

  const getBluetoothIcon = (): 'bluetooth-connected' | 'bluetooth-disabled' | 'bluetooth' => {
    if (bluetoothState === 'off') return 'bluetooth-disabled';
    return 'bluetooth';
  };

  return (
    <View className={'flex-1 justify-end items-start'} {...gap(8)}>
      <View
        className={`${
          headerSubtitle ? 'h-[170px]' : 'h-[90px]'
        } bg-primary w-full rounded-b-[36px]`}
        {...gap(28)}
      >
        <View className={'flex flex-row justify-between h-full px-5 py-8'}>
          {canGoBack() && !headerSubtitle ? (
            <TouchableOpacity onPress={goBack}>
              <MaterialIcons color={colors.white} name={'arrow-back'} size={26} />
            </TouchableOpacity>
          ) : null}

          <View className={`flex items-start ${headerSubtitle ? 'mt-auto' : ''}`} {...gap(6)}>
            <Text
              className={'text-white font-semibold'}
              style={{ fontSize: headerSubtitle ? 30 : 20 }}
            >
              {headerTitle}
            </Text>

            <Text className={'text-white text-xl'}>{headerSubtitle}</Text>
          </View>

          <View className={'flex flex-row gap-4 '}>
            <MaterialIcons
              color={'white'}
              name={getBluetoothIcon()}
              onPress={(): void => {
                navigate(paths.bluetooth);
              }}
              size={24}
            />

            <Text
              onPress={(): void => {
                dispatch(setInternetConnection(!hasInternetConnection));
              }}
            >
              {hasInternetConnection ? (
                <AntDesign color={'white'} name={'wifi'} size={24} />
              ) : (
                <Feather color={'white'} name={'wifi-off'} size={24} />
              )}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className={'w-full px-4'} {...gap(28)}>
        {children}
      </ScrollView>
    </View>
  );
};
