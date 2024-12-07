export {}

// Create a type for the roles
export type Roles = 'admin' | 'user' | 'student_rep'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}