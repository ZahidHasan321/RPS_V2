import { createTw } from "react-pdf-tailwind";
import { Font } from "@react-pdf/renderer";
import open_sans from "./fonts/OpenSans-Regular.ttf";
import open_sans_bold from "./fonts/OpenSans-Bold.ttf";
import open_sans_extraBold from "./fonts/OpenSans-ExtraBold.ttf";
import open_sans_italic from "./fonts/OpenSans-Italic.ttf";
import open_sans_light from "./fonts/OpenSans-Light.ttf";
import open_sans_bold_italic from "./fonts/OpenSans-BoldItalic.ttf";
import open_sans_extraBold_italic from "./fonts/OpenSans-ExtraBoldItalic.ttf";
import open_sans_light_italic from "./fonts/OpenSans-LightItalic.ttf";
import open_sans_semibold from "./fonts/OpenSans-Semibold.ttf";
import open_sans_semibold_italic from "./fonts/OpenSans-SemiboldItalic.ttf";

export const tw = createTw({});

Font.register({
  family: "Open sans",
  fonts: [
    { src: open_sans },
    { src: open_sans_bold, fontWeight: "bold" },
    { src: open_sans_extraBold, fontWeight: "heavy" },
    { src: open_sans_italic, fontStyle: "italic", fontWeight: "normal" },
    { src: open_sans_light, fontWeight: "light" },
    { src: open_sans_bold_italic, fontWeight: "bold", fontStyle: "italic" },
    {
      src: open_sans_extraBold_italic,
      fontWeight: "heavy",
      fontStyle: "italic",
    },
    { src: open_sans_light_italic, fontWeight: "light", fontStyle: "italic" },
    { src: open_sans_semibold, fontWeight: "semibold" },
    {
      src: open_sans_semibold_italic,
      fontWeight: "semibold",
      fontStyle: "italic",
    },
  ],
});
