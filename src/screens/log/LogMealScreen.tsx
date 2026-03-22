import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ConfirmationToast} from '../../components/ui';
import {useChildStore, useProgressStore} from '../../store';
import {MOCK_CHILD} from '../../utils/mockData';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';

const OUTCOMES = [
  {emoji: '😊', label: 'Ate it all', value: 'ate_all' as const},
  {emoji: '😐', label: 'A few bites', value: 'few_bites' as const},
  {emoji: '😤', label: 'Refused', value: 'refused' as const},
  {emoji: '🤷', label: "Didn't try", value: 'didnt_try' as const},
];

interface LogMealScreenProps {
  navigation: any;
  route: any;
}

const LogMealScreen: React.FC<LogMealScreenProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child) || MOCK_CHILD;
  const addSuccess = useProgressStore((s) => s.addSuccess);
  const [food, setFood] = useState('');
  const [outcome, setOutcome] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (route.params?.prefillFood) {
      setFood(route.params.prefillFood);
    }
    if (route.params?.prefillOutcome) {
      setOutcome(route.params.prefillOutcome);
    }
    if (route.params?.prefillNote) {
      setNote(route.params.prefillNote);
    }
  }, [route.params]);

  const handleSave = () => {
    if (!food.trim()) {
      return;
    }

    const selectedOutcome = outcome || 'few_bites';
    const status =
      selectedOutcome === 'ate_all'
        ? 'accepted'
        : selectedOutcome === 'refused'
          ? 'refused'
          : 'progress';
    const defaultDescription =
      selectedOutcome === 'ate_all'
        ? 'Ate the full portion.'
        : selectedOutcome === 'refused'
          ? 'Refused this attempt.'
          : 'Took a few bites.';

    addSuccess({
      id: Date.now().toString(),
      foodId: food.trim().toLowerCase().replace(/\s+/g, '_'),
      foodName: food.trim(),
      date: new Date().toISOString(),
      description: note.trim() || defaultDescription,
      status,
    });

    setShowToast(true);

    setTimeout(() => {
      navigation.goBack();
    }, 700);
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Log a meal</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* What was served */}
        <Text style={styles.sectionLabel}>What was served?</Text>
        <TextInput
          style={styles.foodInput}
          value={food}
          onChangeText={setFood}
          placeholder="What did you serve?"
          placeholderTextColor={Colors.TEXT_MUTED}
          multiline
        />

        {/* Quick-add chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContent}>
          {child.acceptedFoods.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={styles.chip}
              onPress={() => setFood((prev) => (prev ? `${prev}, ${f.name}` : f.name))}>
              <Text style={styles.chipText}>{f.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Outcome grid */}
        <Text style={styles.sectionLabel}>What happened?</Text>
        <View style={styles.outcomeGrid}>
          {OUTCOMES.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.outcomeCell,
                outcome === item.value && styles.outcomeCellActive,
              ]}
              onPress={() => setOutcome(item.value)}
              activeOpacity={0.7}>
              <Text style={styles.outcomeEmoji}>{item.emoji}</Text>
              <Text style={styles.outcomeLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note */}
        <Text style={styles.sectionLabel}>Any notes? (optional)</Text>
        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={setNote}
          placeholder="How did it go?"
          placeholderTextColor={Colors.TEXT_MUTED}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        {/* Photo area */}
        <Text style={styles.sectionLabel}>Add a photo (optional)</Text>
        <TouchableOpacity style={styles.photoArea}>
          <Text style={styles.photoIcon}>📷</Text>
          <Text style={styles.photoText}>Tap to add photo</Text>
        </TouchableOpacity>
      </ScrollView>

      <ConfirmationToast
        visible={showToast}
        message="Meal saved"
        onHide={() => setShowToast(false)}
      />
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
  saveText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.PRIMARY,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: Spacing.xl,
  },
  sectionLabel: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  foodInput: {
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.lg,
    color: Colors.TEXT_PRIMARY,
    minHeight: 56,
  },
  chipsScroll: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  chipsContent: {
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.AI_BUBBLE,
    marginRight: Spacing.sm,
  },
  chipText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
  outcomeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  outcomeCell: {
    width: '47%',
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.BORDER,
    padding: Spacing.base,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  outcomeCellActive: {
    borderColor: Colors.ACCENT,
    backgroundColor: Colors.AI_BUBBLE,
  },
  outcomeEmoji: {
    fontSize: 32,
  },
  outcomeLabel: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
  },
  noteInput: {
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    minHeight: 80,
  },
  photoArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.BORDER,
    borderRadius: BorderRadius.lg,
    padding: Spacing['2xl'],
    alignItems: 'center',
    gap: Spacing.sm,
  },
  photoIcon: {
    fontSize: 32,
  },
  photoText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_MUTED,
  },
});

export default LogMealScreen;
