import { Button, ScrollView, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { useAppSelector } from 'store';
import { useDatabase } from 'data/hooks';
import type { FC } from 'react';

export const Home: FC = () => {
  const { user } = useAppSelector((state) => state.persist);
  const database = useDatabase();

  return (
    <PrivateContainer headerSubtitle={`${user?.firstName} ${user?.firstName}`} headerTitle={'Olá,'}>
      <ScrollView>
        <Button
          onPress={async (): Promise<void> => {
            console.log(await database.delete('vehicle_brands', {}));
          }}
          title={'Delete'}
        />

        <View className={'mt-4'} />

        <Button
          onPress={async (): Promise<void> => {
            const list = await database.find('vehicle_brands', {
              select: {
                name: true
              }
            });

            console.log(list);
            console.log(list.length);
          }}
          title={'Find'}
        />

        <View className={'mt-4'} />

        <Button
          onPress={async (): Promise<void> => {
            const list = await database.find('vehicle_brands', {
              limit: 10,
              page: 1,
              select: {
                name: true
              }
            });

            console.log(list);
            console.log(list.length);
          }}
          title={'page 1'}
        />

        <View className={'mt-4'} />

        <Button
          onPress={async (): Promise<void> => {
            const list = await database.find('vehicle_brands', {
              limit: 10,
              page: 2,
              select: {
                name: true
              }
            });

            console.log(list);
            console.log(list.length);
          }}
          title={'page 2'}
        />
      </ScrollView>
    </PrivateContainer>
  );
};
