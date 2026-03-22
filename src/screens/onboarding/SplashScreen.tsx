import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + 16}]}>
      <View style={styles.spacer} />

      <Animated.View style={[styles.center, {opacity: fadeAnim}]}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconEmoji}>🌿</Text>
        </View>
        <Text style={styles.appName}>Poshan</Text>
        <Text style={styles.tagline}>
          Every child deserves to grow up well fed.
        </Text>
      </Animated.View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Welcome')}
          activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Get started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {}}
          activeOpacity={0.7}>
          <Text style={styles.secondaryText}>
            Already have an account?{' '}
            <Text style={styles.signInText}>Sign in</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.madeFor}>Made for Indian families</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
  },
  spacer: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: Colors.SURFACE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 36,
  },
  appName: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 42,
    color: Colors.TEXT_INVERSE,
    marginTop: Spacing.base,
  },
  tagline: {
    fontFamily: FontFamily.BODY,
    fontStyle: 'italic',
    fontSize: FontSize.md,
    color: Colors.TEXT_INVERSE,
    opacity: 0.7,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  bottomSection: {
    alignItems: 'center',
    gap: Spacing.base,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.PRIMARY,
  },
  secondaryButton: {
    padding: Spacing.sm,
  },
  secondaryText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_INVERSE,
    opacity: 0.6,
  },
  signInText: {
    textDecorationLine: 'underline',
  },
  madeFor: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_INVERSE,
    opacity: 0.4,
  },
});

export default SplashScreen;
