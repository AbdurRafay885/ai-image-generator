import React, { useRef, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './ImageGenerator.css';
import default_image from '../Assets/default_image.jpeg';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('/');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [savedPrompt, setSavedPrompt] = useState('');

  const inputRef = useRef(null);

  const generateImage = async () => {
  const prompt = inputRef.current.value.trim();
  if (!prompt) return;

  setSavedPrompt(prompt);
  setLoading(true);
  setProgress(0);
  let p = 0;

  const interval = setInterval(() => {
    p += 10;
    setProgress(p);
    if (p >= 100) {
      clearInterval(interval);
    }
  }, 200);

  try {
    const url = `YOUR_API_KEY_HERE`;
    setImageUrl(url);
    inputRef.current.value = "";
  } 

  catch (err) {
    console.error('Error generating image:', err);
    clearInterval(interval);
    setLoading(false);
  }

};

  const downloadImage = () => {
    const prompt = savedPrompt.trim().replace(/\s+/g, '-'); 
    const filename = `${prompt }-AI-Image.png`; 

    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })

      .catch(err => {
        console.error("Download failed:", err);
        alert("Unable to download image.");
      });    
};

  return (
    <div className="ai-image-generator">

      <div className="header">
        Artify AI – AI Image <span>Generator</span>
      </div>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input type="text" ref={inputRef} className="search-input" placeholder="Describe Your Thoughts or Ideas" />

        <div className="btn">

          <button className="generate-btn" onClick={generateImage} disabled={loading}>
            Generate
          </button>

          <button className="download-btn" onClick={downloadImage} disabled={imageUrl === '/' || loading}>
            Download
          </button>

        </div>

      </div>

       <div className="image-loading">

        <div className="loading">
          {loading && (
            <div className="loading-bar" style={{ width: `${progress}%` }}></div>
          )}
          {loading && <div className="loading-text">Loading...</div>}
        </div>

        <div className="image">
          <img src={imageUrl === '/' ? default_image : imageUrl} alt="Generated" onLoad={() => setLoading(false)} />
        </div>

      </div>

    </div>
  );
};

export default ImageGenerator;
