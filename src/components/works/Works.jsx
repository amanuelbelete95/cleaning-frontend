import React, { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { imagesData } from './imagesData';
import './images.css';

function Works() {
  const [images, setImages] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(1);

  const handlePrevious = () => {
    setCurrentSlide(
      currentSlide === 0 ? imagesData.length - 1 : currentSlide - 1
    );
  };
  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 1 : currentSlide + 1);
  };

  useEffect(() => {
    // fetchImages(url);

    setImages(imagesData);

    // console.log(images);
  }, []);

  // Pagination

  return (
    <>
      <div className='image-container'>
        <BsArrowLeftCircleFill
          className='arrow arrow-left'
          onClick={handlePrevious}
        />

        {images && images.length
          ? images.map((image) => (
              <img
                key={image.id}
                alt={`sanity-${image.id}`}
                src={image.download_url}
                className='current-image'
                style={{
                  display: image.id === currentSlide ? 'block' : 'none',
                }}
              />
            ))
          : null}

        <BsArrowRightCircleFill
          className='arrow arrow-right'
          onClick={handleNext}
        />

        <span className='circle-indicators'>
          {images && images.length
            ? images.map((image, index) => (
                <button
                  key={index}
                  className={
                    currentSlide === image.id
                      ? 'current-indicator'
                      : 'current-indicator inactive-indicator'
                  }
                  onClick={() => setCurrentSlide}></button>
              ))
            : null}
        </span>
      </div>
    </>
  );
}

export default Works;
