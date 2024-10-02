import React, { useState } from 'react';
import './Uploader.css';
import { IoIosArrowForward } from "react-icons/io";

const Uploader = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
  const [showPopup, setShowPopup] = useState(false); // For popup visibility

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image && image.size < 2000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setImageName(image.name);
        setShowPopup(true); // Show the popup when an image is uploaded
      };
      reader.readAsDataURL(image);
    } else {
      alert("Image size must be less than 2MB");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false); // Hide popup
    setImagePreview(null); // Clear image preview
    setImageName(""); // Clear image name
  };

  return (
    <div className="container">
      <input
        type="file"
        id="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />
      <div
        className={`img-area ${imagePreview ? 'active' : ''}`}
        data-img={imageName}
        onClick={() => document.getElementById('file').click()}
      >
        {!imagePreview && <i className='bx bxs-cloud-upload icon'></i>}
        {!imagePreview && <h3>Upload Image</h3>}
        {!imagePreview && <p>Image size must be less than <span>2MB</span></p>}
        {imagePreview && <img src={imagePreview} alt="Preview" />}
      </div>
      <button className="select-image" onClick={() => document.getElementById('file').click()}>
        Select Image
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <button className="close-btn" onClick={handlePopupClose}>
            <IoIosArrowForward className="arrow-icon" />
          </button>
          <h2>Image Uploaded Successfully!</h2>
        </div>
      )}
    </div>
  );
};

export default Uploader;
