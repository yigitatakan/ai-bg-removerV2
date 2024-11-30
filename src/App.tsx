import { useState } from 'react';
import axios from 'axios';
import './index.css';
import { DropZone } from './components/DropZone';
import { ProcessedImage } from './components/ProcessedImage';
import { Advertisement } from './components/Advertisement';
import { Loader2 } from 'lucide-react';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageDrop = async (file: File) => {
    setError(null);
    setIsProcessing(true);
    setOriginalImage(URL.createObjectURL(file));
    setProcessedImage(null);

    const formData = new FormData();
    formData.append('image_file', file);

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': import.meta.env.VITE_REMOVE_BG_API_KEY,
        },
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'image/png' });
      setProcessedImage(URL.createObjectURL(blob));
    } catch (err) {
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'removed-background.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 bg-slate-50 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          RemovAI
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Remove image backgrounds with AI
        </p>
      </div>

      {/* Top Advertisement */}
      <div className="w-full max-w-[728px] mx-auto">
        <Advertisement
          adSlot="1234567890"
          adFormat="horizontal"
          style={{ minHeight: '90px' }}
        />
      </div>

      {!originalImage && <DropZone onImageDrop={handleImageDrop} />}

      {isProcessing && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-gray-600">Processing your image...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}

      {originalImage && processedImage && (
        <>
          {/* Advertisement before results */}
          <div className="w-full max-w-[728px] mx-auto">
            <Advertisement
              adSlot="0987654321"
              adFormat="rectangle"
              style={{ minHeight: '250px' }}
            />
          </div>

          <ProcessedImage
            original={originalImage}
            processed={processedImage}
            onDownload={handleDownload}
          />
        </>
      )}

      {originalImage && (
        <button
          onClick={() => {
            setOriginalImage(null);
            setProcessedImage(null);
            setError(null);
          }}
          className="text-gray-600 hover:text-gray-800"
        >
          Process another image
        </button>
      )}

      {/* Bottom Advertisement */}
      <div className="w-full max-w-[728px] mx-auto mt-8">
        <Advertisement
          adSlot="1122334455"
          adFormat="horizontal"
          style={{ minHeight: '90px' }}
        />
      </div>
    </div>
  );
}

export default App;