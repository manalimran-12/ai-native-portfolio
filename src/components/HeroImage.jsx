import React from 'react';

const HeroImage = () => {
  return (
    <div className="relative w-8 h-8 shrink-0" data-name="hero-image">
      <img 
        src="/bitmoji.png" 
        alt="Hero" 
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};

export default HeroImage;
