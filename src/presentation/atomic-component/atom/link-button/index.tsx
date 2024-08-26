import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'data/hooks';
import type { FC } from 'react';
import type { TouchableOpacityProps } from 'react-native';

type LinkButtonProps = TouchableOpacityProps & {
  text: string;
  path: string;
};

export const LinkButton: FC<LinkButtonProps> = ({ text, path, ...rest }) => {
  const router = useRouter();

  const navigate = (): void => {
    router.navigate(path as unknown as 'home');
  };

  return (
    <TouchableOpacity {...rest} onPress={navigate}>
      <Text className={'text-white font-semibold'}>{text}</Text>
    </TouchableOpacity>
  );
};
