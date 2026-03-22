import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {ProgressBar} from '../../components/ui';
import {useChildStore} from '../../store';
import {MOCK_CHILD} from '../../utils/mockData';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows} from '../../theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const TIFFIN_DATA: Record<string, {compartments: {icon: string; color: string; food: string; note: string; noteColor: string}[]; ironEstimate: number}> = {
  Mon: {
    compartments: [
      {icon: '🥪', color: '#FEF3C7', food: 'Chole sandwich', note: 'Ate this last week ✓', noteColor: Colors.ACCENT},
      {icon: '🍎', color: '#FEE2E2', food: 'Apple slices + chaat masala', note: 'Loves this combo', noteColor: Colors.ACCENT},
      {icon: '🥛', color: '#DBEAFE', food: 'Buttermilk', note: 'Good calcium source', noteColor: Colors.TEXT_SECONDARY},
    ],
    ironEstimate: 0.35,
  },
  Tue: {
    compartments: [
      {icon: '🫓', color: '#FEF3C7', food: 'Stuffed atta paratha', note: 'Added hidden dal', noteColor: Colors.ACCENT},
      {icon: '🥒', color: '#D1FAE5', food: 'Cucumber raita', note: 'New suggestion', noteColor: Colors.TEXT_SECONDARY},
      {icon: '🍌', color: '#FEF3C7', food: 'Banana', note: 'Easy win', noteColor: Colors.ACCENT},
    ],
    ironEstimate: 0.42,
  },
  Wed: {
    compartments: [
      {icon: '🍚', color: '#EDE9FE', food: 'Curd rice + pomegranate', note: 'Favourite combo', noteColor: Colors.ACCENT},
      {icon: '🥕', color: '#FFEDD5', food: 'Carrot sticks', note: 'May need encouragement', noteColor: Colors.TEXT_SECONDARY},
      {icon: '🧃', color: '#D1FAE5', food: 'Amla juice (diluted)', note: 'Iron absorption boost', noteColor: Colors.ACCENT},
    ],
    ironEstimate: 0.28,
  },
  Thu: {
    compartments: [
      {icon: '🧆', color: '#FEF3C7', food: 'Rajma tikki', note: 'High iron ✓', noteColor: Colors.ACCENT},
      {icon: '🫓', color: '#FEE2E2', food: 'Mini roti', note: 'Use bajra atta', noteColor: Colors.TEXT_SECONDARY},
      {icon: '🍇', color: '#EDE9FE', food: 'Grapes', note: 'Easy fruit', noteColor: Colors.ACCENT},
    ],
    ironEstimate: 0.5,
  },
  Fri: {
    compartments: [
      {icon: '🥞', color: '#FEF3C7', food: 'Banana atta pancake', note: 'Streak: 4x ✓', noteColor: Colors.ACCENT},
      {icon: '🥜', color: '#FFEDD5', food: 'Peanut chikki', note: 'Good protein', noteColor: Colors.TEXT_SECONDARY},
      {icon: '🥛', color: '#DBEAFE', food: 'Milk with turmeric', note: 'Calcium + Vit D', noteColor: Colors.ACCENT},
    ],
    ironEstimate: 0.38,
  },
};

interface TiffinPlannerScreenProps {
  navigation: any;
}

const TiffinPlannerScreen: React.FC<TiffinPlannerScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child) || MOCK_CHILD;
  const [selectedDay, setSelectedDay] = useState('Mon');
  const dayData = TIFFIN_DATA[selectedDay];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Tiffin Planner</Text>
        <View style={{width: 22}} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Context strip */}
        <View style={styles.contextStrip}>
          <Text style={styles.contextText}>
            Based on {child.name}'s profile — {child.dietType},{' '}
            {child.medicalFlags.length > 0 ? child.medicalFlags.join(', ') : 'no flags'},{' '}
            likes {child.acceptedFoods.slice(0, 2).map((f) => f.name).join(' & ')}
          </Text>
        </View>

        {/* Day selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dayScroll}
          contentContainerStyle={styles.dayContent}>
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayPill,
                selectedDay === day && styles.dayPillActive,
              ]}
              onPress={() => setSelectedDay(day)}>
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day && styles.dayTextActive,
                ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tiffin card */}
        <Card style={styles.tiffinCard}>
          <Text style={styles.dayLabel}>
            {selectedDay.toUpperCase()} TIFFIN
          </Text>

          {dayData.compartments.map((comp, index) => (
            <View key={index} style={styles.compartmentRow}>
              <View style={[styles.compartmentIcon, {backgroundColor: comp.color}]}>
                <Text style={styles.compartmentEmoji}>{comp.icon}</Text>
              </View>
              <View style={styles.compartmentInfo}>
                <Text style={styles.compartmentFood}>{comp.food}</Text>
                <Text style={[styles.compartmentNote, {color: comp.noteColor}]}>
                  {comp.note}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.ironEstimate}>
            <ProgressBar
              value={dayData.ironEstimate}
              color={Colors.AMBER}
              height={6}
              label={`Iron: ${Math.round(dayData.ironEstimate * 100)}% of daily need covered`}
            />
          </View>
        </Card>

        {/* Action buttons */}
        <View style={styles.actions}>
          <Button label="Regenerate" variant="outlined" onPress={() => {}} />
          <Button label="Save this tiffin" onPress={() => {}} />
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  contextStrip: {
    backgroundColor: Colors.AI_BUBBLE,
    padding: Spacing.base,
    marginHorizontal: -20,
    marginBottom: Spacing.base,
  },
  contextText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  dayScroll: {
    marginBottom: Spacing.xl,
  },
  dayContent: {
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  dayPill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.SURFACE,
  },
  dayPillActive: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  dayText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  dayTextActive: {
    color: Colors.TEXT_INVERSE,
  },
  tiffinCard: {
    marginBottom: Spacing.xl,
  },
  dayLabel: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
    letterSpacing: 1,
    marginBottom: Spacing.base,
  },
  compartmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.base,
  },
  compartmentIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compartmentEmoji: {
    fontSize: 20,
  },
  compartmentInfo: {
    flex: 1,
    gap: 2,
  },
  compartmentFood: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  compartmentNote: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
  },
  ironEstimate: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
});

export default TiffinPlannerScreen;
