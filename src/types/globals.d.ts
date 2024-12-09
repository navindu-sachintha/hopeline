export {}

// Create a type for the roles
export type Roles = 'admin' | 'user' | 'student_rep'
export type Statuses = 'NEW' | 'PROCESSING' | 'REJECTED' | 'RESOLVED'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }

  interface User {
    id:string;
    name: string;
    email: string;
    role?: Roles;
    joinedAt: string;
  }

  interface Case {
    id: string;
    title:string;
    description: string;
    status: Statuses;
    category: string;
    dateCreated: string;
    dateUpdated: string;
    userId: string;
  }

  interface AnalyticSummary {
    totalCases: number;
    openCases: number;
    resolvedCases: number;
    totalUsers: number;
    averageResolutionTime: string;
  }
}