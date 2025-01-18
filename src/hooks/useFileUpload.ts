import { useState, useCallback } from 'react';

export function useFileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
  };
}