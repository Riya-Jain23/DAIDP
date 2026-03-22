import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing, Shadows} from '../../theme';

interface TimelineEntryProps {
  date: string;
  foodName: string;
  description: string;
  status: 'accepted' | 'progress' | 'refused' | 'streak';
  streakCount?: number;
  showConnector?: boolean;
  onPress?: () => void;
}

const statusConfig = {
  accepted: {label: 'Accepted', bg: Colors.AI_BUBBLE, text: Colors.PRIMARY},
  progress: {label: 'In progress', bg: Colors.AMBER_LIGHT, text: '#D97706'},
  refused: {label: 'Refused', bg: Colors.ERROR_LIGHT, text: Colors.ERROR},
  streak: {label: 'Streak', bg: Colors.AI_BUBBLE, text: Colors.PRIMARY},
};

const TimelineEntry: React.FC<TimelineEntryProps> = ({
  date,
  foodName,
  description,
  status,
  streakCount,
  showConnector = true,
  onPress,
}) => {
  const config = statusConfig[status];
  const tagLabel = status === 'streak' ? `Streak: ${streakCount}x` : config.label;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}>
      <View style={styles.leftColumn}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.dotContainer}>
          <View style={styles.dot} />
          {showConnector && <View style={styles.connector} />}
        </View>
      </View>
      <View style={[styles.card, Shadows.card]}>
        <Text style={styles.foodName}>{foodName}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={[styles.tag, {backgroundColor: config.bg}]}>
          <Text style={[styles.tagText, {color: config.text}]}>{tagLabel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.md,
    minHeight: 100,
  },
  leftColumn: {
    width: 50,
    alignItems: 'center',
  },
  date: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_MUTED,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  dotContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.ACCENT,
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.ACCENT,
    marginTop: 2,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  foodName: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  description: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 18,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.xs,
  },
  tagText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.xs,
  },
});

export default TimelineEntry;
