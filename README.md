

# 🎨 DoodleCraft: Intelligent Image Synthesis with Deep Learning

**Authors:**  
- Rajesh Adhikari (PUL077BCT065)  
- Saurav Kumar Mahato (PUL077BCT079)  
- Subash Lamichhane (PUL077BCT081)  

**Supervisor:** Dr. Ganesh Gautam  
**Department of Electronics & Computer Engineering, Pulchowk Campus, IOE, TU**  
**April 2025**

---

## 📚 Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Repository Structure](#repository-structure)  
4. [Frontend Setup](#frontend-setup)  
5. [Backend Setup](#backend-setup)  
6. [Model Testing (Standalone)](#model-testing-standalone)  
7. [Model Downloads](#model-downloads)  
8. [Sample Outputs](#sample-outputs)  
9. [Demo Video](#demo-video)  
10. [Contributing](#contributing)  
11. [License](#license)  
12. [Acknowledgments](#acknowledgments)

---

## 💡 Project Overview

**DoodleCraft** is an AI-powered sketch-to-image generation tool tailored for fashion design. Users can draw or upload sketches and optionally provide text prompts to generate photorealistic fashion images.

- **Frontend:** React-based web interface for sketching and input  
- **Backend:** Flask server hosted on Google Colab  
- **Models:** ControlNet + Stable Diffusion and alternatively a custom Two-Stage GAN for benchmarking (two sets of pix2pix GANs for 2 step  image synthesis)

---

## ✨ Features

- ✏️ Draw or upload sketches  
- 📝 Text-prompt control via ControlNet  
- ⚡ Real-time inference on Google Colab  
- 🎨 Multiple outputs using different seeds/randomness

---

## 📁 Repository Structure

```
├── colab/
│   ├── testing_controlnet.ipynb     # ControlNet model testing notebook
│   └── testing_gan.ipynb            # GAN model testing notebook
├── frontend/                        # React frontend
├── BACKEND.ipynb                    # Main backend notebook (Flask + ngrok)
├── LICENSE
└── README.md
```

---

## 🌐 Frontend Setup

1. Clone the repository and navigate to the frontend folder:
   ```bash
   git clone https://github.com/Subash-Lamichhane/DoodleCraft.git
   cd DoodleCraft/frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn dev
   ```
4. Open `http://localhost:3000` in your browser.

---

## 🔧 Backend Setup

To launch the Flask API server:

1. Open `BACKEND.ipynb` in Google Colab.  
2. Add the ControlNet model folder (shared drive) as a shortcut to your Google Drive.  
3. Run all cells to:
   - Mount Google Drive
   - Install required libraries
   - Start the Flask server via `flask-ngrok`

> **Important:** Authenticate ngrok using your personal token:  
> Get it from: https://dashboard.ngrok.com/get-started/your-authtoken  
> Paste it in the notebook at the indicated line.

After running, copy the public ngrok URL (e.g., `https://xyz.ngrok.io`) — you’ll need it for the frontend.

---

## 🔗 Connecting Frontend to Backend

1. Open `frontend/src/pages/Sketch/Index.tsx`  
2. Replace the `BASE_URL` with your ngrok URL:
   ```ts
   const BASE_URL = 'https://<your-ngrok-url>.ngrok.io';
   ```
3. Restart the frontend with `yarn dev`

---

## 🧪 Model Testing (Standalone)

To test individual models without setting up the full system:

- **ControlNet:**  
  Open and run `colab/testing_controlnet.ipynb` in Colab — generates outputs directly from sketches + prompts.

- **Two-Stage GAN:**  
  Open and run `colab/testing_gan.ipynb` in Colab — generates images using the trained GAN pipeline.

> Ideal for debugging or evaluating model quality independently.

> ⚠️ Add the shared Google Drive model folders to your Drive before running these notebooks.

---

## 📥 Model Downloads

- **ControlNet + Stable Diffusion:**  
  [Download via Google Drive](https://drive.google.com/drive/folders/1va_6zPPumInciGQhZsUvsnlOugNduLKj?usp=sharing)

- **Two-Stage GAN (pix2pix):**  
  [Download via Google Drive](https://drive.google.com/drive/folders/1nKEyAQhiaF0-AWX-8BBtZRv90M25c2Ia?usp=sharing)

> Due to size limitations, full model files are hosted on Google Drive.  
> The GAN folder also includes training scripts for further customization.

---

## 🖼️ Sample Outputs

### 🔹 ControlNet
![Output 1](https://github.com/user-attachments/assets/05c9575e-2e69-4f03-a665-e830e0ae21e9)  
![Output 2](https://github.com/user-attachments/assets/10bdbd5a-b4ea-48bb-ae91-7a13d7a5fda0)  
![Output 3](https://github.com/user-attachments/assets/b1349aeb-f39f-4072-8c01-7f1866f5cea0)  
![Output 4](https://github.com/user-attachments/assets/61ff6cae-7536-4dd0-bb97-33f40e9b6e8c)  

### 🔹 GAN
![GAN 1](https://github.com/user-attachments/assets/88e58520-bd6f-4b31-9d30-da905cc22162)  
![GAN 2](https://github.com/user-attachments/assets/59704231-ab37-4838-9dfc-b58b300dde0b)  
![GAN 3](https://github.com/user-attachments/assets/b51c4c1f-7bfb-4cc0-893c-3ba3ded7e2d7)  
![GAN 4](https://github.com/user-attachments/assets/d7d43b20-18ec-48de-8814-8fc67de93a8b)  

### 🔹 Online Survey Results
![Survey](https://github.com/user-attachments/assets/95ad1aa8-32b5-46fe-a979-b749bd985d2e)

### 🔹 Web Interface Outputs
![Web 1](https://github.com/user-attachments/assets/e50d9fa4-952b-4cad-8924-bfec755155dc)  
![Web 2](https://github.com/user-attachments/assets/cdbd9e6d-8541-4d1d-9f89-1fa485d6fddb)  

---

## 📽️ Demo Video

[▶️ Watch Demo](https://github.com/user-attachments/assets/0257962c-25d1-4ead-9459-afdd7507dfb1)

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Open a pull request

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Special thanks to:  
- Dr. Ganesh Gautam (Supervisor)  
- Hugging Face Community  
- Polyvore & DressCode Dataset Providers  

