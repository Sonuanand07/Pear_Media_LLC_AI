import React from 'react';
import { Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-indigo-400 to-violet-400 p-2 rounded-lg">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            🍐 Pear Media AI
          </h1>
        </div>
        <p className="text-white/60 text-sm max-w-xs">
          Transform text to images & analyze image styles with AI
        </p>
      </div>
    </nav>
  );
}
