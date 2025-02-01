import { create } from "zustand";
import { z } from "zod";
import axios from "axios";

export const reportSchema = z.object({
  incidentHappenedTo: z.enum(['me', 'someone-else']),
  incidentDescription: z.array(z.string()).min(1, 'Please select at least one description'),
  incidentConnection: z.array(z.string()),
  yourConnection: z.enum(['student', 'staff', 'visitor', 'other']),
  affectedPersonConnection: z.enum(['student', 'staff', 'visitor', 'other']),
  allegedPerpetratorConnection: z.enum(['student', 'staff', 'visitor', 'other']),
  anonymousReportReason: z.array(z.string()).min(1, 'Please select at least one reason'),
  otherIncidentDescription: z.string().optional(),
  otherIncidentConnection: z.string().optional(),
  otherYourConnection: z.string().optional(),
  otherAffectedPersonConnection: z.string().optional(),
  otherAllegedPerpetratorConnection: z.string().optional(),
  otherAnonymousReportReason: z.string().optional(),
})

type formState = z.infer<typeof reportSchema> & {
  isFormVisible:boolean;
}
type dataState = z.infer<typeof reportSchema>

type formActions = {
  toggleForm: () => void;
  setFormData: (data: Partial<formState>) => void
  resetForm: () => void
}

const initialState: formState = {
  isFormVisible: false,
  incidentHappenedTo: 'me',
  incidentDescription: [],
  incidentConnection: [],
  yourConnection: 'student',
  affectedPersonConnection: 'student',
  allegedPerpetratorConnection: 'student',
  anonymousReportReason: []
}


export const useAnonymousReportStore = create<formState & formActions>((set) => ({
  ...initialState,
  toggleForm: () => set((state) => ({ isFormVisible: !state.isFormVisible })),
  ...initialState,
  setFormData: (data) => set((state) => ({ ...state, ...data })),
  resetForm: () => set(initialState),
}))