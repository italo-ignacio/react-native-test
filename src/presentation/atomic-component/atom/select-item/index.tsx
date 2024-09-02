import { TouchableOpacity } from 'react-native';
import type { FC, ReactNode } from 'react';

interface SelectItemProps {
  onPress?: () => void;
  children: ReactNode;
  active?: boolean;
}

export const SelectItem: FC<SelectItemProps> = ({ children, active, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`flex flex-row items-center justify-between p-2 min-h-[50px] ${
        active ? 'bg-gray-250' : 'bg-white'
      }`}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
