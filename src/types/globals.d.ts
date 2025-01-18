export {}

// Create a type for the roles
export type Roles = 'admin' | 'user' | 'student_rep'
export type Status = 'NEW' | 'PROCESSING' | 'REJECTED' | 'RESOLVED'
export type Prediction = 'non-toxic' | 'toxic';

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
    incidentHappenedTo: string;
    incidentDescription: string;
    incidentConnection: string;
    reporterConnection: string;
    percepterConnection: string;
    affectedConnection: string;
    evidenceUrls: string[];
    description: string;
    status: Status;
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