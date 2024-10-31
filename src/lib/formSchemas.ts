import { z } from "zod";

export const reportFormSchema = z.object({
  reportingFor: z.enum(["true","false"],{
    required_error:"You need to select an Option"
  }),
  incidentType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})