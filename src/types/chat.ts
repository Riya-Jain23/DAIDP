export interface NutritionScoutData {
  flag: 'iron' | 'calcium' | 'protein' | 'vitamin_d';
  summary: string;
  strategies: FoodStrategy[];
  estimatedGapClosure: number;
  dailyRequirement: string;
  estimatedIntake: string;
  gap: string;
}

export interface FoodStrategy {
  id: string;
  foodName: string;
  nutrientContent: string;
  suggestion: string;
  actionLabel: string;
  actionType: 'try' | 'plan' | 'grocery';
}

export interface ActionButton {
  label: string;
  variant: 'primary' | 'outlined';
  onPress: () => void;
}

export type GroceryApp = 'blinkit' | 'bigbasket' | 'zepto';

export interface RecipeSuggestion {
  dishName: string;
  childName: string;
  adaptationNote: string;
}

export interface GrocerySuggestion {
  context: string;
  productName: string;
  benefit: string;
  quantity?: number;
  suggestedStore?: GroceryApp;
}

export interface ChatSession {
  sessionId: string;
  startedAt: string;
  lastMessageAt: string;
  lastMessage: string;
  topic: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    type?: 'text' | 'scout';
    scoutData?: NutritionScoutData;
    actionButtons?: ActionButton[];
    topic?: string;
    recipeSuggestion?: RecipeSuggestion;
    grocerySuggestion?: GrocerySuggestion;
  };
}
