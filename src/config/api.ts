// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.byash.in',
  // Toggle to use real API or dummy data (set to true when backend is ready)
  USE_REAL_API: false,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,
  
  // Repositories
  REPOSITORIES: '/repositories',
  REPOSITORY_BY_ID: (id: string) => `/repositories/${id}`,
  REPOSITORY_DEPENDENCIES: (id: string) => `/repositories/${id}/dependencies`,
  REPOSITORY_FRS: (id: string) => `/repositories/${id}/functional-requirements`,
  
  // Functional Requirements
  FUNCTIONAL_REQUIREMENTS: '/functional-requirements',
  FR_BY_ID: (id: string) => `/functional-requirements/${id}`,
  FR_COMMENTS: (id: string) => `/functional-requirements/${id}/comments`,
  FR_COMMENT_BY_ID: (frId: string, commentId: string) => 
    `/functional-requirements/${frId}/comments/${commentId}`,
  FR_ANALYZE: (id: string) => `/functional-requirements/${id}/analyze`,
  FR_IMPACT_ANALYSES: (id: string) => `/functional-requirements/${id}/impact-analyses`,
  
  // Impact Analysis
  IMPACT_ANALYSIS_BY_ID: (id: string) => `/impact-analyses/${id}`,
  IMPACT_ANALYSIS_REPORT: (id: string) => `/impact-analyses/${id}/report`,
  IMPACT_ANALYSIS_RERUN: (id: string) => `/impact-analyses/${id}/rerun`,
} as const;
