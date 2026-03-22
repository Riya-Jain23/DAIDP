import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Switch, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Card from '../../components/ui/Card';
import {useChildStore} from '../../store';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';

const MEDICAL_FLAGS = [
  'Iron deficiency',
  'Low Vitamin D',
  'Underweight / poor growth',
  'Calcium deficiency',
  'Protein deficiency',
];

interface MedicalContextScreenProps {
  navigation: any;
}

const MedicalContextScreen: React.FC<MedicalContextScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child);
  const toggleMedicalFlag = useChildStore((s) => s.toggleMedicalFlag);
  const setMedicalNotes = useChildStore((s) => s.setMedicalNotes);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Progress dots */}
      <View style={styles.dotsRow}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Any health context?</Text>
        <Text style={styles.subheading}>
          Optional — helps Poshan give smarter suggestions. Never shared.
        </Text>

        {/* Toggle list */}
        <View style={styles.toggleList}>
          {MEDICAL_FLAGS.map((flag) => (
            <View key={flag} style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{flag}</Text>
              <Switch
                value={child?.medicalFlags.includes(flag) || false}
                onValueChange={() => toggleMedicalFlag(flag)}
                trackColor={{false: Colors.BORDER, true: Colors.ACCENT}}
                thumbColor={Colors.SURFACE}
                ios_backgroundColor={Colors.BORDER}
              />
            </View>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Anything else your doctor mentioned
          </Text>
          <TextInput
            style={styles.notesInput}
            value={child?.medicalNotes || ''}
            onChangeText={setMedicalNotes}
            placeholder="e.g. needs more fibre..."
            placeholderTextColor={Colors.TEXT_MUTED}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Reassurance card */}
        <Card leftBorder={Colors.ACCENT} tinted>
          <Text style={styles.reassuranceText}>
            Poshan is not a medical tool. This context helps suggest better food
            choices — it does not replace your doctor's advice.
          </Text>
        </Card>
      </ScrollView>

      <View style={[styles.bottomSection, {paddingBottom: insets.bottom + 16}]}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Completion')}
          activeOpacity={0.8}>
          <Text style={styles.continueText}>Continue →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Completion')}
          style={styles.skipButton}>
          <Text style={styles.skipText}>Skip for now</Text>
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
    paddingBottom: 20,
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
  toggleList: {
    marginBottom: Spacing.xl,
    gap: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.SURFACE,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    minHeight: 48,
  },
  toggleLabel: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    flex: 1,
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
  notesInput: {
    height: 80,
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  reassuranceText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 20,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: Spacing.base,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
    backgroundColor: Colors.BG,
  },
  continueButton: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.PRIMARY,
    borderRadius: BorderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.TEXT_INVERSE,
  },
  skipButton: {
    paddingVertical: Spacing.md,
  },
  skipText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
  },
});

export default MedicalContextScreen;
