import React, {useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SectionHeader} from '../../components/layout';
import {useChildStore} from '../../store';
import {MOCK_CHILD} from '../../utils/mockData';
import {getAgeLabel, getDietLabel} from '../../utils/formatting';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Shadows,
  Spacing,
} from '../../theme';

interface ExploreScreenProps {
  navigation: any;
}

type ExploreTopic = 'All' | 'Iron' | 'Protein' | 'Vitamins' | 'Snacks' | 'Tiffin';

interface TipCard {
  id: string;
  topic: ExploreTopic;
  title: string;
  readTime: string;
  body: string;
  stripColor: string;
}

const TIP_CARDS: TipCard[] = [
  {
    id: 'tip-iron',
    topic: 'Iron',
    title: 'Why lemon with chole changes everything',
    readTime: '2 min',
    body:
      'Vitamin C helps the body absorb the iron already present in chickpeas. A squeeze of lemon or amchur turns an accepted food into a more useful one.',
    stripColor: Colors.AI_BUBBLE,
  },
  {
    id: 'tip-protein',
    topic: 'Protein',
    title: 'Getting protein from dal without the refusal fight',
    readTime: '3 min',
    body:
      'When dal is refused in a bowl, try changing the form instead of increasing pressure. Doughs, pancakes, and sauces all count.',
    stripColor: Colors.AMBER_LIGHT,
  },
  {
    id: 'tip-snacks',
    topic: 'Snacks',
    title: 'Swapping biscuits for something that actually works',
    readTime: '1 min',
    body:
      'A better snack still needs to feel easy. Start with one small swap that matches the same crunch or sweetness profile.',
    stripColor: Colors.AI_BUBBLE,
  },
  {
    id: 'tip-tiffin',
    topic: 'Tiffin',
    title: 'The tiffin formula: 1 familiar + 1 nutritious + 1 fun',
    readTime: '2 min',
    body:
      'Predictability helps tiffin succeed. Keep one anchor food, add one useful upgrade, and finish with a low-pressure fun item.',
    stripColor: Colors.ERROR_LIGHT,
  },
];

const AGE_ARTICLES = [
  {
    id: 'age-1',
    title: 'What 6-year-olds actually need nutritionally',
    preview:
      'Energy needs rise, protein matters more, and school-day hunger starts shaping food choices.',
    body:
      'By age six, children are moving through longer school days, more active play, and more independent eating moments. Keep meals steady, protein present, and iron-rich foods in rotation.',
  },
  {
    id: 'age-2',
    title: 'Why picky eating peaks at 5–7 and then improves',
    preview:
      'This stage often looks stubborn, but it usually reflects normal caution and sensory sensitivity.',
    body:
      'Many children become more selective between ages five and seven because they notice smell, texture, and visual changes more intensely. Consistent exposure without pressure still works.',
  },
];

const FILTERS: ExploreTopic[] = [
  'All',
  'Iron',
  'Protein',
  'Vitamins',
  'Snacks',
  'Tiffin',
];

const ExploreScreen: React.FC<ExploreScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child) || MOCK_CHILD;
  const [selectedFilter, setSelectedFilter] = useState<ExploreTopic>('All');

  const filteredTips = useMemo(() => {
    if (selectedFilter === 'All') {
      return TIP_CARDS;
    }

    return TIP_CARDS.filter((tip) => tip.topic === selectedFilter);
  }, [selectedFilter]);

  const featuredTag = child.medicalFlags.includes('Iron deficiency')
    ? 'IRON · THIS WEEK'
    : 'START HERE';

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
        <View style={styles.topBarCopy}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>
            Curated for {child.name} — {getAgeLabel(child.ageGroup)},{' '}
            {getDietLabel(child.dietType)}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}>
          {FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipSelected,
                ]}
                onPress={() => setSelectedFilter(filter)}>
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextSelected,
                  ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('Article', {
              title: 'The 3 iron-rich foods Arjun already eats',
              readTime: '2 min read',
              body:
                "You don't need anything new. Chole, rajma, and atta-based meals already give you a useful base. The upgrade is in form, pairing, and consistency.",
            })
          }>
          <View style={styles.featuredTag}>
            <Text style={styles.featuredTagText}>{featuredTag}</Text>
          </View>
          <Text style={styles.featuredTitle}>
            The 3 iron-rich foods {child.name} already eats
          </Text>
          <Text style={styles.featuredBody}>
            You don&apos;t need anything new. Here&apos;s how to use what&apos;s in your
            kitchen.
          </Text>
          <View style={styles.featuredFooter}>
            <Text style={styles.featuredLink}>Read →</Text>
            <Text style={styles.featuredMeta}>2 min read</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <SectionHeader label="Quick tips" variant="eyebrow" />
          <View style={styles.grid}>
            {filteredTips.map((tip) => (
              <TouchableOpacity
                key={tip.id}
                style={styles.tipCard}
                onPress={() =>
                  navigation.navigate('Article', {
                    title: tip.title,
                    body: tip.body,
                    readTime: tip.readTime,
                  })
                }
                activeOpacity={0.9}>
                <View
                  style={[
                    styles.tipStrip,
                    {backgroundColor: tip.stripColor},
                  ]}>
                  <Text style={styles.tipStripIcon}>🍽️</Text>
                </View>
                <View style={styles.tipBody}>
                  <View style={styles.tipPill}>
                    <Text style={styles.tipPillText}>{tip.topic}</Text>
                  </View>
                  <Text style={styles.tipTitle} numberOfLines={2}>
                    {tip.title}
                  </Text>
                  <Text style={styles.tipTime}>{tip.readTime}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader label={`For ${child.name}'s age`} variant="eyebrow" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ageCardsRow}>
            {AGE_ARTICLES.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.ageCard}
                onPress={() =>
                  navigation.navigate('Article', {
                    title: article.title,
                    body: article.body,
                    readTime: '2 min read',
                  })
                }>
                <Text style={styles.ageCardIcon}>📘</Text>
                <Text style={styles.ageCardTitle}>{article.title}</Text>
                <Text style={styles.ageCardPreview} numberOfLines={2}>
                  {article.preview}
                </Text>
                <Text style={styles.ageCardLink}>Read →</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    paddingHorizontal: 16,
    paddingBottom: Spacing.md,
  },
  backIcon: {
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
    marginBottom: 8,
  },
  topBarCopy: {
    gap: 4,
  },
  title: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
  },
  subtitle: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  filtersRow: {
    paddingHorizontal: 16,
    gap: Spacing.sm,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.SURFACE,
  },
  filterChipSelected: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  filterChipText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
  },
  filterChipTextSelected: {
    color: Colors.TEXT_INVERSE,
  },
  featuredCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.PRIMARY,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: 20,
  },
  featuredTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },
  featuredTagText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.TEXT_INVERSE,
    letterSpacing: 1,
  },
  featuredTitle: {
    marginTop: 12,
    fontFamily: FontFamily.DISPLAY,
    fontSize: FontSize['2xl'],
    color: Colors.TEXT_INVERSE,
    lineHeight: 28,
  },
  featuredBody: {
    marginTop: 8,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 20,
  },
  featuredFooter: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredLink: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.TEXT_INVERSE,
  },
  featuredMeta: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.5)',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Spacing.sm,
  },
  tipCard: {
    width: '48.5%',
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.card,
  },
  tipStrip: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipStripIcon: {
    fontSize: 18,
  },
  tipBody: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tipPill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.AI_BUBBLE,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    marginBottom: 8,
  },
  tipPillText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.PRIMARY,
  },
  tipTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 18,
  },
  tipTime: {
    marginTop: 4,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_MUTED,
  },
  ageCardsRow: {
    gap: 12,
    marginTop: Spacing.sm,
    paddingRight: 16,
  },
  ageCard: {
    width: 280,
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadows.card,
  },
  ageCardIcon: {
    fontSize: 22,
    marginBottom: 10,
  },
  ageCardTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  ageCardPreview: {
    marginTop: 8,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 18,
  },
  ageCardLink: {
    marginTop: 12,
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
});

export default ExploreScreen;
