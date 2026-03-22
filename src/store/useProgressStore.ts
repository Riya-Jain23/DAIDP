import {create} from 'zustand';
import {
  ExposureHistoryEntry,
  SuccessEntry,
  WeeklyReport,
  WeeklyStats,
} from '../types/nutrition';
import {
  MOCK_EXPOSURE_HISTORY,
  MOCK_SUCCESS_DIRECTORY,
  MOCK_WEEKLY_REPORT,
  MOCK_WEEKLY_STATS,
} from '../utils/mockData';

interface ProgressState {
  successDirectory: SuccessEntry[];
  weeklyStats: WeeklyStats;
  exposureHistoryMap: Record<string, ExposureHistoryEntry[]>;
  weeklyReport: WeeklyReport | null;
  savedReports: WeeklyReport[];
  addSuccess: (entry: SuccessEntry) => void;
  updateEntry: (id: string, updates: Partial<SuccessEntry>) => void;
  setWeeklyStats: (stats: WeeklyStats) => void;
  getExposureHistory: (foodId: string) => ExposureHistoryEntry[];
  setWeeklyReport: (report: WeeklyReport | null) => void;
  saveWeeklyReport: (report: WeeklyReport) => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  successDirectory: MOCK_SUCCESS_DIRECTORY,
  weeklyStats: MOCK_WEEKLY_STATS,
  exposureHistoryMap: MOCK_EXPOSURE_HISTORY,
  weeklyReport: MOCK_WEEKLY_REPORT,
  savedReports: [],

  addSuccess: (entry) =>
    set((state) => ({
      successDirectory: [entry, ...state.successDirectory],
    })),

  updateEntry: (id, updates) =>
    set((state) => ({
      successDirectory: state.successDirectory.map((e) =>
        e.id === id ? {...e, ...updates} : e,
      ),
    })),

  setWeeklyStats: (weeklyStats) => set({weeklyStats}),

  getExposureHistory: (foodId) => {
    const normalizedId = foodId.toLowerCase();
    const state = get();

    return (
      state.exposureHistoryMap[normalizedId] ||
      state.exposureHistoryMap[normalizedId.replace(/\s+/g, '_')] ||
      state.exposureHistoryMap.dal_paratha ||
      []
    );
  },

  setWeeklyReport: (weeklyReport) => set({weeklyReport}),

  saveWeeklyReport: (report) =>
    set((state) => ({
      savedReports: [report, ...state.savedReports],
    })),
}));
