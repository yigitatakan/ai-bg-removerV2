import { Download } from 'lucide-react';

interface ProcessedImageProps {
  original: string;
  processed: string;
  onDownload: () => void;
}

export const ProcessedImage = ({ original, processed, onDownload }: ProcessedImageProps) => {
  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <div className="w-full sm:w-1/2">
          <p className="text-center text-gray-700 font-medium mb-2">Original</p>
          <img 
            src={original} 
            alt="Original" 
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <p className="text-center text-gray-700 font-medium mb-2">Background Removed</p>
          <img 
            src={processed} 
            alt="Processed" 
            className="w-full rounded-lg shadow-md bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAOdEVYdFRpdGxlAENoZWNrZXJz6p0eiQAAABlJREFUOI1jfPDgwX8GKgImKhnnDaOBNBwAAM8LDZ/R/QYkAAAAAElFTkSuQmCC')]"
          />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Result
        </button>
      </div>
    </div>
  );
};