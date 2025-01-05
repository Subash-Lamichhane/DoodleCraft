import React, { useState } from "react";
import { Upload } from "lucide-react";
import Header from "../../components/Header";

type SketchUploaderProps = {};

type ImageState = string[];

const Sketch: React.FC<SketchUploaderProps> = () => {
  const [sketch, setSketch] = useState<string | null>(null);
  const [images, setImages] = useState<ImageState>([]);

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

  return (
    <>
    <div className="bg-black text-white">
      <Header/>
    </div>
    <div className="min-h-screen bg-black text-white flex flex-row items-center justify-center gap-32">
        <div>
      <h1 className="text-3xl font-bold mb-6">Upload Your Sketch</h1>
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
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          {sketch ? "Change Sketch" : "Upload Sketch"}
        </label>

        {sketch && (
          <button
            onClick={generateImages}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Generate Images
          </button>
        )}
      </div>
        </div>

      {images.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Generated ${index + 1}`}
              className=" w-72 h-72 object-cover border border-gray-600"
            />
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Sketch;
