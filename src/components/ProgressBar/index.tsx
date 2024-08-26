import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { styles } from "./styles";
import { useEffect } from "react";

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 100);

  const sharedProgress = useSharedValue(percentage);

  const styleAnimated = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`
    }
  })

  /**
   * usando o useEffect para observar quando
   * essa propriedade "percentage" mudar o valor
   * atualizará o valor do sharedProgress
   */
  useEffect(() => {
    sharedProgress.value = withTiming(percentage, { duration: 500 });
  }, [current]);

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, styleAnimated]} />
    </View>
  );
}
