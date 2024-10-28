import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Skull, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_1px,#000_1px)] bg-[length:4px_4px] opacity-50"></div>
      
      <div 
        className={`w-full max-w-md p-8 bg-black/90 border border-green-500 rounded-lg relative transition-transform duration-300 ${isHovering ? 'scale-[1.02]' : ''}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,0,0.1)_50%,transparent_75%)] animate-pulse"></div>
        
        <div className="flex justify-center mb-8">
          <Skull className={`w-16 h-16 transition-transform duration-300 ${isHovering ? 'animate-pulse' : ''}`} />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-green-500 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500/50"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-green-500 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded hover:bg-green-400 transition-colors flex items-center justify-center gap-2 group"
          >
            <Lock className="w-4 h-4 group-hover:animate-pulse" />
            Enter the Void
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;