import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Card from '../../components/ui/Card';
import Tag from '../../components/ui/Tag';
import Avatar from '../../components/ui/Avatar';
import {SectionHeader} from '../../components/layout';
import {useChildStore, useProgressStore, useAppStore} from '../../store';
import {getGreeting, getAgeLabel, getDietLabel, formatDate} from '../../utils/formatting';
import {MOCK_NUDGE, MOCK_SUCCESS_DIRECTORY, MOCK_WEEKLY_STATS, MOCK_CHILD} from '../../utils/mockData';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows} from '../../theme';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child) || MOCK_CHILD;
  const parentName = useAppStore((s) => s.parentName);
  const successDirectory = useProgressStore((s) => s.successDirectory);
  const entries = successDirectory.length > 0 ? successDirectory : MOCK_SUCCESS_DIRECTORY;
  const stats = MOCK_WEEKLY_STATS;

  const quickActions = [
    {icon: '💬', label: 'Ask Poshan', screen: 'Chat'},
    {icon: '🍽️', label: 'Log a meal', screen: 'LogMeal'},
    {icon: '📦', label: 'Tiffin', screen: 'Tiffin'},
    {icon: '🧭', label: 'Explore', screen: 'Explore'},
  ];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <View style={styles.greetingRow}>
            <Text style={styles.greeting}>{getGreeting()}, {parentName} 👋</Text>
          </View>
          <View style={styles.topRight}>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Text style={styles.bellIcon}>🔔</Text>
            </TouchableOpacity>
            <Avatar name={child.name} size={36} />
          </View>
        </View>

        {/* Child context card */}
        <Card style={styles.childCard}>
          <Text style={styles.childContext}>
            {child.name} · {getAgeLabel(child.ageGroup)} · {getDietLabel(child.dietType)}
          </Text>
          <View style={styles.statChips}>
            <View style={[styles.statChip, {backgroundColor: Colors.AI_BUBBLE}]}>
              <Text style={[styles.statNumber, {color: Colors.PRIMARY}]}>{stats.totalAccepted}</Text>
              <Text style={styles.statLabel}>accepted</Text>
            </View>
            <View style={[styles.statChip, {backgroundColor: Colors.AMBER_LIGHT}]}>
              <Text style={[styles.statNumber, {color: '#D97706'}]}>{stats.inProgress}</Text>
              <Text style={styles.statLabel}>in progress</Text>
            </View>
            {child.medicalFlags.length > 0 && (
              <View style={[styles.statChip, {backgroundColor: Colors.ERROR_LIGHT}]}>
                <Text style={[styles.statNumber, {color: Colors.ERROR}]}>⚠️</Text>
                <Text style={styles.statLabel}>{child.medicalFlags[0]}</Text>
              </View>
            )}
          </View>
        </Card>

        {/* Today's nudge */}
        <Card leftBorder={Colors.PRIMARY} tinted style={styles.nudgeCard}>
          <Text style={styles.nudgeLabel}>{MOCK_NUDGE.label}</Text>
          <Text style={styles.nudgeText}>{MOCK_NUDGE.text}</Text>
          <View style={styles.nudgeActions}>
            <TouchableOpacity style={styles.nudgeButtonOutlined} activeOpacity={0.7}>
              <Text style={styles.nudgeButtonOutlinedText}>✓ Tried it</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nudgeButtonFilled}
              onPress={() => navigation.navigate('Chat')}
              activeOpacity={0.7}>
              <Text style={styles.nudgeButtonFilledText}>Tell me more →</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Success Directory preview */}
        <View style={styles.section}>
          <SectionHeader
            title="Recent wins"
            emoji="🏆"
            actionLabel="See all →"
            onAction={() => navigation.navigate('Progress')}
          />
          {entries.slice(0, 3).map((entry) => (
            <View key={entry.id} style={styles.successRow}>
              <View style={styles.greenDot} />
              <Text style={styles.successDate}>{formatDate(entry.date)}</Text>
              <Text style={styles.successFood}>{entry.foodName}</Text>
              <Text style={styles.successResult} numberOfLines={1}>
                {entry.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick actions */}
        <View style={styles.section}>
          <SectionHeader title="Quick actions" />
          <View style={styles.quickActionsRow}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.label}
                style={styles.quickAction}
                onPress={() => navigation.navigate(action.screen)}
                activeOpacity={0.7}>
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.base,
  },
  greetingRow: {
    flex: 1,
  },
  greeting: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.TEXT_PRIMARY,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  bellIcon: {
    fontSize: 22,
  },
  childCard: {
    marginBottom: Spacing.base,
  },
  childContext: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  statChips: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.sm,
  },
  statNumber: {
    fontFamily: FontFamily.BODY_BOLD,
    fontSize: FontSize.base,
  },
  statLabel: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
  },
  nudgeCard: {
    marginBottom: Spacing.xl,
  },
  nudgeLabel: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.PRIMARY,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  nudgeText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 22,
    marginBottom: Spacing.base,
  },
  nudgeActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  nudgeButtonOutlined: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  nudgeButtonOutlinedText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
  nudgeButtonFilled: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.PRIMARY,
  },
  nudgeButtonFilledText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
    color: Colors.TEXT_INVERSE,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.ACCENT,
  },
  successDate: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_MUTED,
    minWidth: 56,
  },
  successFood: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
  },
  successResult: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
    flex: 1,
    textAlign: 'right',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    flexWrap: 'wrap',
  },
  quickAction: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: Colors.AI_BUBBLE,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    maxHeight: 90,
  },
  quickActionIcon: {
    fontSize: 28,
  },
  quickActionLabel: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.xs,
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
});

export default HomeScreen;
