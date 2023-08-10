import { Box, Container, Slide } from "@mui/material";
import { type ReactNode } from "react";
import { useBottomFab } from "~/hooks/bottom-fab";

interface Props {
  open: boolean;
  children: ReactNode;
}

const Overlap = ({ open, children }: Props) => {
  useBottomFab();
  if (!open) return null;

  return (
    <Box>
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
        <Container
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
      </Slide>
    </Box>
  );
};

export default Overlap;
