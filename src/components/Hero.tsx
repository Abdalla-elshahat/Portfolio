import { Box, Button, Container, Flex, Heading, HStack, IconButton, Image, Link, Stack, Text } from "@chakra-ui/react";
import { useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiChevronDown, FiDownload } from "react-icons/fi";
import { homeData } from "../../public/data/home";
import { aboutMe } from "../../public/data/about";
import { MotionBox, RotatingWords, fadeUp, pop, stagger } from "./motion";

const blobs = [
  { color: "brand.500", top: "-10%", left: "10%", size: "420px", dur: 18 },
  { color: "purple.500", top: "20%", left: "60%", size: "380px", dur: 22 },
  { color: "cyan.500", top: "50%", left: "20%", size: "320px", dur: 26 },
];

// Animated "</>" tile: flips in 3D, glows, brackets breathe and a cursor blinks.
const CodeBadge = () => (
  <MotionBox
    as="span"
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    ml={4}
    px={{ base: 2, md: 3 }}
    h={{ base: "44px", md: "64px" }}
    verticalAlign="middle"
    borderRadius="xl"
    fontFamily="'JetBrains Mono', ui-monospace, monospace"
    fontSize={{ base: "xl", md: "3xl" }}
    fontWeight="bold"
    color="white"
    bgGradient="linear(135deg, brand.500, cyan.500, purple.500)"
    style={{ transformPerspective: 600 }}
    initial={{ scale: 0, rotate: -180 }}
    animate={{
      scale: 1,
      rotate: 0,
      rotateY: [0, 0, 360, 360],
      boxShadow: [
        "0 0 0px rgba(11,206,175,0.0)",
        "0 0 28px rgba(11,206,175,0.7)",
        "0 0 0px rgba(11,206,175,0.0)",
      ],
    }}
    transition={
      {
        scale: { type: "spring", stiffness: 200, damping: 12, delay: 0.6 },
        rotate: { type: "spring", stiffness: 200, damping: 12, delay: 0.6 },
        rotateY: { duration: 4, times: [0, 0.7, 0.85, 1], repeat: Infinity, ease: "easeInOut", delay: 1.5 },
        boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
      } as any
    }
    whileHover={{ scale: 1.15, rotate: -6 }}
  >
    <MotionBox as="span" animate={{ x: [0, -3, 0] }} transition={{ duration: 1.2, repeat: Infinity } as any}>
      &lt;
    </MotionBox>
    <Box as="span" opacity={0.85}>/</Box>
    <MotionBox as="span" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.2, repeat: Infinity } as any}>
      &gt;
    </MotionBox>
    <MotionBox
      as="span"
      ml="2px"
      w={{ base: "3px", md: "4px" }}
      h="60%"
      bg="white"
      borderRadius="sm"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity } as any}
    />
  </MotionBox>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, 120]);
  const textY = useTransform(scrollY, [0, 600], [0, 60]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <Box
      as="section"
      id="top"
      position="relative"
      overflow="hidden"
      minH={{ md: "calc(100vh - 64px)" }}
      display="flex"
      alignItems="center"
    >
      {/* drifting gradient blobs */}
      {blobs.map((b, i) => (
        <MotionBox
          key={i}
          position="absolute"
          top={b.top}
          left={b.left}
          w={b.size}
          h={b.size}
          borderRadius="full"
          bg={b.color}
          opacity={0.15}
          filter="blur(80px)"
          pointerEvents="none"
          animate={{ x: [0, 80, -60, 0], y: [0, -60, 40, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" } as any}
        />
      ))}

      <Container maxW="6xl" py={{ base: 16, md: 20 }} position="relative">
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 10, md: 16 }}
        >
          <MotionBox
            flex={1}
            textAlign={{ base: "center", md: "left" }}
            variants={stagger(0.1, 0.12)}
            initial="hidden"
            animate="show"
            style={{ y: textY, opacity: fade }}
          >
            <MotionBox variants={fadeUp}>
              <HStack
                display="inline-flex"
                px={3}
                py={1}
                mb={6}
                borderRadius="full"
                border="1px solid"
                borderColor="border.subtle"
                bg="bg.card"
                fontSize="sm"
                color="text.muted"
              >
                <Box position="relative" w={2} h={2}>
                  <MotionBox
                    position="absolute"
                    inset={0}
                    borderRadius="full"
                    bg="green.400"
                    animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity } as any}
                  />
                  <Box position="absolute" inset={0} borderRadius="full" bg="green.400" />
                </Box>
                <Text>Available for work</Text>
              </HStack>
            </MotionBox>

            <MotionBox variants={fadeUp}>
              <Heading
                fontSize={{ base: "4xl", md: "6xl" }}
                lineHeight={1.1}
                letterSpacing="tighter"
                fontWeight="extrabold"
              >
                Hi, I'm Abdalla
                <CodeBadge />
                <br />
                <RotatingWords
                  words={["Full Stack Developer.", "React Engineer.", "Angular Developer.", "MERN Stack Specialist."]}
                />
              </Heading>
            </MotionBox>

            <MotionBox variants={fadeUp}>
              <Text
                mt={6}
                fontSize={{ base: "lg", md: "xl" }}
                color="text.muted"
                maxW="xl"
                mx={{ base: "auto", md: 0 }}
              >
                I build fast, scalable web apps with the MERN stack — from polished React interfaces to robust Node.js
                APIs.
              </Text>
            </MotionBox>

            <MotionBox variants={fadeUp}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={3}
                mt={8}
                justify={{ base: "center", md: "flex-start" }}
              >
                <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    as="a"
                    href="#projects"
                    size="lg"
                    w="full"
                    rightIcon={<FiArrowRight />}
                    boxShadow="0 0 0 0 rgba(11,206,175,0.5)"
                    _hover={{ boxShadow: "0 8px 30px rgba(11,206,175,0.45)" }}
                  >
                    View my work
                  </Button>
                </MotionBox>
                <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    as="a"
                    href={aboutMe.cvPath}
                    download={aboutMe.cvFileNameAfterDownload}
                    size="lg"
                    w="full"
                    variant="outline"
                    colorScheme="gray"
                    leftIcon={<FiDownload />}
                  >
                    Download CV
                  </Button>
                </MotionBox>
              </Stack>
            </MotionBox>

            <MotionBox
              variants={stagger(0, 0.07)}
              display="flex"
              gap={2}
              mt={8}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              {homeData.social.map(({ Icon, Label, Link: href }) => (
                <MotionBox key={Label} variants={pop} whileHover={{ y: -4, rotate: -8 }}>
                  <IconButton
                    as={Link}
                    href={href}
                    isExternal
                    aria-label={Label}
                    icon={<Icon />}
                    variant="ghost"
                    colorScheme="gray"
                    borderRadius="full"
                    fontSize="xl"
                    _hover={{ color: "accent", bg: "border.subtle" }}
                  />
                </MotionBox>
              ))}
            </MotionBox>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 } as any}
            style={{ y: photoY }}
          >
            <MotionBox
              position="relative"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" } as any}
            >
              <MotionBox
                position="absolute"
                inset={-2}
                borderRadius="full"
                bgGradient="conic(from 0deg, brand.400, cyan.400, purple.400, brand.400)"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" } as any}
              />
              <MotionBox
                position="absolute"
                inset={-6}
                borderRadius="full"
                bgGradient="conic(from 0deg, brand.400, cyan.400, purple.400, brand.400)"
                filter="blur(30px)"
                opacity={0.5}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" } as any}
              />
              <Image
                src={homeData.myImage}
                alt="Abdalla El-shahat"
                position="relative"
                boxSize={{ base: "220px", md: "340px" }}
                objectFit="cover"
                borderRadius="full"
                border="6px solid"
                borderColor="bg.page"
                objectPosition="top"
              />
            </MotionBox>
          </MotionBox>
        </Flex>

        <MotionBox
          as="a"
          href="#about"
          aria-label="Scroll down"
          display={{ base: "none", md: "flex" }}
          position="absolute"
          bottom={-4}
          left="50%"
          ml="-12px"
          color="text.muted"
          fontSize="2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1.2 }, y: { duration: 1.6, repeat: Infinity } } as any}
          style={{ opacity: fade }}
        >
          <FiChevronDown />
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Hero;
