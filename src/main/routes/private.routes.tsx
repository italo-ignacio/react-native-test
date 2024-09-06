import { BluetoothProvider, useRequest, useRouter } from 'data/hooks';
import { type FC, useEffect } from 'react';
import { Tab } from 'main/tabs';
import { colors } from 'presentation/style';
import { paths } from 'main/config';
import { tabsMock } from 'main/mock/tabs';
import { useAppSelector } from 'store';

export const PrivateRoutes: FC = () => {
  const { user } = useAppSelector((state) => state.persist);
  const { hasInternetConnection } = useAppSelector((state) => state.netInfo);

  const { synchronizeDb } = useRequest();
  const { navigate } = useRouter();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     dispatch(setInternetConnection(state.isConnected ?? false));
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    if (hasInternetConnection) synchronizeDb();
  }, [hasInternetConnection]);

  const options = {
    tabBarActiveBackgroundColor: colors.blue.mid,
    tabBarActiveTintColor: colors.primary,
    tabBarItemStyle: {
      paddingBottom: 2,
      paddingTop: 2
    },
    tabBarStyle: {
      height: 55,
      paddingBottom: 4,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4
    }
  };

  return (
    <BluetoothProvider>
      <Tab.Navigator
        initialRouteName={paths.home}
        screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      >
        {tabsMock.map((item) => {
          if (user?.role !== 'ADMIN' && item.onlyAdmin) return null;

          return (
            <Tab.Screen
              key={item.name}
              component={item.component}
              listeners={{
                tabPress(event): void {
                  event.preventDefault();
                  navigate(item.name, { screen: item.mainRoute });
                }
              }}
              name={item.name}
              options={{
                ...options,
                tabBarIcon: item.tabBarIcon,
                title: item.title,
                unmountOnBlur: true
              }}
            />
          );
        })}
      </Tab.Navigator>
    </BluetoothProvider>
  );
};
