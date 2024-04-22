import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { handleChangeTags } from "@/lib/redux/utils/textHandlers";
import { AnimatePresence, motion } from "framer-motion";
import format from "../../utils/format";
import ComboOption from "./ComboOption";
import { setComboboxOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { Dispatch, SetStateAction } from "react";

const suggestedTags: string[] = [
  "Mobile",
  "Typography",
  "WebDesign",
  "Animations",
  "Illustrations",
  "ThreeD",
  "ProductDesign",
  "UIUX",
  "Photography",
  "Minimalism",
  "FlatDesign",
  "Responsive",
  "Branding",
  "Ecommerce",
  "LandingPage",
  "Portfolio",
  "DarkMode",
  "LightMode",
  "Sketch",
  "Figma",
  "AdobeXD",
  "Photoshop",
  "Illustrator",
  "Sketching",
  "Wireframing",
  "Prototyping",
  "MotionGraphics",
  "MaterialDesign",
  "Colorful",
  "Monochrome",
  "Retro",
  "Vintage",
  "HandLettering",
  "Calligraphy",
  "Graffiti",
  "VectorArt",
  "PixelArt",
  "Abstract",
  "Surreal",
  "Conceptual",
  "Infographics",
  "Charts",
  "Graphs",
  "Maps",
  "Icons",
  "Logos",
  "Badges",
  "Stickers",
  "Emojis",
  "SocialMedia",
  "Marketing",
  "Podcast",
  "Music",
  "Video",
  "VR",
  "AR",
  "Wearables",
  "IoT",
  "GameDesign",
  "VRGames",
  "ARGames",
  "AugmentedReality",
  "VirtualReality",
  "Coding",
  "Programming",
  "Development",
  "CodeSnippets",
  "Algorithms",
  "DataStructures",
  "AI",
  "MachineLearning",
  "Blockchain",
  "Cryptocurrency",
  "Bitcoin",
  "Ethereum",
  "SmartContracts",
  "NFT",
  "CyberSecurity",
  "Privacy",
  "Accessibility",
  "InclusiveDesign",
  "Sustainability",
  "Environment",
  "Health",
  "Fitness",
  "Cooking",
  "Travel",
  "Nature",
  "Space",
  "Astronomy",
  "Science",
  "History",
  "Literature",
  "Movies",
  "TVShows",
  "Anime",
  "Gaming",
  "Comics",
  "Fantasy",
  "SciFi",
  "Horror",
  "Web",
  "Design",
  "Ux",
  "Ui",
  "Startup",
  "Service",
];

export default function ComboOptions({
  content,
  setContent,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}) {
  const { tags: currentTags } = useShotCreationInfo();
  const { isComboboxOpen: isOpen } = useDisclosure();

  const dispatch = useAppDispatch();

  const allTags = suggestedTags
    .filter((tag) => !currentTags.includes(tag))
    .filter((tag) => tag.toLowerCase().includes(content.toLowerCase()));

  const handleChange = (tag: string) => {
    if (currentTags.includes(tag)) return;

    handleChangeTags([...currentTags, tag], dispatch);

    setContent("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="select"
          initial={{ opacity: 0, height: 0, top: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
            top: "70px",
          }}
          exit={{ opacity: 0, height: 0, top: 0 }}
          className="flex flex-col absolute w-full bg-white text-black rounded-lg shadow-2xl overflow-hidden"
        >
          {allTags.slice(0, 6).map((tag) => (
            <ComboOption onClick={() => handleChange(tag)} key={tag}>
              {format(tag)}
            </ComboOption>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
