import React, { useState } from "react";
import { Upload, X, Video, Image, DiamondPercent } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useEffect, useRef } from "react";
import { fabric } from "fabric";

import { motion } from "framer-motion"; // smooth animation lib

type SketchUploaderProps = {};

type ImageState = string[];

const Sketch: React.FC<SketchUploaderProps> = () => {
  const [sketch, setSketch] = useState<string | null>(null);
  const [images, setImages] = useState<ImageState>([]);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const navigate = useNavigate();

  // Prompt text / description
  const [inputValue, setInputValue] = useState("");

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState("#000000");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState("select");
  const [showSizePreview, setShowSizePreview] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [outputImage, setOutputImage] = useState(false);
  const [loader, setLoader] = useState(false);

  // FOR IMAGE COMING FROM BACKEND
  const [imageSrc, setImageSrc] = useState("");

  // FOR ALREADY DRAWN SKETCH UPLOAD
  const [uploadimageSrc, setuploadimageSrc] = useState<string | undefined>(
    undefined
  ); // stores uploaded image

  // FOR SMOOTH ANIMATION AFTER CLICKIG GENERATE ICON
  const [isProcessing, setIsProcessing] = useState(false);

  // Shift amount control
  const shiftAmount = isProcessing ? -150 : 0; // shift left 150px if processing

  // const handleUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setSketch(URL.createObjectURL(file));
  //   }
  // };

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    canvas.isDrawingMode = tool === "pencil" || tool === "brush";
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = brushSize;

    if (tool === "select") {
      canvas.selection = true;
      canvas.forEachObject((obj) => {
        obj.selectable = true;
      });
    } else {
      canvas.selection = false;
      canvas.forEachObject((obj) => {
        obj.selectable = false;
      });
    }
  }, [tool, color, brushSize, canvas]);

  const handleMouseMove = (e) => {
    if (showSizePreview) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const addShape = (type) => {
    if (!canvas) return;

    let shape;
    const shapeOptions = {
      left: canvas.width / 2 - 50,
      top: canvas.height / 2 - 50,
      fill: "#ffffff",
      stroke: strokeColor,
      strokeWidth: 3,
    };

    switch (type) {
      case "rectangle":
        shape = new fabric.Rect({
          ...shapeOptions,
          width: 100,
          height: 100,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          ...shapeOptions,
          radius: 50,
        });
        break;
      case "star":
        const points = [];
        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? 50 : 25;
          const angle = (i * Math.PI) / 5;
          points.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
          });
        }
        shape = new fabric.Polygon(points, {
          ...shapeOptions,
          left: canvas.width / 2,
          top: canvas.height / 2,
        });
        break;
      case "line":
        shape = new fabric.Line([50, 50, 200, 50], {
          ...shapeOptions,
          fill: undefined,
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 100 },
            { x: 50, y: 150 },
            { x: 0, y: 100 },
          ],
          {
            ...shapeOptions,
          }
        );
        break;
    }

    if (shape) {
      canvas.add(shape);
      canvas.renderAll();
    }
  };

  const clearCanvas = () => {
    setuploadimageSrc(undefined);
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = "#ffffff";
    canvas.renderAll();
  };

  const undo = () => {
    if (!canvas) return;
    if (canvas._objects.length > 0) {
      canvas.remove(canvas._objects[canvas._objects.length - 1]);
    }
  };

  const downloadCanvas = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = dataURL;
    link.click();
    document.body.removeChild(link);
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
    window.open(
      "https://github.com/user-attachments/assets/05441ec7-ef90-4d29-b26d-40544b16f317",
      "_blank"
    );
  };

  const viewSamples = (): void => {
    navigate("/samples");
  };

  // const handleSaveButtonClick = () => {
  //   const canvasInstance = canvas.current;
  //   if (!canvasInstance) {
  //     console.error("Fabric canvas instance not found.");
  //     return;
  //   }

  //   const dataURL = canvasInstance.toDataURL({
  //     format: "png",
  //     quality: 1,
  //   });

  //   // Create a temporary link element
  //   const link = document.createElement("a");
  //   link.href = dataURL;

  //   // Set the download attribute with a default filename
  //   link.download = `sketch_${new Date()
  //     .toISOString()
  //     .replace(/[:.]/g, "_")}.png`;

  //   // Programmatically click the link to trigger the download
  //   document.body.appendChild(link);
  //   link.click();

  //   // Clean up the temporary link
  //   document.body.removeChild(link);

  //   console.log("Attempting to save canvas as a download.");
  //   // The user will be prompted to choose where to save the file.
  //   // There is no way for this browser-side code to directly save to a specific folder.
  // };

  const uploadSketch = async () => {
    // Save the canvas drawing as an image
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");

    console.log("Trying to send image to backend: ");

    // FOR SMOOTH ANIMATION AFTER CLICKIG GENERATE ICON
    setIsProcessing(true);

    setOutputImage(false);
    // Send the image data to the backend

    if (imageData) {
      try {
        setLoader(true);
        const response = await axios.post(
          "https://849f-34-125-76-34.ngrok-free.app/upload-image",
          {
            image_url: imageData,
            prompt: inputValue,
          }
        );

        setLoader(false);
        console.log("flag");
        if (response.data && response.data.image_base64) {
          console.log("Image uploaded successfully:", response.data);

          // Create an image URL
          const base64String = response.data.image_base64;
          const result_image = `data:image/png;base64,${base64String}`;

          setImageSrc(result_image);
          setIsProcessing(false);
          setOutputImage(true); // setOutputImage will now store the image URL
        } else {
          console.error("No image_base64 found in response");
        }
        // Handle successful upload (e.g., clear form, display success message)
      } catch (error) {
        // setLoader(false);
        console.error("Error uploading image:", error);
        setInputValue("error uploading image");
        // Handle upload errors (e.g., display error message)
      }

      // try {
      //   setLoader(true);
      //   const response = await fetch("http://127.0.0.1:8000/get-image");
      //   const blob = await response.blob();
      //   const imageURL = URL.createObjectURL(blob);
      //   setImageSrc(imageURL);
      //   console.log(imageURL);
      //   setLoader(false);
      // } catch (error) {
      //   console.error("Error fetching image:", error);
      // }
    } else {
      console.log("No imageData found.");
    }
  };

  // ALREADY MADE SKETCH UPLOAD HANDLER
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setuploadimageSrc(event.target.result); // Show image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex justify-between flex-col bg-[#081223]">
      {/* Resource limitation popup */}
      {/* {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 border border-purple-500 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-300">
                Resource Limitation Notice
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-200 mb-6">
              This project requires significant GPU resources to run properly
              due to the size and complexity of our AI model, due to which the
              project may not work as intended in this website. We're working to
              make both the project and model publicly available soon through
              GitHub and Hugging Face.
            </p>

            <p className="text-gray-200 mb-6">
              In the meantime, you can explore our work through our demo video
              and sample gallery showcasing the capabilities of our
              sketch-to-fashion conversion technology.
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
      )} */}

      <div className="bg-black text-white">
        <Header />
      </div>

      <div className="bg-[#081223] text-white flex flex-col md:flex-row left-0 justify-center mb-12">
        {/* <div>
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
        </div> */}

        <div className="flex items-center justify-center relative">
          {/* CANVAS SECTION */}

          <motion.div
            animate={{ x: shiftAmount ? -30 : 0 }}
            transition={{
              type: "spring", // Using spring physics for natural movement
              stiffness: 30, // Reduce stiffness for slower movement
              damping: 30, // Higher damping for less bounce and smoother stop
              duration: 2, // Increase duration to make the shift slower (in seconds)
              ease: "easeInOut", // Smooth easing, starts slow and ends slow
            }}
            className="rounded-lg bg-white flex items-center justify-center"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex gap-4">
                <div className="flex flex-col gap-6 mb-6 items-center">
                  {/* LEFT SIDE TOOLBAR TO MAKE SKETCH */}
                  <div className="grid gap-2 p-4 bg-black rounded-lg ">
                    <div
                      onClick={() => setTool("select")}
                      className={`flex items-center p-2 rounded-lg ${
                        tool === "select"
                          ? "bg-purple-400"
                          : "hover:bg-purple-300"
                      }`}
                    >
                      <button title="Select Tool">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                          />
                        </svg>
                      </button>
                      <span className="text-white ml-4">select</span>
                    </div>

                    <div
                      onClick={() => setTool("pencil")}
                      className={`flex items-center p-2 rounded-lg ${
                        tool === "pencil"
                          ? "bg-purple-400"
                          : "hover:bg-purple-300"
                      }`}
                    >
                      <button title="Pencil Tool">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <span className="text-white ml-4">pencil</span>
                    </div>

                    <div
                      onClick={() => addShape("line")}
                      className={`flex items-center p-2 rounded-lg hover:bg-purple-400 `}
                    >
                      {" "}
                      <button title="Line Tool">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <line
                            x1="5"
                            y1="12"
                            x2="19"
                            y2="12"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                      <span className="text-white ml-4">line</span>
                    </div>

                    <div
                      onClick={() => addShape("rectangle")}
                      className={`flex items-center p-2 rounded-lg hover:bg-purple-400 `}
                    >
                      {" "}
                      <button title="Rectangle Tool">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                      <span className="text-white ml-4">Rectangle</span>
                    </div>

                    <div
                      onClick={() => addShape("circle")}
                      className="flex items-center p-2 rounded-lg hover:bg-purple-400"
                    >
                      {" "}
                      <button title="Circle Tool">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <circle cx="12" cy="12" r="10" strokeWidth={2} />
                        </svg>
                      </button>
                      <span className="text-white ml-4">circle</span>
                    </div>

                    <div
                      onClick={() => addShape("star")}
                      className="flex items-center p-2 rounded-lg hover:bg-purple-400"
                    >
                      <button title="Star Tool">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                      <span className="text-white ml-4">star</span>
                    </div>

                    <div className="grid items-center gap-2 ml-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border-4"
                        />
                        <span className="text-white ml-2">color </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {/* <span className="text-gray-600">Size:</span> */}

                        <input
                          type="range"
                          min="1"
                          max="50"
                          value={brushSize}
                          onChange={(e) =>
                            setBrushSize(parseInt(e.target.value))
                          }
                          onMouseDown={() => setShowSizePreview(true)}
                          onMouseUp={() => setShowSizePreview(false)}
                          className="w-24"
                        />
                        <span className="w-8 text-center text-white">
                          {brushSize}
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div
                        onClick={undo}
                        className="flex items-center p-3 rounded-2xl hover:bg-purple-400 bg-black"
                      >
                        {" "}
                        <button title="Undo">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 14L4 9l5-5M4 9h10a5 5 0 0 1 5 5v1" />
                          </svg>
                        </button>
                        <span className="text-white ml-2">undo</span>
                      </div>

                      <div
                        onClick={clearCanvas}
                        className="flex items-center p-2 rounded-lg hover:bg-purple-400"
                      >
                        {" "}
                        <button title="Clear Canvas">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                        <span className="text-white ml-4">delete</span>
                      </div>

                      <div
                        onClick={downloadCanvas}
                        className="flex items-center p-2 rounded-lg hover:bg-purple-400"
                      >
                        <button title="Download">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                        <span className="text-white ml-4">download</span>
                      </div>
                    </div>
                  </div>
                  {/* END OF THE TOOLBAR SECTION  */}

                  {/* HANDLE UPLOAD IMAGE */}
                  <div className="text-black ">
                    <label className="inline-flex w-[160px] items-center gap-2 py-3 px-6 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-600 transition">
                      <span className="px-1">Upload Sketch </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <img
                        src="/image_upload_icon3.png"
                        alt="Upload Icon"
                        className="w-10 h-10 object-contain"
                      />
                    </label>

                    {/* {loader && (
                    <div className="flex items-center p-2 rounded-lg bg-purple-400">
                      <span className="text-white text-center p-3">Loading...</span>
                    </div>
                  )} */}
                  </div>
                  {/* END OF SECTION */}

                  {/* HANDLING UPLOAD BUTTON TO SEND IMAGE TO BACKEND */}
                  <div className="text-black ">
                    <button
                      onClick={uploadSketch}
                      className="flex items-center px-10 rounded-lg bg-purple-500 hover:bg-purple-600"
                    >
                      <span className="text-white text-center px-2 py-3">
                        Generate
                      </span>
                    </button>
                    {/* {loader && (
                    <div className="flex items-center p-2 rounded-lg bg-purple-400">
                      <span className="text-white text-center p-3">Loading...</span>
                    </div>
                  )} */}
                  </div>
                  {/* END OF UPLOAD BUTTON SECTION */}
                </div>

                <div
                  className="relative shadow-2xl"
                  onMouseMove={handleMouseMove}
                >
                  <div className="flex items-center justify-center">
                    {/* Always render both and toggle visibility using CSS instead of ternary */}

                    <canvas
                      ref={canvasRef}
                      id="canvas"
                      className={`border border-gray-200 rounded-lg absolute top-0 left-0 w-full h-auto transition-opacity duration-300 ${
                        uploadimageSrc
                          ? "opacity-0 pointer-events-none"
                          : "opacity-100"
                      }`}
                    />

                    <img
                      src={uploadimageSrc || ""}
                      alt="Uploaded preview"
                      className={`w-full max-w-lg rounded absolute transition-opacity duration-300 ${
                        uploadimageSrc
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    />
                  </div>

                  {showSizePreview && (
                    <div
                      className="absolute mt-20 ml-20 bg-purple-400 rounded-full pointer-events-none"
                      style={{
                        width: brushSize,
                        height: brushSize,
                        left: mousePosition.x - brushSize / 2,
                        top: mousePosition.y - brushSize / 2,
                      }}
                    />
                  )}

                  <div className="border-t-2 border-purple-400 text-black text-xl p-4 mx-4">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="border border-gray-400 rounded p-2 w-full my-6"
                      placeholder="Description of your sketch (optional)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Right: Processing icons */}
          <div>
            {isProcessing && (
              <div className="flex flex-row items-center justify-center mx-6 space-x-4">
                {/* Animate icons glowing horizontally */}
                {[...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    className="w-8 h-8 bg-purple-400 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Placeholder for output image */}
          <div>
            {isProcessing ? (
              <div className="w-[300px] h-[400px] border-2 border-dashed border-gray-300 rounded-lg ml-6 flex items-center justify-center">
                <span className="text-gray-400">[Output Area]</span>
              </div>
            ) : (
              <div className="w-[300px] h-[400px] border-2 border-dashed border-gray-300 rounded-lg ml-6 flex items-center justify-center overflow-hidden">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Output"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400">No Output</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* {images.length > 0 && (
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
        )} */}
      </div>

      <div className="text-white border-t border-gray-700">
        <Footer />
      </div>
    </div>
  );
};

export default Sketch;
