import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from './apiClient';
import { Repository, DependencyNode } from '@/types';

interface RepositoryListResponse {
  repositories: Repository[];
  total: number;
  page: number;
  pageSize: number;
}

interface RepositoryResponse {
  repository: Repository;
}

interface DependenciesResponse {
  dependencies: DependencyNode[];
  repositoryId: string;
}

export const repositoryService = {
  async list(page: number = 1, pageSize: number = 50): Promise<RepositoryListResponse> {
    return apiClient.get<RepositoryListResponse>(
      `${API_ENDPOINTS.REPOSITORIES}?page=${page}&pageSize=${pageSize}`
    );
  },

  async getById(id: string): Promise<Repository> {
    const response = await apiClient.get<RepositoryResponse>(
      API_ENDPOINTS.REPOSITORY_BY_ID(id)
    );
    return response.repository;
  },

  async create(data: Omit<Repository, 'id' | 'createdAt'>): Promise<Repository> {
    const response = await apiClient.post<RepositoryResponse>(
      API_ENDPOINTS.REPOSITORIES,
      data
    );
    return response.repository;
  },

  async update(id: string, data: Partial<Repository>): Promise<Repository> {
    const response = await apiClient.put<RepositoryResponse>(
      API_ENDPOINTS.REPOSITORY_BY_ID(id),
      data
    );
    return response.repository;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.REPOSITORY_BY_ID(id));
  },

  async getDependencies(id: string): Promise<DependencyNode[]> {
    const response = await apiClient.get<DependenciesResponse>(
      API_ENDPOINTS.REPOSITORY_DEPENDENCIES(id)
    );
    return response.dependencies;
  },
};
