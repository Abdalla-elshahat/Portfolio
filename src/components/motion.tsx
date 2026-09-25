import { Box, BoxProps, IconButton } from "@chakra-ui/react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export const MotionBox = motion(Box);

// Parent/child variants for staggered entrances.
export const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const pop = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } },
};

// Thin gradient bar at the top of the page that tracks scroll progress.
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      h="3px"
      zIndex="banner"
      bgGradient="linear(to-r, brand.400, cyan.400, purple.400)"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

// Floating button that appears after scrolling down.
export const BackToTop = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useEffect(() => scrollY.on("change", (y) => setVisible(y > 600)), [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <MotionBox
          position="fixed"
          bottom={6}
          right={6}
          zIndex="sticky"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4 }}
        >
          <IconButton
            aria-label="Back to top"
            icon={<FiArrowUp />}
            borderRadius="full"
            size="lg"
            boxShadow="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

// Card that tilts in 3D toward the cursor.
export const TiltCard = ({ children, ...rest }: BoxProps & { children: ReactNode }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  return (
    <MotionBox
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      {...(rest as any)}
    >
      {children}
    </MotionBox>
  );
};

// Cycles through words with a slide/fade transition.
export const RotatingWords = ({ words, interval = 2200 }: { words: string[]; interval?: number }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <Box as="span" display="inline-grid" verticalAlign="bottom" overflow="hidden">
      <AnimatePresence mode="wait" initial={false}>
        <MotionBox
          as="span"
          key={words[i]}
          display="inline-block"
          bgGradient="linear(to-r, brand.400, cyan.400, purple.400)"
          bgClip="text"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" } as any}
        >
          {words[i]}
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
};
