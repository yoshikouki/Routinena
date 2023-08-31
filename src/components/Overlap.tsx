import { Box, Container, Slide } from "@mui/material";
import {
  forwardRef,
  useRef,
  type ReactNode,
  type TouchEventHandler,
} from "react";

const OverlapContainer = forwardRef<HTMLDivElement, { children: ReactNode }>(
  (props, ref) => <div ref={ref} {...props} />,
);
OverlapContainer.displayName = "OverlapContainer";

const ClosableContainer = ({ children }: { children: ReactNode }) => {
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleTouchStart: TouchEventHandler = (e) => {
    startYRef.current = e.touches[0]?.clientY || 0;
    currentYRef.current = e.touches[0]?.clientY || 0;
  };

  const handleTouchMove: TouchEventHandler = (e) => {
    if (!elementRef.current) return;

    currentYRef.current = e.touches[0]?.clientY || 0;
    const diff = currentYRef.current - startYRef.current;
    if (0 <= diff && diff <= 100) {
      elementRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!elementRef.current) return;
    const diff = currentYRef.current - startYRef.current;

    if (diff > 100) {
      // TODO: WIP
      console.log("close");
    }
    elementRef.current.style.transform = "translateY(0)";
  };

  return (
    <Box
      sx={{
        top: 80,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
        zIndex: "auto",
        overflow: "auto",
        width: "100%",
        height: "100vh",
      }}
    >
      <Container
        ref={elementRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        sx={(theme) => ({
          width: "100%",
          background: `rgba(${theme.vars.palette.background.paper} / 0.5)`,
          backdropFilter: "blur(8px)",
          pt: 5,
          pb: 12,
        })}
      >
        {children}
      </Container>
    </Box>
  );
};

interface Props {
  open: boolean;
  children: ReactNode;
}

const Overlap = ({ open, children }: Props) => {
  return (
    <Slide
      in={open}
      direction={"up"}
      mountOnEnter
      unmountOnExit
      timeout={{
        enter: 200,
        exit: 100,
      }}
    >
      <OverlapContainer>
        <ClosableContainer>{children}</ClosableContainer>
      </OverlapContainer>
    </Slide>
  );
};

export default Overlap;
