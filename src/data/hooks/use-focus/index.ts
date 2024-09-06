import { queryClient } from 'infra/lib';
import { useAppSelector } from 'store';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useFocus = (name: string): void => {
  const { hasInternetConnection, synchronize } = useAppSelector((state) => state.netInfo);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(name);
    }, [queryClient])
  );

  useFocusEffect(
    useCallback(() => {
      if (!hasInternetConnection) queryClient.invalidateQueries(name);
    }, [hasInternetConnection])
  );

  useFocusEffect(
    useCallback(() => {
      if (synchronize.state === 'finishedSyncing') queryClient.invalidateQueries(name);
    }, [synchronize])
  );
};
