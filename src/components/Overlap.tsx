import { Container } from "@mui/material";
import { type ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}

const Overlap = ({ open, children }: Props) => {
  if (!open) return null;

  return (
    <Container
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
        zIndex: "auto",
        bgcolor: "background.paper",
        width: "100%",
        height: "100vh",
        overflow: "auto",
        pt: 12,
        pb: 12,
        gap: 4,
      }}
    >
      {children}
    </Container>
  );
};

export default Overlap;
