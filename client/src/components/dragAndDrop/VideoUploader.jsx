import React, { useState } from 'react';
import './styles.css';
const VideoUploader = () => {
  const [dragging, setDragging] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    // Handle the file upload logic here
    console.log('Uploading file:', file);

    // Display video preview
    const previewURL = URL.createObjectURL(file);
    setVideoPreview(previewURL);
  };

  return (
    <div
      className={`drop-zone ${dragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drag and drop a video file here</p>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />
      {videoPreview && (
        <div className="video-preview">
          <video controls>
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
