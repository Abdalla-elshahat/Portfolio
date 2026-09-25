import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import Reveal from "./Reveal";
import { MotionBox } from "./motion";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

const Section = ({ id, eyebrow, title, children }: Props) => (
  <Box as="section" id={id} py={{ base: 16, md: 24 }} scrollMarginTop="64px">
    <Container maxW="6xl">
      <Reveal mb={{ base: 8, md: 12 }}>
        <Text
          color="accent"
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="widest"
          fontSize="sm"
          mb={2}
        >
          {eyebrow}
        </Text>
        <Heading fontSize={{ base: "3xl", md: "4xl" }} letterSpacing="tight">
          {title}
        </Heading>
        <MotionBox
          mt={4}
          h="4px"
          w="80px"
          borderRadius="full"
          bgGradient="linear(to-r, brand.400, purple.400)"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" } as any}
          style={{ transformOrigin: "0%" }}
        />
      </Reveal>
      {children}
    </Container>
  </Box>
);

export default Section;
