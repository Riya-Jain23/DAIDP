import {create} from 'zustand';
import {Child, FoodEntry, AgeGroup, DietType} from '../types/child';

interface ChildState {
  child: Child | null;
  setChild: (child: Child) => void;
  updateChild: (updates: Partial<Child>) => void;
  addAcceptedFood: (food: FoodEntry) => void;
  removeAcceptedFood: (foodId: string) => void;
  addRefusedFood: (food: FoodEntry) => void;
  removeRefusedFood: (foodId: string) => void;
  setName: (name: string) => void;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  setDietType: (dietType: DietType) => void;
  toggleMedicalFlag: (flag: string) => void;
  setMedicalNotes: (notes: string) => void;
}

export const useChildStore = create<ChildState>((set, get) => ({
  child: null,

  setChild: (child) => set({child}),

  updateChild: (updates) =>
    set((state) => ({
      child: state.child
        ? {...state.child, ...updates, updatedAt: new Date().toISOString()}
        : null,
    })),

  setName: (name) => {
    const state = get();
    if (state.child) {
      set({child: {...state.child, name, updatedAt: new Date().toISOString()}});
    } else {
      set({
        child: {
          id: Date.now().toString(),
          name,
          ageGroup: '2-4',
          dietType: 'vegetarian',
          acceptedFoods: [],
          refusedFoods: [],
          medicalFlags: [],
          medicalNotes: '',
          exposureLog: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }
  },

  setAgeGroup: (ageGroup) =>
    set((state) => ({
      child: state.child
        ? {...state.child, ageGroup, updatedAt: new Date().toISOString()}
        : null,
    })),

  setDietType: (dietType) =>
    set((state) => ({
      child: state.child
        ? {...state.child, dietType, updatedAt: new Date().toISOString()}
        : null,
    })),

  addAcceptedFood: (food) =>
    set((state) => ({
      child: state.child
        ? {
            ...state.child,
            acceptedFoods: [...state.child.acceptedFoods, food],
            updatedAt: new Date().toISOString(),
          }
        : null,
    })),

  removeAcceptedFood: (foodId) =>
    set((state) => ({
      child: state.child
        ? {
            ...state.child,
            acceptedFoods: state.child.acceptedFoods.filter((f) => f.id !== foodId),
            updatedAt: new Date().toISOString(),
          }
        : null,
    })),

  addRefusedFood: (food) =>
    set((state) => ({
      child: state.child
        ? {
            ...state.child,
            refusedFoods: [...state.child.refusedFoods, food],
            updatedAt: new Date().toISOString(),
          }
        : null,
    })),

  removeRefusedFood: (foodId) =>
    set((state) => ({
      child: state.child
        ? {
            ...state.child,
            refusedFoods: state.child.refusedFoods.filter((f) => f.id !== foodId),
            updatedAt: new Date().toISOString(),
          }
        : null,
    })),

  toggleMedicalFlag: (flag) =>
    set((state) => {
      if (!state.child) return state;
      const flags = state.child.medicalFlags.includes(flag)
        ? state.child.medicalFlags.filter((f) => f !== flag)
        : [...state.child.medicalFlags, flag];
      return {
        child: {...state.child, medicalFlags: flags, updatedAt: new Date().toISOString()},
      };
    }),

  setMedicalNotes: (notes) =>
    set((state) => ({
      child: state.child
        ? {...state.child, medicalNotes: notes, updatedAt: new Date().toISOString()}
        : null,
    })),
}));
