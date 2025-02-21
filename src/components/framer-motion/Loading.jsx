import { motion } from "framer-motion";

const AnimationItem = ({ index, character }) => (
  <motion.span
    className="block text-[40px] font-medium h-fit leading-10"
    animate={{
      y: [0, -20, 0],
    }}
    transition={{
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 1,
      delay: 0.1 * index,
    }}
  >
    {character}
  </motion.span>
);

export default function Loading() {
  const characters = "LOADING...";

  return (
    <div>
      <div className="flex gap-1">
        {characters.split("").map((char, index) => (
          <AnimationItem key={index} index={index} character={char} />
        ))}
      </div>
      <div className="flex gap-1 relative items-end h-[60px] scale-y-[-1]">
        <div className="absolute w-[100%] h-[100%] z-10 bg-gradient-to-t from-[#ffffff9f] from-5% to-white to-95%"></div>
        {characters.split("").map((char, index) => (
          <AnimationItem key={index} index={index} character={char} />
        ))}
      </div>
    </div>
  );
}
