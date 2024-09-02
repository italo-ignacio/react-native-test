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
            console.log(await database.delete('vehicle_models', {}));
          }}
          title={'Delete'}
        />

        <View className={'mt-4'} />

        <Button
          onPress={async (): Promise<void> => {
            const list = await database.find('vehicle_brands', {
              select: {
                apiId: true
              }
            });

            console.log(list.length);
          }}
          title={'Find'}
        />

        <Button
          onPress={async (): Promise<void> => {
            const list = await database.create('vehicle_brands', {
              data: {
                name: '123'
              },
              select: {
                apiId: true
              }
            });

            console.log(list);
          }}
          title={'create'}
        />
      </ScrollView>
    </PrivateContainer>
  );
};
