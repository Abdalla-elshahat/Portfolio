import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { FiSend } from "react-icons/fi";
import { validationSchema, FormValues } from "../utils/validation";
import { sendEmail } from "../utils/sendEmail";
import { homeData } from "../../public/data/home";
import { receiver_email } from "../../public/data/contact";
import Section from "./Section";
import Reveal from "./Reveal";
import { MotionBox } from "./motion";

const fields: { name: keyof FormValues; label: string; placeholder: string }[] = [
  { name: "name", label: "Name", placeholder: "Your name" },
  { name: "email", label: "Email", placeholder: "you@example.com" },
];

const MailIcon = homeData.contactInfo[0].Icon;

const initialValues: FormValues = { name: "", email: "", subject: "", message: "" };

const TextField = ({
  name,
  label,
  placeholder,
  textarea,
}: {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  textarea?: boolean;
}) => (
  <Field name={name}>
    {({ field, meta }: FieldProps) => (
      <FormControl isInvalid={!!(meta.touched && meta.error)}>
        <FormLabel fontSize="sm" color="text.muted">
          {label}
        </FormLabel>
        {textarea ? (
          <Textarea {...field} placeholder={placeholder} rows={6} borderRadius="xl" />
        ) : (
          <Input {...field} placeholder={placeholder} borderRadius="xl" size="lg" />
        )}
        <FormErrorMessage>{meta.error?.replace(/^Error:\s*/, "")}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

const ContactSection = () => {
  const toast = useToast();

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    try {
      const result = await sendEmail(values);
      if (!result.ok) throw new Error(`Status ${result.status}`);
      toast({
        title: "Message sent",
        description: "Thanks! I'll get back to you soon.",
        status: "success",
        isClosable: true,
      });
      resetForm();
    } catch {
      toast({
        title: "Couldn't send message",
        description: "Please try again or email me directly.",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together">
      <Grid templateColumns={{ base: "1fr", lg: "2fr 3fr" }} gap={6}>
        <Reveal bg="bg.card" border="1px solid" borderColor="border.subtle" borderRadius="2xl" p={8}>
          <Text fontSize="lg" color="text.muted" mb={8}>
            Have a project in mind or just want to say hi? My inbox is always open.
          </Text>
          <VStack align="stretch" spacing={5}>
            <Link href={`mailto:${receiver_email}`} _hover={{ color: "accent" }}>
              <HStack spacing={3}>
                <Box p={3} borderRadius="xl" bg="border.subtle" color="accent">
                  <MailIcon />
                </Box>
                <Text fontWeight="medium">{receiver_email}</Text>
              </HStack>
            </Link>
            {homeData.contactInfo.slice(1).map(({ Icon, Label }) => (
              <HStack key={Label} spacing={3} transition="transform 0.2s" _hover={{ transform: "translateX(6px)" }}>
                <Box p={3} borderRadius="xl" bg="border.subtle" color="accent">
                  <Icon />
                </Box>
                <Text fontWeight="medium">{Label}</Text>
              </HStack>
            ))}
          </VStack>
        </Reveal>

        <Reveal delay={0.1} bg="bg.card" border="1px solid" borderColor="border.subtle" borderRadius="2xl" p={8}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <VStack spacing={5} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                    {fields.map((f) => (
                      <TextField key={f.name} {...f} />
                    ))}
                  </SimpleGrid>
                  <TextField name="subject" label="Subject" placeholder="What's this about?" />
                  <TextField name="message" label="Message" placeholder="Tell me about your project..." textarea />
                  <MotionBox
                    alignSelf={{ base: "stretch", md: "flex-start" }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Button
                      type="submit"
                      w="full"
                      _hover={{ boxShadow: "0 8px 30px rgba(11,206,175,0.45)" }}
                      size="lg"
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                      rightIcon={<FiSend />}
                    >
                      Send message
                    </Button>
                  </MotionBox>
                </VStack>
              </Form>
            )}
          </Formik>
        </Reveal>
      </Grid>
    </Section>
  );
};

export default ContactSection;
