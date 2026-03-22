export interface FoodEntry {
  id: string;
  name: string;
  addedAt: string;
}

export interface ExposureEntry {
  foodId: string;
  foodName: string;
  count: number;
  lastAttempt: string;
  status: 'accepted' | 'in_progress' | 'refused';
}

export type AgeGroup = '0-2' | '2-4' | '5-7' | '8-10';
export type DietType = 'vegetarian' | 'non-vegetarian';

export interface MedicalFlag {
  id: string;
  label: string;
  active: boolean;
}

export interface Child {
  id: string;
  name: string;
  ageGroup: AgeGroup;
  dietType: DietType;
  acceptedFoods: FoodEntry[];
  refusedFoods: FoodEntry[];
  medicalFlags: string[];
  medicalNotes: string;
  exposureLog: ExposureEntry[];
  createdAt: string;
  updatedAt: string;
}
