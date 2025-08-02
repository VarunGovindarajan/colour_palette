'use client';
import { useState } from 'react';
import { LikeButton } from "./LikeButton";

export function PaletteCard({ palette, likeCount, isLikedByUser }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedColor, setCopiedColor] = useState('');

  const handleCopyToClipboard = (color) => {
    if (typeof color !== 'string') return;
    navigator.clipboard.writeText(color).then(() => {
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(''), 1500);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
      <div 
        className="h-48 flex flex-col"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {Array.isArray(palette?.colors) && palette.colors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color || '#FFFFFF' }}
            className="flex-1 relative flex items-center justify-center cursor-pointer group"
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => handleCopyToClipboard(color)}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-white font-mono text-lg font-semibold px-3 py-1 rounded-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                {copiedColor === color 
                  ? "Copied!" 
                  : color.toUpperCase()
                }
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex justify-between items-center">
        <span className="text-gray-500 text-sm truncate pr-2">
           Palette #{palette._id || palette.id.substring(0, 12)}
        </span>
        <LikeButton 
          palette={palette}
          initialLikes={likeCount}
          initialIsLiked={isLikedByUser}
        />
      </div>
    </div>
  );
}