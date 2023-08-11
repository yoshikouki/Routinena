import { Container, Slide } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}

const OverlapContainer = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children, ...props }, ref) => (
    <Container
      ref={ref}
      {...props}
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
        bgcolor: "background.paper",
        borderRadius: "28px 28px 0 0",
        pt: 5,
        pb: 12,
        opacity: 0.98,
      }}
    >
      {children}
    </Container>
  ),
);
OverlapContainer.displayName = "OverlapContainer";

const Overlap = ({ open, children }: Props) => {
  if (!open) return null;

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
      <OverlapContainer>{children}</OverlapContainer>
    </Slide>
  );
};

export default Overlap;
