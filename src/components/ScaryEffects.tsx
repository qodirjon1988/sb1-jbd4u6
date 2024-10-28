import React, { useEffect } from 'react';

export const ScaryEffects: React.FC = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const effects = document.getElementById('scary-effects');
      if (effects && Math.random() < 0.1) {
        effects.style.opacity = '1';
        setTimeout(() => {
          effects.style.opacity = '0';
        }, 100);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[length:100%_2px] pointer-events-none z-50 animate-scan"></div>
      
      <div id="scary-effects" className="fixed inset-0 pointer-events-none z-40 opacity-0 transition-opacity duration-100">
        <div className="absolute inset-0 bg-red-500/20"></div>
        <div className="absolute inset-0 bg-[url('/glitch.png')] bg-cover opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,0,0,0.2)_100%)]"></div>
      </div>
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] pointer-events-none z-30"></div>
      
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none z-20"></div>
    </>
  );
};