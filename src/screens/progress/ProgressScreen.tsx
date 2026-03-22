import React from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Card from '../../components/ui/Card';
import {ProgressBar} from '../../components/ui';
import {SectionHeader} from '../../components/layout';
import {TimelineEntry} from '../../components/progress';
import Button from '../../components/ui/Button';
import {useChildStore, useProgressStore} from '../../store';
import {MOCK_CHILD, MOCK_SUCCESS_DIRECTORY, MOCK_WEEKLY_STATS} from '../../utils/mockData';
import {formatDate} from '../../utils/formatting';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows} from '../../theme';

// Empty state
const EmptyProgressScreen: React.FC<{onLogMeal: () => void}> = ({onLogMeal}) => (
  <View style={emptyStyles.container}>
    <Text style={emptyStyles.icon}>📊</Text>
    <Text style={emptyStyles.heading}>No progress yet</Text>
    <Text style={emptyStyles.subheading}>
      Start logging meals and Poshan will track every win, every attempt, and
      every step forward.
    </Text>
    <Button label="Log your first meal →" onPress={onLogMeal} />
  </View>
);

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  icon: {
    fontSize: 48,
    marginBottom: Spacing.base,
  },
  heading: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Spacing.sm,
  },
  subheading: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
    lineHeight: 20,
  },
});

// Main Progress Screen
interface ProgressScreenProps {
  navigation: any;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child) || MOCK_CHILD;
  const storeEntries = useProgressStore((s) => s.successDirectory);
  const entries = storeEntries.length > 0 ? storeEntries : MOCK_SUCCESS_DIRECTORY;
  const stats = MOCK_WEEKLY_STATS;
  const showEmpty = false; // Toggle for testing empty state

  if (showEmpty) {
    return (
      <View style={[styles.container, {paddingTop: insets.top}]}>
        <EmptyProgressScreen onLogMeal={() => navigation.navigate('LogMeal')} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={styles.heading}>{child.name}'s Progress</Text>
        <Text style={styles.subheading}>
          {stats.weeksWithPoshan} weeks with Poshan
        </Text>

        {/* Summary strip */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, {backgroundColor: Colors.AI_BUBBLE}]}>
            <Text style={[styles.statNumber, {color: Colors.PRIMARY}]}>
              {stats.totalAccepted}
            </Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor: Colors.AMBER_LIGHT}]}>
            <Text style={[styles.statNumber, {color: '#D97706'}]}>
              {stats.inProgress}
            </Text>
            <Text style={styles.statLabel}>In progress</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor: Colors.AI_BUBBLE}]}>
            <Text style={[styles.statNumber, {color: Colors.PRIMARY}]}>
              +{stats.changeVs4Weeks}
            </Text>
            <Text style={styles.statLabel}>vs. 4 wks</Text>
          </View>
        </View>

        {/* Weekly insight */}
        <Card style={styles.insightCard}>
          <Text style={styles.insightTitle}>This week's focus</Text>
          <Text style={styles.insightText}>
            Dal exposure is at 6 of ~12. Keep placing small amounts near accepted
            foods. Consistency matters more than quantity right now.
          </Text>
          <View style={styles.exposureBar}>
            <ProgressBar
              value={6 / 12}
              color={Colors.AMBER}
              height={8}
              label="6 of ~12 exposures"
            />
          </View>
        </Card>

        {/* Success Directory timeline */}
        <SectionHeader title="Success Directory" emoji="🏆" />
        {entries.map((entry, index) => (
          <TimelineEntry
            key={entry.id}
            date={formatDate(entry.date)}
            foodName={entry.foodName}
            description={entry.description}
            status={entry.status}
            streakCount={entry.streakCount}
            showConnector={index < entries.length - 1}
            onPress={() =>
              navigation.navigate('FoodDetail', {
                foodId: entry.foodId,
                foodName: entry.foodName,
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: Spacing.base,
  },
  heading: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
  },
  subheading: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    marginTop: 4,
    marginBottom: Spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: FontFamily.BODY_BOLD,
    fontSize: FontSize['2xl'],
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
  },
  insightCard: {
    marginBottom: Spacing.xl,
  },
  insightTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Spacing.sm,
  },
  insightText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: Spacing.base,
  },
  exposureBar: {
    marginTop: Spacing.xs,
  },
});

export default ProgressScreen;
