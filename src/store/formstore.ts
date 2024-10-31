import { create } from "zustand";
import { z } from "zod";

export const reportSchema = z.object({
  incidentHappenedTo: z.enum(['me', 'someone-else']),
  incidentDescription: z.array(z.string()).min(1, 'Please select at least one description'),
  incidentConnection: z.array(z.string()),
  yourConnection: z.enum(['student', 'staff', 'visitor', 'other']),
  affectedPersonConnection: z.enum(['student', 'staff', 'visitor', 'other']),
  allegedPerpetratorConnection: z.enum(['student', 'staff', 'visitor', 'other']),
  anonymousReportReason: z.array(z.string()).min(1, 'Please select at least one reason')
})

type formState = z.infer<typeof reportSchema> & {
  isFormVisible:boolean;
}
type dataState = z.infer<typeof reportSchema>

type formActions = {
  toggleForm: () => void;
  setFormData: (data: Partial<formState>) => void
  resetForm: () => void
  submitForm: (data: dataState) => void
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
  submitForm: (data) => {
    console.log('Form submitted:', data)
    // Here you would typically send the data to your backend
    // After successful submission, you might want to reset the form
    // set(initialState)
  }
}))