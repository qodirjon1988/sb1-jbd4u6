import React from 'react';
import { Skull, Copy } from 'lucide-react';
import { Link } from '../types';

interface LinkCardProps {
  link: Link;
  copiedId: number | null;
  onCopy: (url: string, id: number) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, copiedId, onCopy }) => {
  return (
    <div className="group bg-black/90 border border-green-500 p-6 rounded-lg hover:scale-105 transition-transform relative overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)] animate-scan"></div>
      
      <h2 className="text-xl mb-2 relative z-10 font-mono">{link.url}</h2>
      <p className="mb-4 text-gray-400 relative z-10">{link.description}</p>
      
      <div className="flex gap-4 relative z-10">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-colors group-hover:animate-pulse"
        >
          Enter if you dare... <Skull className="w-4 h-4" />
        </a>
        <button
          onClick={() => onCopy(link.url, link.id)}
          className="flex items-center gap-2 px-4 py-2 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-colors"
        >
          {copiedId === link.id ? 'Copied!' : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};