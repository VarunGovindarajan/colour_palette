'use server';

import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

import { authOptions } from "./api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

export async function handleLike(palette) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: 'You must be logged in to like a palette.' };
  }

  const client = await clientPromise;
  const db = client.db();
  const userObjectId = new ObjectId(session.user.id);
  const paletteId = palette.id;

  try {
    const existingLike = await db.collection('likes').findOne({ userId: userObjectId, paletteId });

    if (existingLike) {
      // If user has already liked it, UNLIKE it
      await db.collection('likes').deleteOne({ _id: existingLike._id });
    } else {
      // If user has not liked it, LIKE it

      // Step 1: Save the palette to our 'palettes' collection if it's not already there.
      // 'upsert: true' means: update if found, insert if not found.
      // '$setOnInsert' means these fields are only set when a NEW document is created.
      await db.collection('palettes').updateOne(
        { id: paletteId },
        { 
          $setOnInsert: {
            id: paletteId,
            colors: palette.colors,
            createdAt: new Date(),
          }
        },
        { upsert: true }
      );

      // Step 2: Now that we're sure the palette exists in our DB, add the like reference.
      await db.collection('likes').insertOne({ 
        userId: userObjectId, 
        paletteId, 
        createdAt: new Date() 
      });
    }

    // Revalidate the favorites path so it updates when a user likes/unlikes something.
    // This will NOT refresh the homepage.
    revalidatePath('/favorites');
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: 'An error occurred.' };
  }
}