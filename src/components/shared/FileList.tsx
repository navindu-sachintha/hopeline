import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Selected Files:</h3>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-muted/50 p-2 rounded text-sm"
          >
            <span className="truncate">{file.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemove(index)}
            >
             <Trash className="h-4 w-4" /> 
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}