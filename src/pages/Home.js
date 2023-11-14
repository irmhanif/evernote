import React, { useEffect, useState } from 'react'
import cs from 'classnames';
import flower from '../assets/flower2.jpg';
import { calculateImageBrightness } from '../helpers';
import StickyTop from '../components/StickyTop';
import HomeGrid from '../components/HomeGrid';

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

  const textStyle = {
    color: textColor !== 'light' ? 'black' : 'white', // Set text color based on brightness
  };

  return (
    <div id='HOME-CONTAINER' className={cs('relative')}>
      <div className={cs('topContainer')}>
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className={cs('backgroundImg')}></div>
        <StickyTop textStyle={textStyle} />
      </div>
      <HomeGrid />
    </div>
  )
}

export default Home