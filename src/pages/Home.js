import React, { useEffect, useState } from 'react'
import cs from 'classnames';
import flower from '../assets/flower2.jpg';
import { getTimeOfDay } from '../helpers';
function Home() {

  const [backgroundImage, setBackgroundImage] = useState(null);
  const [textColor, setTextColor] = useState(''); // Store the calculated text color

  useEffect(() => {
    // Load the background image (replace with your image URL)
    const img = new Image();
    img.src = flower;

    img.onload = () => {
      // Calculate the brightness of the image
      const brightness = calculateImageBrightness(img);

      // Determine the text color based on brightness
      if (brightness > 128) {
        // If the image is light, set text color to dark
        setTextColor('dark');
      } else {
        // If the image is dark, set text color to light
        setTextColor('light');
      }

      // Set the background image
      setBackgroundImage(img.src);
    };
  }, []);

  const calculateImageBrightness = (image) => {
    // Here, you can calculate the image brightness using image data.
    // This is a simplified example and may not be highly accurate.
    // You can find more advanced algorithms to calculate brightness.

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, image.width, image.height).data;
    let sum = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      // Calculate brightness (a simple average of RGB values)
      sum += (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
    }

    return sum / (imageData.length / 4);
  };


  const textStyle = {
    color: textColor !== 'light' ? 'black' : 'white', // Set text color based on brightness
  };

  return (
    <div id='HOME-CONTAINER' className={cs('relative')}>
      <div className={cs('topContainer')}>
        <div style={{ backgroundImage: `url(${backgroundImage})`}} className={cs('backgroundImg')}></div>
      </div>
      <div className={cs('flex justify-between absolute top-0 left-0 w-full p-4 stickyHeader')} style={textStyle}>
        <h3>Good {getTimeOfDay()}, Mohamed!</h3>
        <div className={cs('datTimeContainer')}>
          <p>TUESDAY, 24 OCTOBER 2023</p>
        </div>
      </div>
    </div>
  )
}

export default Home