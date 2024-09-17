/* eslint-disable import/no-named-as-default */
import { StyleSheet, Text, View } from 'react-native';
import { colors } from 'presentation/style';
import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import type { FC } from 'react';

interface SpeedometerProps {
  value: number;
  maxValue: number;
  unit: string;
}

export const Speedometer: FC<SpeedometerProps> = ({ maxValue, unit, value }) => {
  const radius = 50;
  const pointerLength = 40;

  const newValue = Math.min(value < 0 ? 0 : value, maxValue);
  const newValue2 = value > 30 ? 10 : 20;

  const angle = (newValue / maxValue) * 180 - 180;
  const pointerX = 70 + pointerLength * Math.cos((angle * Math.PI) / 180);
  const pointerY = 70 + pointerLength * Math.sin((angle * Math.PI) / 180);

  const circumference = Math.PI * radius + newValue2;
  const strokeDashoffset = circumference * (1 - newValue / maxValue);

  return (
    <View style={styles.container}>
      <Svg className={'ml-2.5'} height={'70'} viewBox={'0 0 150 70'} width={'150'}>
        <Circle
          cx={'70'}
          cy={'70'}
          fill={'none'}
          r={radius}
          stroke={'#d3d3d3'}
          strokeWidth={'14'}
          transform={'rotate(-90 70 70)'}
        />

        <Circle
          cx={'70'}
          cy={'70'}
          fill={'none'}
          r={radius}
          stroke={colors.primary}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap={'round'}
          strokeWidth={'14'}
          transform={'rotate(170 70 70)'}
        />

        <Line stroke={'red'} strokeWidth={'4'} x1={'70'} x2={pointerX} y1={'68'} y2={pointerY} />
      </Svg>

      <Text style={styles.text}>
        {value < 0 ? 0 : value} {unit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600'
  }
});
