import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from './apiClient';
import { FunctionalRequirement, Comment, ImpactAnalysis } from '@/types';

interface FRListResponse {
  functionalRequirements: FunctionalRequirement[];
  total: number;
  page: number;
  pageSize: number;
}

interface FRResponse {
  functionalRequirement: FunctionalRequirement;
}

interface CommentListResponse {
  comments: Comment[];
}

interface CommentResponse {
  comment: Comment;
}

interface ImpactAnalysisListResponse {
  analyses: ImpactAnalysis[];
}

interface ImpactAnalysisResponse {
  analysis: ImpactAnalysis;
}

export const frService = {
  async list(
    repositoryId?: string,
    status?: string,
    page: number = 1,
    pageSize: number = 50
  ): Promise<FRListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (repositoryId) params.append('repositoryId', repositoryId);
    if (status) params.append('status', status);
    
    return apiClient.get<FRListResponse>(
      `${API_ENDPOINTS.FUNCTIONAL_REQUIREMENTS}?${params}`
    );
  },

  async getById(id: string): Promise<FunctionalRequirement> {
    const response = await apiClient.get<FRResponse>(
      API_ENDPOINTS.FR_BY_ID(id)
    );
    return response.functionalRequirement;
  },

  async create(data: Omit<FunctionalRequirement, 'id' | 'createdAt' | 'comments'>): Promise<FunctionalRequirement> {
    const response = await apiClient.post<FRResponse>(
      API_ENDPOINTS.FUNCTIONAL_REQUIREMENTS,
      data
    );
    return response.functionalRequirement;
  },

  async update(id: string, data: Partial<FunctionalRequirement>): Promise<FunctionalRequirement> {
    const response = await apiClient.put<FRResponse>(
      API_ENDPOINTS.FR_BY_ID(id),
      data
    );
    return response.functionalRequirement;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.FR_BY_ID(id));
  },

  // Comments
  async listComments(frId: string): Promise<Comment[]> {
    const response = await apiClient.get<CommentListResponse>(
      API_ENDPOINTS.FR_COMMENTS(frId)
    );
    return response.comments;
  },

  async addComment(frId: string, content: string): Promise<Comment> {
    const response = await apiClient.post<CommentResponse>(
      API_ENDPOINTS.FR_COMMENTS(frId),
      { content }
    );
    return response.comment;
  },

  async deleteComment(frId: string, commentId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.FR_COMMENT_BY_ID(frId, commentId));
  },

  // Impact Analysis
  async analyzeImpact(frId: string): Promise<ImpactAnalysis> {
    const response = await apiClient.post<ImpactAnalysisResponse>(
      API_ENDPOINTS.FR_ANALYZE(frId)
    );
    return response.analysis;
  },

  async listImpactAnalyses(frId: string): Promise<ImpactAnalysis[]> {
    const response = await apiClient.get<ImpactAnalysisListResponse>(
      API_ENDPOINTS.FR_IMPACT_ANALYSES(frId)
    );
    return response.analyses;
  },

  async getImpactAnalysis(analysisId: string): Promise<ImpactAnalysis> {
    const response = await apiClient.get<ImpactAnalysisResponse>(
      API_ENDPOINTS.IMPACT_ANALYSIS_BY_ID(analysisId)
    );
    return response.analysis;
  },

  async downloadReport(analysisId: string): Promise<Blob> {
    // Special handling for file download
    const response = await fetch(
      `${API_ENDPOINTS.IMPACT_ANALYSIS_REPORT(analysisId)}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to download report');
    }
    
    return response.blob();
  },

  async rerunAnalysis(analysisId: string): Promise<ImpactAnalysis> {
    const response = await apiClient.post<ImpactAnalysisResponse>(
      API_ENDPOINTS.IMPACT_ANALYSIS_RERUN(analysisId)
    );
    return response.analysis;
  },
};
