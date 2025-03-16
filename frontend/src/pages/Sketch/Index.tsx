import React, { useState } from "react";
import { Upload, X, Video, Image } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from 'react-router-dom';

type SketchUploaderProps = {};

type ImageState = string[];

const Sketch: React.FC<SketchUploaderProps> = () => {
  const [sketch, setSketch] = useState<string | null>(null);
  const [images, setImages] = useState<ImageState>([]);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSketch(URL.createObjectURL(file));
    }
  };

  const generateImages = (): void => {
    setImages([
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
    ]);
  };

  const viewDemoVideo = (): void => {
    window.open("https://github.com/user-attachments/assets/05441ec7-ef90-4d29-b26d-40544b16f317", "_blank");
  };

  const viewSamples = (): void => {
    navigate("/samples");
  };

  return (
    <div className="min-h-screen flex justify-between flex-col bg-[#081223]">
      {/* Resource limitation popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 border border-purple-500 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-300">Resource Limitation Notice</h3>
              <button 
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-200 mb-6">
              This project requires significant GPU resources to run properly due to the size and complexity of our AI model, due to which the project may not work as intended in this website. We're working to make both the project and model publicly available soon through GitHub and Hugging Face.
            </p>
            
            <p className="text-gray-200 mb-6">
              In the meantime, you can explore our work through our demo video and sample gallery showcasing the capabilities of our sketch-to-fashion conversion technology.
            </p>
            
            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={viewDemoVideo}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-700 hover:bg-purple-600 text-white font-medium rounded transition-colors"
              >
                <Video size={18} />
                Watch Demo Video
              </button>
              <button
                onClick={viewSamples}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition-colors"
              >
                <Image size={18} />
                View Output Samples
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-black text-white">
        <Header />
      </div>
      <div className="bg-[#081223] text-white flex flex-col md:flex-row items-center justify-center gap-32 mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Sketch</h1>
          <div className="w-80 p-6 bg-gray-800 rounded-lg shadow-lg text-center">
            {sketch ? (
              <img
                src={sketch}
                alt="Uploaded Sketch"
                className="w-full h-48 object-contain mb-4 border border-gray-600"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center border border-dashed border-gray-600 mb-4">
                <Upload className="text-4xl text-gray-500" />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="border-2 inline-block px-4 py-2 bg-white text-black font-bold tracking-wider w-full rounded cursor-pointer"
            >
              {sketch ? "Change Sketch" : "Upload Sketch"}
            </label>

            {sketch && (
              <button
                onClick={generateImages}
                className="mt-4 border-2 inline-block px-4 py-2 bg-black text-white font-bold tracking-wider w-full rounded cursor-pointer"
              >
                Generate Images
              </button>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Generated ${index + 1}`}
                className="w-72 h-72 object-cover border border-gray-600"
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-white border-t border-gray-700">
        <Footer />
      </div>
    </div>
  );
};

export default Sketch;