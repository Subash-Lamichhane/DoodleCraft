import React, { useState } from 'react';
import Sketch1 from '/1.jpg'
import Sketch2 from '/2.jpg'
import Sketch3 from '/3.jpg'
import Sketch4 from '/4.jpg'
import Real1 from '/real1.png'
import Real2 from '/real2.png'
import Real3 from '/real3.png'
import Real4 from '/real4.png'
import Header from '../../components/Header';
interface ModelImage {
  id: number;
  sketchImage: string;
  realisticImage: string;
}

// Sample model outputs - replace with your actual image paths
const modelOutputs: ModelImage[] = [
  {
    id: 1,
    sketchImage:  Sketch1,
    realisticImage: Real1,
  },
  {
    id: 2,
    sketchImage: Sketch2,
    realisticImage: Real2,
  },
  {
    id: 3,
    sketchImage: Sketch3,
    realisticImage: Real3,
  },
  {
    id: 4,
    sketchImage: Sketch4,
    realisticImage: Real4,
  }
];

const FashionModelGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ModelImage | null>(null);
  const [fullscreenMode, setFullscreenMode] = useState<'sketch' | 'realistic' | null>(null);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header/>
      <div className="py-6 px-4 text-center">
        <h1 className="text-3xl font-bold text-purple-300">Sketch to Fashion AI</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modelOutputs.map((output) => (
            <div 
              key={output.id} 
              className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:border-purple-700 transition-all duration-300"
              onClick={() => setSelectedImage(output)}
            >
              <div className="flex w-full justify-center">
                <div className="border-r border-gray-700 rounded-lg">
                  <img 
                    src={output.sketchImage} 
                    alt="Fashion sketch" 
                    className="w-full h-64 object-cover rounded-l-lg"
                  />
                </div>
                <div className="">
                  <img 
                    src={output.realisticImage} 
                    alt="DoodleCraft generated fashion image" 
                    className="w-full h-64 object-cover rounded-r-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="absolute top-4 right-4 z-10 flex space-x-4">
            <button 
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {fullscreenMode ? (
            <div className="fixed inset-0 flex items-center justify-center" onClick={() => setFullscreenMode(null)}>
              <img 
                src={fullscreenMode === 'sketch' ? selectedImage.sketchImage : selectedImage.realisticImage} 
                alt={fullscreenMode === 'sketch' ? "Fashion sketch" : "DoodleCraft generated fashion image"} 
                className="max-h-screen max-w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row w-full max-w-6xl mx-4">
              <div 
                className="flex-1 p-2 cursor-pointer" 
                onClick={() => setFullscreenMode('sketch')}
              >
                <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <img 
                    src={selectedImage.sketchImage} 
                    alt="Fashion sketch" 
                    className="w-full rounded-lg"
                  />
                  <p className="text-center mt-2 text-purple-200 text-sm">Original Sketch (Click to expand)</p>
                </div>
              </div>
              <div 
                className="flex-1 p-2 cursor-pointer" 
                onClick={() => setFullscreenMode('realistic')}
              >
                <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <img 
                    src={selectedImage.realisticImage} 
                    alt="DoodleCraft generated fashion image" 
                    className="w-full rounded-lg"
                  />
                  <p className="text-center mt-2 text-purple-200 text-sm">DoodleCraft Generated (Click to expand)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FashionModelGallery;