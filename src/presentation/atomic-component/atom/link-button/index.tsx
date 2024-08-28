import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'data/hooks';
import type { FC } from 'react';
import type { TouchableOpacityProps } from 'react-native';

type LinkButtonProps = TouchableOpacityProps & {
  text: string;
  path: string;
  color?: 'primary' | 'white';
};

export const LinkButton: FC<LinkButtonProps> = ({ text, color, path, ...rest }) => {
  const router = useRouter();

  const navigate = (): void => {
    router.navigate(path as unknown as 'home');
  };

  return (
    <TouchableOpacity {...rest} onPress={navigate}>
      <Text className={`font-semibold ${color === 'white' ? 'text-white' : 'text-primary'}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
