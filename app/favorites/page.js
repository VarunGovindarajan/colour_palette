import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Header } from '@/components/Header';
import { PaletteCard } from '@/components/PaletteCard';
import clientPromise from '@/lib/mongodb';

async function getFavoritePalettes(userId) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const favoritePalettes = await db.collection('likes').aggregate([
      { $match: { userId: new ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      { $limit: 100 },
      {
        $lookup: {
          from: 'palettes',
          localField: 'paletteId',
          foreignField: 'id',
          as: 'paletteDetails'
        }
      },
      { $unwind: '$paletteDetails' },
      { $replaceRoot: { newRoot: '$paletteDetails' } }
    ]).toArray();

    return favoritePalettes.map(p => ({ ...p, _id: p._id.toString() }));
  } catch (error) {
    console.error("Failed to fetch favorite palettes:", error);
    return [];
  }
}

async function getLikeData(userId) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const likes = await db.collection('likes').find({}).toArray();

    const likeCounts = likes.reduce((acc, like) => {
      acc[like.paletteId] = (acc[like.paletteId] || 0) + 1;
      return acc;
    }, {});

    const userLikes = new Set(
      userId ? likes.filter(like => like.userId.toString() === userId).map(like => like.paletteId) : []
    );
    return { likeCounts, userLikes };
  } catch (e) {
    console.error("Failed to fetch like data:", e);
    return { likeCounts: {}, userLikes: new Set() };
  }
}

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/');
  }

  const userId = session.user.id;
  
  const [favoritePalettes, { likeCounts, userLikes }] = await Promise.all([
    getFavoritePalettes(userId),
    getLikeData(userId)
  ]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Your Favorites</h1>
        {favoritePalettes.length === 0 ? (
          <p className="text-center text-gray-500">You haven't liked any palettes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritePalettes.map((palette) => (
              <PaletteCard
                key={palette.id}
                palette={palette}
                likeCount={likeCounts[palette.id] || 0}
                isLikedByUser={userLikes.has(palette.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}