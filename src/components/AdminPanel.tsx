import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from '../types';
import toast from 'react-hot-toast';

interface AdminPanelProps {
  onAddLink: (e: React.FormEvent<HTMLFormElement>) => void;
  onAddAd: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddLink, onAddAd }) => {
  const [privateLinks, setPrivateLinks] = useLocalStorage<Link[]>('private_links', []);

  const handleAddPrivateLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const url = (form.elements.namedItem('private_url') as HTMLInputElement).value;
    const description = (form.elements.namedItem('private_description') as HTMLInputElement).value;

    setPrivateLinks(prev => [...prev, {
      id: Date.now(),
      url,
      description,
    }]);

    toast.success('Private link added successfully');
    form.reset();
  };

  return (
    <div className="mb-8 space-y-8">
      <div className="bg-black/90 border border-green-500 p-6 rounded-lg">
        <h2 className="text-2xl mb-4 font-creepster">Add Public Link</h2>
        <form onSubmit={onAddLink} className="space-y-4">
          <input
            type="text"
            name="url"
            placeholder="Enter .onion URL"
            className="w-full bg-black border border-green-500 p-2 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            className="w-full bg-black border border-green-500 p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded hover:bg-green-400 transition-colors"
          >
            Add Public Link
          </button>
        </form>
      </div>

      <div className="bg-black/90 border border-red-500 p-6 rounded-lg">
        <h2 className="text-2xl mb-4 font-creepster text-red-500">Add Private Link</h2>
        <form onSubmit={handleAddPrivateLink} className="space-y-4">
          <input
            type="text"
            name="private_url"
            placeholder="Enter private .onion URL"
            className="w-full bg-black border border-red-500 p-2 rounded text-red-500"
            required
          />
          <input
            type="text"
            name="private_description"
            placeholder="Enter private description"
            className="w-full bg-black border border-red-500 p-2 rounded text-red-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-black py-2 rounded hover:bg-red-400 transition-colors"
          >
            Add Private Link
          </button>
        </form>
      </div>

      <div className="bg-black/90 border border-yellow-500 p-6 rounded-lg">
        <h2 className="text-2xl mb-4 font-creepster text-yellow-500">Your Private Links</h2>
        <div className="space-y-4">
          {privateLinks.map(link => (
            <div key={link.id} className="border border-yellow-500 p-4 rounded">
              <h3 className="font-mono text-yellow-500">{link.url}</h3>
              <p className="text-gray-400">{link.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black/90 border border-green-500 p-6 rounded-lg">
        <h2 className="text-2xl mb-4 font-creepster">Add Yandex Ad</h2>
        <form onSubmit={onAddAd} className="space-y-4">
          <textarea
            name="adCode"
            placeholder="Enter Yandex ad code"
            className="w-full h-32 bg-black border border-green-500 p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded hover:bg-green-400 transition-colors"
          >
            Add Ad
          </button>
        </form>
      </div>
    </div>
  );
};