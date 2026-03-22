import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Card from '../../components/ui/Card';
import {ProgressBar} from '../../components/ui';
import Tag from '../../components/ui/Tag';
import {useChildStore} from '../../store';
import {MOCK_CHILD} from '../../utils/mockData';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';

interface NutritionScoutScreenProps {
  navigation: any;
}

const STRATEGIES = [
  {
    id: '1',
    food: 'Chole (Chickpeas)',
    content: '2.9mg iron / 100g',
    suggestion:
      'Add amchur (dry mango powder) to your chole. Vitamin C triples iron absorption from plant sources.',
    action: 'Try this →',
  },
  {
    id: '2',
    food: 'Rajma (Kidney beans)',
    content: '2.1mg iron / 100g',
    suggestion:
      'Squeeze half a lemon over rajma before serving. The vitamin C boosts iron uptake significantly.',
    action: 'Add to plan →',
  },
  {
    id: '3',
    food: 'Atta Roti',
    content: '1.8mg iron / 100g',
    suggestion:
      'Switch to whole wheat atta with added bajra (pearl millet) — 8mg iron/100g. Same roti, triple the iron.',
    action: 'Add to grocery list →',
  },
];

const NutritionScoutScreen: React.FC<NutritionScoutScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child) || MOCK_CHILD;

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Iron Strategy</Text>
        <TouchableOpacity>
          <Text style={styles.bookmarkIcon}>🔖</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Context banner */}
        <View style={styles.alertBanner}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <Text style={styles.alertText}>
            {child.name}'s iron levels flagged low. Strategy uses only foods
            they already accept.
          </Text>
        </View>

        {/* Deficiency card */}
        <Card style={styles.deficiencyCard}>
          <View style={styles.deficiencyHeader}>
            <Text style={styles.deficiencyTitle}>🩸 Iron Deficiency</Text>
            <Tag label={child.dietType === 'vegetarian' ? '🌱 Veg' : '🍗 Non-veg'} variant="neutral" size="sm" />
          </View>
          <View style={styles.deficiencyStats}>
            <View style={styles.deficiencyStat}>
              <Text style={styles.statLabel}>Daily need</Text>
              <Text style={styles.statValue}>10mg</Text>
            </View>
            <View style={styles.deficiencyStat}>
              <Text style={styles.statLabel}>Est. intake</Text>
              <Text style={styles.statValue}>6mg</Text>
            </View>
            <View style={styles.deficiencyStat}>
              <Text style={[styles.statLabel, {color: Colors.ERROR}]}>Gap</Text>
              <Text style={[styles.statValue, {color: Colors.ERROR}]}>4mg</Text>
            </View>
          </View>
          <ProgressBar
            value={0.6}
            color={Colors.AMBER}
            height={8}
            label="Estimated intake: 60% of daily need"
          />
        </Card>

        {/* Section header */}
        <Text style={styles.sectionTitle}>
          What {child.name} already eats that helps
        </Text>

        {/* Food strategy cards */}
        {STRATEGIES.map((strategy) => (
          <Card key={strategy.id} leftBorder={Colors.ACCENT} style={styles.strategyCard}>
            <View style={styles.strategyHeader}>
              <Text style={styles.strategyFood}>{strategy.food}</Text>
              <Tag label={strategy.content} variant="accepted" size="sm" />
            </View>
            <Text style={styles.strategySuggestion}>{strategy.suggestion}</Text>
            <TouchableOpacity>
              <Text style={styles.strategyAction}>{strategy.action}</Text>
            </TouchableOpacity>
          </Card>
        ))}

        {/* Bottom summary */}
        <Card tinted style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            Using these three changes alone could close ~60% of {child.name}'s
            daily iron gap — without introducing any new foods.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorReport')}>
            <Text style={styles.shareLink}>Share with pediatrician →</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  backIcon: {
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
  },
  topBarTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: 17,
    color: Colors.TEXT_PRIMARY,
  },
  bookmarkIcon: {
    fontSize: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.ERROR_LIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#FECACA',
    padding: Spacing.base,
    marginHorizontal: -20,
    marginBottom: Spacing.xl,
  },
  alertIcon: {
    fontSize: 16,
    marginTop: 2,
  },
  alertText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
    flex: 1,
    lineHeight: 20,
  },
  deficiencyCard: {
    marginBottom: Spacing.xl,
  },
  deficiencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  deficiencyTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.TEXT_PRIMARY,
  },
  deficiencyStats: {
    flexDirection: 'row',
    gap: Spacing.xl,
    marginBottom: Spacing.base,
  },
  deficiencyStat: {
    gap: 2,
  },
  statLabel: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
  },
  statValue: {
    fontFamily: FontFamily.BODY_BOLD,
    fontSize: FontSize.xl,
    color: Colors.TEXT_PRIMARY,
  },
  sectionTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Spacing.base,
  },
  strategyCard: {
    marginBottom: Spacing.md,
  },
  strategyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  strategyFood: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  strategySuggestion: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  strategyAction: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
  summaryCard: {
    marginTop: Spacing.md,
  },
  summaryText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  shareLink: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.PRIMARY,
  },
});

export default NutritionScoutScreen;
