import React, { useState, useEffect, useRef } from 'react';
import { Skull, AlertTriangle, Camera, Wifi, Ghost, Eye, Lock } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { ScaryEffects } from '../components/ScaryEffects';
import { LinkCard } from '../components/LinkCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from '../types';

const HomePage = () => {
  const [links] = useLocalStorage<Link[]>('darkweb_links', []);
  const [deathCount, setDeathCount] = useLocalStorage('death_count', 0);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [userIP, setUserIP] = useState<string>('');
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ads] = useLocalStorage<string[]>('yandex_ads', []);

  useEffect(() => {
    setDeathCount(prev => prev + 1);
    
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIP(data.ip))
      .catch(() => setUserIP('192.168.1.1'));

    setTimeout(() => {
      setShowCamera(true);
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
            setTimeout(() => {
              stream.getTracks().forEach(track => track.stop());
              setShowCamera(false);
            }, 3000);
          })
          .catch(() => setShowCamera(false));
      }
    }, 5000);
  }, []);

  const handleCopy = async (url: string, id: number) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col">
      <ScaryEffects />
      
      <RouterLink 
        to="/admin" 
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/90 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-colors"
      >
        <Lock className="w-4 h-4" />
        <span>Admin Access</span>
      </RouterLink>
      
      {showCamera && (
        <div className="fixed top-16 right-4 z-50 w-64 h-48 border-2 border-red-500 rounded-lg overflow-hidden animate-glitch">
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 flex items-center gap-2 text-red-500">
            <Camera className="w-4 h-4 animate-pulse" />
            <span className="text-xs">Recording...</span>
          </div>
        </div>
      )}

      <div className="fixed top-4 left-4 z-50 flex items-center gap-2 text-red-500 animate-pulse">
        <Wifi className="w-4 h-4" />
        <span className="text-xs">IP: {userIP}</span>
      </div>

      <header className="relative z-10 bg-black/90 p-6 border-b border-green-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_1px,#000_1px)] bg-[length:4px_4px] opacity-50"></div>
        <h1 className="text-5xl md:text-6xl font-creepster text-center mb-4 animate-pulse flex items-center justify-center gap-4">
          <Ghost className="w-12 h-12" />
          Dark Web Links
          <Eye className="w-12 h-12" />
        </h1>
      </header>

      <main className="flex-1 container mx-auto p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map(link => (
            <LinkCard
              key={link.id}
              link={link}
              copiedId={copiedId}
              onCopy={handleCopy}
            />
          ))}
        </div>

        {ads.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads.map((adCode, index) => (
              <div
                key={index}
                className="bg-black/90 border border-green-500 p-4 rounded-lg"
                dangerouslySetInnerHTML={{ __html: adCode }}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="relative z-10 bg-black/90 border-t border-green-500 p-6 text-center">
        <p className="mb-2 font-creepster">
          Death Count: <span className="text-red-500 font-bold animate-pulse">{deathCount}</span>
        </p>
        <p className="text-gray-500 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          Warning: Your activity is being monitored. Proceed at your own risk.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;