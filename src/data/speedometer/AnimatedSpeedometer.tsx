import { Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Speedometer from './Speedometer';
import type { EasingFunction } from 'react-native';
import type { SpeedometerProps } from './Speedometer';

class ClassBasedSpeedometer extends React.Component {
  constructor(props: SpeedometerProps) {
    super(props);
  }

  render() {
    return <Speedometer {...this.props}>{this.props.children}</Speedometer>;
  }
}

const ASpeedometer = Animated.createAnimatedComponent(ClassBasedSpeedometer);

interface AnimatedSpeedometerProps extends SpeedometerProps {
  preFill?: number;
  duration?: number;
  easing?: EasingFunction;
  onFillChange?: (value: number) => void;
  onAnimationComplete?: () => void;
  useNativeDriver?: boolean;
}

export default function AnimatedSpeedometer({
  duration = 300,
  easing = Easing.out(Easing.ease),
  preFill = 0,
  useNativeDriver = false,
  onFillChange = () => {},
  onAnimationComplete = () => {},
  value = 0,
  ...rest
}: AnimatedSpeedometerProps) {
  const fillAnimation = useRef(new Animated.Value(preFill));

  useEffect(() => {
    animate(value);
  }, []);

  useEffect(() => {
    animate(value);
  }, [value]);

  function animate(toVal: number) {
    const toValue = toVal >= 0 ? toVal : value;

    const anim = Animated.timing(fillAnimation.current, {
      duration,
      easing,
      toValue,
      useNativeDriver
    });

    anim.start(onAnimationComplete);

    return anim;
  }

  return <ASpeedometer {...rest} value={fillAnimation.current} />;
}
