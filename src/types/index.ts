export type UserRole = 'admin' | 'developer' | 'ba';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  gitUrl: string;
  linkedDevelopers: string[];
  linkedBAs: string[];
  createdAt: Date;
  lastAnalysis?: Date;
  totalAPIs?: number;
  vulnerableModules?: number;
}

export interface FunctionalRequirement {
  id: string;
  repositoryId: string;
  title: string;
  description: string;
  fileUrl?: string;
  createdBy: string;
  createdAt: Date;
  status: 'draft' | 'under-review' | 'analyzed' | 'completed';
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  createdAt: Date;
}

export interface DependencyNode {
  id: string;
  name: string;
  type: 'module' | 'class' | 'method';
  description: string;
  vulnerable?: boolean;
  dependencies?: string[];
}

export interface ImpactAnalysis {
  id: string;
  frId: string;
  repositoryId: string;
  analyzedAt: Date;
  totalImpactedAPIs: number;
  totalAPIs: number;
  affectedModules: number;
  criticalityLevel: 'minor' | 'support' | 'major';
  affectedChannels: AffectedChannel[];
}

export interface AffectedChannel {
  id: string;
  name: string;
  type: 'mobile' | 'web' | 'desktop';
  applications: AffectedApplication[];
}

export interface AffectedApplication {
  id: string;
  name: string;
  modules: AffectedModule[];
}

export interface AffectedModule {
  id: string;
  name: string;
  apis: ImpactedAPI[];
}

export interface ImpactedAPI {
  id: string;
  name: string;
  isAffected: boolean;
  callStack: CallStackItem[];
  criticality: 'minor' | 'support' | 'major';
}

export interface CallStackItem {
  method: string;
  description: string;
  line?: number;
}
