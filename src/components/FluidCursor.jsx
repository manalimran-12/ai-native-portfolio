'use client';
import { useEffect } from 'react';

import fluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      fluidCursor();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <canvas id="fluid" className="w-full h-full" style={{ pointerEvents: 'auto' }} />
    </div>
  );
};
export default FluidCursor;