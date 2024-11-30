import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  onImageDrop: (file: File) => void;
}

export const DropZone = ({ onImageDrop }: DropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop: files => files[0] && onImageDrop(files[0])
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-xl p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
          </p>
          <p className="text-sm text-gray-500 mt-1">or click to select</p>
        </div>
      </div>
    </div>
  );
};