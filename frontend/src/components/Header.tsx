import { AppBar, Grid, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import theme from "../theme";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  const path = useLocation().pathname;
  const isActive = path === to || path.startsWith(to + "/");

  return (
    <Grid item>
      <Link to={to} style={{ textDecoration: "none" }}>
        <Typography
          fontWeight="700"
          variant="body1"
          color={theme.palette.text.primary}
          sx={{
            borderBottom: `2px solid ${
              isActive ? theme.palette.primary.main : "transparent"
            }`,
            padding: "0.5rem 0",
            transition: "border-color 0.2s",
          }}
        >
          {children}
        </Typography>
      </Link>
    </Grid>
  );
};

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Grid
          container
          direction="row"
          wrap="nowrap"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <img
              src="/assets/cals-per-dollar.svg"
              alt="CalsPerDollar Logo"
              style={{ height: "2rem" }}
            />
          </Grid>

          <Grid item>
            <Typography variant="h5" color={theme.palette.text.primary}>
              CalsPerDollar
            </Typography>
          </Grid>
        </Grid>
      </Link>

      <div>
        <Grid container direction="row" wrap="nowrap" spacing={2}>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/browse">Browse</NavItem>
        </Grid>
      </div>
    </AppBar>
  );
};

export default Header;
