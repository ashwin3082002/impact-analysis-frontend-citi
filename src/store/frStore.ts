import { create } from 'zustand';
import { FunctionalRequirement, Comment, ImpactAnalysis } from '@/types';
import { DUMMY_FUNCTIONAL_REQUIREMENTS, DUMMY_IMPACT_ANALYSES, simulateApiDelay } from '@/data/dummyData';
import { frService } from '@/services/frService';
import { API_CONFIG } from '@/config/api';

interface FRState {
  functionalRequirements: FunctionalRequirement[];
  impactAnalyses: Record<string, ImpactAnalysis>;
  isLoading: boolean;
  fetchFRs: (repositoryId?: string) => Promise<void>;
  addFR: (fr: Omit<FunctionalRequirement, 'id' | 'createdAt' | 'comments'>) => Promise<void>;
  updateFR: (id: string, updates: Partial<FunctionalRequirement>) => Promise<void>;
  deleteFR: (id: string) => Promise<void>;
  addComment: (frId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => Promise<void>;
  analyzeImpact: (frId: string) => Promise<void>;
  getImpactAnalysis: (frId: string) => ImpactAnalysis | undefined;
}

export const useFRStore = create<FRState>((set, get) => ({
  functionalRequirements: [],
  impactAnalyses: {},
  isLoading: false,

  fetchFRs: async (repositoryId) => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        const response = await frService.list(repositoryId);
        
        // Fetch impact analyses for all FRs
        const analyses: Record<string, ImpactAnalysis> = {};
        for (const fr of response.functionalRequirements) {
          try {
            const frAnalyses = await frService.listImpactAnalyses(fr.id);
            if (frAnalyses.length > 0) {
              analyses[fr.id] = frAnalyses[0]; // Use most recent analysis
            }
          } catch (error) {
            console.error(`Failed to fetch analyses for FR ${fr.id}:`, error);
          }
        }
        
        set({ 
          functionalRequirements: response.functionalRequirements,
          impactAnalyses: analyses,
          isLoading: false 
        });
      } else {
        await simulateApiDelay();
        let frs = [...DUMMY_FUNCTIONAL_REQUIREMENTS];
        if (repositoryId) {
          frs = frs.filter((fr) => fr.repositoryId === repositoryId);
        }
        set({ 
          functionalRequirements: frs,
          impactAnalyses: { ...DUMMY_IMPACT_ANALYSES },
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Failed to fetch FRs:', error);
      set({ isLoading: false });
    }
  },

  addFR: async (fr) => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        const newFR = await frService.create(fr);
        set((state) => ({
          functionalRequirements: [...state.functionalRequirements, newFR],
          isLoading: false,
        }));
      } else {
        await simulateApiDelay();
        const newFR: FunctionalRequirement = {
          ...fr,
          id: `fr-${Date.now()}`,
          createdAt: new Date(),
          comments: [],
        };
        set((state) => ({
          functionalRequirements: [...state.functionalRequirements, newFR],
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Failed to add FR:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateFR: async (id, updates) => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        const updatedFR = await frService.update(id, updates);
        set((state) => ({
          functionalRequirements: state.functionalRequirements.map((fr) =>
            fr.id === id ? updatedFR : fr
          ),
          isLoading: false,
        }));
      } else {
        await simulateApiDelay();
        set((state) => ({
          functionalRequirements: state.functionalRequirements.map((fr) =>
            fr.id === id ? { ...fr, ...updates } : fr
          ),
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Failed to update FR:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  deleteFR: async (id) => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        await frService.delete(id);
        set((state) => ({
          functionalRequirements: state.functionalRequirements.filter((fr) => fr.id !== id),
          isLoading: false,
        }));
      } else {
        await simulateApiDelay();
        set((state) => ({
          functionalRequirements: state.functionalRequirements.filter((fr) => fr.id !== id),
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Failed to delete FR:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  addComment: async (frId, comment) => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        const newComment = await frService.addComment(frId, comment.content);
        set((state) => ({
          functionalRequirements: state.functionalRequirements.map((fr) =>
            fr.id === frId
              ? { ...fr, comments: [...fr.comments, newComment] }
              : fr
          ),
          isLoading: false,
        }));
      } else {
        await simulateApiDelay();
        const newComment: Comment = {
          ...comment,
          id: `comment-${Date.now()}`,
          createdAt: new Date(),
        };
        set((state) => ({
          functionalRequirements: state.functionalRequirements.map((fr) =>
            fr.id === frId
              ? { ...fr, comments: [...fr.comments, newComment] }
              : fr
          ),
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  analyzeImpact: async (frId) => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        const analysis = await frService.analyzeImpact(frId);
        set((state) => ({
          impactAnalyses: {
            ...state.impactAnalyses,
            [frId]: analysis,
          },
          functionalRequirements: state.functionalRequirements.map((fr) =>
            fr.id === frId ? { ...fr, status: 'analyzed' as const } : fr
          ),
          isLoading: false,
        }));
      } else {
        await simulateApiDelay(2000);
        const fr = get().functionalRequirements.find((f) => f.id === frId);
        if (fr) {
          const mockAnalysis: ImpactAnalysis = {
            id: `impact-${Date.now()}`,
            frId,
            repositoryId: fr.repositoryId,
            analyzedAt: new Date(),
            totalImpactedAPIs: Math.floor(Math.random() * 10) + 3,
            totalAPIs: Math.floor(Math.random() * 5) + 10,
            affectedModules: Math.floor(Math.random() * 5) + 1,
            criticalityLevel: ['minor', 'support', 'major'][Math.floor(Math.random() * 3)] as any,
            affectedChannels: [],
          };
          
          set((state) => ({
            impactAnalyses: {
              ...state.impactAnalyses,
              [frId]: mockAnalysis,
            },
            functionalRequirements: state.functionalRequirements.map((fr) =>
              fr.id === frId ? { ...fr, status: 'analyzed' as const } : fr
            ),
            isLoading: false,
          }));
        } else {
          set({ isLoading: false });
        }
      }
    } catch (error) {
      console.error('Failed to analyze impact:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  getImpactAnalysis: (frId) => {
    return get().impactAnalyses[frId];
  },
}));
