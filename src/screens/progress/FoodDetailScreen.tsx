import React from 'react';
import {
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {format} from 'date-fns';
import {SectionHeader} from '../../components/layout';
import {Card} from '../../components/ui';
import {useChildStore, useChatStore, useProgressStore} from '../../store';
import {MOCK_CHILD} from '../../utils/mockData';
import {getDietLabel} from '../../utils/formatting';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Shadows,
  Spacing,
} from '../../theme';

interface FoodDetailScreenProps {
  navigation: any;
  route: any;
}

const INDIAN_NAMES: Record<string, string> = {
  dal_paratha: '(Lentils / Daal)',
  atta_pancakes: '(Whole wheat / Atta)',
  banana_pancakes: '(Banana / Kela)',
  chole_sandwich: '(Chickpeas / Chole)',
};

const NUTRITION_BY_FOOD: Record<string, string[]> = {
  dal_paratha: ['Iron: 3.3mg/100g', 'Protein: 9g/100g', 'Fibre: 8g/100g'],
  atta_pancakes: ['Iron: 2.1mg/100g', 'Protein: 6g/100g', 'Fibre: 4g/100g'],
  banana_pancakes: [
    'Potassium: 358mg/100g',
    'Protein: 4g/100g',
    'Fibre: 3g/100g',
  ],
  chole_sandwich: ['Iron: 2.9mg/100g', 'Protein: 8g/100g', 'Fibre: 7g/100g'],
};

const WHAT_WORKED_BY_FOOD: Record<string, string[]> = {
  dal_paratha: [
    'Hidden in paratha dough — form change',
    'Served cooled, not hot — presentation change',
    'Paired with curd — familiar anchor food',
  ],
  atta_pancakes: [
    'Texture stayed familiar',
    'Used as a breakfast food he already trusted',
    'Sweetness stayed mild and predictable',
  ],
  banana_pancakes: [
    'Banana blended into batter — no visible pieces',
    'Sweet profile matched an accepted food',
    'Served warm, not piping hot',
  ],
  chole_sandwich: [
    'Reframed as sandwich filling instead of curry',
    'Used bread as a familiar anchor',
    'Texture stayed soft and not too chunky',
  ],
};

const getStatusPill = (status: string) => {
  switch (status) {
    case 'accepted':
    case 'requested':
      return {
        label: status === 'requested' ? 'Requested! ★' : 'Accepted',
        bg: Colors.AI_BUBBLE,
        text: Colors.PRIMARY,
      };
    case 'partial':
      return {
        label: 'In progress',
        bg: Colors.AMBER_LIGHT,
        text: '#D97706',
      };
    default:
      return {
        label: 'Refused',
        bg: Colors.ERROR_LIGHT,
        text: '#991B1B',
      };
  }
};

const getTimelineColor = (status: string) => {
  switch (status) {
    case 'refused':
      return Colors.ERROR;
    case 'partial':
      return Colors.AMBER;
    default:
      return Colors.ACCENT;
  }
};

const FoodDetailScreen: React.FC<FoodDetailScreenProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child) || MOCK_CHILD;
  const getExposureHistory = useProgressStore((s) => s.getExposureHistory);
  const setComposerDraft = useChatStore((s) => s.setComposerDraft);
  const foodId = route.params?.foodId || 'dal_paratha';
  const foodName = route.params?.foodName || 'Dal Paratha';
  const exposureHistory = getExposureHistory(foodId);
  const currentStatus = getStatusPill(
    exposureHistory[exposureHistory.length - 1]?.status || 'partial',
  );
  const nutritionStrip = NUTRITION_BY_FOOD[foodId] || NUTRITION_BY_FOOD.dal_paratha;
  const whatWorked = WHAT_WORKED_BY_FOOD[foodId] || WHAT_WORKED_BY_FOOD.dal_paratha;
  const indianName = INDIAN_NAMES[foodId];

  const handleAskPoshan = () => {
    setComposerDraft(`What should I do next with ${foodName}?`);
    navigation.navigate('Chat');
  };

  const handleShare = async () => {
    await Share.share({
      message: `${foodName}: ${exposureHistory
        .map((entry) => `${format(new Date(entry.date), 'MMM d')}: ${entry.description}`)
        .join(' | ')}`,
    });
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
        <Text style={styles.topBarTitle}>{foodName}</Text>
        <TouchableOpacity onPress={handleShare}>
          <Text style={styles.shareIcon}>↗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Card style={styles.headerCard}>
          <Text style={styles.foodName}>{foodName}</Text>
          {indianName ? <Text style={styles.indianName}>{indianName}</Text> : null}

          <View style={styles.statusRow}>
            <View style={[styles.statusPill, {backgroundColor: currentStatus.bg}]}>
              <Text style={[styles.statusPillText, {color: currentStatus.text}]}>
                {currentStatus.label}
              </Text>
            </View>
            <View style={[styles.statusPill, styles.exposurePill]}>
              <Text style={[styles.statusPillText, {color: Colors.PRIMARY}]}>
                Exposure {exposureHistory.length} of ~12
              </Text>
            </View>
            <View style={styles.dietPill}>
              <Text style={styles.dietPillText}>
                {getDietLabel(child.dietType)} ✓
              </Text>
            </View>
          </View>

          <View style={styles.nutritionStrip}>
            {nutritionStrip.map((item, index) => (
              <Text key={item} style={styles.nutritionText}>
                {item}
                {index < nutritionStrip.length - 1 ? ' · ' : ''}
              </Text>
            ))}
          </View>
        </Card>

        <View style={styles.section}>
          <SectionHeader
            label={`${child.name}'s history with ${foodName}`}
            variant="eyebrow"
          />
          {exposureHistory.map((entry, index) => {
            const color = getTimelineColor(entry.status);
            const pill = getStatusPill(entry.status);

            return (
              <View key={entry.id} style={styles.timelineRow}>
                <Text style={styles.timelineDate}>
                  {format(new Date(entry.date), 'MMM d')}
                </Text>
                <View style={styles.timelineRail}>
                  <View style={[styles.timelineDot, {backgroundColor: color}]} />
                  {index < exposureHistory.length - 1 ? (
                    <View
                      style={[
                        styles.timelineLine,
                        {
                          backgroundColor: getTimelineColor(
                            exposureHistory[index + 1].status,
                          ),
                        },
                      ]}
                    />
                  ) : null}
                </View>
                <View style={[styles.timelineCard, Shadows.card]}>
                  <Text style={styles.timelineDescription}>
                    {entry.description}
                  </Text>
                  <View style={[styles.statusPill, {backgroundColor: pill.bg}]}>
                    <Text style={[styles.statusPillText, {color: pill.text}]}>
                      {pill.label}
                    </Text>
                  </View>
                  {entry.note ? (
                    <Text style={styles.timelineNote}>{entry.note}</Text>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <SectionHeader label="What worked" variant="eyebrow" />
          <Card style={styles.whatWorkedCard}>
            {whatWorked.map((item) => (
              <View key={item} style={styles.whatWorkedRow}>
                <View style={styles.greenDot} />
                <Text style={styles.whatWorkedText}>{item}</Text>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleAskPoshan}>
          <Text style={styles.primaryButtonText}>
            Ask Poshan about {foodName} →
          </Text>
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
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: 17,
    color: Colors.TEXT_PRIMARY,
  },
  shareIcon: {
    fontSize: 18,
    color: Colors.TEXT_SECONDARY,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  headerCard: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  foodName: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 28,
    color: Colors.TEXT_PRIMARY,
  },
  indianName: {
    marginTop: 4,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  statusPill: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  statusPillText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
  },
  exposurePill: {
    backgroundColor: Colors.AI_BUBBLE,
  },
  dietPill: {
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  dietPillText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
  },
  nutritionStrip: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nutritionText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  timelineDate: {
    width: 44,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_MUTED,
    paddingTop: 4,
  },
  timelineRail: {
    width: 14,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: Colors.SURFACE,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: Spacing.sm,
  },
  timelineDescription: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: '#374151',
    lineHeight: 18,
  },
  timelineNote: {
    marginTop: 6,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.PRIMARY,
    fontStyle: 'italic',
  },
  whatWorkedCard: {
    marginTop: Spacing.sm,
  },
  whatWorkedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.ACCENT,
  },
  whatWorkedText: {
    flex: 1,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: '#374151',
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

export default FoodDetailScreen;
