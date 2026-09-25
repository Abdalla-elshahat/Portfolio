import { Box, Grid, HStack, SimpleGrid, Tag, Text, VStack } from "@chakra-ui/react";
import { aboutMe, technicalSkills } from "../../public/data/about";
import { homeData } from "../../public/data/home";
import Section from "./Section";
import Reveal from "./Reveal";
import { MotionBox, fadeUp, pop, stagger } from "./motion";

const cardProps = {
  bg: "bg.card",
  border: "1px solid",
  borderColor: "border.subtle",
  borderRadius: "2xl",
  p: 6,
};

const AboutSection = () => (
  <Section id="about" eyebrow="About me" title="A bit about who I am">
    <Grid templateColumns={{ base: "1fr", lg: "3fr 2fr" }} gap={6} mb={6}>
      <Reveal {...cardProps}>
        <VStack align="start" spacing={4}>
          {aboutMe.description.map((p, i) => (
            <Text key={i} fontSize="lg" color="text.muted" lineHeight="tall">
              {p}
            </Text>
          ))}
        </VStack>
      </Reveal>
      <MotionBox
        {...cardProps}
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <VStack align="stretch" spacing={4}>
          {[...homeData.contactInfo, ...homeData.education].map(({ Icon, Label }) => (
            <MotionBox key={Label} variants={fadeUp} whileHover={{ x: 6 }}>
              <HStack spacing={3}>
                <Box p={2} borderRadius="lg" bg="border.subtle" color="accent">
                  <Icon />
                </Box>
                <Text fontWeight="medium">{Label}</Text>
              </HStack>
            </MotionBox>
          ))}
        </VStack>
      </MotionBox>
    </Grid>

    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {Object.entries(technicalSkills).map(([category, skills], i) => (
        <MotionBox
          key={category}
          {...cardProps}
          variants={stagger(i * 0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
          _hover={{ borderColor: "accent", boxShadow: "0 10px 40px rgba(11,206,175,0.15)" }}
          transitionProperty="border-color, box-shadow"
          transitionDuration="0.3s"
        >
          <MotionBox variants={fadeUp}>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              {category}
            </Text>
          </MotionBox>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {skills.map((s) => (
              <MotionBox key={s} variants={pop} whileHover={{ scale: 1.12, rotate: -2 }}>
                <Tag borderRadius="full" variant="subtle" colorScheme="brand" size="md" cursor="default">
                  {s}
                </Tag>
              </MotionBox>
            ))}
          </Box>
        </MotionBox>
      ))}
    </SimpleGrid>
  </Section>
);

export default AboutSection;
