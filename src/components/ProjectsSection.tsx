import { Box, Button, HStack, Image, SimpleGrid, Tag, Text } from "@chakra-ui/react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { projects } from "../../public/data/projects";
import Section from "./Section";
import Reveal from "./Reveal";
import { MotionBox, TiltCard, pop, stagger } from "./motion";

const ProjectsSection = () => (
  <Section id="projects" eyebrow="Portfolio" title="Selected projects">
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {projects.map((p, i) => (
        <Reveal key={p.Title} delay={(i % 3) * 0.08} h="100%">
          <TiltCard
            role="group"
            position="relative"
            h="100%"
            display="flex"
            flexDirection="column"
            bg="bg.card"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="2xl"
            overflow="hidden"
            transition="border-color 0.25s, box-shadow 0.25s"
            _hover={{ borderColor: "accent", boxShadow: "0 20px 50px rgba(11,206,175,0.18)" }}
          >
            {/* light sweep on hover */}
            <Box
              position="absolute"
              inset={0}
              zIndex={1}
              pointerEvents="none"
              bgGradient="linear(120deg, transparent 30%, whiteAlpha.300 50%, transparent 70%)"
              transform="translateX(-120%)"
              transition="transform 0.8s ease"
              _groupHover={{ transform: "translateX(120%)" }}
            />
            <Box overflow="hidden" aspectRatio={16 / 10} bg="border.subtle">
              <Image
                src={p.ImageURL}
                alt={p.Title}
                w="100%"
                h="100%"
                objectFit="cover"
                transition="transform 0.4s"
                _groupHover={{ transform: "scale(1.05)" }}
              />
            </Box>
            <Box p={6} display="flex" flexDirection="column" flex={1}>
              <Text fontWeight="bold" fontSize="xl" textTransform="capitalize" mb={2}>
                {p.Title}
              </Text>
              <Text color="text.muted" mb={4}>
                {p.Description}
              </Text>
              <MotionBox
                display="flex"
                flexWrap="wrap"
                gap={2}
                mb={6}
                variants={stagger(0.2, 0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {p.Technologies.map((t) => (
                  <MotionBox key={t} variants={pop}>
                    <Tag size="sm" borderRadius="full" variant="outline" colorScheme="gray" textTransform="capitalize">
                      {t}
                    </Tag>
                  </MotionBox>
                ))}
              </MotionBox>
              <HStack spacing={3} mt="auto">
                {p.Demo && (
                  <Button
                    as="a"
                    href={p.Demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    rightIcon={<FiExternalLink />}
                  >
                    Live demo
                  </Button>
                )}
                {p.Source && (
                  <Button
                    as="a"
                    href={p.Source}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    variant="ghost"
                    colorScheme="gray"
                    leftIcon={<FiGithub />}
                  >
                    Code
                  </Button>
                )}
              </HStack>
            </Box>
          </TiltCard>
        </Reveal>
      ))}
    </SimpleGrid>
  </Section>
);

export default ProjectsSection;
