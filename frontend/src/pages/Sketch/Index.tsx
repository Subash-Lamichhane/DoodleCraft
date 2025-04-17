const BASE_URL = "https://d3be-34-125-115-83.ngrok-free.app";

import React, { useState } from "react";
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
  const [brushSize, setBrushSize] = useState(4);
  const [tool, setTool] = useState("select");
  const [showSizePreview, setShowSizePreview] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [outputImage, setOutputImage] = useState(false);
  const [loader, setLoader] = useState(false);

  const [canvasVariable, setCanvasVariable] = useState(true);

  // FOR IMAGE COMING FROM BACKEND
  const [imageSrc, setImageSrc] = useState<string[]>([]);

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
    const canvas = canvasRef.current;

    // Create a new offscreen canvas with size 512x512
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = 512;
    resizedCanvas.height = 512;

    const ctx = resizedCanvas.getContext("2d");

    // Draw the original canvas onto the resized canvas
    ctx.drawImage(canvas, 0, 0, 512, 512);

    const imageData = canvasVariable
      ? resizedCanvas.toDataURL("image/png")
      : uploadimageSrc;

    console.log("Trying to send image to backend: ");

    // FOR SMOOTH ANIMATION AFTER CLICKIG GENERATE ICON
    setIsProcessing(true);

    setOutputImage(false);
    // Send the image data to the backend

    if (imageData) {
      // const base64Image = uploadimageSrc.split(",")[1];
      // console.log(imageData);
      const base64Image = imageData.split(",")[1];
      console.log(base64Image);

      try {
        const response = await axios.post(
          `${BASE_URL}/upload-image`,
          {
            image_url: base64Image,
            prompt: inputValue,
            // no_of_image: 5,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        if (data.images_base64 && Array.isArray(data.images_base64)) {
          setImageSrc(data.images_base64);
        } else if (data.image_base64) {
          setImageSrc([data.image_base64]); // Wrap single image into array
        } else {
          alert("Error: " + (data.error || "No images returned"));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Check console.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      console.log("No imageData found.");
    }
  };

  // ALREADY MADE SKETCH UPLOAD HANDLER
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCanvasVariable(false);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setuploadimageSrc(event.target.result); // Show image
        // console.log(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex justify-between flex-col bg-[#081223]">
      {/* HEADER SECTION */}
      <div className="bg-black text-white mb-4">
        <Header />
      </div>
      {/* HEADER END  */}

      {/* MIDDLE SECTION */}
      <div className="bg-[#081223] text-white flex flex-col md:flex-row left-0 justify-center mb-12">
        <div className="grid items-center justify-center relative">
          {/* drawing or uploading section */}
          <div className="rounded-lg bg-white flex items-center justify-center p-4 max-w-6xl mx-auto">
            <div className="flex gap-4">
              <div className="flex flex-col gap-6 mb-6 items-center">
                {/* LEFT SIDE TOOLBAR TO MAKE SKETCH */}
                <div className="grid gap-2 py-4 px-10 bg-black rounded-lg ">
                  <div
                    onClick={() => setTool("select")}
                    className={`flex gap-4 items-center p-2 rounded-lg ${
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
                    className={`flex gap-4 items-center p-2 rounded-lg ${
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
                    className={`flex gap-4 items-center p-2 rounded-lg hover:bg-purple-400 `}
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
                        <line x1="5" y1="12" x2="19" y2="12" strokeWidth={2} />
                      </svg>
                    </button>
                    <span className="text-white ml-4">line</span>
                  </div>

                  <div
                    onClick={() => addShape("rectangle")}
                    className={`flex gap-4 items-center p-2 rounded-lg hover:bg-purple-400 `}
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
                    className="flex gap-4 items-center p-2 rounded-lg hover:bg-purple-400"
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
                    className="flex gap-4 items-center p-2 rounded-lg hover:bg-purple-400"
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
                    <div className="flex gap-4 items-center">
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
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
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
                      className="flex gap-4 items-center p-3 rounded-2xl hover:bg-purple-400 bg-black"
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
                      className="flex gap-4 items-center p-2 rounded-lg hover:bg-purple-400"
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
                      className="flex gap-4 items-center p-2 rounded-lg hover:bg-purple-400"
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
                  <label className="inline-flex w-[220px] items-center gap-2 py-3 px-6 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-600 transition">
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
                    className="p-4 w-[220px] text-center items-center px-10 rounded-lg bg-purple-500 hover:bg-purple-600"
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
                    placeholder="Description of your sketch"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Center Right: Processing icons */}
          <div className="my-6">
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
          <div className="mt-10">
            {isProcessing ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg ml-6 flex items-center justify-center">
                <span className="text-gray-400 p-4 text-2xl">[Output Area]</span>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg ml-6 p-4">
                {imageSrc.length > 0 ? (
                  <div>
                    <h2 className="text-2xl font-bold text-center uppercase tracking-wider text-white mb-4">
                      Generated Images
                    </h2>
                    <div className="flex flex-wrap items-center justify-start gap-4">
                      {imageSrc.map((imgBase64, index) => (
                        <img
                          key={index}
                          src={`data:image/png;base64,${imgBase64}`}
                          alt={`Generated Image ${index + 1}`}
                          className="object-contain max-w-xs max-h-100"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-2xl flex items-center justify-center h-48">
                    No Output
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* MIDDLE SECTION END */}

      {/* FOOTER SECTION  */}
      <div className="text-white border-t border-gray-700">
        <Footer />
      </div>
      {/* FOOTER END */}
    </div>
  );
};

export default Sketch;
