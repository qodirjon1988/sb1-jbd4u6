import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminPanel } from '../components/AdminPanel';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from '../types';
import { LogOut, Skull, Ghost, Link as LinkIcon } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const AdminPage = () => {
  const { logout } = useAuth();
  const [links, setLinks] = useLocalStorage<Link[]>('darkweb_links', []);
  const [ads, setAds] = useLocalStorage<string[]>('yandex_ads', []);
  const [deathCount] = useLocalStorage('death_count', 0);

  const handleAddLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const url = (form.elements.namedItem('url') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;

    setLinks(prev => [...prev, {
      id: Date.now(),
      url,
      description,
    }]);

    form.reset();
  };

  const handleAddAd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const adCode = (form.elements.namedItem('adCode') as HTMLTextAreaElement).value;
    setAds(prev => [...prev, adCode]);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-black text-green-500">
      <header className="bg-black/90 p-4 border-b border-green-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-creepster flex items-center gap-2">
              <Ghost className="w-6 h-6" />
              Admin Control Panel
            </h1>
            <RouterLink
              to="/"
              className="flex items-center gap-2 px-4 py-2 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
              View Site
            </RouterLink>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-red-500 font-creepster flex items-center gap-2">
              <Skull className="w-5 h-5" />
              Death Count: {deathCount}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-black transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        <AdminPanel 
          onAddLink={handleAddLink} 
          onAddAd={handleAddAd}
        />
        
        <div className="mt-8">
          <h2 className="text-xl font-creepster mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Public Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.map(link => (
              <div key={link.id} className="bg-black/90 border border-green-500 p-4 rounded-lg">
                <h3 className="font-mono mb-2">{link.url}</h3>
                <p className="text-gray-400">{link.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-creepster mb-4">Active Ads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads.map((adCode, index) => (
              <div key={index} className="bg-black/90 border border-green-500 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-xs">{adCode}</pre>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;