import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { type FC, type ReactNode, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import { queryClient } from 'infra/lib';
import { setInternetConnection } from 'store/net-info/slice';
import { useAppSelector } from 'store';
import { useBluetooth, useRouter } from 'data/hooks';
import { useDispatch } from 'react-redux';

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

  const { bluetoothState, connectedDevice, startScan } = useBluetooth();
  const { hasInternetConnection } = useAppSelector((state) => state.netInfo);

  const getBluetoothIcon = (): 'bluetooth-connected' | 'bluetooth-disabled' | 'bluetooth' => {
    if (bluetoothState === 'off') return 'bluetooth-disabled';
    if (connectedDevice !== null) return 'bluetooth-connected';
    return 'bluetooth';
  };

  useEffect(() => {
    if (bluetoothState === 'on' && connectedDevice === null) startScan();
  }, [bluetoothState, connectedDevice]);

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [hasInternetConnection]);

  return (
    <View className={'flex-1 justify-end items-start'} {...gap(8)}>
      <View
        className={`${
          headerSubtitle ? 'h-[150px]' : 'h-[80px]'
        } bg-primary w-full rounded-b-[40px]`}
        {...gap(28)}
      >
        <View className={'flex flex-row justify-between h-full px-5 py-6'}>
          {(canGoBack() && !headerSubtitle) || !headerSubtitle ? (
            <TouchableOpacity onPress={goBack}>
              <MaterialIcons color={colors.white} name={'arrow-back'} size={26} />
            </TouchableOpacity>
          ) : null}

          <View className={`flex items-start ${headerSubtitle ? 'mt-auto' : ''}`} {...gap(6)}>
            <Text
              className={'text-white font-semibold'}
              style={{ fontSize: headerSubtitle ? 26 : 20 }}
            >
              {headerTitle}
            </Text>

            <Text className={'text-white text-base'}>{headerSubtitle}</Text>
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
              className={'absolute right-10'}
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

      <View className={'flex-1 h-full w-full px-4'} {...gap(16)}>
        {children}
      </View>

      <View className={'mb-2'} />
    </View>
  );
};
