import { User } from "@clerk/nextjs/server";

export {}

// Create a type for the roles
export type Roles = 'admin' | 'user' | 'student_rep' | 'anonymous' | 'proffessional'
export type Status = 'NEW' | 'PROCESSING' | 'REJECTED' | 'RESOLVED'
export type Prediction = 'non-toxic' | 'toxic';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }

  // interface User {
  //   id:string;
  //   name: string;
  //   email: string;
  //   role?: Roles;
  //   joinedAt: string;
  // }

  

  interface CreateUserParams {
    username: string;
    password: string;
    emailAddress: string[];
    publicMetadata?: {
      role: string;
    }
  }

  interface UpdateUserParams {
    username: string;
    publicMetadata?: {
      role: string;
    }
  }

  interface ReportFormData {
    reporterType: Omit<Roles, 'admin', 'student_rep', 'proffessional'>;
    email: string;
    title: string;
    description: string;
    incidentHappenedTo: string;
    incidentTypes: string[];
    incidentConnections: string[];
    reporterConnection: string;
    affectedConnection: string;
    perpetratorConnection: string;
    consentToReport: boolean;
    consentToUpload: boolean;
    evidenceFiles: File[] | null;
    anonymousReason: string[];
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

  interface CaseData {
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
    Evidence: Evidence[];
  }

  interface AnalyticSummary {
    newCases: number;
    processingCases: number;
    totalCases: number;
    resolvedCases: number;
    totalRegisteredUsers: number;
    recentCases: Case[]
  }

  interface Evidence {
    url: string;
    uploadedAt: string;
    id: string;
  }

  interface Slide {
    id: number
    image: string
    title: string
    description: string
  }
}