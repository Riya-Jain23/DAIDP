import {create} from 'zustand';
import {GroceryApp} from '../types/chat';

interface AppState {
  onboardingComplete: boolean;
  parentName: string;
  linkedGroceryApp: GroceryApp | null;
  notificationsRead: string[];
  savedRecipes: string[];
  setOnboardingComplete: (complete: boolean) => void;
  setParentName: (name: string) => void;
  setLinkedGroceryApp: (app: GroceryApp | null) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (ids: string[]) => void;
  toggleSavedRecipe: (dishName: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  onboardingComplete: false,
  parentName: 'Parent',
  linkedGroceryApp: null,
  notificationsRead: [],
  savedRecipes: [],

  setOnboardingComplete: (onboardingComplete) => set({onboardingComplete}),
  setParentName: (parentName) => set({parentName}),
  setLinkedGroceryApp: (linkedGroceryApp) => set({linkedGroceryApp}),
  markNotificationRead: (id) =>
    set((state) => ({
      notificationsRead: state.notificationsRead.includes(id)
        ? state.notificationsRead
        : [...state.notificationsRead, id],
    })),
  markAllNotificationsRead: (ids) =>
    set((state) => ({
      notificationsRead: Array.from(
        new Set([...state.notificationsRead, ...ids]),
      ),
    })),
  toggleSavedRecipe: (dishName) =>
    set((state) => ({
      savedRecipes: state.savedRecipes.includes(dishName)
        ? state.savedRecipes.filter((recipe) => recipe !== dishName)
        : [...state.savedRecipes, dishName],
    })),
}));
