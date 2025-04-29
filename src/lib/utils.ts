import { CaseStatus } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusStyles(status:CaseStatus){
  switch (status) {
    case CaseStatus.OPEN:
      return 'bg-green-100 text-green-800';
    case CaseStatus.PROCESSING:
      return 'bg-blue-100 text-blue-800';
    case CaseStatus.REJECTED:
      return 'bg-red-100 text-red-800';
    case CaseStatus.RESOLVED:
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
