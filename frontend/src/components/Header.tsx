import { AppBar, Grid, styled, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import theme from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { HomeOutlined, Search } from "@mui/icons-material";

const TopAppBar = styled(AppBar)({
  backgroundColor: theme.palette.background.default,
  padding: "1rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const LogoLink: React.FC<{ centered?: boolean }> = ({ centered }) => (
  <Link
    to="/"
    style={{ textDecoration: "none", margin: centered ? "0 auto" : undefined }}
  >
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
);

const navItems = [
  {
    to: "/",
    label: "Home",
    Icon: HomeOutlined,
  },
  {
    to: "/browse",
    label: "Browse",
    Icon: Search,
  },
];

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {
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
          {label}
        </Typography>
      </Link>
    </Grid>
  );
};

interface MobileNavItemProps extends NavItemProps {
  Icon: React.ElementType;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ to, label, Icon }) => {
  const path = useLocation().pathname;
  const isActive = path === to || path.startsWith(to + "/");

  return (
    <Grid item xs={12}>
      <Link to={to} style={{ textDecoration: "none" }}>
        <Icon
          sx={{
            fontSize: "2rem", // Adjust size as needed
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            margin: "0 auto",
            display: "block",
            marginTop: "0.25rem",
          }}
        />

        <Typography
          textAlign="center"
          variant="body2"
          color={
            isActive ? theme.palette.primary.main : theme.palette.text.primary
          }
          fontWeight={isActive ? "700" : undefined}
          sx={{
            borderBottom: `2px solid ${
              isActive ? theme.palette.primary.main : "transparent"
            }`,
            paddingBottom: "0.25rem",
            transition: "border-color 0.2s",
          }}
        >
          {label}
        </Typography>
      </Link>
    </Grid>
  );
};

const MobileHeader = () => {
  return (
    <>
      <TopAppBar position="sticky">
        <LogoLink centered />
      </TopAppBar>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.default,
          top: "auto",
          bottom: 0,
        }}
      >
        <Grid container direction="row" wrap="nowrap" spacing={2}>
          {navItems.map(({ to, label, Icon }) => (
            <MobileNavItem key={to} to={to} Icon={Icon} label={label} />
          ))}
        </Grid>
      </AppBar>
    </>
  );
};

const Header = () => {
  const isMdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return isMdDown ? (
    <MobileHeader />
  ) : (
    <TopAppBar position="sticky">
      <LogoLink />

      <div>
        <Grid container direction="row" wrap="nowrap" spacing={2}>
          {navItems.map(({ to, label }) => (
            <NavItem key={to} to={to} label={label} />
          ))}
        </Grid>
      </div>
    </TopAppBar>
  );
};

export default Header;
