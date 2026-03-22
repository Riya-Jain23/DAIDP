import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Card, ConfirmationToast} from '../../components/ui';
import {SectionHeader} from '../../components/layout';
import {useAppStore} from '../../store';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Shadows,
  Spacing,
} from '../../theme';

interface RecipeScreenProps {
  navigation: any;
  route: any;
}

const DEFAULT_INGREDIENTS = [
  {name: 'Whole wheat flour (atta)', amount: '1 cup'},
  {name: 'Cooked dal (any)', amount: '1/2 cup'},
  {name: 'Salt', amount: 'to taste'},
  {name: 'Ghee', amount: '1 tsp'},
  {name: 'Water', amount: 'as needed'},
];

const DEFAULT_STEPS = [
  "Blend the cooked dal smooth. No visible dal texture — Arjun won't notice it.",
  'Mix atta, blended dal, and salt. Knead into a soft dough using water. Rest 10 mins.',
  'Roll into parathas and cook on tawa with ghee. Serve with curd — his comfort food.',
];

const RecipeScreen: React.FC<RecipeScreenProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const savedRecipes = useAppStore((s) => s.savedRecipes);
  const toggleSavedRecipe = useAppStore((s) => s.toggleSavedRecipe);
  const [showToast, setShowToast] = useState(false);

  const dishName = route.params?.dishName || 'Dal Paratha';
  const childName = route.params?.childName || 'Arjun';
  const adaptationNote =
    route.params?.adaptationNote ||
    'Adapted for Arjun — dal is hidden inside the dough. Looks like a normal roti.';
  const isSaved = savedRecipes.includes(dishName);

  const subtitle = useMemo(
    () => `${childName}-adapted · Iron-boosted · 20 mins`,
    [childName],
  );

  const handleToggleSave = () => {
    toggleSavedRecipe(dishName);
    setShowToast(true);
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          {dishName} Recipe
        </Text>
        <TouchableOpacity onPress={handleToggleSave}>
          <Text style={[styles.bookmarkIcon, isSaved && styles.bookmarkActive]}>
            🔖
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{adaptationNote}</Text>
        </View>

        <Card style={styles.headerCard}>
          <Text style={styles.dishName}>{dishName}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.statChips}>
            {['⏱ 20 mins', '👨‍🍳 Easy', '💪 Iron: +2mg'].map((chip) => (
              <View key={chip} style={styles.statChip}>
                <Text style={styles.statChipText}>{chip}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.section}>
          <SectionHeader label="Ingredients" variant="eyebrow" />
          {DEFAULT_INGREDIENTS.map((ingredient) => (
            <View key={ingredient.name} style={styles.ingredientRow}>
              <View style={styles.ingredientLeft}>
                <View style={styles.greenDot} />
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
              </View>
              <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader label="Steps" variant="eyebrow" />
          {DEFAULT_STEPS.map((step, index) => (
            <View key={step} style={[styles.stepCard, Shadows.card]}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            💡 First time: make one small paratha alongside his regular roti.
            Don&apos;t mention the dal. Let him choose.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            navigation.navigate('LogMeal', {
              prefillFood: dishName,
            })
          }>
          <Text style={styles.primaryButtonText}>Tried this recipe?</Text>
        </TouchableOpacity>
      </View>

      <ConfirmationToast
        visible={showToast}
        message={isSaved ? 'Recipe removed from saved' : 'Recipe saved'}
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
    backgroundColor: Colors.SURFACE,
  },
  backIcon: {
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: 17,
    color: Colors.TEXT_PRIMARY,
    marginHorizontal: Spacing.base,
  },
  bookmarkIcon: {
    fontSize: 20,
    color: Colors.TEXT_SECONDARY,
  },
  bookmarkActive: {
    color: Colors.PRIMARY,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  banner: {
    backgroundColor: Colors.AI_BUBBLE,
    borderLeftWidth: 4,
    borderLeftColor: Colors.PRIMARY,
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
  },
  bannerText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: '#374151',
    lineHeight: 18,
  },
  headerCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: BorderRadius.lg,
  },
  dishName: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
  },
  statChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  statChip: {
    backgroundColor: Colors.SURFACE,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  statChipText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
  },
  section: {
    marginTop: Spacing.base,
    paddingHorizontal: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  ingredientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
    marginRight: Spacing.sm,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.ACCENT,
  },
  ingredientName: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    flex: 1,
  },
  ingredientAmount: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
  },
  stepCard: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.TEXT_INVERSE,
  },
  stepText: {
    flex: 1,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: '#374151',
    lineHeight: 20,
  },
  tipCard: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: Colors.AMBER_LIGHT,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.AMBER,
    paddingHorizontal: Spacing.base,
    paddingVertical: 12,
  },
  tipText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: '#374151',
    lineHeight: 18,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.SURFACE,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButton: {
    height: 52,
    borderRadius: BorderRadius['2xl'],
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_INVERSE,
  },
});

export default RecipeScreen;
