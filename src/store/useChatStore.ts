import {create} from 'zustand';
import {ChatSession, Message, NutritionScoutData} from '../types/chat';
import {
  MOCK_CHAT_SESSIONS,
  MOCK_MESSAGES,
  MOCK_SESSION_MESSAGES,
} from '../utils/mockData';

interface ChatState {
  messages: Message[];
  sessions: ChatSession[];
  currentSessionId: string;
  sessionMessages: Record<string, Message[]>;
  isThinking: boolean;
  thinkingStatus: string;
  activeScoutData: NutritionScoutData | null;
  composerDraft: string;
  addMessage: (message: Message) => void;
  setThinking: (thinking: boolean) => void;
  setThinkingStatus: (status: string) => void;
  setActiveScout: (data: NutritionScoutData | null) => void;
  setComposerDraft: (draft: string) => void;
  setCurrentSessionId: (sessionId: string) => void;
  loadSession: (sessionId: string) => void;
  getSession: (sessionId: string) => Message[];
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: MOCK_MESSAGES,
  sessions: MOCK_CHAT_SESSIONS,
  currentSessionId: MOCK_CHAT_SESSIONS[0]?.sessionId || 'session-1',
  sessionMessages: MOCK_SESSION_MESSAGES,
  isThinking: false,
  thinkingStatus: '',
  activeScoutData: null,
  composerDraft: '',

  addMessage: (message) =>
    set((state) => {
      const existingMessages =
        state.sessionMessages[state.currentSessionId] || state.messages;
      const nextMessages = [...existingMessages, message];

      return {
        messages: nextMessages,
        sessionMessages: {
          ...state.sessionMessages,
          [state.currentSessionId]: nextMessages,
        },
        sessions: state.sessions.map((session) =>
          session.sessionId === state.currentSessionId
            ? {
                ...session,
                lastMessage: message.content,
                lastMessageAt: message.timestamp,
              }
            : session,
        ),
      };
    }),

  setThinking: (isThinking) => set({isThinking}),

  setThinkingStatus: (thinkingStatus) => set({thinkingStatus}),

  setActiveScout: (activeScoutData) => set({activeScoutData}),

  setComposerDraft: (composerDraft) => set({composerDraft}),

  setCurrentSessionId: (currentSessionId) => set({currentSessionId}),

  loadSession: (sessionId) =>
    set((state) => ({
      currentSessionId: sessionId,
      messages: state.sessionMessages[sessionId] || [],
      isThinking: false,
      thinkingStatus: '',
    })),

  getSession: (sessionId) => get().sessionMessages[sessionId] || [],

  clearChat: () =>
    set((state) => ({
      messages: [],
      sessionMessages: {
        ...state.sessionMessages,
        [state.currentSessionId]: [],
      },
      isThinking: false,
      thinkingStatus: '',
      composerDraft: '',
    })),
}));
