import { type FC, useEffect } from 'react';
import { Home, Profile, Vehicle, VehicleBrand, VehicleModel } from 'presentation/environment';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tab } from 'main/tabs';
import { addEventListener } from '@react-native-community/netinfo';
import { colors } from 'presentation/style';
import { paths } from 'main/config';
import { setInternetConnection } from 'store/net-info/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';

export const PrivateRoutes: FC = () => {
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.persist);

  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      dispatch(setInternetConnection(state.isConnected ?? false));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const options = {
    tabBarActiveBackgroundColor: colors.blue.mid,
    tabBarActiveTintColor: colors.primary,
    tabBarItemStyle: {
      paddingBottom: 4,
      paddingTop: 4
    },
    tabBarStyle: {
      height: 60,
      paddingBottom: 6,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 6
    }
  };

  return (
    <Tab.Navigator initialRouteName={paths.home} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        component={Home}
        name={paths.home}
        options={{
          ...options,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? colors.primary : 'gray'}
              name={focused ? 'home' : 'home-outline'}
              size={20}
            />
          ),

          title: 'Home'
        }}
      />

      <Tab.Screen
        component={Vehicle}
        name={paths.vehicle}
        options={{
          ...options,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? colors.primary : 'gray'}
              name={focused ? 'car' : 'car-outline'}
              size={24}
            />
          ),
          title: 'Veiculos'
        }}
      />

      {user?.role === 'admin' ? (
        <>
          <Tab.Screen
            component={VehicleBrand}
            name={paths.vehicleBrand}
            options={{
              ...options,
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  color={focused ? colors.primary : 'gray'}
                  name={focused ? 'car-cog' : 'car-cog'}
                  size={24}
                />
              ),
              title: 'Marcas'
            }}
          />

          <Tab.Screen
            component={VehicleModel}
            name={paths.vehicleModel}
            options={{
              ...options,
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  color={focused ? colors.primary : 'gray'}
                  name={focused ? 'car-side' : 'car-side'}
                  size={24}
                />
              ),
              title: 'Modelos'
            }}
          />
        </>
      ) : null}

      <Tab.Screen
        component={Profile}
        name={paths.profile}
        options={{
          ...options,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? colors.primary : 'gray'}
              name={focused ? 'person' : 'person-outline'}
              size={20}
            />
          ),
          title: 'Perfil'
        }}
      />
    </Tab.Navigator>
  );
};
