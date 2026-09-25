import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

// Fades and slides content in the first time it scrolls into view.
const Reveal = ({ children, delay = 0, ...rest }: BoxProps & { delay?: number }) => (
  <MotionBox
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" } as any}
    {...(rest as any)}
  >
    {children}
  </MotionBox>
);

export default Reveal;
