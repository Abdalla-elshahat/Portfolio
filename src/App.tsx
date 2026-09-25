import { Box, Container, Flex, HStack, IconButton, Link, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { homeData } from "../public/data/home";
import { MotionConfig } from "framer-motion";
import { BackToTop, ScrollProgress } from "./components/motion";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Box minH="100vh">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Box as="footer" borderTop="1px solid" borderColor="border.subtle" py={8}>
          <Container maxW="6xl">
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={4}>
              <Text color="text.muted" fontSize="sm">
                © {new Date().getFullYear()} Abdalla El-shahat. All rights reserved.
              </Text>
              <HStack spacing={1}>
                {homeData.social.map(({ Icon, Label, Link: href }) => (
                  <IconButton
                    key={Label}
                    as={Link}
                    href={href}
                    isExternal
                    aria-label={Label}
                    icon={<Icon />}
                    variant="ghost"
                    colorScheme="gray"
                    size="sm"
                    borderRadius="full"
                  />
                ))}
              </HStack>
            </Flex>
          </Container>
        </Box>
        <BackToTop />
      </Box>
    </MotionConfig>
  );
}

export default App;
