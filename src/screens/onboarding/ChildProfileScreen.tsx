import React, {useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FoodTagInput} from '../../components/forms';
import {useChildStore} from '../../store';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';

const AGE_OPTIONS = [
  {value: '0-2', label: 'Under 2'},
  {value: '2-4', label: '2–4 yrs'},
  {value: '5-7', label: '5–7 yrs'},
  {value: '8-10', label: '8–10 yrs'},
];

const DIET_OPTIONS = [
  {value: 'vegetarian', label: 'Vegetarian'},
  {value: 'non-vegetarian', label: 'Non-vegetarian'},
];

interface ChildProfileScreenProps {
  navigation: any;
}

const ChildProfileScreen: React.FC<ChildProfileScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child);
  const setName = useChildStore((s) => s.setName);
  const setAgeGroup = useChildStore((s) => s.setAgeGroup);
  const setDietType = useChildStore((s) => s.setDietType);
  const addAcceptedFood = useChildStore((s) => s.addAcceptedFood);
  const removeAcceptedFood = useChildStore((s) => s.removeAcceptedFood);
  const addRefusedFood = useChildStore((s) => s.addRefusedFood);
  const removeRefusedFood = useChildStore((s) => s.removeRefusedFood);

  useEffect(() => {
    if (!child) {
      setName('');
    }
  }, []);

  const canContinue = child && child.name.trim().length > 0 && child.ageGroup;

  const handleAddAccepted = (name: string) => {
    addAcceptedFood({
      id: Date.now().toString(),
      name,
      addedAt: new Date().toISOString(),
    });
  };

  const handleAddRefused = (name: string) => {
    addRefusedFood({
      id: Date.now().toString(),
      name,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Progress dots */}
      <View style={styles.dotsRow}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Tell me about your child</Text>
        <Text style={styles.subheading}>
          Poshan remembers everything. The more you share, the smarter it gets.
        </Text>

        {/* Name */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Child's name</Text>
          <TextInput
            style={styles.textInput}
            value={child?.name || ''}
            onChangeText={setName}
            placeholder="Child's name"
            placeholderTextColor={Colors.TEXT_MUTED}
            autoFocus
          />
        </View>

        {/* Age */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Age group</Text>
          <View style={styles.pillRow}>
            {AGE_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.pill,
                  child?.ageGroup === opt.value && styles.pillActive,
                ]}
                onPress={() => setAgeGroup(opt.value as any)}>
                <Text
                  style={[
                    styles.pillText,
                    child?.ageGroup === opt.value && styles.pillTextActive,
                  ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Diet */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Diet type</Text>
          <View style={styles.pillRow}>
            {DIET_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.pill,
                  child?.dietType === opt.value && styles.pillActive,
                ]}
                onPress={() => setDietType(opt.value as any)}>
                <Text
                  style={[
                    styles.pillText,
                    child?.dietType === opt.value && styles.pillTextActive,
                  ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Accepted foods */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Foods your child loves</Text>
          <FoodTagInput
            foods={child?.acceptedFoods || []}
            onAdd={handleAddAccepted}
            onRemove={removeAcceptedFood}
            variant="accepted"
            placeholder="Add a food..."
          />
        </View>

        {/* Refused foods */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Foods your child refuses</Text>
          <FoodTagInput
            foods={child?.refusedFoods || []}
            onAdd={handleAddRefused}
            onRemove={removeRefusedFood}
            variant="refused"
            placeholder="Add a food..."
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomButton, {paddingBottom: insets.bottom + 16}]}>
        <TouchableOpacity
          style={[styles.continueButton, !canContinue && styles.continueDisabled]}
          onPress={() => navigation.navigate('MedicalContext')}
          disabled={!canContinue}
          activeOpacity={0.8}>
          <Text style={styles.continueText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  heading: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 24,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Spacing.sm,
  },
  subheading: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Spacing.sm,
  },
  textInput: {
    height: 48,
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    paddingHorizontal: Spacing.base,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.lg,
    color: Colors.TEXT_PRIMARY,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  pill: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.SURFACE,
  },
  pillActive: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  pillText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  pillTextActive: {
    color: Colors.TEXT_INVERSE,
  },
  bottomButton: {
    paddingHorizontal: 20,
    paddingTop: Spacing.base,
    backgroundColor: Colors.BG,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
  },
  continueButton: {
    height: 56,
    backgroundColor: Colors.PRIMARY,
    borderRadius: BorderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueDisabled: {
    opacity: 0.4,
  },
  continueText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.TEXT_INVERSE,
  },
});

export default ChildProfileScreen;
