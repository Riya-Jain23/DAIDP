import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import {useChildStore} from '../../store';
import {getAgeLabel, getDietLabel} from '../../utils/formatting';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';

interface CompletionScreenProps {
  navigation: any;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child);

  const handleStart = () => {
    navigation.navigate('LinkGrocery');
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom + 16}]}>
      {/* Progress dots */}
      <View style={styles.dotsRow}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
      </View>

      <View style={styles.content}>
        {/* Check icon */}
        <View style={styles.checkCircle}>
          <Text style={styles.checkEmoji}>✓</Text>
        </View>

        <Text style={styles.heading}>
          {child?.name ? `${child.name}'s profile is ready.` : 'Profile is ready.'}
        </Text>
        <Text style={styles.subheading}>
          Poshan now knows enough to start helping. It gets smarter every time
          you use it.
        </Text>

        {/* Profile summary */}
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Age</Text>
            <Text style={styles.summaryValue}>
              {child?.ageGroup ? getAgeLabel(child.ageGroup) : '—'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Diet</Text>
            <Text style={styles.summaryValue}>
              {child?.dietType ? getDietLabel(child.dietType) : '—'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Loves</Text>
            <Text style={styles.summaryValue} numberOfLines={1}>
              {child?.acceptedFoods.map((f) => f.name).join(', ') || '—'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Health flags</Text>
            <Text style={styles.summaryValue} numberOfLines={1}>
              {child?.medicalFlags.join(', ') || 'None'}
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.bottomButton}>
        <Button
          label="Start using Poshan →"
          onPress={handleStart}
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
    paddingHorizontal: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.BORDER,
  },
  dotActive: {
    backgroundColor: Colors.PRIMARY,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.AI_BUBBLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  checkEmoji: {
    fontSize: 32,
    color: Colors.PRIMARY,
    fontWeight: '700',
  },
  heading: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 26,
    color: Colors.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subheading: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing['2xl'],
  },
  summaryCard: {
    width: '100%',
    padding: Spacing.base,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  summaryLabel: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
  },
  summaryValue: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    flex: 1,
    textAlign: 'right',
    marginLeft: Spacing.base,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.BORDER,
  },
  bottomButton: {
    paddingVertical: Spacing.base,
  },
});

export default CompletionScreen;
