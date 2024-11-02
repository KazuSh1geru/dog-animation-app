import { motion } from "framer-motion";

const WalkingDog = () => (
  <motion.div
    className="w-48 h-48 mx-auto"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
  >
    <img
      src="/images/dog_walking.png"
      alt="Walking Dog"
      className="w-full h-full"
    />
  </motion.div>
);

const Dog = () => (
  <motion.div
    className="w-48 h-48"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
  >
    <img src="/images/dog_default.png" alt="Dog" className="w-full h-full" />
  </motion.div>
);

export { WalkingDog, Dog };
