export interface NutrientProfile {
  iron: number;
  calcium: number;
  protein: number;
  vitaminD: number;
  fibre: number;
}

export interface DishEntry {
  id: string;
  name: string;
  nutrients: Partial<NutrientProfile>;
  servingSize: string;
  frequency: string;
}

export type MealOutcome = 'ate_all' | 'few_bites' | 'refused' | 'didnt_try';

export interface MealLog {
  id: string;
  foods: string[];
  outcome: MealOutcome;
  note?: string;
  photoUrl?: string;
  timestamp: string;
}

export interface SuccessEntry {
  id: string;
  foodId: string;
  foodName: string;
  date: string;
  description: string;
  status: 'accepted' | 'progress' | 'refused' | 'streak';
  streakCount?: number;
}

export interface WeeklyStats {
  totalAccepted: number;
  inProgress: number;
  changeVs4Weeks: number;
  currentStreak: number;
  weeksWithPoshan: number;
}

export type ExposureHistoryStatus =
  | 'refused'
  | 'partial'
  | 'accepted'
  | 'requested';

export interface ExposureHistoryEntry {
  id: string;
  date: string;
  description: string;
  status: ExposureHistoryStatus;
  note?: string;
}

export interface WeeklyReportAttempt {
  id: string;
  label: string;
  outcome: string;
  tone: 'green' | 'amber' | 'red';
}

export interface WeeklyReport {
  id: string;
  startDate: string;
  endDate: string;
  weeksIn: number;
  mealsLogged: number;
  suggestionsTried: number;
  newFoodsAccepted: number;
  ironStatus: string;
  winTitle: string;
  winDescription: string;
  exposureCount: number;
  exposureTarget: number;
  whatYouTried: WeeklyReportAttempt[];
  poshanRead: string;
  nextWeekSteps: string[];
}
