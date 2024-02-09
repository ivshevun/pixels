-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('Mobile', 'Typography', 'WebDesign', 'Animations', 'Illustrations', 'ThreeD', 'ProductDesign', 'UIUX', 'Photography', 'Minimalism', 'FlatDesign', 'Responsive', 'Branding', 'Ecommerce', 'LandingPage', 'Portfolio', 'DarkMode', 'LightMode', 'Sketch', 'Figma', 'AdobeXD', 'Photoshop', 'Illustrator', 'Sketching', 'Wireframing', 'Prototyping', 'MotionGraphics', 'MaterialDesign', 'Colorful', 'Monochrome', 'Retro', 'Vintage', 'HandLettering', 'Calligraphy', 'Graffiti', 'VectorArt', 'PixelArt', 'Abstract', 'Surreal', 'Conceptual', 'Infographics', 'Charts', 'Graphs', 'Maps', 'Icons', 'Logos', 'Badges', 'Stickers', 'Emojis', 'SocialMedia', 'Marketing', 'Podcast', 'Music', 'Video', 'VR', 'AR', 'Wearables', 'IoT', 'GameDesign', 'VRGames', 'ARGames', 'AugmentedReality', 'VirtualReality', 'Coding', 'Programming', 'Development', 'CodeSnippets', 'Algorithms', 'DataStructures', 'AI', 'MachineLearning', 'Blockchain', 'Cryptocurrency', 'Bitcoin', 'Ethereum', 'SmartContracts', 'NFT', 'CyberSecurity', 'Privacy', 'Accessibility', 'InclusiveDesign', 'Sustainability', 'Environment', 'Health', 'Fitness', 'Cooking', 'Travel', 'Nature', 'Space', 'Astronomy', 'Science', 'History', 'Literature', 'Movies', 'TVShows', 'Anime', 'Gaming', 'Comics', 'Fantasy', 'SciFi', 'Horror', 'Web', 'Design', 'Ux', 'Ui', 'Startup', 'Service');

-- CreateTable
CREATE TABLE "Shot" (
    "id" TEXT NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "thumbnailUrl" VARCHAR(255) NOT NULL,
    "title" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "saves" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "tags" "Tag"[],

    CONSTRAINT "Shot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shot" ADD CONSTRAINT "Shot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
