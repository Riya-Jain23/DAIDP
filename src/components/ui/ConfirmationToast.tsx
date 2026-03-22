import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Shadows,
  Spacing,
} from '../../theme';

interface ConfirmationToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'info';
  onHide?: () => void;
}

const ConfirmationToast: React.FC<ConfirmationToastProps> = ({
  visible,
  message,
  type = 'success',
  onHide,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    if (!visible) {
      opacity.setValue(0);
      translateY.setValue(16);
      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 16,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished) {
          onHide?.();
        }
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onHide, opacity, translateY, visible]);

  if (!visible) {
    return null;
  }

  const isSuccess = type === 'success';

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        isSuccess ? styles.success : styles.info,
        {
          opacity,
          transform: [{translateY}],
        },
      ]}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{isSuccess ? '✓' : 'i'}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 80,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    zIndex: 20,
    ...Shadows.card,
  },
  success: {
    backgroundColor: Colors.PRIMARY,
  },
  info: {
    backgroundColor: Colors.TEXT_PRIMARY,
  },
  iconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.TEXT_INVERSE,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.BODY_BOLD,
  },
  message: {
    flex: 1,
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
    color: Colors.TEXT_INVERSE,
  },
});

export default ConfirmationToast;
