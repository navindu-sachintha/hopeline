export interface validationErrors {
  title?: string
  description?: string
  incidentHappenedTo?: string
  incidentTypes?: string
  incidentConnections?: string
  reporterConnection?: string
  affectedConnection?: string
  perpetratorConnection?: string
  consentToReport?: string
  consentToUpload?: string
  evidenceFiles?: string
}

export const validateForm = (formData: ReportFormData): {isValid:boolean; errors:validationErrors} => {
  const errors:validationErrors = {
    title: '',
    description: '',
    incidentHappenedTo: '',
    incidentTypes: '',
    incidentConnections: '',
    reporterConnection: '',
    affectedConnection: '',
    perpetratorConnection: '',
    consentToReport: '',
    consentToUpload: '',
    evidenceFiles: '',
  }

  let isValid = true

  if(!formData.title?.trim()){
    errors.title = 'Title is required'
    isValid = false
  }

  if(!formData.description?.trim()){
    errors.description = 'Description is required'
    isValid = false
  }

  if(!formData.incidentHappenedTo?.trim()){
    errors.incidentHappenedTo = 'Please select incident happened to'
    isValid = false
  }

  if(!formData.incidentTypes?.length){
    errors.incidentTypes = 'Please select incident types'
    isValid = false
  }

  if(!formData.incidentConnections?.length){
    errors.incidentConnections = 'Please select incident connections'
    isValid = false
  }

  if(!formData.reporterConnection?.trim()){
    errors.reporterConnection = 'Please select reporter connection'
    isValid = false
  }

  if(!formData.affectedConnection?.trim()){
    errors.affectedConnection = 'Please select affected connection'
    isValid = false
  }

  if(!formData.perpetratorConnection?.trim()){
    errors.perpetratorConnection = 'Please select perpetrator connection'
    isValid = false
  }

  if(formData.consentToUpload === true && formData.evidenceFiles?.length){
    errors.evidenceFiles = 'Please upload evidence files'
    isValid = false
  }

  return {isValid, errors}
}