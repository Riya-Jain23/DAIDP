import React from 'react';
import {ScrollView, Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from '../../theme';

interface ArticleScreenProps {
  navigation: any;
  route: any;
}

const ArticleScreen: React.FC<ArticleScreenProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const title = route.params?.title || 'Article';
  const body = route.params?.body || '';
  const readTime = route.params?.readTime || '2 min read';

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
        <Text style={styles.topBarTitle}>Article</Text>
        <TouchableOpacity
          onPress={() =>
            Share.share({
              message: `${title}\n\n${body}`,
            })
          }>
          <Text style={styles.shareIcon}>↗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.readTime}>{readTime}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
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
    paddingHorizontal: 20,
    paddingTop: Spacing.xl,
    paddingBottom: 100,
  },
  readTime: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.PRIMARY,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  title: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 28,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 36,
    marginBottom: Spacing.base,
  },
  body: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: '#374151',
    lineHeight: 25,
  },
});

export default ArticleScreen;
