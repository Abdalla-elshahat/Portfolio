import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `"Inter", system-ui, sans-serif`,
    body: `"Inter", system-ui, sans-serif`,
  },
  colors: {
    brand: {
      50: "#e6fffa",
      100: "#b3fff0",
      200: "#7ff5de",
      300: "#4ae8cb",
      400: "#1fdcba",
      500: "#0BCEAF",
      600: "#09a88d",
      700: "#07826d",
      800: "#045c4d",
      900: "#02362d",
    },
  },
  semanticTokens: {
    colors: {
      "bg.page": { default: "#f8fafc", _dark: "#0a0a0f" },
      "bg.card": { default: "white", _dark: "whiteAlpha.50" },
      "bg.nav": { default: "rgba(248,250,252,0.75)", _dark: "rgba(10,10,15,0.7)" },
      "border.subtle": { default: "blackAlpha.100", _dark: "whiteAlpha.100" },
      "text.muted": { default: "gray.600", _dark: "gray.400" },
      accent: { default: "brand.600", _dark: "brand.400" },
    },
  },
  styles: {
    global: {
      html: { scrollBehavior: "smooth" },
      body: { bg: "bg.page", color: "chakra-body-text" },
      "::selection": { bg: "brand.500", color: "white" },
    },
  },
  components: {
    Button: {
      baseStyle: { borderRadius: "full", fontWeight: "semibold" },
      defaultProps: { colorScheme: "brand" },
    },
    Input: { defaultProps: { focusBorderColor: "brand.400" } },
    Textarea: { defaultProps: { focusBorderColor: "brand.400" } },
  },
});

export default theme;
