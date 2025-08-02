Color Palette Showcase 
A modern, full-stack web application inspired by Color Hunt, built with Next.js and MongoDB. This project allows users to discover, like, and save their favorite color palettes.



🚀 Live Demo
You can view the live deployed version here:
https://colour-palette-iljy.vercel.app/

✅ Features
Dynamic Palette Display: Fetches and displays a grid of color palettes from the Colormind API.

User Authentication: Secure, session-based user login using GitHub OAuth provided by NextAuth.js.

Like & Favorite System: Authenticated users can "like" palettes. Liked palettes are saved to their personal collection.

Favorites Page: A dedicated, protected route (/favorites) that displays all palettes a user has liked.

Interactive UI:

Hover over a color to see its HEX code.

Click a color to instantly copy its HEX code to the clipboard.

Optimistic UI updates for liking/unliking provides a smooth user experience without page reloads.

🛠️ Tech Stack
Framework: Next.js (App Router)

Styling: Tailwind CSS

Authentication: NextAuth.js

Database: MongoDB with MongoDB Atlas

Deployment: Vercel

Icons: Lucide React

Palette Data Source: Colormind API

🏁 Getting Started
To run this project locally, follow these steps.

Prerequisites
Node.js (v18 or later)

A GitHub account for authentication.

A free MongoDB Atlas account.

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies:

Bash

npm install
Set up environment variables:
Create a file named .env.local in the root of your project and add the following variables.

Code snippet

# Get this from your MongoDB Atlas dashboard after creating a cluster
# Remember to replace <password> with your database user's password
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING

# Get these by creating a new GitHub OAuth App in your GitHub developer settings
AUTH_GITHUB_ID=YOUR_GITHUB_CLIENT_ID
AUTH_GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET

# A secret for securing NextAuth.js sessions.
# Generate a strong secret by running: openssl rand -base64 32
AUTH_SECRET=YOUR_AUTH_SECRET

# The base URL of your application (for local development)
AUTH_URL=http://localhost:3000
Run the development server:

Bash

npm run dev
Open http://localhost:3000 with your browser to see the result.

🚀 Deployment
This application is optimized for deployment on Vercel.

To deploy:

Push your code to your GitHub repository.

Import the repository into Vercel.

Configure Environment Variables: Add all the variables from your .env.local file to the Vercel project settings (Settings -> Environment Variables).

Important: For the production deployment, you must change AUTH_URL to your Vercel application's public URL (e.g., https://your-app-name.vercel.app).

Update GitHub OAuth App: In your GitHub OAuth App settings, add your Vercel production URL to the "Authorization callback URLs".

Example: https://your-app-name.vercel.app/api/auth/callback/github

Trigger a new deployment on Vercel for the environment variable changes to take effect.

🙏 Acknowledgements
Inspiration drawn from the beautifully simple Color Hunt website.

Palette data provided by the Colormind API.
