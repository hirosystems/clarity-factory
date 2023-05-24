// Global style overrides
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import styles from "./styles";

// Foundational style overrides
import colors from "./foundations/colors";
import fonts from "./foundations/fonts";
import shadows from "./foundations/shadows";
import textStyles from "./foundations/textStyles";

// Component style overrides
import Alert from "./components/alert";
import Button from "./components/button";
import FormLabel from "./components/form-label";
import Heading from "./components/heading";
import Input from "./components/input";
import Textarea from "./components/textarea";
import Link from "./components/link";
import Menu from "./components/menu";
import Modal from "./components/modal";
import Table from "./components/table";
import Tooltip from "./components/tooltip";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  config,
  styles,
  colors,
  fonts,
  shadows,
  textStyles,
  components: {
    Button,
    Input,
    Textarea,
    FormLabel,
    Menu,
    Table,
    Link,
    Alert,
    Modal,
    Heading,
    Tooltip,
  },
};

export default extendTheme(overrides);
