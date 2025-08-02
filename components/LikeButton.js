'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { handleLike } from '@/app/actions';
import { Heart } from 'lucide-react';

// The props have changed here
export function LikeButton({ palette, initialLikes, initialIsLiked }) {
  const { status } = useSession();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const onLikeClick = async () => {
    if (status !== 'authenticated') {
      alert('Please log in to like palettes!');
      return;
    }

    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);

    // Pass the entire palette object to the action
    const result = await handleLike(palette);
    
    if (result?.error) {
      // Revert UI on error
      setIsLiked(isLiked);
      setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
      alert(result.error);
    }
  };

  return (
    <button onClick={onLikeClick} className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
      <Heart size={20} className={isLiked ? "text-red-500 fill-current" : ""} />
      <span>{likeCount}</span>
    </button>
  );
}