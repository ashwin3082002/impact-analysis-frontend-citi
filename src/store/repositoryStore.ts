import { create } from 'zustand';
import { Repository } from '@/types';
import { DUMMY_REPOSITORIES, simulateApiDelay } from '@/data/dummyData';
import { repositoryService } from '@/services/repositoryService';
import { API_CONFIG } from '@/config/api';

interface RepositoryState {
  repositories: Repository[];
  selectedRepository: Repository | null;
  isLoading: boolean;
  fetchRepositories: () => Promise<void>;
  addRepository: (repo: Omit<Repository, 'id' | 'createdAt'>) => Promise<void>;
  updateRepository: (id: string, repo: Partial<Repository>) => Promise<void>;
  deleteRepository: (id: string) => Promise<void>;
  selectRepository: (id: string) => void;
}

export const useRepositoryStore = create<RepositoryState>((set, get) => ({
  repositories: [],
  selectedRepository: null,
  isLoading: false,

  fetchRepositories: async () => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        const response = await repositoryService.list();
        set({ repositories: response.repositories, isLoading: false });
      } else {
        await simulateApiDelay();
        set({ repositories: [...DUMMY_REPOSITORIES], isLoading: false });
      }
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
      set({ isLoading: false });
    }
  },

  addRepository: async (repo) => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        const newRepo = await repositoryService.create(repo);
        set((state) => ({
          repositories: [...state.repositories, newRepo],
          isLoading: false,
        }));
      } else {
        await simulateApiDelay();
        const newRepo: Repository = {
          ...repo,
          id: `repo-${Date.now()}`,
          createdAt: new Date(),
        };
        set((state) => ({
          repositories: [...state.repositories, newRepo],
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Failed to add repository:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateRepository: async (id, updates) => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        const updatedRepo = await repositoryService.update(id, updates);
        set((state) => ({
          repositories: state.repositories.map((repo) =>
            repo.id === id ? updatedRepo : repo
          ),
          isLoading: false,
        }));
      } else {
        await simulateApiDelay();
        set((state) => ({
          repositories: state.repositories.map((repo) =>
            repo.id === id ? { ...repo, ...updates } : repo
          ),
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Failed to update repository:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  deleteRepository: async (id) => {
    set({ isLoading: true });
    try {
      if (API_CONFIG.USE_REAL_API) {
        await repositoryService.delete(id);
        set((state) => ({
          repositories: state.repositories.filter((repo) => repo.id !== id),
          isLoading: false,
        }));
      } else {
        await simulateApiDelay();
        set((state) => ({
          repositories: state.repositories.filter((repo) => repo.id !== id),
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Failed to delete repository:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  selectRepository: (id) => {
    const repo = get().repositories.find((r) => r.id === id);
    set({ selectedRepository: repo || null });
  },
}));
