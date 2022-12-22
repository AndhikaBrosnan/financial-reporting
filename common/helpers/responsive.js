//handle window resize tablet = mobile
import { useMediaQuery } from "react-responsive";

export const isMobileHandler = () => {
  return useMediaQuery({ query: "(max-width: 768px)" });
};

export const isTabletHandler = () => {
  return useMediaQuery({ minWidth: 481, maxWidth: 768 });
};

export const isMiniMobileHandler = () => {
  return useMediaQuery({ minWidth: 320, maxWidth: 480 });
};
