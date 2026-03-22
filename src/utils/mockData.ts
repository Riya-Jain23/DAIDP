import {Child, FoodEntry} from '../types/child';
import {ChatSession, Message} from '../types/chat';
import {
  ExposureHistoryEntry,
  SuccessEntry,
  WeeklyReport,
  WeeklyStats,
} from '../types/nutrition';

const makeFood = (name: string): FoodEntry => ({
  id: name.toLowerCase().replace(/\s+/g, '_'),
  name,
  addedAt: new Date().toISOString(),
});

export const MOCK_CHILD: Child = {
  id: '1',
  name: 'Arjun',
  ageGroup: '5-7',
  dietType: 'vegetarian',
  acceptedFoods: [
    makeFood('Pancakes'),
    makeFood('Chole'),
    makeFood('Curd rice'),
    makeFood('Rajma'),
    makeFood('Atta roti'),
  ],
  refusedFoods: [
    makeFood('Dal'),
    makeFood('Spinach'),
    makeFood('Bhindi'),
  ],
  medicalFlags: ['Iron deficiency'],
  medicalNotes: '',
  exposureLog: [
    {
      foodId: 'dal',
      foodName: 'Dal',
      count: 6,
      lastAttempt: '2026-03-15',
      status: 'in_progress',
    },
  ],
  createdAt: '2026-01-15T10:00:00Z',
  updatedAt: '2026-03-15T10:00:00Z',
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Arjun refused the dal again today. He just pushed the whole bowl away.',
    timestamp: '2026-03-17T12:30:00Z',
  },
  {
    id: '2',
    role: 'assistant',
    content:
      "Got it. This is the 6th time dal has come up — he's at exposure 6 of about 12 before acceptance usually kicks in. You're not failing. This is exactly where most kids are.",
    timestamp: '2026-03-17T12:30:15Z',
  },
  {
    id: '3',
    role: 'assistant',
    content:
      "For tonight, try this: serve it slightly cooled — the smell of dal peaks when it's hot. Put a small amount next to his curd rice without saying anything about it. Goal tonight is just proximity, not eating.",
    timestamp: '2026-03-17T12:30:30Z',
    metadata: {
      actionButtons: [
        {label: '✓ Will try', variant: 'primary', onPress: () => {}},
        {label: 'Show me another option', variant: 'outlined', onPress: () => {}},
      ],
    },
  },
  {
    id: '4',
    role: 'user',
    content:
      "He also has low iron, doctor mentioned it last week. He's vegetarian.",
    timestamp: '2026-03-17T12:32:00Z',
  },
  {
    id: '5',
    role: 'assistant',
    content: "Important — I've saved that to Arjun's profile.",
    timestamp: '2026-03-17T12:32:10Z',
    metadata: {
      type: 'scout',
      scoutData: {
        flag: 'iron',
        summary:
          'Arjun already eats chole 3x a week. Chickpeas are high in plant-based iron. Before introducing anything new, let\'s use what he already accepts.',
        strategies: [],
        estimatedGapClosure: 0.4,
        dailyRequirement: '10mg',
        estimatedIntake: '6mg',
        gap: '4mg',
      },
    },
  },
  {
    id: '6',
    role: 'assistant',
    content:
      "One easy next step is dal paratha. It keeps dal hidden inside a familiar form, and if you're out of ragi flour I can help add it to your grocery cart too.",
    timestamp: '2026-03-17T12:33:00Z',
    metadata: {
      topic: 'Dal',
      recipeSuggestion: {
        dishName: 'Dal Paratha',
        childName: 'Arjun',
        adaptationNote:
          'Adapted for Arjun — dal is hidden inside the dough. Looks like a normal roti.',
      },
      grocerySuggestion: {
        context:
          "Poshan suggested ragi flour as a nutritious substitute for maida in Arjun's pancakes.",
        productName: 'Ragi Flour (500g)',
        benefit: 'Good source of calcium and iron',
      },
    },
  },
];

export const MOCK_CHAT_SESSIONS: ChatSession[] = [
  {
    sessionId: 'session-1',
    startedAt: '2026-03-17T12:30:00Z',
    lastMessageAt: '2026-03-17T12:33:00Z',
    lastMessage:
      "One easy next step is dal paratha. It keeps dal hidden inside a familiar form.",
    topic: 'Dal · Suggestion given',
  },
  {
    sessionId: 'session-2',
    startedAt: '2026-03-18T08:10:00Z',
    lastMessageAt: '2026-03-18T08:18:00Z',
    lastMessage:
      'Ragi flour can swap into pancakes without changing the texture too much.',
    topic: 'Pancakes · Grocery idea',
  },
  {
    sessionId: 'session-3',
    startedAt: '2026-03-19T17:20:00Z',
    lastMessageAt: '2026-03-19T17:26:00Z',
    lastMessage:
      'Chole already does a lot of work for iron. Lemon just helps the body use it better.',
    topic: 'Iron · Scout activated',
  },
  {
    sessionId: 'session-4',
    startedAt: '2026-03-12T09:00:00Z',
    lastMessageAt: '2026-03-12T09:10:00Z',
    lastMessage: 'Banana atta pancakes counted as a win. Log that one.',
    topic: 'Pancakes · Win logged ✓',
  },
  {
    sessionId: 'session-5',
    startedAt: '2026-03-10T19:12:00Z',
    lastMessageAt: '2026-03-10T19:18:00Z',
    lastMessage:
      'Serving dal cooler mattered more than changing the seasoning.',
    topic: 'Dal · Pattern noted',
  },
];

export const MOCK_SESSION_MESSAGES: Record<string, Message[]> = {
  'session-1': MOCK_MESSAGES,
  'session-2': [
    {
      id: 's2-1',
      role: 'user',
      content: 'Can I make pancakes a little healthier without changing the taste?',
      timestamp: '2026-03-18T08:10:00Z',
    },
    {
      id: 's2-2',
      role: 'assistant',
      content:
        'Yes. Start with half atta and half maida, then gradually bring in ragi flour later.',
      timestamp: '2026-03-18T08:12:00Z',
      metadata: {
        topic: 'Pancakes',
        grocerySuggestion: {
          context:
            "Poshan suggested ragi flour as a nutritious substitute for maida in Arjun's pancakes.",
          productName: 'Ragi Flour (500g)',
          benefit: 'Good source of calcium and iron',
        },
      },
    },
  ],
  'session-3': [
    {
      id: 's3-1',
      role: 'user',
      content: "Doctor said Arjun's iron is low. What should I focus on first?",
      timestamp: '2026-03-19T17:20:00Z',
    },
    {
      id: 's3-2',
      role: 'assistant',
      content:
        'Start with the foods he already accepts. Chole and rajma are doing more work than they seem.',
      timestamp: '2026-03-19T17:26:00Z',
      metadata: {
        type: 'scout',
        scoutData: {
          flag: 'iron',
          summary:
            "Arjun already eats chole and rajma. We'll improve absorption before adding anything new.",
          strategies: [],
          estimatedGapClosure: 0.4,
          dailyRequirement: '10mg',
          estimatedIntake: '6mg',
          gap: '4mg',
        },
      },
    },
  ],
  'session-4': [
    {
      id: 's4-1',
      role: 'assistant',
      content: 'Banana atta pancakes counted as a win. Log that one.',
      timestamp: '2026-03-12T09:10:00Z',
      metadata: {
        topic: 'Pancakes',
      },
    },
  ],
  'session-5': [
    {
      id: 's5-1',
      role: 'assistant',
      content:
        'Serving dal cooler mattered more than changing the seasoning. Keep that variable steady.',
      timestamp: '2026-03-10T19:18:00Z',
      metadata: {
        topic: 'Dal',
      },
    },
  ],
};

export const MOCK_SUCCESS_DIRECTORY: SuccessEntry[] = [
  {
    id: '1',
    foodId: 'atta_pancakes',
    foodName: 'Atta Pancakes',
    date: '2026-03-03',
    description: 'Switched maida to atta. Ate full portion.',
    status: 'accepted',
  },
  {
    id: '2',
    foodId: 'banana_pancakes',
    foodName: 'Banana Pancakes',
    date: '2026-03-11',
    description: 'Added mashed banana to batter. Asked for seconds.',
    status: 'streak',
    streakCount: 4,
  },
  {
    id: '3',
    foodId: 'dal_paratha',
    foodName: 'Dal Paratha',
    date: '2026-03-19',
    description: 'Dal hidden in dough. First time accepted.',
    status: 'accepted',
  },
  {
    id: '4',
    foodId: 'chole_sandwich',
    foodName: 'Chole Sandwich',
    date: '2026-03-28',
    description: "Replaced cheese with chole. Didn't notice.",
    status: 'streak',
    streakCount: 3,
  },
];

export const MOCK_WEEKLY_STATS: WeeklyStats = {
  totalAccepted: 12,
  inProgress: 3,
  changeVs4Weeks: 4,
  currentStreak: 5,
  weeksWithPoshan: 8,
};

export const MOCK_EXPOSURE_HISTORY: Record<string, ExposureHistoryEntry[]> = {
  atta_pancakes: [
    {
      id: 'atta-1',
      date: '2026-02-08',
      description: 'Tried a half-atta version. Ate most of it.',
      status: 'partial',
    },
    {
      id: 'atta-2',
      date: '2026-02-22',
      description: 'Full atta pancakes. Ate the whole portion.',
      status: 'accepted',
    },
    {
      id: 'atta-3',
      date: '2026-03-03',
      description: 'Asked for the pancake again at breakfast.',
      status: 'requested',
    },
  ],
  banana_pancakes: [
    {
      id: 'banana-1',
      date: '2026-02-12',
      description: 'Took two bites when banana was mashed into the batter.',
      status: 'partial',
    },
    {
      id: 'banana-2',
      date: '2026-03-11',
      description: 'Added mashed banana to batter. Asked for seconds.',
      status: 'accepted',
      note: 'Sweetness worked in your favor.',
    },
  ],
  dal_paratha: [
    {
      id: 'dal-1',
      date: '2026-01-15',
      description: 'Refused — pushed bowl away without tasting',
      status: 'refused',
    },
    {
      id: 'dal-2',
      date: '2026-01-22',
      description: 'Refused — served hot, smell was the issue',
      status: 'refused',
    },
    {
      id: 'dal-3',
      date: '2026-02-05',
      description: '1–2 spoonfuls. Served cooled.',
      status: 'partial',
      note: 'Poshan noted: temperature is a factor',
    },
    {
      id: 'dal-4',
      date: '2026-02-19',
      description: 'Dal paratha — ate full portion',
      status: 'accepted',
    },
    {
      id: 'dal-5',
      date: '2026-03-02',
      description: 'Dal paratha — asked for it by name',
      status: 'requested',
    },
  ],
  chole_sandwich: [
    {
      id: 'chole-1',
      date: '2026-02-18',
      description: 'Ate half when cheese was still included.',
      status: 'partial',
    },
    {
      id: 'chole-2',
      date: '2026-03-28',
      description: "Replaced cheese with chole. Didn't notice.",
      status: 'accepted',
    },
  ],
};

export const MOCK_WEEKLY_REPORT: WeeklyReport = {
  id: 'weekly-2026-03-15',
  startDate: '2026-03-15',
  endDate: '2026-03-21',
  weeksIn: 8,
  mealsLogged: 3,
  suggestionsTried: 2,
  newFoodsAccepted: 1,
  ironStatus: 'improving',
  winTitle: 'Dal Paratha',
  winDescription:
    "Dal stayed invisible inside the dough, and Arjun ate the whole paratha without a refusal moment.",
  exposureCount: 11,
  exposureTarget: 12,
  whatYouTried: [
    {
      id: 'attempt-1',
      label: 'Dal Paratha (Tuesday)',
      outcome: 'Accepted ✓',
      tone: 'green',
    },
    {
      id: 'attempt-2',
      label: 'Spinach in pasta sauce (Thursday)',
      outcome: '2 bites only',
      tone: 'amber',
    },
    {
      id: 'attempt-3',
      label: 'Plain dal, served hot (Friday)',
      outcome: 'Refused',
      tone: 'red',
    },
  ],
  poshanRead:
    "Arjun accepts dal only when it's hidden in a form he already likes. Hot dal in a bowl continues to be refused. Don't serve it that way again — the form change is working.",
  nextWeekSteps: [
    'Dal paratha one more time — one meal away from full acceptance',
    'Add lemon to chole serving — Vitamin C doubles iron absorption',
    'Try spinach in tomato base again — two bites last time is progress',
  ],
};

export const MOCK_NUDGE = {
  label: "TODAY'S SUGGESTION",
  text: "Arjun eats chole 3x a week. Try adding a teaspoon of amchur (dry mango powder) — it boosts iron absorption from chickpeas by up to 3x. Same chole, better iron.",
};

export const THINKING_STATES = [
  "Looking at Arjun's profile...",
  "Checking what's worked before...",
  "Reviewing food history...",
  'Crafting a suggestion...',
];
