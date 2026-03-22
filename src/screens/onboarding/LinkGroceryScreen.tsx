import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppStore} from '../../store';
import {GroceryApp} from '../../types/chat';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Shadows,
  Spacing,
} from '../../theme';

interface LinkGroceryScreenProps {
  navigation: any;
}

const APPS: {
  id: GroceryApp;
  name: string;
  subtitle: string;
  logo: string;
  logoBg: string;
}[] = [
  {
    id: 'blinkit',
    name: 'Blinkit',
    subtitle: '10-min delivery',
    logo: 'B',
    logoBg: '#F9C404',
  },
  {
    id: 'bigbasket',
    name: 'BigBasket',
    subtitle: 'Scheduled delivery',
    logo: 'BB',
    logoBg: Colors.ACCENT,
  },
  {
    id: 'zepto',
    name: 'Zepto',
    subtitle: '10-min delivery',
    logo: 'Z',
    logoBg: '#7C3AED',
  },
];

const LinkGroceryScreen: React.FC<LinkGroceryScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const linkedGroceryApp = useAppStore((s) => s.linkedGroceryApp);
  const setLinkedGroceryApp = useAppStore((s) => s.setLinkedGroceryApp);
  const setOnboardingComplete = useAppStore((s) => s.setOnboardingComplete);
  const [loadingApp, setLoadingApp] = useState<GroceryApp | null>(null);

  const handleConnect = (appId: GroceryApp) => {
    setLoadingApp(appId);

    setTimeout(() => {
      setLinkedGroceryApp(appId);
      setLoadingApp(null);
    }, 1500);
  };

  const finishOnboarding = () => {
    setOnboardingComplete(true);
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom + 16},
      ]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressRow}>
          {[0, 1, 2, 3].map((dot) => (
            <View key={dot} style={[styles.dot, styles.dotFilled]} />
          ))}
          <View style={styles.dotOutline} />
        </View>
        <View style={styles.optionalPill}>
          <Text style={styles.optionalText}>OPTIONAL</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Link your grocery app</Text>
        <Text style={styles.subheading}>
          When Poshan suggests an ingredient, it adds it straight to your cart.
          No switching apps.
        </Text>

        <View style={styles.cardList}>
          {APPS.map((app) => {
            const isConnected = linkedGroceryApp === app.id;
            const isLoading = loadingApp === app.id;

            return (
              <View key={app.id} style={[styles.appCard, Shadows.card]}>
                <View style={[styles.logoBox, {backgroundColor: app.logoBg}]}>
                  <Text style={styles.logoText}>{app.logo}</Text>
                </View>
                <View style={styles.appCopy}>
                  <Text style={styles.appName}>{app.name}</Text>
                  <Text style={styles.appSubtitle}>{app.subtitle}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.connectButton,
                    isConnected && styles.connectedButton,
                  ]}
                  onPress={() => handleConnect(app.id)}
                  disabled={isLoading}
                  activeOpacity={0.8}>
                  <Text
                    style={[
                      styles.connectText,
                      isConnected && styles.connectedText,
                    ]}>
                    {isLoading
                      ? 'Connecting...'
                      : isConnected
                        ? 'Connected ✓'
                        : 'Connect'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteIcon}>🔒</Text>
          <Text style={styles.noteText}>
            Poshan only adds items when you confirm. It never places orders
            automatically.
          </Text>
        </View>
      </View>

      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={finishOnboarding}
          activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>Continue to Poshan →</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={finishOnboarding} style={styles.skipButton}>
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
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.base,
  },
  backIcon: {
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotFilled: {
    backgroundColor: Colors.PRIMARY,
  },
  dotOutline: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.SURFACE,
  },
  optionalPill: {
    backgroundColor: Colors.AMBER_LIGHT,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  optionalText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: '#D97706',
  },
  content: {
    flex: 1,
    paddingTop: Spacing.base,
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
    lineHeight: 22,
  },
  cardList: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  appCard: {
    minHeight: 56,
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: FontFamily.BODY_BOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_INVERSE,
  },
  appCopy: {
    flex: 1,
    gap: 2,
  },
  appName: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.md,
    color: Colors.TEXT_PRIMARY,
  },
  appSubtitle: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
  },
  connectButton: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  connectedButton: {
    backgroundColor: Colors.AI_BUBBLE,
    borderColor: Colors.AI_BUBBLE,
  },
  connectText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
  connectedText: {
    color: Colors.PRIMARY,
  },
  noteCard: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.AI_BUBBLE,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.ACCENT,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  noteIcon: {
    fontSize: 14,
    color: Colors.PRIMARY,
    marginTop: 1,
  },
  noteText: {
    flex: 1,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: '#374151',
    lineHeight: 18,
  },
  bottomArea: {
    gap: Spacing.sm,
  },
  primaryButton: {
    height: 56,
    borderRadius: BorderRadius['2xl'],
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.TEXT_INVERSE,
  },
  skipButton: {
    alignSelf: 'center',
    paddingVertical: Spacing.sm,
  },
  skipText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    textDecorationLine: 'underline',
  },
});

export default LinkGroceryScreen;
