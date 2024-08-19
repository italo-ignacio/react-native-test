import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from 'main/stack';
import type { StackNavigationProp } from '@react-navigation/stack';

export const useRouter = (): StackNavigationProp<RootStackParamList> => useNavigation();
