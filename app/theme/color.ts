import { PlatformColor, DynamicColorIOS, Platform } from "react-native"
import { palette } from "./palette"

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",

  background: Platform.select({
    ios: PlatformColor("secondarySystemBackground"),
    android: PlatformColor("@color/background"),
  }),

  secondaryBackground: palette.white,

  primary: Platform.select({
    ios: PlatformColor("systemBlue"),
    android: PlatformColor("@color/background"),
  }),

  primaryLighter: palette.blueLighter,
  primaryDarker: palette.blueDarker,

  secondary: Platform.select({
    ios: DynamicColorIOS({ light: palette.pinky, dark: PlatformColor("systemGray3") }),
    android: PlatformColor("@color/background"),
  }),
  secondaryLighter: palette.orangeLighter,

  inputBackground: Platform.select({
    ios: DynamicColorIOS({ light: PlatformColor("systemBackground"), dark: PlatformColor("systemGray5") }),
  }),

  /**
   * A subtle color used for borders and lines.
   */
  line: palette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: Platform.select({
    ios: PlatformColor("label"),
    android: PlatformColor("@color/background"),
  }),

  whiteText: Platform.select({
    ios: DynamicColorIOS({ light: palette.white, dark: palette.offWhite }),
    android: PlatformColor("@color/background"),
  }),

  label: Platform.select({ ios: PlatformColor("secondaryLabel") }),

  /**
   * Secondary information.
   */
  link: palette.blue,
  /**
   * Secondary information.
   */
  dim: palette.lightGrey,
  /**
   * Secondary information.
   */
  dimmer: palette.lighterGrey,
  /**
   * Error messages and icons.
   */
  error: palette.angry,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,
}
