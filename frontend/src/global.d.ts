declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";

// src/types.d.ts
import "@mui/material";

declare module "@mui/material" {
  // Augment the default useMediaQuery hook with a default generic for Theme
  function useMediaQuery<Theme = import("@mui/material/styles").Theme>(
    query: string | ((theme: Theme) => string),
    options?: {
      defaultMatches?: boolean;
      matchMedia?: typeof window.matchMedia;
      noSsr?: boolean;
      ssrMatchMedia?: (query: string) => { matches: boolean };
    }
  ): boolean;
}
