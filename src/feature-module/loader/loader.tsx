import React, { useState, useEffect } from 'react';
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath';
import { useLocation } from 'react-router';

const Loader = () => {

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Before navigating to another page, show the loader
    const unblock = () => setIsLoading(true);

    // Simulate an asynchronous operation, like an API call or fetching data
    const fetchData = async () => {
      // Simulating a delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // After the operation is complete, hide the loader
      setIsLoading(false);

   
    };
    fetchData();
    // Cleanup the loader state when the component is unmounted
    return () => {
      unblock();
    };
  }, [location]);


    

  return (
    <div>
      {isLoading && (
        <div id="global-loader">
          <div className="loader-img">
            <ImageWithBasePath src="assets/img/loader.png" className="img-fluid" alt="Global" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
