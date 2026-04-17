import React from 'react';
import { Download, Maximize2 } from 'lucide-react';

export default function ImageCard({ imageUrl, title, description, onDownload }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 overflow-hidden group">
        <div className="relative mb-4 rounded-xl overflow-hidden aspect-video bg-white/5 flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg backdrop-blur-md transition-all"
          >
            <Maximize2 size={20} />
          </button>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-white/70 text-sm line-clamp-2 mb-4">{description}</p>
        )}

        <button
          onClick={onDownload}
          className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Download
        </button>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg backdrop-blur-md transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
