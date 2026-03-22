import React, {useEffect, useMemo, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
import ConfirmationToast from '../ui/ConfirmationToast';

interface GroceryAgentSheetProps {
  visible: boolean;
  onClose: () => void;
  contextText?: string;
  productName?: string;
  benefit?: string;
}

const STORES: {
  id: GroceryApp;
  label: string;
  eta: string;
}[] = [
  {id: 'blinkit', label: 'Blinkit', eta: 'Estimated delivery: 10 mins'},
  {id: 'bigbasket', label: 'BigBasket', eta: 'Estimated delivery: Scheduled'},
  {id: 'zepto', label: 'Zepto', eta: 'Estimated delivery: 10 mins'},
];

const GroceryAgentSheet: React.FC<GroceryAgentSheetProps> = ({
  visible,
  onClose,
  contextText = "Poshan suggested ragi flour as a nutritious substitute for maida in Arjun's pancakes.",
  productName = 'Ragi Flour (500g)',
  benefit = 'Good source of calcium and iron',
}) => {
  const insets = useSafeAreaInsets();
  const linkedGroceryApp = useAppStore((s) => s.linkedGroceryApp);
  const [quantity, setQuantity] = useState(1);
  const [selectedStore, setSelectedStore] = useState<GroceryApp>('blinkit');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (visible) {
      setQuantity(1);
      setAdded(false);
      setLoading(false);
      setShowToast(false);
      setSelectedStore(linkedGroceryApp || 'blinkit');
    }
  }, [linkedGroceryApp, visible]);

  const selectedEta = useMemo(
    () => STORES.find((store) => store.id === selectedStore)?.eta || '',
    [selectedStore],
  );

  const handleAddToCart = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setAdded(true);
      setShowToast(true);

      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.sheet,
                {paddingBottom: Math.max(insets.bottom, 12)},
              ]}>
              <View style={styles.handle} />

              <View style={styles.headerRow}>
                <View style={styles.headerLeft}>
                  <Text style={styles.cartIcon}>🛒</Text>
                  <Text style={styles.headerTitle}>Grocery Agent</Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
                  <Text style={styles.closeIcon}>×</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>
                <Text style={styles.contextText}>{contextText}</Text>

                <View style={[styles.itemCard, Shadows.card]}>
                  <View style={styles.itemImage}>
                    <Text style={styles.itemImageIcon}>🌾</Text>
                  </View>
                  <View style={styles.itemCopy}>
                    <Text style={styles.itemName}>{productName}</Text>
                    <Text style={styles.itemBenefit}>{benefit}</Text>
                  </View>
                  <View style={styles.quantityWrap}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => setQuantity((count) => Math.max(1, count - 1))}>
                      <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => setQuantity((count) => count + 1)}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.selectorSection}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.storePills}>
                    {STORES.map((store) => {
                      const isSelected = store.id === selectedStore;
                      return (
                        <TouchableOpacity
                          key={store.id}
                          style={[
                            styles.storePill,
                            isSelected && styles.storePillSelected,
                          ]}
                          onPress={() => setSelectedStore(store.id)}>
                          <Text
                            style={[
                              styles.storePillText,
                              isSelected && styles.storePillTextSelected,
                            ]}>
                            {store.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                  <Text style={styles.etaText}>{selectedEta}</Text>
                </View>

                <View style={styles.divider} />

                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    added && styles.primaryButtonSuccess,
                    loading && styles.primaryButtonDisabled,
                  ]}
                  onPress={handleAddToCart}
                  disabled={loading || added}
                  activeOpacity={0.85}>
                  <Text style={styles.primaryButtonText}>
                    {loading
                      ? 'Adding...'
                      : added
                        ? '✓ Added to cart'
                        : `Add to ${
                            STORES.find((store) => store.id === selectedStore)?.label
                          } cart`}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={onClose}
                  activeOpacity={0.8}>
                  <Text style={styles.secondaryButtonText}>
                    No thanks, just the suggestion
                  </Text>
                </TouchableOpacity>
              </ScrollView>

              <ConfirmationToast
                visible={showToast}
                message="Added to your cart"
                onHide={() => setShowToast(false)}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.28)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.SURFACE,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    minHeight: 420,
    maxHeight: '82%',
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#D1D5DB',
    marginTop: 12,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  cartIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.md,
    color: Colors.TEXT_PRIMARY,
  },
  closeIcon: {
    fontSize: 24,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 28,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.BORDER,
    marginTop: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  contextText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: '#374151',
    lineHeight: 22,
  },
  itemCard: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: BorderRadius.lg,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.SURFACE_2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImageIcon: {
    fontSize: 22,
  },
  itemCopy: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  itemBenefit: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 18,
  },
  quantityWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.SURFACE,
  },
  quantityButtonText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 18,
  },
  quantityText: {
    minWidth: 10,
    textAlign: 'center',
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  selectorSection: {
    marginTop: 12,
  },
  storePills: {
    gap: Spacing.sm,
  },
  storePill: {
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.SURFACE,
  },
  storePillSelected: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  storePillText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
  },
  storePillTextSelected: {
    color: Colors.TEXT_INVERSE,
  },
  etaText: {
    marginTop: 8,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
  },
  primaryButton: {
    height: 52,
    borderRadius: BorderRadius['2xl'],
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonSuccess: {
    backgroundColor: Colors.ACCENT,
  },
  primaryButtonText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.base,
    color: Colors.TEXT_INVERSE,
  },
  secondaryButton: {
    height: 50,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: Colors.TEXT_SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  secondaryButtonText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
  },
});

export default GroceryAgentSheet;
