import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';

const FEATURES = [
  {
    icon: '🧠',
    title: 'Remembers your child',
    subtitle: 'Builds a profile of what they eat, love, and refuse.',
  },
  {
    icon: '🌿',
    title: 'Works with what you already cook',
    subtitle: 'No new recipes. Small changes to existing meals.',
  },
  {
    icon: '📈',
    title: 'Shows you progress over time',
    subtitle: "Every small win logged. See how far you've come.",
  },
];

interface WelcomeScreenProps {
  navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + 16}]}>
      {/* Progress dots */}
      <View style={[styles.dotsRow, {paddingTop: insets.top + 12}]}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Green strip */}
      <View style={styles.greenStrip}>
        <Text style={styles.stepLabel}>STEP 1 OF 4</Text>
        <Text style={styles.heading}>Hi! I'm Poshan.</Text>
        <Text style={styles.subheading}>
          Your child's personal nutrition co-pilot.
        </Text>
      </View>

      {/* White panel */}
      <View style={styles.whitePanel}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
          <View style={styles.featuresContainer}>
            {FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureEmoji}>{feature.icon}</Text>
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomButton}>
          <Button
            label="Let's get started →"
            onPress={() => navigation.navigate('ChildProfile')}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 16,
    backgroundColor: Colors.PRIMARY,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.BORDER,
  },
  dotActive: {
    backgroundColor: Colors.SURFACE,
  },
  greenStrip: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  stepLabel: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.TEXT_INVERSE,
    letterSpacing: 2,
    marginBottom: Spacing.md,
  },
  heading: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 28,
    color: Colors.TEXT_INVERSE,
    textAlign: 'center',
  },
  subheading: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_INVERSE,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  whitePanel: {
    flex: 1,
    backgroundColor: Colors.BG,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  scrollContent: {
    flex: 1,
  },
  featuresContainer: {
    gap: Spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    gap: Spacing.base,
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.AI_BUBBLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureText: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  featureSubtitle: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 18,
  },
  bottomButton: {
    paddingVertical: Spacing.base,
  },
});

export default WelcomeScreen;
