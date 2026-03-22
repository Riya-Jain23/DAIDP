import React, {useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {addWeeks, format} from 'date-fns';
import {useProgressStore} from '../../store';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from '../../theme';

interface MilestoneScreenProps {
  navigation: any;
  route: any;
}

const MilestoneScreen: React.FC<MilestoneScreenProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const weeklyStats = useProgressStore((s) => s.weeklyStats);
  const burstAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0.4)).current;

  const childName = route.params?.childName || 'Arjun';
  const milestoneType = route.params?.milestoneType || 'acceptance';
  const newAge = route.params?.newAge || 7;
  const foodCount = route.params?.foodCount || 12;
  const oldCount = Math.max(foodCount - 4, 1);
  const goalDate = format(addWeeks(new Date(), 4), 'MMM d');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(burstAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0.4,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();
  }, [burstAnim, sparkleAnim]);

  const heading =
    milestoneType === 'age'
      ? `${childName} turns ${newAge} soon`
      : `${childName} now eats ${foodCount} foods`;

  const subheading =
    milestoneType === 'age'
      ? 'New phase. New nutritional priorities. Poshan has updated the profile.'
      : `From ${oldCount} to ${foodCount} in ${weeklyStats.weeksWithPoshan} weeks. This is real progress.`;

  const sectionTitle =
    milestoneType === 'age'
      ? `What changes at age ${newAge}`
      : `What this means for ${childName}`;

  const rows = useMemo(
    () =>
      milestoneType === 'age'
        ? [
            {
              icon: '🧠',
              title: 'Brain development peaks',
              body: 'Omega-3, iron, and zinc are critical for cognitive function now.',
            },
            {
              icon: '🏃',
              title: 'Physical growth increases',
              body: 'Caloric and protein needs go up. Post-school hunger is real.',
            },
            {
              icon: '🎒',
              title: 'Tiffin quality matters more',
              body: "Poshan's tiffin suggestions have been updated for this age.",
            },
          ]
        : [
            {
              icon: '📈',
              title: 'Food variety is growing',
              body: 'More variety means more nutritional coverage — every new food counts.',
            },
            {
              icon: '✓',
              title: 'The approach is working',
              body: 'Graduated changes with no pressure are building trust with food.',
            },
            {
              icon: '→',
              title: 'Next goal',
              body: `Target: ${foodCount + 3} accepted foods by ${goalDate}.`,
            },
          ],
    [foodCount, goalDate, milestoneType],
  );

  const navigateToTab = (screen: string) => {
    navigation.navigate('Main', {screen});
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={styles.topSection}>
        <View style={styles.burstWrap}>
          {[0, 1, 2, 3, 4].map((index) => (
            <Animated.View
              key={index}
              style={[
                styles.sparkle,
                {
                  opacity: sparkleAnim,
                  transform: [
                    {scale: burstAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.4, 1],
                    })},
                    {
                      translateX: burstAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, (index - 2) * 16],
                      }),
                    },
                    {
                      translateY: burstAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, index % 2 === 0 ? -18 : 12],
                      }),
                    },
                  ],
                  backgroundColor: index % 2 === 0 ? Colors.AMBER : Colors.TEXT_INVERSE,
                },
              ]}
            />
          ))}
        </View>

        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subheading}>{subheading}</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{sectionTitle}</Text>

        {rows.map((row) => (
          <View key={row.title} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>{row.icon}</Text>
            </View>
            <View style={styles.featureCopy}>
              <Text style={styles.featureTitle}>{row.title}</Text>
              <Text style={styles.featureBody}>{row.body}</Text>
            </View>
          </View>
        ))}

        <View style={styles.confirmationPills}>
          {['Profile updated ✓', 'Tiffin plan updated ✓', 'New suggestions ready ✓'].map(
            (pill) => (
              <View key={pill} style={styles.confirmationPill}>
                <Text style={styles.confirmationPillText}>{pill}</Text>
              </View>
            ),
          )}
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              navigateToTab(milestoneType === 'age' ? 'Profile' : 'Progress')
            }>
            <Text style={styles.primaryButtonText}>
              {milestoneType === 'age'
                ? 'See updated profile →'
                : 'See Success Directory →'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigateToTab('Home')}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
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
  topSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  burstWrap: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  sparkle: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  heading: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 30,
    color: Colors.TEXT_INVERSE,
    textAlign: 'center',
  },
  subheading: {
    marginTop: 12,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 22,
  },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
    backgroundColor: Colors.SURFACE,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  panelTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.base,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.AI_BUBBLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIconText: {
    fontSize: 18,
    color: Colors.PRIMARY,
  },
  featureCopy: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  featureBody: {
    marginTop: 4,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 18,
  },
  confirmationPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  confirmationPill: {
    backgroundColor: Colors.AI_BUBBLE,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
  },
  confirmationPillText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
  bottomButtons: {
    marginTop: 20,
    gap: 8,
  },
  primaryButton: {
    height: 52,
    borderRadius: BorderRadius['2xl'],
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_INVERSE,
  },
  continueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  continueText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
  },
});

export default MilestoneScreen;
