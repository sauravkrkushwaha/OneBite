import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample({ search, setSearch }) {
  const [dinnerImages, setDinnerImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessKey = 'Pu5RuxiHeTbVwyFK-umrDj-uCfj8boUoeisdDDa8ElE';
    const query = 'dinner food';
    const apiUrl = `https://api.unsplash.com/photos/random?query=${query}&count=3&client_id=${accessKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setDinnerImages(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <Carousel data-bs-theme="dark" id="carousel">
        {isLoading ? (
          <Carousel.Item>
            <div className="placeholder-image"></div>
          </Carousel.Item>
        ) : (
          dinnerImages.map((image) => (
            <Carousel.Item key={image.id}>
              <div style={{ height: '500px', overflow: 'hidden' }}>
                <img
                  style={{ filter: 'brightness(70%)', objectFit: 'cover', width: '100%', height: '100%' }}
                  className="d-block w-100"
                  src={image.urls.regular}
                  alt={image.alt_description || 'Dinner slide'}
                />
              </div>
              <div style={{ display: 'block' }}>
                <Carousel.Caption className='text-white'>
                  <div className='d-flex flex-row align-items-center'>
                    <input className='form-control me-2' type='search' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                    {/* <button className='btn btn-outline-success text-white bg-dark' type='submit'>Search</button> */}
                  </div>
                  <h5>{image.alt_description || 'Dinner slide label'}</h5>
                  <p>{image.description || 'Nulla vitae elit libero, a pharetra augue mollis interdum.'}</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))
        )}
      </Carousel>
    </div>
  );
}

export default DarkVariantExample;
