import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';

interface ProgressBarProps {
  value: number; // 0–1
  color?: string;
  trackColor?: string;
  height?: number;
  animated?: boolean;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = Colors.PRIMARY,
  trackColor = Colors.BORDER,
  height = 6,
  animated = true,
  label,
}) => {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(animValue, {
        toValue: Math.min(Math.max(value, 0), 1),
        duration: 800,
        useNativeDriver: false,
      }).start();
    } else {
      animValue.setValue(value);
    }
  }, [value, animated, animValue]);

  const width = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={[styles.track, {height, backgroundColor: trackColor, borderRadius: height / 2}]}>
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              backgroundColor: color,
              borderRadius: height / 2,
              width,
            },
          ]}
        />
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  label: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
    marginTop: Spacing.xs,
  },
});

export default ProgressBar;
