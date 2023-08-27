import { Close } from "@mui/icons-material";
import { Box, Button, Container, Slide } from "@mui/material";
import {
  forwardRef,
  useRef,
  useState,
  type ReactNode,
  type TouchEventHandler,
} from "react";

const OverlapContainer = forwardRef<HTMLDivElement, { children: ReactNode }>(
  (props, ref) => <div ref={ref} {...props} />,
);
OverlapContainer.displayName = "OverlapContainer";

const ClosableContainer = ({ children }: { children: ReactNode }) => {
  const [dragging, setDragging] = useState(false);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleTouchStart: TouchEventHandler = (e) => {
    setDragging(true);
    startYRef.current = e.touches[0]?.clientY || 0;
    currentYRef.current = e.touches[0]?.clientY || 0;
  };

  const handleTouchMove: TouchEventHandler = (e) => {
    const element = elementRef.current;
    if (!element || !dragging) return;
    currentYRef.current = e.touches[0]?.clientY || 0;
    const diff = currentYRef.current - startYRef.current;

    if (0 <= diff && diff <= 100) {
      element.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    const element = elementRef.current;
    if (!element || !dragging) return;
    const diff = currentYRef.current - startYRef.current;

    if (diff > 100) {
      // TODO: WIP
      console.log("close");
    }
    element.style.transform = "translateY(0)";
    setDragging(false);
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
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Button
        variant="text"
        color="secondary"
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          p: 2,
        }}
      >
        <Close fontSize="large" />
      </Button>
      <Container
        ref={elementRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "background.paper",
          borderRadius: "28px 28px 0 0",
          pt: 5,
          pb: 12,
          opacity: 0.98,
        }}
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
