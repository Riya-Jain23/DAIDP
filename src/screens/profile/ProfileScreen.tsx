import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Tag from '../../components/ui/Tag';
import {useChildStore, useAppStore} from '../../store';
import {MOCK_CHILD} from '../../utils/mockData';
import {getAgeLabel, getDietLabel} from '../../utils/formatting';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows} from '../../theme';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child) || MOCK_CHILD;
  const parentName = useAppStore((s) => s.parentName);

  const settingsItems = [
    {label: 'Weekly report', icon: '🗞️', onPress: () => navigation.navigate('WeeklyReport')},
    {label: 'Share with doctor', icon: '🩺', onPress: () => navigation.navigate('DoctorReport')},
    {label: 'Explore nutrition tips', icon: '🧭', onPress: () => navigation.navigate('Explore')},
    {label: 'Notifications', icon: '🔔', onPress: () => navigation.navigate('Notifications')},
    {label: 'About Poshan', icon: '🌿', onPress: () => {}},
  ];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Avatar name={child.name} size={64} />
          <Text style={styles.childName}>{child.name}</Text>
          <Text style={styles.childMeta}>
            {getAgeLabel(child.ageGroup)} · {getDietLabel(child.dietType)}
          </Text>
        </View>

        {/* Profile details */}
        <Card style={styles.detailCard}>
          <Text style={styles.cardTitle}>Foods they love</Text>
          <View style={styles.tagsWrap}>
            {child.acceptedFoods.map((food) => (
              <Tag key={food.id} label={food.name} variant="accepted" />
            ))}
          </View>
        </Card>

        <Card style={styles.detailCard}>
          <Text style={styles.cardTitle}>Foods they refuse</Text>
          <View style={styles.tagsWrap}>
            {child.refusedFoods.map((food) => (
              <Tag key={food.id} label={food.name} variant="refused" />
            ))}
          </View>
        </Card>

        <Card style={styles.detailCard}>
          <Text style={styles.cardTitle}>Health flags</Text>
          <View style={styles.tagsWrap}>
            {child.medicalFlags.length > 0 ? (
              child.medicalFlags.map((flag) => (
                <Tag key={flag} label={flag} variant="progress" />
              ))
            ) : (
              <Text style={styles.emptyText}>No health flags set</Text>
            )}
          </View>
        </Card>

        {/* Settings section */}
        <Text style={styles.sectionTitle}>Settings</Text>
        {settingsItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.settingsRow}
            activeOpacity={0.7}
            onPress={item.onPress}>
            <Text style={styles.settingsIcon}>{item.icon}</Text>
            <Text style={styles.settingsLabel}>{item.label}</Text>
            <Text style={styles.settingsChevron}>›</Text>
          </TouchableOpacity>
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
    paddingBottom: 100,
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
    gap: Spacing.sm,
  },
  childName: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 26,
    color: Colors.TEXT_PRIMARY,
  },
  childMeta: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
  },
  detailCard: {
    marginHorizontal: 20,
    marginBottom: Spacing.base,
  },
  cardTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Spacing.md,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  emptyText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_MUTED,
  },
  sectionTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.TEXT_PRIMARY,
    paddingHorizontal: 20,
    marginTop: Spacing.xl,
    marginBottom: Spacing.base,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    gap: Spacing.md,
  },
  settingsIcon: {
    fontSize: 18,
  },
  settingsLabel: {
    flex: 1,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.lg,
    color: Colors.TEXT_PRIMARY,
  },
  settingsChevron: {
    fontSize: 22,
    color: Colors.TEXT_MUTED,
  },
});

export default ProfileScreen;
