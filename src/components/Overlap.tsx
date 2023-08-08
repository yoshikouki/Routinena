import { Container } from "@mui/material";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Overlap = ({ children }: Props) => {
  return (
    <Container
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        zIndex: "auto",
        bgcolor: "background.paper",
        width: "100%",
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
