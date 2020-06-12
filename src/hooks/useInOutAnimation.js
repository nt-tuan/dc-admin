import { useTransition, config } from "react-spring";

export const useInOutAnimation = (item, keys) => {
  const transitions = useTransition(item, keys, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { display: "none" },
    config: config.gentle
  });
  return transitions;
};
