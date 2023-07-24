import { AppBar, Avatar, Container, Toolbar } from "@mui/material";

import { AppHeaderMenu } from "./AppHeaderMenu";
import AppLogo from "./AppLogo";
import { type Session } from "next-auth";

interface Props {
  session: Session;
}
const AppHeader = ({ session }: Props) => {
  return (
    <AppBar
      color="transparent"
      sx={{ boxShadow: "none", backdropFilter: "blur(2px)" }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters={true} sx={{ justifyContent: "space-between" }}>
          <AppLogo />

          <AppHeaderMenu user={session.user}>
            <Avatar src={session.user.image || ""} />
          </AppHeaderMenu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
