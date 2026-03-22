import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Colors, FontFamily, FontSize, Spacing} from '../../theme';

interface TypingIndicatorProps {
  statusText?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({statusText}) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createBounce = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: -6,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      );

    const anim1 = createBounce(dot1, 0);
    const anim2 = createBounce(dot2, 150);
    const anim3 = createBounce(dot3, 300);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        <Animated.View style={[styles.dot, {transform: [{translateY: dot1}]}]} />
        <Animated.View style={[styles.dot, {transform: [{translateY: dot2}]}]} />
        <Animated.View style={[styles.dot, {transform: [{translateY: dot3}]}]} />
      </View>
      {statusText && (
        <Text style={styles.status}>{statusText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.base,
    marginLeft: 4,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.AI_BUBBLE,
    borderRadius: 18,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.ACCENT,
  },
  status: {
    fontFamily: FontFamily.BODY,
    fontStyle: 'italic',
    fontSize: FontSize.xs,
    color: Colors.TEXT_MUTED,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default TypingIndicator;
