import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { MotionBox } from "./motion";

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Tracks which section is currently in the middle of the viewport.
const useActiveSection = () => {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...navLinks.map((l) => l.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
};

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const active = useActiveSection();

  return (
    <MotionBox
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="bg.nav"
      backdropFilter="saturate(180%) blur(12px)"
      borderBottom="1px solid"
      borderColor="border.subtle"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 } as any}
    >
      <Container maxW="6xl">
        <Flex h={16} align="center" justify="space-between">
          <Link href="#top" _hover={{ textDecoration: "none" }}>
            <MotionBox whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Text fontWeight="extrabold" fontSize="lg" letterSpacing="tight">
                Abdalla
                <MotionBox
                  as="span"
                  color="accent"
                  display="inline-block"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity } as any}
                >
                  .
                </MotionBox>
              </Text>
            </MotionBox>
          </Link>

          <HStack spacing={1}>
            <HStack spacing={1} display={{ base: "none", md: "flex" }}>
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  position="relative"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontWeight="medium"
                  color={active === l.href ? "accent" : "text.muted"}
                  _hover={{ color: "accent", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  {active === l.href && (
                    <MotionBox
                      layoutId="nav-pill"
                      position="absolute"
                      inset={0}
                      borderRadius="full"
                      bg="border.subtle"
                      transition={{ type: "spring", stiffness: 400, damping: 30 } as any}
                    />
                  )}
                  <Box as="span" position="relative">
                    {l.label}
                  </Box>
                </Link>
              ))}
            </HStack>
            <IconButton
              aria-label="Toggle color mode"
              icon={
                <AnimatePresence mode="wait" initial={false}>
                  <MotionBox
                    key={colorMode}
                    display="flex"
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25 } as any}
                  >
                    {colorMode === "dark" ? <FiSun /> : <FiMoon />}
                  </MotionBox>
                </AnimatePresence>
              }
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="gray"
              borderRadius="full"
            />
            <IconButton
              aria-label="Open menu"
              icon={isOpen ? <FiX /> : <FiMenu />}
              onClick={onToggle}
              variant="ghost"
              colorScheme="gray"
              borderRadius="full"
              display={{ base: "flex", md: "none" }}
            />
          </HStack>
        </Flex>

        <AnimatePresence>
          {isOpen && (
            <MotionBox
              display={{ md: "none" }}
              overflow="hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <VStack align="stretch" pb={4}>
                {navLinks.map((l, i) => (
                  <MotionBox
                    key={l.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i } as any}
                  >
                    <Link
                      href={l.href}
                      onClick={onClose}
                      py={2}
                      display="block"
                      fontWeight="medium"
                      color={active === l.href ? "accent" : undefined}
                    >
                      {l.label}
                    </Link>
                  </MotionBox>
                ))}
              </VStack>
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </MotionBox>
  );
};

export default Navbar;
