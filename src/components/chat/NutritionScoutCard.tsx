import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';
import {NutritionScoutData} from '../../types/chat';

interface NutritionScoutCardProps {
  data: NutritionScoutData;
  onPress?: () => void;
}

const NutritionScoutCard: React.FC<NutritionScoutCardProps> = ({data, onPress}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>🔍 Nutrition Scout activated</Text>
      <Text style={styles.body}>{data.summary}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.link}>
            See {data.flag} strategy →
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  header: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
  body: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 18,
  },
  link: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
    marginTop: 2,
  },
});

export default NutritionScoutCard;
