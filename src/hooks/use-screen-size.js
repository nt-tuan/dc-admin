import React from "react";
export const useScreenSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined
  });
  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  const isScreenSize = React.useCallback(
    (size) => {
      if (windowSize.width == null) return false;
      switch (size) {
        case "xs":
          return windowSize.width < 400;
        case "sm":
          return windowSize.width < 768;
        case "md":
          return windowSize.width < 992;
        case "lg":
          return windowSize.width < 1200;
        case "xl":
          return windowSize.width >= 1200;
        default:
          return false;
      }
    },
    [windowSize]
  );
  return { isScreenSize };
};
